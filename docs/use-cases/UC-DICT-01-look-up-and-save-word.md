## UC-DICT-01: Look up and save word

| **Use Case ID:** | UC-DICT-01 |
| ---: | :--- |
| **Use Case Name:** | Look up and save word |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner with an active session). **Secondary:** Dictionary Service (external dictionary/translation provider supplying definitions, IPA, and audio). |
| ---: | :--- |
| **Description:** | When a learner encounters a new word, the learner looks it up in the built-in dictionary to get pronunciation, part of speech, Vietnamese and English definitions, examples, and synonyms, then saves the result directly into a word set. The UC ends when a fully populated card is added to the chosen word set without the learner retyping the definition. |
| **Preconditions:** | 1. Learner is logged in to Quizez.<br>2. The Dictionary Service is reachable.<br>3. Learner owns or has saved at least 1 word set, OR is willing to create a new set inline during the save step. |
| **Postconditions:** | 1. A new card is added to the selected word set, populated with the looked-up term, definition, IPA pronunciation, part of speech, example, and synonyms.<br>2. The card is immediately available in all study modes and progress tracking for that set.<br>3. The word set's card count is incremented by 1. |
| **Priority:** | High — core ingestion shortcut; removes the biggest friction (manual definition entry) in building vocabulary sets. |
| **Frequency of Use:** | ~10-20 lookups per active learner per day during reading/study sessions; system-wide ~50,000 lookups/day at 10k registered learners; peak evenings 19:00-23:00 local time. |
| **Normal Course of Events:** | 1. Learner opens the **Look up word** popup from the navigation bar or a word-set screen.<br>2. System displays the lookup input with the search direction set to EN → VI.<br>3. Learner types an English word (e.g. "serendipity") and submits.<br>4. System queries the Dictionary Service for the word.<br>5. System displays the result: IPA pronunciation with audio playback, part of speech, Vietnamese and English definitions, example sentences with translations, synonyms, and related words.<br>6. Learner clicks **Add to set**.<br>7. System displays a picker listing the learner's word sets plus a **Create new set** option.<br>8. Learner selects a target word set and confirms.<br>9. System creates a card populated with the looked-up data and adds it to the selected set.<br>10. System displays a confirmation naming the target set and the updated card count. |
| **Alternative Courses:** | **UC-DICT-01.AC.1: Look up from highlighted text**<br>At step 1, if the learner triggers the lookup from highlighted text inside the app (e.g. a word in a definition or example):<br>1a. Learner selects the word and chooses **Look up** from the context action.<br>1b. System opens the lookup popup with the selected word pre-filled.<br>→ continue from step 4 of the Normal Course.<br><br>**UC-DICT-01.AC.2: Reverse lookup (VI → EN)**<br>At step 3, if the learner wants the English equivalent of a Vietnamese word:<br>3a. Learner switches the search direction to VI → EN.<br>3b. Learner types a Vietnamese word and submits.<br>3c. System displays a list of matching English words.<br>3d. Learner selects one English word.<br>→ continue from step 5 of the Normal Course with the selected word's full entry.<br><br>**UC-DICT-01.AC.3: Create a new set inline**<br>At step 8, if none of the existing sets fits:<br>8a. Learner clicks **Create new set**.<br>8b. System prompts for a set title.<br>8c. Learner enters a title and confirms.<br>8d. System creates the word set and selects it as the target.<br>→ continue from step 9 of the Normal Course. |
| **Exceptions:** | **UC-DICT-01.EX.1: Word not found**<br>Trigger: At step 5, the Dictionary Service returns no entry for the submitted text.<br>Response: System displays "No results found" with a spelling-check suggestion and near-match suggestions when available.<br>Final state: No card is created; the learner may edit the query and retry.<br><br>**UC-DICT-01.EX.2: No set selected**<br>Trigger: At step 8, the learner confirms without choosing a target set and without creating a new one.<br>Response: System displays "Choose a word set or create a new one" and keeps the picker open.<br>Final state: No card is created; the lookup result remains displayed.<br><br>**UC-DICT-01.EX.3: Duplicate word in target set**<br>Trigger: At step 9, the target set already contains a card with the same term.<br>Response: System warns "This word is already in the set" and offers **Add anyway** or **Cancel**.<br>Final state: On **Add anyway**, a duplicate card is created and the UC ends at step 10; on **Cancel**, no card is created and the learner returns to the picker.<br><br>**UC-DICT-01.EX.4: Dictionary Service unavailable**<br>Trigger: At step 4, the Dictionary Service times out or returns an error.<br>Response: System displays "Dictionary is temporarily unavailable" with a retry action.<br>Final state: No result and no card; the learner may retry or enter the card manually via UC-WSET-01. |
| **Includes:** | None. (Manual card creation when lookup fails is covered by UC-WSET-01; inline set creation in AC.3 reuses the title-only subset of that flow.) |
| **Special Requirements:** | **Performance**: Lookup results render ≤ 1.5s after submission under normal load.<br>**Usability**: Lookup popup is reachable from any screen; audio playback works on mobile and desktop browsers.<br>**Reliability**: A failed save must not lose the displayed lookup result — the learner can retry the save without re-querying.<br>**Security**: Lookup queries are sent over TLS; no learner-identifiable data is required by the Dictionary Service beyond the query term. |
| **Assumptions:** | 1. The Dictionary Service aggregates a free dictionary source (definitions, IPA, POS, examples) plus a translation provider for Vietnamese glosses.<br>2. Saved cards store the looked-up content as a snapshot — later dictionary changes do not alter existing cards.<br>3. Duplicate detection matches on the normalized term (case-insensitive, trimmed) within the target set only. |
| **Notes and Issues:** | [TBD-1] Which dictionary/translation providers are used in MVP (direct client calls vs backend proxy)? \| Owner: Product Team \| Due: 2026-09-25 \| Resolution: TBD — candidates: dictionaryapi.dev / freedictionaryapi.com + Google Translate or MyMemory fallback.<br>[TBD-2] Is there a free-tier lookup quota (OpenQuiz reference: ~5 AI lookups/month)? \| Owner: Product Team \| Due: 2026-09-25 \| Resolution: TBD — MVP assumes standard dictionary lookup is uncapped; AI-enriched lookup is out of MVP scope.<br>[NOTE] Audio pronunciation depends on TTS/audio availability from the provider; when audio is absent the IPA text still displays — not treated as an exception. |

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Look up and save word" = verb + object, active voice, no actor name. |
| C2 | ✅ | User-goal level: learner ends with a populated card in a set — passes coffee-break test. |
| C3 | ✅ | UC-DICT-01 unique in the UC register, matches UC-<module>-<seq>. |
| C4 | ✅ | Single primary actor (Learner); Dictionary Service is a labeled secondary actor. |
| C5 | ✅ | System boundary is Quizez; the Dictionary Service is external and labeled secondary. |
| C6 | ✅ | Actor is a specific role: registered self-learner. |
| C7 | ✅ | Description covers WHY (new word encountered), WHAT (lookup + save), OUTCOME (populated card added). |
| C8 | ✅ | Quantified: ~10-20/learner/day, ~50,000/day system-wide, evening peak. |
| C9 | ✅ | Preconditions verifiable: login state, service health, set existence or inline-create intent. |
| C10 | ✅ | Postconditions cover data state (card created), study availability, and set card count. |
| C11 | ✅ | Preconditions are checkable; provider choice and snapshot semantics sit in Assumptions. |
| C12 | ✅ | Numbered steps, one action each; submit and validation are separate steps. |
| C13 | ✅ | Alternates Learner/System subjects throughout the dialog. |
| C14 | ✅ | No if/else/loops in Normal Course; branches in AC.1-AC.3, failures in EX.1-EX.4. |
| C15 | ✅ | Step 1 = trigger (open lookup); step 10 achieves the postcondition (card added, confirmation shown). |
| C16 | ✅ | Each AC cites its step, condition, lettered sub-steps, and rejoin point. |
| C17 | ✅ | Each EX has trigger + response + final state. |
| C18 | ✅ | Covers validation (EX.2), not-found (EX.1), business rule (EX.3), external service failure (EX.4). |
| C19 | ✅ | Includes = None; related UC-WSET-01 referenced by ID where relevant. |
| C20 | ✅ | Special Requirements are non-functional only (performance, usability, reliability, security). |
