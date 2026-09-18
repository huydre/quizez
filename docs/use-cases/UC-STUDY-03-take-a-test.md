## UC-STUDY-03: Take a Test

| **Use Case ID:** | UC-STUDY-03 |
| ---: | :--- |
| **Use Case Name:** | Take a test |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a learner wants an objective measure of how well they have memorized a word set, the learner configures and takes an auto-generated test built from the set's cards. The UC ends when the learner submits the test, the system grades it, and a results screen shows the score with a per-question review and the option to retry only the wrong questions. |
| **Preconditions:** | 1. Learner is logged in to Quizez.<br>2. Learner has access to at least one word set (self-created, saved, or public). |
| **Postconditions:** | 1. A test-attempt record is saved containing the score and per-question correctness.<br>2. Each tested card's learning state (not studied / learning / mastered) is updated for SRS scheduling and progress tracking.<br>3. The results screen (score, correct/total, per-question review) has been displayed to the learner.<br>4. Daily progress counters (words studied today, streak eligibility) reflect the completed test. |
| **Priority:** | High — core study mode; the objective self-assessment learners rely on before real exams (IELTS/TOEIC/THPT). |
| **Frequency of Use:** | ~1–2 tests/day per active learner; ~800 tests/day system-wide at 500 DAU; peak 19:00–23:00 ICT and pre-exam weekends. |
| **Normal Course of Events:** | 1. Learner opens a word set and selects the **Test** study mode.<br>2. System displays the test configuration screen with the question count and the enabled question types (multiple choice, true/false, written).<br>3. Learner adjusts the configuration and clicks **Start Test**.<br>4. System generates the test questions from the set's cards, drawing multiple-choice distractors from other cards in the set.<br>5. System displays the first question.<br>6. Learner answers the question.<br>7. System records the answer and advances to the next question.<br>8. Steps 6–7 repeat until the learner has answered all questions.<br>9. Learner clicks **Submit Test**.<br>10. System grades the test and computes the score.<br>11. System displays the results screen: the score (correct/total) and a per-question review showing each wrong answer together with the correct answer.<br>12. System saves the test results for progress tracking and SRS scheduling. |
| **Alternative Courses:** | **UC-STUDY-03.AC.1: Retry wrong questions only**<br>At step 11 of the Normal Course, if the learner clicks **Retry Wrong Questions**:<br>11a. System generates a new test containing only the questions the learner answered incorrectly.<br>→ continue from step 5 of the Normal Course.<br><br>**UC-STUDY-03.AC.2: Restrict test scope**<br>At step 3 of the Normal Course, if the learner selects a scope such as "Starred only" or "Not studied only" in the configuration:<br>3a. System restricts the question pool to cards matching the selected scope.<br>→ continue from step 4 of the Normal Course.<br><br>**UC-STUDY-03.AC.3: Skip a question**<br>At step 6 of the Normal Course, if the learner clicks **Skip** instead of answering:<br>6a. System marks the question as unanswered and advances to the next question.<br>→ continue from step 7 of the Normal Course; unanswered questions are graded as incorrect at step 10. |
| **Exceptions:** | **UC-STUDY-03.EX.1: Set smaller than requested question count**<br>Trigger: At step 4, the configured question count exceeds the number of eligible cards in the set (or selected scope).<br>Response: System caps the question count at the number of eligible cards and notifies the learner of the adjusted count before starting.<br>Final state: The test proceeds with the adjusted question count; no questions are duplicated.<br><br>**UC-STUDY-03.EX.2: Too few cards for multiple choice**<br>Trigger: At step 4, the set (or selected scope) contains fewer than 4 cards, so 3 distractors cannot be drawn.<br>Response: System disables the multiple-choice and true/false types, notifies the learner that at least 4 cards are required for those types, and generates written questions only.<br>Final state: The test proceeds with written questions only; if the learner selected only multiple choice, the test cannot start and the learner returns to the configuration screen.<br><br>**UC-STUDY-03.EX.3: Test abandoned mid-way**<br>Trigger: The learner closes the tab or navigates away after starting but before submitting.<br>Response: System discards the in-progress attempt; answers given are not graded and no attempt record is created.<br>Final state: No test-attempt record exists; card learning states are unchanged; the learner may start a new test.<br><br>**UC-STUDY-03.EX.4: Selected word set is empty**<br>Trigger: At step 2, the selected word set contains 0 cards.<br>Response: System displays "This set has no cards yet" with actions to add words manually or import in bulk.<br>Final state: No test is generated; the learner remains on the word-set detail screen. |
| **Includes:** | None — test results saved at step 12 are consumed by UC-SRS-01 (Review due words) and UC-SRS-02 (Track learning progress); see Notes. |
| **Special Requirements:** | **Performance**: Test generation for a set of up to 500 cards completes in ≤ 2 s; grading returns results within 1 s.<br>**Usability**: Questions are navigable by keyboard; the results screen clearly separates correct and wrong answers.<br>**Reliability**: Grading is deterministic — the same submitted answers always produce the same score.<br>**Fairness**: Distractors are drawn only from cards inside the tested set (or selected scope), never from external content. |
| **Assumptions:** | 1. Written answers are compared with tolerance for case differences and surrounding whitespace; exact matching rules are a design decision.<br>2. The default question count and default enabled types are sensible for the set size; learners can change both.<br>3. Card learning states already exist from prior study activity or default to "not studied". |
| **Notes and Issues:** | [TBD-1] Free-tier daily study-session cap — RESOLVED 2026-09-18: no cap in MVP; design keeps a hook for a future premium cap. \| Owner: Product Team \| Resolution: resolved<br>[TBD-2] Confirm the default question count (OpenQuiz-style: all cards vs. a fixed number such as 20) and whether true/false questions are in MVP scope. \| Owner: Product Team \| Due: TBD \| Resolution: TBD<br>[NOTE] Test results feed UC-SRS-01 (due-word scheduling) and UC-SRS-02 (progress dashboard); no separate synchronization UC is required. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Take a test" = verb + object, no actor name. |
| C2 | ✅ | User-goal level: learner completes a graded test and can stop — passes coffee-break test. |
| C3 | ✅ | UC-STUDY-03 is unique and follows UC-\<module\>-\<seq\>. |
| C4 | ✅ | One primary actor (Learner); single goal (measure recall via a graded test). |
| C5 | ✅ | All "System" steps refer to the Quizez web app; no secondary actor needed. |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role. |
| C7 | ✅ | Description states WHY (objective self-assessment), WHAT (configure and take an auto-generated test), OUTCOME (graded results with review). |
| C8 | ✅ | Quantified: ~1–2 tests/day per learner, ~800/day system-wide, peak stated. |
| C9 | ✅ | Both preconditions are verifiable (auth state, set access). |
| C10 | ✅ | Postconditions cover attempt record, card states, displayed results, and progress counters. |
| C11 | ✅ | Preconditions are checkable; unverifiable items (matching rules, defaults) sit in Assumptions. |
| C12 | ✅ | Numbered steps; one action per step; loop expressed as "Steps 6–7 repeat until…". |
| C13 | ✅ | Steps alternate Learner / System subjects. |
| C14 | ✅ | No if/else inside Normal Course; branches live in AC.1–AC.3. |
| C15 | ✅ | Step 1 matches the trigger; step 12 fulfills the postconditions. |
| C16 | ✅ | Each AC has ID, "At step N, if…", lettered sub-steps, and a rejoin instruction. |
| C17 | ✅ | Each of EX.1–EX.4 has trigger, response, and final state. |
| C18 | ✅ | Covers business-rule violations (count cap, <4 cards), abandonment, and empty content. |
| C19 | ✅ | Includes is explicitly "None"; referenced UCs (UC-SRS-01, UC-SRS-02) exist in the UC register. |
| C20 | ✅ | Special Requirements are non-functional only (performance, usability, reliability, fairness). |
