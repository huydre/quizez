# UC-WSET-05: Save Public Word Set

| **Use Case ID:** | UC-WSET-05 |
| ---: | :--- |
| **Use Case Name:** | Save public word set |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a learner finds a public word set created by someone else that matches their study needs, the learner saves (clones) it into their own library instead of recreating the content. The UC ends when an independent copy of the set appears in the learner's "Saved" list and is immediately available for study. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. The target word set exists and its visibility is public.<br>3. Learner is viewing the public set's detail page or public search results. |
| **Postconditions:** | 1. An independent copy of the word set (all cards included) is created under the learner's account.<br>2. The copy appears in the learner's "Saved" list.<br>3. The copy is immediately openable in all study modes.<br>4. The original set and its owner are unaffected; later changes to the original do not propagate to the copy.<br>5. The set's save counter is incremented by 1. |
| **Priority:** | High — key viral/content-reuse loop; lets new learners start studying instantly. |
| **Frequency of Use:** | ~2–4 saves per active learner per month; peak during onboarding when learners stock their library. [TBD-1] |
| **Normal Course of Events:** | 1. Learner browses or searches the public content catalog.<br>2. System displays public word sets with title, card count, and author.<br>3. Learner opens a public word set.<br>4. System displays the set detail page in read-only mode with the full card list (term, definition, pronunciation, example).<br>5. Learner clicks the **Save** button.<br>6. System creates an independent copy of the set and all its cards under the learner's account.<br>7. System adds the copy to the learner's "Saved" list.<br>8. System displays a confirmation and offers to start studying the saved set. |
| **Alternative Courses:** | **UC-WSET-05.AC.1: Save directly from search results**<br>At step 3, if the learner decides to save without opening the detail page:<br>3a. Learner clicks the **Save** action on the set's card in the results list.<br>3b. System creates the copy → continue from step 7 of the Normal Course.<br><br>**UC-WSET-05.AC.2: Unsave a previously saved set**<br>At step 5, if the set is already in the learner's "Saved" list:<br>5a. System shows the action as **Unsave** instead of **Save**.<br>5b. Learner clicks **Unsave**.<br>5c. System asks whether to keep or delete the learning progress made on the saved copy.<br>5d. Learner confirms a choice → system removes the copy from the "Saved" list and applies the chosen progress handling → UC ends.<br><br>**UC-WSET-05.AC.3: Save a public learning path's member set**<br>At step 1, if the learner is browsing a public learning path:<br>1a. Learner opens a member word set from the path view.<br>1b. System displays the set detail page → continue from step 5 of the Normal Course. |
| **Exceptions:** | **UC-WSET-05.EX.1: Learner not logged in**<br>Trigger: At step 5, the visitor has no valid session (Guest).<br>Response: System redirects to the registration/login flow (UC-AUTH-01 / UC-AUTH-02) and returns the learner to the same set page after successful authentication.<br>Final state: After login, the learner lands back on the set and can complete the save; no copy is created for guests.<br><br>**UC-WSET-05.EX.2: Set made private after save**<br>Trigger: The owner switches the original set to private after the learner saved a copy.<br>Response: No action needed — the learner's copy is independent and remains fully usable.<br>Final state: Saved copy stays in the learner's "Saved" list and study modes; the original is no longer publicly discoverable.<br><br>**UC-WSET-05.EX.3: Set made private or deleted before save completes**<br>Trigger: At step 6, the original set is no longer public or no longer exists.<br>Response: System displays "This set is no longer available" and does not create a copy.<br>Final state: Learner returned to the catalog; no partial copy exists.<br><br>**UC-WSET-05.EX.4: Set already saved**<br>Trigger: At step 5, the learner clicks **Save** on a set already in their "Saved" list (e.g., stale page state).<br>Response: System recognizes the existing copy and treats the action as idempotent — no duplicate is created.<br>Final state: Exactly one copy remains in the "Saved" list. |
| **Includes:** | UC-AUTH-01: Register account (invoked at step 5 via EX.1 for unauthenticated visitors) |
| **Special Requirements:** | **Performance**: Save operation completes ≤ 2s for sets up to 500 cards.<br>**Security**: Only public sets can be saved; ownership check prevents saving one's own set as a "saved" copy (owner edits via UC-WSET-03 instead).<br>**Reliability**: Copy creation is atomic — either the full set with all cards is copied or nothing.<br>**Compliance**: Saved copies retain the original author's attribution where displayed. |
| **Assumptions:** | 1. Saved copies are independent clones, not live references to the original.<br>2. Guests can browse public sets (UC-AUTH-04) but must register to save.<br>3. A learner cannot save their own set. |
| **Notes and Issues:** | [TBD-1] Save-frequency analytics pending — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-2] Whether unsaving keeps or deletes progress by default (AC.2 choice UX) — Owner: Product Owner \| Due: before dev start \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Save public word set" = verb + object, active voice |
| C2 | ✅ | Postcondition: usable copy in library — complete goal |
| C3 | ✅ | UC-WSET-05 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner), single goal |
| C5 | ✅ | All steps refer to the Quizez web system only |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role |
| C7 | ✅ | WHY (reuse existing content) + WHAT (clone public set) + OUTCOME (copy in Saved list) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, set exists & public, page location) |
| C10 | ✅ | Postconditions cover copy creation, study availability, independence, counter |
| C11 | ✅ | Clone-semantics beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Actor/System subjects alternate throughout |
| C14 | ✅ | No if/else/loop in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (browse catalog) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 4 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers auth redirect, visibility race, availability race, idempotency |
| C19 | ✅ | Includes references UC-AUTH-01 (in register) |
| C20 | ✅ | Special Requirements are non-functional only |
