# UC-WSET-01: Create Word Set Manually

| **Use Case ID:** | UC-WSET-01 |
| ---: | :--- |
| **Use Case Name:** | Create word set manually |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a learner wants to study a custom vocabulary list that does not yet exist in the system, the learner opens the Create Word Set page, enters the set metadata (title, description, visibility) and adds cards one by one with term, definition, and optional fields (pronunciation, part of speech, example, synonyms, image). The UC ends when the word set is saved, appears in the learner's "Created" list, and is immediately available for study. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. Learner is on the Create Word Set page.<br>3. System is reachable and the word-set service is available. |
| **Postconditions:** | 1. A new word set record is persisted with owner = the learner, title, description, and visibility (private by default).<br>2. All entered cards (term, definition, optional fields) are persisted and linked to the set.<br>3. The set appears in the learner's "Created" list.<br>4. The set is openable in all study modes (Flashcard, Learn, Test, Dictation).<br>5. If visibility = public, the set is discoverable in public search results. |
| **Priority:** | High — core content-creation path; every study UC depends on word sets existing. |
| **Frequency of Use:** | ~1–3 sets per active learner per week; peak at onboarding of new learners. [TBD-1] |
| **Normal Course of Events:** | 1. Learner clicks the **Create Word Set** button.<br>2. System displays the Create Word Set form with set metadata fields and an empty card list.<br>3. Learner enters the set title and an optional description.<br>4. Learner selects the visibility option (Private or Public).<br>5. Learner enters the term and definition of the first card.<br>6. Learner optionally enters pronunciation, part of speech, example, and synonyms (separated by `;`), and/or uploads an illustration image for the card.<br>7. Learner clicks **Add card** to append additional cards and repeats steps 5–6 for each card.<br>8. Learner clicks the **Create** button.<br>9. System validates that the title is non-empty and that at least 2 cards each have a non-empty term and definition.<br>10. System saves the word set and all its cards.<br>11. System displays the word set detail page with a success confirmation. |
| **Alternative Courses:** | **UC-WSET-01.AC.1: Import cards in bulk instead of typing**<br>At step 5, if the learner prefers to paste an existing list:<br>5a. Learner clicks the **Import** button.<br>5b. System invokes UC-WSET-02 (Import words in bulk).<br>5c. Imported cards are appended to the card list → continue from step 8 of the Normal Course.<br><br>**UC-WSET-01.AC.2: Add a card via dictionary lookup**<br>At step 5, if the learner wants dictionary-assisted entry:<br>5a. Learner types a term and opens the dictionary suggestion.<br>5b. System invokes UC-DICT-01 (Look up and save word) to fetch pronunciation, part of speech, definitions, and examples.<br>5c. Learner accepts a suggested definition → system auto-fills the card fields → continue from step 7 of the Normal Course.<br><br>**UC-WSET-01.AC.3: Restore auto-saved draft**<br>At step 3, if a previously auto-saved draft exists for this learner:<br>3a. System restores the draft title, description, visibility, and partially entered cards into the form.<br>3b. Learner continues editing → continue from step 5 of the Normal Course. |
| **Exceptions:** | **UC-WSET-01.EX.1: Missing required fields on submit**<br>Trigger: At step 9, the title is empty, fewer than 2 cards exist, or a card lacks a term or definition.<br>Response: System highlights each invalid field inline, displays a validation message, and does not save the set.<br>Final state: Learner remains on the form with all entered data preserved.<br><br>**UC-WSET-01.EX.2: Duplicate term within the set**<br>Trigger: At step 9, two or more cards share the same term.<br>Response: System flags the duplicate cards and asks the learner to merge, edit, or remove them before saving.<br>Final state: Set is not saved until duplicates are resolved; entered data is preserved.<br><br>**UC-WSET-01.EX.3: Unsaved-changes navigation**<br>Trigger: Learner attempts to leave the page after entering content but before clicking **Create**.<br>Response: System auto-saves the draft locally and displays a confirmation prompt warning about unsaved changes.<br>Final state: If the learner confirms leaving, the draft is retained for restoration (AC.3); if the learner cancels, they remain on the form.<br><br>**UC-WSET-01.EX.4: Image upload failure**<br>Trigger: At step 6, the uploaded image exceeds the size limit or has an unsupported format.<br>Response: System rejects the file, displays the allowed formats/size, and keeps the rest of the card data.<br>Final state: Card remains editable without the image; learner may retry the upload. |
| **Includes:** | UC-WSET-02: Import words in bulk (invoked at step 5 via AC.1)<br>UC-DICT-01: Look up and save word (invoked at step 5 via AC.2) |
| **Special Requirements:** | **Performance**: Form renders ≤ 2s; saving a set of up to 500 cards completes ≤ 3s.<br>**Security**: Only the authenticated owner can create sets under their account; image uploads are scanned for type/size.<br>**Reliability**: Draft auto-save triggers on every field change (debounced); draft survives browser refresh.<br>**Compliance**: Uploaded images must respect content policy; public sets are subject to community guidelines. |
| **Assumptions:** | 1. Learner has a stable network connection during editing.<br>2. Learner understands the term/definition card concept (no guided tutorial required).<br>3. Minimum viable set = 2 cards (per US-05 AC1). |
| **Notes and Issues:** | [TBD-1] Exact per-learner set/card limits for the free tier — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-2] Max image size and allowed formats — Owner: Tech Lead \| Due: before dev start \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Create word set manually" = verb + object, active voice |
| C2 | ✅ | Postcondition: saved, studiable set — coffee-break worthy |
| C3 | ✅ | UC-WSET-01 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner), single goal |
| C5 | ✅ | All steps refer to the Quizez web system only |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role |
| C7 | ✅ | WHY (custom list needed) + WHAT (create set) + OUTCOME (saved, studiable) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session valid, page open, service up) |
| C10 | ✅ | Postconditions cover data, visibility, and study availability |
| C11 | ✅ | Network stability etc. placed in Assumptions, not Preconditions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Actor/System subjects alternate throughout |
| C14 | ✅ | No if/else/loop in Normal Course; branches moved to AC/EX |
| C15 | ✅ | Trigger (click Create Word Set) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 4 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers validation, duplicates, navigation loss, upload failure |
| C19 | ✅ | Includes reference UC-WSET-02 and UC-DICT-01 (both in register) |
| C20 | ✅ | Special Requirements are non-functional only |
