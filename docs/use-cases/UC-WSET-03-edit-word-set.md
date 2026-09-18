# UC-WSET-03: Edit Word Set

| **Use Case ID:** | UC-WSET-03 |
| ---: | :--- |
| **Use Case Name:** | Edit word set |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner, owner of the set). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a learner needs to correct or extend a word set they own, the learner opens the set in edit mode, modifies the title, description, or visibility, and adds, edits, or removes cards. The UC ends when the changes are saved and reflected consistently across the set detail page and all study modes. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. The target word set exists and is owned by the learner.<br>3. Learner is viewing the word set detail page or their "Created" list. |
| **Postconditions:** | 1. The word set record reflects the updated title, description, and visibility.<br>2. Card additions, edits, and removals are persisted.<br>3. Updated content is shown correctly in the set detail page and in all study modes.<br>4. If visibility changed to public, the set becomes discoverable in public search; if changed to private, it is removed from public results.<br>5. SRS state of unchanged cards is preserved; removed cards lose their associated SRS state. |
| **Priority:** | High — sets are living content; editing is required to keep them correct and to control visibility. |
| **Frequency of Use:** | ~2–5 edits per active learner per week; peak shortly after set creation (fixing typos, adding cards). [TBD-1] |
| **Normal Course of Events:** | 1. Learner clicks the **Edit** button on a word set they own.<br>2. System verifies ownership and displays the Edit Word Set form pre-filled with the current title, description, visibility, and card list.<br>3. Learner modifies the title and/or description.<br>4. Learner changes the visibility option (Private or Public).<br>5. Learner edits the term, definition, or optional fields of an existing card.<br>6. Learner adds new cards or removes existing cards.<br>7. Learner clicks the **Save** button.<br>8. System validates that the title is non-empty and every remaining card has a non-empty term and definition.<br>9. System saves all changes to the word set.<br>10. System displays the updated word set detail page with a success confirmation. |
| **Alternative Courses:** | **UC-WSET-03.AC.1: Import additional cards in bulk**<br>At step 6, if the learner wants to append many cards at once:<br>6a. Learner clicks the **Import** button.<br>6b. System invokes UC-WSET-02 (Import words in bulk).<br>6c. Imported cards are appended to the card list → continue from step 7 of the Normal Course.<br><br>**UC-WSET-03.AC.2: Discard changes**<br>At step 7, if the learner decides not to keep the edits:<br>7a. Learner clicks the **Cancel** button.<br>7b. System discards all unsaved changes and returns to the word set detail page → UC ends; postconditions 1–4 do not apply.<br><br>**UC-WSET-03.AC.3: Reorder cards**<br>At step 6, if the learner wants to change card order:<br>6a. Learner drags a card to a new position in the list.<br>6b. System updates the displayed order → continue from step 7 of the Normal Course. |
| **Exceptions:** | **UC-WSET-03.EX.1: Permission denied — set owned by someone else**<br>Trigger: At step 2, the set's owner does not match the authenticated learner (e.g., direct URL access to another learner's public set).<br>Response: System refuses edit mode, displays a permission-denied message, and offers only the **Save a copy** action (UC-WSET-05).<br>Final state: No changes made; learner remains in read-only view.<br><br>**UC-WSET-03.EX.2: Validation failure on save**<br>Trigger: At step 8, the title is empty or a card lacks a term or definition.<br>Response: System highlights each invalid field inline and does not save.<br>Final state: Learner remains on the form with all edits preserved.<br><br>**UC-WSET-03.EX.3: Concurrent edit conflict**<br>Trigger: At step 9, the set was modified (e.g., in another tab or device) after the learner opened the edit form.<br>Response: System detects the version conflict, notifies the learner, and offers to reload the latest version or overwrite with their changes.<br>Final state: Either the learner's changes are applied after explicit confirmation, or the form reloads the newer version; no silent data loss.<br><br>**UC-WSET-03.EX.4: Unsaved-changes navigation**<br>Trigger: Learner attempts to leave the edit page with unsaved modifications.<br>Response: System displays a confirmation prompt warning about unsaved changes.<br>Final state: If confirmed, changes are discarded and the learner navigates away; if cancelled, the learner remains on the form. |
| **Includes:** | UC-WSET-02: Import words in bulk (invoked at step 6 via AC.1) |
| **Special Requirements:** | **Performance**: Edit form loads ≤ 2s for sets up to 500 cards; save completes ≤ 3s.<br>**Security**: Ownership is verified server-side on both form load and save; visibility changes take effect in search indexing within 60s.<br>**Reliability**: Concurrent-edit detection via record versioning; no partial saves.<br>**Compliance**: Public sets are subject to community content guidelines. |
| **Assumptions:** | 1. Learner edits one set at a time.<br>2. Removing a card that has SRS history is acceptable to the learner (its SRS state is dropped with the card).<br>3. Card order is meaningful for display but not required for study modes. |
| **Notes and Issues:** | [TBD-1] Edit-frequency analytics pending — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-2] Conflict-resolution UX (reload vs. overwrite vs. merge) — Owner: Tech Lead \| Due: before dev start \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Edit word set" = verb + object, active voice |
| C2 | ✅ | Postcondition: updated set reflected everywhere — complete goal |
| C3 | ✅ | UC-WSET-03 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner/owner), single goal |
| C5 | ✅ | All steps refer to the Quizez web system only |
| C6 | ✅ | "Learner (registered self-learner, owner)" is a specific role |
| C7 | ✅ | WHY (correct/extend set) + WHAT (edit metadata & cards) + OUTCOME (saved changes) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, ownership, page location) |
| C10 | ✅ | Postconditions cover data, visibility propagation, SRS impact |
| C11 | ✅ | Usage beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Actor/System subjects alternate throughout |
| C14 | ✅ | No if/else/loop in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (click Edit) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 4 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers authorization, validation, concurrency, navigation loss |
| C19 | ✅ | Includes references UC-WSET-02 (in register) |
| C20 | ✅ | Special Requirements are non-functional only |
