## UC-STUDY-02: Practice with Learn Mode

| **Use Case ID:** | UC-STUDY-02 |
| ---: | :--- |
| **Use Case Name:** | Practice with Learn mode |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a learner wants to actively memorize vocabulary rather than passively recognize it, the learner starts a Learn-mode session in which the system drills cards in segments of about 5 and requires the learner to type the correct answer. The UC ends when every card in the session has been answered correctly at least once, the system displays completion statistics, and per-card learning states are updated for progress tracking and spaced repetition. |
| **Preconditions:** | 1. Learner is logged in to Quizez.<br>2. Learner has access to at least one word set (self-created, saved, or public). |
| **Postconditions:** | 1. A study-session record is saved containing per-card results (correct on first attempt vs. re-answered).<br>2. Each drilled card's learning state (not studied / learning / mastered) is updated for SRS scheduling and progress tracking.<br>3. Session statistics (cards correct on first try, cards requiring re-answer, completion time) have been displayed to the learner.<br>4. Daily progress counters (words studied today, streak eligibility) reflect the completed session. |
| **Priority:** | High — core study mode; typed recall is the primary memorization driver and a key differentiator of the free tier. |
| **Frequency of Use:** | ~2–4 sessions/day per active learner; ~1,500 sessions/day system-wide at 500 DAU; peak 19:00–23:00 ICT. |
| **Normal Course of Events:** | 1. Learner opens a word set and selects the **Learn** study mode.<br>2. System builds the session queue by grouping the set's cards into segments of about 5 cards, ordered not-studied → learning → mastered.<br>3. System displays a question for the first card of the current segment, prompting the learner to type the answer.<br>4. Learner types an answer and submits it.<br>5. System evaluates the answer as correct, marks the card accordingly, and advances to the next question.<br>6. Steps 3–5 repeat until the learner has answered every card in the session correctly at least once.<br>7. System displays the session summary: number of cards correct on the first attempt, number of cards that required re-answering, and total completion time.<br>8. System saves the session results for progress tracking and SRS scheduling. |
| **Alternative Courses:** | **UC-STUDY-02.AC.1: Incorrect answer re-queued**<br>At step 5 of the Normal Course, if the submitted answer is incorrect:<br>5a. System displays the correct answer alongside the learner's input.<br>5b. System re-inserts the card into the queue of a later segment within the same session.<br>→ continue from step 6 of the Normal Course; the session completes only after the card is answered correctly.<br><br>**UC-STUDY-02.AC.2: Mastered cards injected as review**<br>At step 2 of the Normal Course, if more than 30% of the set's cards are already mastered:<br>2a. System injects about 15% of the mastered cards into the segments as review questions.<br>→ continue from step 3 of the Normal Course.<br><br>**UC-STUDY-02.AC.3: Restrict scope to selected cards**<br>At step 1 of the Normal Course, if the learner selects a scope such as "Starred only" or "Not studied only" before starting:<br>1a. System builds the session queue only from cards matching the selected scope.<br>→ continue from step 2 of the Normal Course. |
| **Exceptions:** | **UC-STUDY-02.EX.1: Selected word set is empty**<br>Trigger: At step 2, the selected word set contains 0 cards.<br>Response: System displays "This set has no cards yet" with actions to add words manually or import in bulk.<br>Final state: No session is created; the learner remains on the word-set detail screen.<br><br>**UC-STUDY-02.EX.2: All cards already mastered**<br>Trigger: At step 2, every card in the set is in the mastered state and the learner has not selected a broader scope.<br>Response: System displays "All cards in this set are mastered" and offers to start a review session over the mastered cards.<br>Final state: No new-learning session is created; if the learner accepts the review offer, the UC continues from step 2 with mastered cards in the queue.<br><br>**UC-STUDY-02.EX.3: Session interrupted**<br>Trigger: The learner closes the tab or navigates away before completing the session.<br>Response: System persists progress up to the last evaluated answer; when the learner reopens Learn mode on the same set, it offers **Resume session** or **Start over**.<br>Final state: Results recorded before the interruption are retained; resuming restores the segment position.<br><br>**UC-STUDY-02.EX.4: Authentication session expires mid-session**<br>Trigger: The learner's login session expires while a Learn session is in progress.<br>Response: System keeps the session running locally, prompts the learner to log in again, and syncs recorded results after re-authentication.<br>Final state: Results recorded up to the interruption are preserved; if the learner abandons, evaluated answers are saved on next successful sync. |
| **Includes:** | None — session results saved at step 8 are consumed by UC-SRS-01 (Review due words) and UC-SRS-02 (Track learning progress); see Notes. |
| **Special Requirements:** | **Performance**: Answer evaluation returns feedback within 300 ms; a set of up to 500 cards loads in ≤ 2 s.<br>**Usability**: Answer input is focused automatically; Enter submits; correct/incorrect feedback is visually distinct.<br>**Reliability**: Session progress is auto-saved after every evaluated answer, so an interruption loses at most one answer.<br>**Accessibility**: Questions and feedback are readable by screen readers; feedback does not rely on color alone. |
| **Assumptions:** | 1. Answer comparison tolerates case differences and surrounding whitespace; exact matching rules are a design decision.<br>2. The learner's browser supports local storage, which is used for session persistence.<br>3. Card learning states already exist from prior study activity or default to "not studied". |
| **Notes and Issues:** | [TBD-1] Free-tier daily study-session cap — RESOLVED 2026-09-18: no cap in MVP; design keeps a hook for a future premium cap. \| Owner: Product Team \| Resolution: resolved<br>[TBD-2] Confirm the answer-direction rule (term → definition, definition → term, or mixed) and whether the learner can configure it. \| Owner: Product Team \| Due: TBD \| Resolution: TBD<br>[NOTE] Session results feed UC-SRS-01 (due-word scheduling) and UC-SRS-02 (progress dashboard); no separate synchronization UC is required. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Practice with Learn mode" = verb + object, no actor name. |
| C2 | ✅ | User-goal level: learner completes a drill session and can stop — passes coffee-break test. |
| C3 | ✅ | UC-STUDY-02 is unique and follows UC-\<module\>-\<seq\>. |
| C4 | ✅ | One primary actor (Learner); single goal (master a set's cards via typed recall). |
| C5 | ✅ | All "System" steps refer to the Quizez web app; no secondary actor needed. |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role. |
| C7 | ✅ | Description states WHY (active memorization), WHAT (typed-answer drills in segments), OUTCOME (stats + recorded results). |
| C8 | ✅ | Quantified: ~2–4 sessions/day per learner, ~1,500/day system-wide, peak hours stated. |
| C9 | ✅ | Both preconditions are verifiable (auth state, set access). |
| C10 | ✅ | Postconditions cover session record, card states, displayed statistics, and progress counters. |
| C11 | ✅ | Preconditions are checkable; unverifiable items (matching rules, browser storage) sit in Assumptions. |
| C12 | ✅ | Numbered steps; one action per step; loop expressed as "Steps 3–5 repeat until…". |
| C13 | ✅ | Steps alternate Learner / System subjects. |
| C14 | ✅ | No if/else inside Normal Course; branches live in AC.1–AC.3. |
| C15 | ✅ | Step 1 matches the trigger; step 8 fulfills the postconditions. |
| C16 | ✅ | Each AC has ID, "At step N, if…", lettered sub-steps, and a rejoin instruction. |
| C17 | ✅ | Each of EX.1–EX.4 has trigger, response, and final state. |
| C18 | ✅ | Covers empty content, business-rule edge (all mastered), interruption, and auth expiry. |
| C19 | ✅ | Includes is explicitly "None"; referenced UCs (UC-SRS-01, UC-SRS-02) exist in the UC register. |
| C20 | ✅ | Special Requirements are non-functional only (performance, usability, reliability, accessibility). |
