# UC-WSET-04: Delete Word Set

| **Use Case ID:** | UC-WSET-04 |
| ---: | :--- |
| **Use Case Name:** | Delete word set |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner, owner of the set). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a learner no longer needs a word set they own, the learner initiates deletion from the set detail page or the "Created" list, reviews the consequences in a confirmation dialog, and confirms. The UC ends when the set, all its cards, and the associated SRS learning state are permanently removed and the set is no longer accessible. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. The target word set exists and is owned by the learner.<br>3. Learner is viewing the word set detail page or their "Created" list. |
| **Postconditions:** | 1. The word set record and all its cards are permanently deleted.<br>2. All SRS state (due dates, ratings, review history) associated with the set's cards is deleted.<br>3. The set no longer appears in the learner's "Created" list or in public search results.<br>4. Any direct link to the set returns a not-found response.<br>5. The learner's study statistics no longer count the deleted set's cards. |
| **Priority:** | Medium — destructive but infrequent; required for data control and library hygiene. |
| **Frequency of Use:** | ~0–1 deletions per active learner per month; no pronounced peak. [TBD-1] |
| **Normal Course of Events:** | 1. Learner clicks the **Delete** option on a word set they own.<br>2. System verifies ownership and displays a confirmation dialog naming the set and stating that the set, its cards, and related learning progress will be permanently deleted.<br>3. Learner clicks the **Confirm delete** button.<br>4. System deletes the word set, all its cards, and the associated SRS state.<br>5. System removes the set from public search indexing.<br>6. System displays the learner's library with a deletion confirmation message. |
| **Alternative Courses:** | **UC-WSET-04.AC.1: Cancel at the confirmation dialog**<br>At step 3, if the learner decides not to delete:<br>3a. Learner clicks the **Cancel** button or dismisses the dialog.<br>3b. System closes the dialog without making any change → UC ends; the set remains intact.<br><br>**UC-WSET-04.AC.2: Delete from the "Created" list**<br>At step 1, if the learner is on the library list rather than the detail page:<br>1a. Learner opens the set's context menu in the "Created" list.<br>1b. Learner selects **Delete** → continue from step 2 of the Normal Course.<br><br>**UC-WSET-04.AC.3: Set referenced by a learning path — proceed anyway**<br>At step 2, if the set belongs to one or more learning paths:<br>2a. System extends the confirmation dialog with a warning listing the affected learning paths.<br>2b. Learner confirms deletion anyway → continue from step 3 of the Normal Course; the set is removed from those paths. |
| **Exceptions:** | **UC-WSET-04.EX.1: Permission denied — set owned by someone else**<br>Trigger: At step 2, the set's owner does not match the authenticated learner.<br>Response: System refuses the action and displays a permission-denied message.<br>Final state: Set unchanged; learner remains in read-only view.<br><br>**UC-WSET-04.EX.2: Set referenced by a learning path — learner cancels**<br>Trigger: At step 2b (AC.3), the learner sees the learning-path warning and clicks **Cancel**.<br>Response: System closes the dialog without deleting anything.<br>Final state: Set and its learning-path references remain intact.<br><br>**UC-WSET-04.EX.3: Deletion fails on the server**<br>Trigger: At step 4, the delete operation fails (e.g., transient storage error).<br>Response: System displays an error message, keeps the set intact, and offers a retry.<br>Final state: Set remains accessible; no partial deletion is committed.<br><br>**UC-WSET-04.EX.4: Set already deleted in another session**<br>Trigger: At step 4, the set no longer exists (deleted in another tab or device).<br>Response: System informs the learner the set was already removed and refreshes the library view.<br>Final state: No error state; library reflects current data. |
| **Includes:** | None. |
| **Special Requirements:** | **Performance**: Deletion completes ≤ 3s for sets up to 500 cards.<br>**Security**: Ownership verified server-side; deletion is irreversible and requires explicit confirmation.<br>**Reliability**: Deletion is atomic — set, cards, and SRS state are removed together or not at all.<br>**Compliance**: Deleted learner data is not retained beyond the backup-retention window. |
| **Assumptions:** | 1. Deletion is permanent; no undo/restore is offered in the MVP.<br>2. Removing a set from a learning path does not delete the path itself.<br>3. Saved copies of the set held by other learners are independent clones and are unaffected. |
| **Notes and Issues:** | [TBD-1] Deletion-frequency analytics pending — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-2] Whether a soft-delete/restore grace period is needed post-MVP — Owner: Product Owner \| Due: post-MVP review \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Delete word set" = verb + object, active voice |
| C2 | ✅ | Postcondition: set and SRS state gone — complete goal |
| C3 | ✅ | UC-WSET-04 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner/owner), single goal |
| C5 | ✅ | All steps refer to the Quizez web system only |
| C6 | ✅ | "Learner (registered self-learner, owner)" is a specific role |
| C7 | ✅ | WHY (set no longer needed) + WHAT (confirm & delete) + OUTCOME (permanent removal) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, ownership, page location) |
| C10 | ✅ | Postconditions cover set, cards, SRS state, search, stats |
| C11 | ✅ | Permanence and clone-independence placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Actor/System subjects alternate throughout |
| C14 | ✅ | No if/else/loop in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (click Delete) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 4 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers authorization, business-rule warning, server failure, concurrency |
| C19 | ✅ | No Includes — field correctly states None |
| C20 | ✅ | Special Requirements are non-functional only |
