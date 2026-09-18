# UC-CLASS-04: Submit and Grade Classwork

| **Use Case ID:** | UC-CLASS-04 |
| ---: | :--- |
| **Use Case Name:** | Submit and grade classwork |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (class member completing assigned work). **Secondary:** Teacher (reviews results, grades written answers). |
| ---: | :--- |
| **Description:** | When a learner has a published assignment in a class, the learner completes the required study session or test before the due date, and the system records the submission and auto-scores objective work. The teacher then reviews the results dashboard and grades any written answers against a rubric. The UC ends when the learner can see the final score and the teacher's feedback. |
| **Preconditions:** | 1. Learner is authenticated and enrolled in the class.<br>2. A published assignment targeted at the learner exists and is still accepting submissions.<br>3. The assignment's backing content (word set/path) is available.<br>4. Teacher is authenticated and owns the class (for the grading portion). |
| **Postconditions:** | 1. A submission record exists linked to the assignment and learner, with status='Graded' (or 'Auto-graded' for fully objective work).<br>2. The submission has a final score and, where applicable, per-question results and teacher feedback.<br>3. The assignment's submission counter and the teacher's results dashboard reflect the submission.<br>4. The learner can view the score and feedback on the assignment detail page.<br>5. The learner's class grade summary is updated. |
| **Priority:** | High — closes the assign→submit→grade loop; the measurable outcome of the classroom module. |
| **Frequency of Use:** | ~1 submission per targeted learner per assignment; a 30-learner class with 5 assignments/week generates ~150 submissions/week. Grading review ~2–5 sessions per teacher per week. [TBD-1] |
| **Normal Course of Events:** | 1. Learner opens the class feed and selects a published assignment.<br>2. System displays the assignment detail: activity type, content, due date, and submission status.<br>3. Learner clicks **Start** and completes the required study session or test.<br>4. System records the submission with a timestamp and the session/test results.<br>5. System auto-scores the objective items and computes a provisional score.<br>6. System marks the submission 'Submitted' and updates the assignment's submission counter.<br>7. Teacher opens the assignment's results dashboard showing all targeted learners, submission status, and scores.<br>8. Teacher selects a submission containing written answers.<br>9. System displays the learner's written answers alongside the grading rubric.<br>10. Teacher scores each written answer per the rubric and enters optional feedback.<br>11. Teacher clicks **Save grade**.<br>12. System computes the final score (auto-scored items + teacher-scored items), sets the submission status to 'Graded', and notifies the learner.<br>13. Learner opens the assignment detail and views the final score and feedback. |
| **Alternative Courses:** | **UC-CLASS-04.AC.1: Fully objective assignment (no manual grading)**<br>At step 5, if the assignment contains only auto-scorable items (e.g., multiple-choice test, completion of a study mode):<br>5a. System sets the final score immediately and marks the submission 'Auto-graded' → continue from step 13 of the Normal Course (teacher review at steps 7–11 is optional, not required).<br><br>**UC-CLASS-04.AC.2: Teacher overrides the score**<br>At step 10, if the teacher disagrees with an auto-scored result:<br>10a. Teacher edits the item score or the total score and enters a justification in the feedback field.<br>10b. System records the override with the original and adjusted values → continue from step 11 of the Normal Course.<br><br>**UC-CLASS-04.AC.3: Learner resumes an in-progress attempt**<br>At step 3, if the learner previously started but did not finish the activity:<br>3a. System offers **Resume** and restores the saved progress.<br>3b. Learner completes the remaining work → continue from step 4 of the Normal Course. |
| **Exceptions:** | **UC-CLASS-04.EX.1: Late submission**<br>Trigger: At step 4, the submission timestamp is after the assignment's due date.<br>Response: System accepts the submission, flags it 'Late' with the overdue duration, and surfaces the flag on the teacher's dashboard and the learner's result.<br>Final state: Submission is recorded and graded normally; the 'Late' flag is permanent on the record (teachers may factor it into scoring per class policy).<br><br>**UC-CLASS-04.EX.2: Learner leaves or is removed before grading**<br>Trigger: At step 7–11, the learner is no longer on the class roster (left voluntarily or removed via UC-CLASS-01.AC.1).<br>Response: System keeps the submission accessible to the teacher, marked "Learner no longer in class," and allows grading to complete.<br>Final state: Grade is recorded and retained for the teacher's records; the departed learner loses access to the class feed and cannot view the feedback.<br><br>**UC-CLASS-04.EX.3: Auto-scoring failure**<br>Trigger: At step 5, the scoring routine fails (corrupt session data or service error).<br>Response: System marks the submission 'Scoring failed — needs review', alerts the teacher on the dashboard, and retries once automatically.<br>Final state: If retry succeeds, normal flow resumes at step 6. If not, the submission awaits manual teacher scoring (steps 8–11); the learner sees "Submission received — grading in progress."<br><br>**UC-CLASS-04.EX.4: Assignment content unavailable at start**<br>Trigger: At step 3, the backing word set/path has been deleted or made private (see UC-CLASS-03.EX.3).<br>Response: System displays "This assignment's content is no longer available" and blocks the attempt.<br>Final state: No submission created; the learner is directed back to the class feed; the assignment remains flagged for the teacher. |
| **Includes:** | UC-STUDY-03: Take a test (invoked at step 3 when the activity type is Test).<br>UC-STUDY-01/02/04: Study-mode session (invoked at step 3 when the activity type is Flashcards, Learn, or Dictation). |
| **Special Requirements:** | **Performance**: Auto-scoring completes ≤ 3s after submission; results dashboard for a 200-learner class loads ≤ 3s.<br>**Security**: Learners can view only their own submissions and scores; teachers can view only submissions within classes they own; score overrides are audit-logged (who, when, old/new value).<br>**Reliability**: In-progress attempts autosave so a dropped connection never loses work; submissions are recorded exactly once (idempotent submit).<br>**Compliance**: Grades and feedback are retained for the life of the class, including after learner removal (record-keeping). |
| **Assumptions:** | 1. Late submissions are accepted by default and flagged — no hard cutoff in this phase (per OpenQuiz behavior; a hard-cutoff option is TBD).<br>2. Written-answer grading uses a simple per-item rubric (points + comment); AI-assisted grading is a later extension.<br>3. One attempt per assignment per learner in this phase; re-attempts require the teacher to reset the submission (TBD).<br>4. Study-mode assignments are "graded" as completion (done/not done) unless configured as a test. |
| **Notes and Issues:** | [TBD-1] Hard deadline option (reject submissions after due date) vs. always-accept-with-late-flag — Owner: Product Owner \| Due: before dev start \| Resolution: pending (current spec: accept + flag).<br>[TBD-2] Re-attempt policy and who can reset a submission — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-3] Whether AI auto-grading of written answers (OpenQuiz-style rubric grading) is in scope for this phase — Owner: Product Owner \| Due: before dev start \| Resolution: pending (spec assumes manual grading). |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Submit and grade classwork" = verb + object, active voice |
| C2 | ✅ | Postcondition: graded submission with visible score/feedback — complete loop |
| C3 | ✅ | UC-CLASS-04 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner); Teacher is a labeled secondary actor in the grading portion |
| C5 | ✅ | All steps refer to the Quizez system only |
| C6 | ✅ | "Learner (class member)" and "Teacher" are specific roles |
| C7 | ✅ | WHY (published assignment due) + WHAT (submit work, auto-score, teacher grades) + OUTCOME (final score + feedback visible) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, enrollment, assignment status, content availability) |
| C10 | ✅ | Postconditions cover submission record, score/feedback, dashboard, learner view, grade summary |
| C11 | ✅ | Late-policy, rubric, and attempt-count beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Learner/System/Teacher subjects each explicit; actor–system dialog preserved across the handoff |
| C14 | ✅ | No if/else/loop in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (open assignment) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 4 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers late submission, roster change mid-flow, scoring service failure, content unavailability |
| C19 | ✅ | Includes reference existing UCs (UC-STUDY-01/02/03/04) |
| C20 | ✅ | Special Requirements are non-functional only |
