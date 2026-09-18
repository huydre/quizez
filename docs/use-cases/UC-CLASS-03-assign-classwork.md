# UC-CLASS-03: Assign Classwork

| **Use Case ID:** | UC-CLASS-03 |
| ---: | :--- |
| **Use Case Name:** | Assign classwork |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Teacher (educator managing classes). **Secondary:** Notification Service. |
| ---: | :--- |
| **Description:** | When a teacher wants learners in a class to practice or be tested on specific vocabulary, the teacher selects a word set or learning path, chooses a study mode or test type, sets a due date, targets the whole class or a subset of learners, and publishes the assignment. The UC ends when the assignment is published (or scheduled) and the targeted learners are notified. |
| **Preconditions:** | 1. Teacher is authenticated (valid session) and owns an active class.<br>2. The class has at least one enrolled learner.<br>3. At least one word set or learning path is available to assign (teacher-owned or public). |
| **Postconditions:** | 1. An assignment record exists with status='Published' (or 'Scheduled'), linked to the class, the selected content, the due date, and the target learner list.<br>2. The assignment appears in the class feed for every targeted learner.<br>3. A notification has been delivered to each targeted learner (in-app; push/email per learner settings).<br>4. The assignment appears in the teacher's assignment list with a submission counter starting at 0. |
| **Priority:** | High — core teacher workflow; the reason the classroom module exists. |
| **Frequency of Use:** | ~3–7 assignments per active class per week; peak Sunday evenings and weekday mornings. [TBD-1] |
| **Normal Course of Events:** | 1. Teacher opens the class management page and clicks **New assignment**.<br>2. System displays the assignment form with a content picker, an activity-type selector, a due-date field, and a learner selector.<br>3. Teacher selects a word set or learning path from the content picker.<br>4. Teacher selects the activity type (a study mode such as Flashcards, Learn, or Dictation; or a Test).<br>5. Teacher enters a due date and time (minute precision).<br>6. Teacher confirms the target learners (default: all enrolled learners).<br>7. Teacher clicks the **Publish** button.<br>8. System validates the assignment (content selected, activity type chosen, due date in the future, at least one target learner).<br>9. System creates the assignment with status='Published' and adds it to the class feed.<br>10. System invokes the Notification Service to notify each targeted learner.<br>11. System displays the assignment detail with a submission counter (0 of N submitted). |
| **Alternative Courses:** | **UC-CLASS-03.AC.1: Schedule for later**<br>At step 7, if the teacher wants the assignment to go live at a future time:<br>7a. Teacher sets a publish-at date/time and clicks **Schedule**.<br>7b. System creates the assignment with status='Scheduled', hidden from learners.<br>7c. When the publish-at time arrives, system sets status='Published', adds it to the class feed, and notifies targeted learners → the UC ends (equivalent of steps 9–10 deferred).<br><br>**UC-CLASS-03.AC.2: Assign to a subset of learners**<br>At step 6, if the assignment targets only some learners (e.g., a remedial group):<br>6a. Teacher deselects **All learners** and checks specific learners in the roster selector.<br>6b. System shows the selected count → continue from step 7 of the Normal Course.<br><br>**UC-CLASS-03.AC.3: Save as draft**<br>At step 7, if the teacher is not ready to publish:<br>7a. Teacher clicks **Save draft**.<br>7b. System stores the assignment with status='Draft', visible only to the teacher → the UC ends (no notification sent; publishing later re-enters this UC at step 7). |
| **Exceptions:** | **UC-CLASS-03.EX.1: No learners enrolled**<br>Trigger: At step 1, the class roster is empty.<br>Response: System displays "This class has no learners yet — share the join code first" and disables **New assignment**.<br>Final state: No assignment created; teacher is directed to the join code (UC-CLASS-01).<br><br>**UC-CLASS-03.EX.2: Due date in the past**<br>Trigger: At step 8, the entered due date/time is earlier than the current time.<br>Response: System displays "Due date must be in the future" next to the field and does not publish.<br>Final state: Form remains open with all entered values preserved; no assignment created.<br><br>**UC-CLASS-03.EX.3: Selected content deleted after assignment**<br>Trigger: After publication, the word set or learning path backing the assignment is deleted (by its owner) or made private.<br>Response: System marks the assignment "Content unavailable" in the class feed and teacher view, blocks new submissions, and notifies the teacher.<br>Final state: Existing submissions and grades are preserved; the assignment cannot accept new work until the teacher re-links content or cancels it.<br><br>**UC-CLASS-03.EX.4: Notification delivery failure**<br>Trigger: At step 10, the Notification Service fails or times out for some learners.<br>Response: System retries delivery asynchronously and logs undelivered recipients.<br>Final state: Assignment remains published and visible in the class feed (feed is the source of truth); learners with failed notifications still see the assignment on next visit. |
| **Includes:** | None. |
| **Special Requirements:** | **Performance**: Assignment publish completes ≤ 2s; notifications fan out asynchronously (≤ 60s for a 200-learner class).<br>**Security**: Only the owning teacher can create, schedule, or edit assignments; learners can only view assignments targeted at them.<br>**Reliability**: Scheduled publication survives service restarts (durable scheduler); notification failure never rolls back a published assignment.<br>**Usability**: Due-date picker uses the teacher's timezone and displays the learner-facing deadline in each learner's timezone. |
| **Assumptions:** | 1. Assignable activity types in this phase: Flashcards, Learn, Dictation, and Test (matching UC-STUDY-01/02/03/04); speaking/conversation assignments are a later extension.<br>2. Teachers can assign any public word set/path plus their own private content.<br>3. Editing a published assignment (due date, targets) is allowed and re-notifies affected learners — covered by the same form.<br>4. There is no limit on concurrent active assignments per class in this phase. |
| **Notes and Issues:** | [TBD-1] Whether assignments support attachments/instructions text beyond the activity config — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-2] Re-link flow when backing content is deleted (EX.3): pick a new set vs. cancel assignment — Owner: Product Owner \| Due: before dev start \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Assign classwork" = verb + object, active voice |
| C2 | ✅ | Postcondition: published assignment + notified learners — complete goal |
| C3 | ✅ | UC-CLASS-03 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Teacher); Notification Service is secondary |
| C5 | ✅ | All steps refer to the Quizez system; Notification Service is an external secondary actor |
| C6 | ✅ | "Teacher (educator managing classes)" is a specific role |
| C7 | ✅ | WHY (learners must practice/be tested) + WHAT (configure and publish assignment) + OUTCOME (published, notified) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, ownership, roster count, content availability) |
| C10 | ✅ | Postconditions cover assignment record, feed visibility, notifications, teacher counter |
| C11 | ✅ | Activity-type scope and content-visibility beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Teacher/System subjects alternate throughout |
| C14 | ✅ | No if/else/loop in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (click New assignment) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point or explicit end |
| C17 | ✅ | 4 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers business-rule violation (empty roster), validation error (past due date), content lifecycle, external service failure (notifications) |
| C19 | ✅ | No Includes — field correctly states None |
| C20 | ✅ | Special Requirements are non-functional only |
