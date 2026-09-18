# UC-EXT-01: Save Words from Any Webpage

| **Use Case ID:** | UC-EXT-01 |
| ---: | :--- |
| **Use Case Name:** | Save words from any webpage |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner, signed in to the Quizez browser extension). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a learner encounters an unfamiliar word while reading any webpage, the learner selects the word and opens the Quizez extension popup to view its dictionary entry in context. The learner then saves the word — together with the sentence it appeared in — into a chosen word set. The UC ends when the word is stored in the selected word set and is available for study in the web app. |
| **Preconditions:** | 1. Quizez browser extension is installed and enabled in the learner's browser.<br>2. Learner is authenticated in the extension (valid session token).<br>3. Learner is viewing a webpage whose text content is selectable. |
| **Postconditions:** | 1. A new card is created in the selected word set containing the term, definition, pronunciation, and the captured example sentence.<br>2. The card is synchronized to the learner's account and visible in the web app word set.<br>3. The extension popup shows a saved confirmation and returns to its idle state. |
| **Priority:** | High — the extension is a low-cost, high-frequency ingestion channel that feeds the core SRS loop. |
| **Frequency of Use:** | ~10–30 saves per active extension user per week; peak during evening reading sessions. [TBD-1] |
| **Normal Course of Events:** | 1. Learner selects a word on a webpage (double-click or drag-select).<br>2. System displays a floating Quizez icon next to the selection.<br>3. Learner clicks the floating icon.<br>4. System looks up the selected word and displays the extension popup with the dictionary entry: definition, pronunciation (IPA + audio), part of speech, and the source sentence captured from the page.<br>5. Learner reviews the entry and selects a target word set from the popup's word set dropdown.<br>6. Learner clicks the **Save to word set** button.<br>7. System creates a card with the term, definition, pronunciation, and captured example sentence in the selected word set.<br>8. System displays a confirmation "Saved to {word set name}" and closes the popup. |
| **Alternative Courses:** | **UC-EXT-01.AC.1: Reverse-translate a native-language word**<br>At step 4, if the selected text is in the learner's native language rather than the learning language:<br>4a. System detects the source language and displays the reverse-translation result (native word → learning-language equivalent) in the popup.<br>4b. Learner reviews the translated term → continue from step 5 of the Normal Course.<br><br>**UC-EXT-01.AC.2: Edit before saving**<br>At step 5, if the learner wants to adjust the card content:<br>5a. Learner clicks the **Edit** icon in the popup.<br>5b. System displays editable fields for term, definition, and example sentence.<br>5c. Learner modifies the fields and clicks **Apply**.<br>5d. System updates the popup preview with the edited content → continue from step 6 of the Normal Course.<br><br>**UC-EXT-01.AC.3: Save via extension toolbar button**<br>At step 1, if the learner prefers the toolbar instead of the floating icon:<br>1a. Learner selects the word on the page.<br>1b. Learner clicks the Quizez icon in the browser toolbar.<br>1c. System opens the extension popup pre-filled with the selected word → continue from step 4 of the Normal Course. |
| **Exceptions:** | **UC-EXT-01.EX.1: Learner not authenticated in the extension**<br>Trigger: At step 4, the extension has no valid session token (never signed in, or token expired).<br>Response: System displays the sign-in panel inside the popup with a **Sign in** button; the selected word is held in the popup state.<br>Final state: After successful sign-in the popup resumes at step 4 with the pending word; if the learner closes the popup without signing in, nothing is saved.<br><br>**UC-EXT-01.EX.2: No word set exists**<br>Trigger: At step 5, the learner's account contains no word sets, so the dropdown is empty.<br>Response: System displays an inline **Create new word set** field; the learner enters a name and confirms, and the system creates the set and selects it.<br>Final state: New word set is created; flow continues to step 6; if the learner cancels creation, nothing is saved.<br><br>**UC-EXT-01.EX.3: Duplicate word in the target set**<br>Trigger: At step 7, the selected word set already contains a card with the same term.<br>Response: System displays "This word is already in {word set name}" with options **Save anyway** (creates a duplicate) and **Cancel**.<br>Final state: On **Save anyway** a second card is created and the UC ends at step 8; on **Cancel** no card is created.<br><br>**UC-EXT-01.EX.4: Dictionary lookup fails**<br>Trigger: At step 4, the dictionary service returns no entry or times out.<br>Response: System displays "Couldn't look up this word" with a **Retry** button and a manual-entry option.<br>Final state: On retry success the flow resumes at step 4; otherwise the learner may enter a definition manually (AC.2) or abandon — nothing is saved.<br><br>**UC-EXT-01.EX.5: Sync failure while saving**<br>Trigger: At step 7, the network request to create the card fails (offline or server error).<br>Response: System queues the card locally in the extension, displays "Saved offline — will sync when you're back online", and retries in the background.<br>Final state: Card is stored in the extension's local outbox; it is synchronized to the word set on the next successful connection. |
| **Includes:** | UC-DICT-01: Look up and save word (dictionary lookup invoked at step 4). |
| **Special Requirements:** | **Performance**: Dictionary lookup result renders in the popup ≤ 1.5s after the learner clicks the floating icon.<br>**Security**: Extension session uses the same account token as the web app; token stored in browser extension storage, never in page context.<br>**Reliability**: Offline saves are queued locally and synced idempotently (no duplicate cards on retry).<br>**Usability**: Popup is keyboard-accessible and does not inject content into pages that block content scripts (e.g., browser internal pages). |
| **Assumptions:** | 1. The learner's browser supports the extension platform (Chrome/Edge Manifest V3).<br>2. Most target pages allow content-script access; restricted pages (chrome://, PDF viewer) are out of scope.<br>3. The captured example sentence is the DOM text surrounding the selection; no sentence is captured on pages where selection context is unavailable. |
| **Notes and Issues:** | [TBD-1] Real usage volume pending extension analytics — Owner: Product Owner \| Due: after beta \| Resolution: pending.<br>[TBD-2] Whether free tier caps extension saves per month (OpenQuiz reference: ~5 shadowing/lookup uses free) — premium introduces caps as its value prop \| Owner: Product Owner \| Due: before dev start \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Save words from any webpage" = verb + object, active voice |
| C2 | ✅ | Postcondition: card stored in word set — complete, meaningful result |
| C3 | ✅ | UC-EXT-01 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner), single goal |
| C5 | ✅ | "System" = Quizez extension + backend as one product boundary |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role |
| C7 | ✅ | WHY (unfamiliar word while reading) + WHAT (lookup & save) + OUTCOME (card in set) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (extension installed, session token, selectable text) |
| C10 | ✅ | Postconditions cover card creation, sync state, and UI confirmation |
| C11 | ✅ | Browser-support and DOM-capture beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Actor/System subjects alternate throughout |
| C14 | ✅ | No if/else/loop in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (word selection) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 5 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers auth failure, empty state, duplicate, lookup failure, offline sync |
| C19 | ✅ | Includes UC-DICT-01 — existing MVP UC |
| C20 | ✅ | Special Requirements are non-functional only |
