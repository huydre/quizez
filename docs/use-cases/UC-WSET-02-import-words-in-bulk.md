# UC-WSET-02: Import Words in Bulk

| **Use Case ID:** | UC-WSET-02 |
| ---: | :--- |
| **Use Case Name:** | Import words in bulk |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a learner already has a vocabulary list in Word, Excel, or Google Docs, the learner opens the Import dialog inside the Create/Edit Word Set page, pastes the list, configures the term–definition delimiter and the row delimiter, reviews a parsed preview, and confirms. The UC ends when all valid parsed rows are appended as cards to the word set being edited. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. Learner has a word set open in the Create or Edit form.<br>3. Learner has source text copied to the clipboard from an external document. |
| **Postconditions:** | 1. One card is created per valid parsed row and appended to the current card list.<br>2. Each imported card has a non-empty term and definition mapped to the correct columns.<br>3. The card list reflects the imported cards in the order of the source rows.<br>4. No set is persisted until the learner saves the parent form (see UC-WSET-01 / UC-WSET-03). |
| **Priority:** | High — primary migration path for learners bringing existing lists (e.g., from Quizlet/Anki-style sources). |
| **Frequency of Use:** | ~1–2 imports per active learner per month; peak during onboarding of new learners migrating existing lists. [TBD-1] |
| **Normal Course of Events:** | 1. Learner clicks the **Import** button in the word set form.<br>2. System displays the Import dialog with a paste area, a term–definition delimiter selector (default: Tab), and a row delimiter selector (default: New line).<br>3. Learner pastes the copied text into the paste area.<br>4. Learner confirms or adjusts the delimiter settings.<br>5. Learner clicks the **Preview** button.<br>6. System parses the text into rows and splits each row into term and definition using the selected delimiters.<br>7. System displays a preview table of parsed cards with row numbers.<br>8. Learner reviews the preview and clicks the **Import** button.<br>9. System appends all valid parsed cards to the word set's card list.<br>10. System closes the dialog and displays the updated card list with an import summary (number of cards added). |
| **Alternative Courses:** | **UC-WSET-02.AC.1: Import from a file (CSV or Anki package)**<br>At step 3, if the learner has a file instead of clipboard text:<br>3a. Learner clicks the **Upload file** option.<br>3b. Learner selects a `.csv` or `.apkg` (Anki deck package) file from the device.<br>3c. For `.csv`, system reads the file content into the paste area → continue from step 4 of the Normal Course.<br>3d. For `.apkg`, system extracts the deck's notes and maps each note's fields to term and definition → continue from step 7 of the Normal Course (preview shows parsed cards directly).<br><br>**UC-WSET-02.AC.2: Custom delimiters**<br>At step 4, if the source data uses non-default separators (e.g., comma between term and definition, semicolon between cards):<br>4a. Learner selects the matching term–definition delimiter and row delimiter, or enters a custom character.<br>4b. System re-parses the preview using the new delimiters → continue from step 7 of the Normal Course.<br><br>**UC-WSET-02.AC.3: Skip invalid rows**<br>At step 8, if the preview marks some rows as invalid (missing a column):<br>8a. Learner confirms import with the **Skip invalid rows** option enabled.<br>8b. System imports only the valid rows → continue from step 9 of the Normal Course. |
| **Exceptions:** | **UC-WSET-02.EX.1: Empty paste area**<br>Trigger: At step 5, the learner clicks **Preview** with no text pasted.<br>Response: System displays "Nothing to import — paste your word list first" and does not parse.<br>Final state: Dialog remains open; no cards added.<br><br>**UC-WSET-02.EX.2: Unparseable lines**<br>Trigger: At step 6, one or more rows cannot be split into term + definition with the selected delimiters.<br>Response: System marks each failing row in the preview with its line number and the reason (e.g., "missing definition"), and excludes them from the import count.<br>Final state: Learner may fix the text and re-preview, or proceed via AC.3 (skip invalid rows); no partial silent import occurs.<br><br>**UC-WSET-02.EX.3: Card limit exceeded**<br>Trigger: At step 9, the number of valid rows plus existing cards exceeds the per-set card limit.<br>Response: System displays the limit, imports only up to the remaining capacity (or refuses, per product decision), and reports how many rows were not imported.<br>Final state: Card list contains up to the limit; learner is informed of the truncated rows.<br><br>**UC-WSET-02.EX.4: Unsupported file type**<br>Trigger: At step 3b (AC.1), the learner selects a non-CSV file.<br>Response: System rejects the file and displays the accepted format (`.csv`, UTF-8).<br>Final state: Paste area unchanged; learner may retry with a valid file. |
| **Includes:** | None. |
| **Special Requirements:** | **Performance**: Parsing and preview of 1,000 rows completes ≤ 2s client-side.<br>**Security**: File upload restricted to `.csv` and `.apkg` (max 25 MB); content sanitized before rendering in the preview.<br>**Reliability**: Preview is deterministic — same input + delimiters always yields the same parse.<br>**Compliance**: None beyond general content policy. |
| **Assumptions:** | 1. Source documents use a consistent two-column structure (term, definition).<br>2. Pasted text is UTF-8 encoded.<br>3. Imported cards carry only term + definition; optional fields are added later via UC-WSET-03. |
| **Notes and Issues:** | [TBD-1] Per-set card limit and free-tier import cap — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-2] Anki `.apkg` import — RESOLVED 2026-09-18: in MVP scope (see AC.1). Quizlet native export is covered by paste import (configurable delimiters). \| Owner: Product Owner \| Resolution: resolved |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Import words in bulk" = verb + object, active voice |
| C2 | ✅ | Postcondition: cards appended — a complete, meaningful result |
| C3 | ✅ | UC-WSET-02 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner), single goal |
| C5 | ✅ | All steps refer to the Quizez web system only |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role |
| C7 | ✅ | WHY (existing list) + WHAT (paste & parse) + OUTCOME (cards appended) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, open form, clipboard content) |
| C10 | ✅ | Postconditions cover card creation, ordering, and persistence boundary |
| C11 | ✅ | Source-format beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Actor/System subjects alternate throughout |
| C14 | ✅ | No if/else/loop in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (click Import) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 4 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers empty input, parse errors, limit violation, bad file type |
| C19 | ✅ | No Includes — field correctly states None |
| C20 | ✅ | Special Requirements are non-functional only |
