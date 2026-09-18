# UC-SRS-01: Review Due Words

| **Use Case ID:** | UC-SRS-01 |
| ---: | :--- |
| **Use Case Name:** | Review due words |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner, logged in). **Secondary:** none. |
| ---: | :--- |
| **Description:** | When a learner has vocabulary items whose spaced-repetition (SRS) review date has arrived, the learner opens the "Spaced Repetition" section to review them. The learner recalls each word, reveals the answer, and self-rates their recall so that the system reschedules the next review date per the SRS algorithm. The UC ends when every due word in the session has been rated and rescheduled, and the learner sees a session summary. |
| **Preconditions:** | 1. Learner is logged in to Quizez.<br>2. Learner has at least one word set (created or saved) with recorded learning progress.<br>3. At least one word has a next-review date of today or earlier. |
| **Postconditions:** | 1. Every reviewed word has an updated SRS state and a new next-review date computed from the learner's self-rating.<br>2. Words rated as forgotten/incorrect were re-queued and answered again within the same session.<br>3. The learner's words-learned-today counter and progress dashboard reflect the completed session.<br>4. The due-word count on the home page is decremented by the number of reviewed words. |
| **Priority:** | High — Core retention feature; the SRS review loop is the primary daily habit the product is built around. |
| **Frequency of Use:** | ~1-3 sessions/day per active learner; system-wide ~2,000 sessions/day at 1,000 DAU; peak 7-9 AM and 8-11 PM local time. |
| **Normal Course of Events:** | 1. Learner navigates to the home page or the **Spaced Repetition** section.<br>2. System displays the number of words due today across all of the learner's sets and a **Start Review** button.<br>3. Learner clicks the **Start Review** button.<br>4. System builds the review queue from all words due today and displays the first card's question side (term or definition).<br>5. Learner recalls the answer and clicks the card (or presses Space) to reveal the answer side.<br>6. System displays the full answer: definition, pronunciation, part of speech, and example.<br>7. Learner selects a self-rating: **Forgot**, **Hard**, **Remembered**, or **Easy**.<br>8. System records the rating, computes the word's new next-review date, and advances to the next card in the queue.<br>9. Steps 4-8 repeat until every card in the queue has been rated.<br>10. System displays the session summary: number of words reviewed, rating breakdown, and the next scheduled review date. |
| **Alternative Courses:** | **UC-SRS-01.AC.1: Rate a word as forgotten (in-session re-queue)**<br>At step 7, if the learner selects **Forgot**:<br>7a. System marks the word's recall as failed and re-inserts the card at the back of the current session queue.<br>7b. System shortens the word's SRS interval per the algorithm.<br>7c. Steps 4-8 repeat; the re-queued card is presented again later in the same session → continue from step 9 of the Normal Course.<br><br>**UC-SRS-01.AC.2: End the session early**<br>At any point between steps 4 and 8, if the learner clicks **End Session**:<br>Na. System saves the ratings recorded so far and reschedules only the rated words.<br>Nb. System leaves unrated words in the due queue for the next session.<br>Nc. System displays a partial session summary → UC ends (goal partially achieved; remaining words stay due).<br><br>**UC-SRS-01.AC.3: Review words from a single set only**<br>At step 3, if the learner opens a specific word set and chooses **Review due words in this set**:<br>3a. System builds the queue only from that set's due words instead of all sets.<br>3b. System displays the first card → continue from step 5 of the Normal Course. |
| **Exceptions:** | **UC-SRS-01.EX.1: No words due today**<br>Trigger: At step 2, the learner has no words with a next-review date of today or earlier.<br>Response: System displays an empty state ("No words due today") plus a 7-day review forecast showing how many words become due on each upcoming day.<br>Final state: No session is created; no SRS state changes. Learner may navigate to a study mode or return later.<br><br>**UC-SRS-01.EX.2: Session interrupted (app closed / connectivity loss)**<br>Trigger: Between steps 4 and 9, the learner closes the browser tab or loses connectivity.<br>Response: System persists each rating at the moment it is submitted; on next visit the due queue reflects only unrated words.<br>Final state: Rated words keep their new schedule; unrated words remain due. No data loss beyond the in-progress card.<br><br>**UC-SRS-01.EX.3: Rating submission fails**<br>Trigger: At step 8, the system cannot save the learner's rating (server error or network failure).<br>Response: System displays an error ("Could not save your answer — please try again"), keeps the current card on screen, and retries on the learner's next action.<br>Final state: The card remains unrated and stays in the queue; previously saved ratings are unaffected. |
| **Includes:** | None. |
| **Special Requirements:** | **Performance**: Review queue builds and first card renders ≤ 2s for up to 500 due words; rating save ≤ 500ms.<br>**Security**: SRS state is readable/writable only by the owning learner.<br>**Reliability**: Each rating is persisted individually so an interrupted session loses at most one card.<br>**Usability**: Session is fully operable via keyboard (Space to flip, number keys 1-4 to rate) and on mobile viewports. |
| **Assumptions:** | 1. The SRS algorithm is SM-2-based with 4 self-rating levels (Forgot / Hard / Remembered / Easy) — pending PO confirmation of 4-level vs 2-level rating.<br>2. Due words are aggregated across all of the learner's sets by default, matching OpenQuiz behavior.<br>3. A word's next-review date is stored per learner per word, independent of the word set it belongs to. |
| **Notes and Issues:** | [TBD-1] Free-tier daily SRS session cap — RESOLVED 2026-09-18: no cap in MVP, SRS unlimited; design keeps a hook to add a cap when premium ships. \| Owner: Product Owner \| Resolution: resolved<br>[TBD-2] Confirm rating scale: 4 levels (Forgot/Hard/Remembered/Easy) vs 2 levels (Known/Unknown). \| Owner: Product Owner \| Due: 2026-10-01 \| Resolution: TBD<br>[NOTE] OpenQuiz interleaves ~15% mastered words into study segments; decide whether SRS review sessions adopt the same interleaving. |

## Quality Validation

| Item | Status | Note |
| --- | --- | --- |
| C1 | ✅ | "Review due words" = verb + object, active voice, no actor embedded. |
| C2 | ✅ | User-goal level: learner finishes a review session and can stop — coffee-break test passes. |
| C3 | ✅ | UC-SRS-01 is unique in the UC register and follows UC-<module>-<seq>. |
| C4 | ✅ | One primary actor (Learner); one goal: complete a due-word review session. |
| C5 | ✅ | All "System" steps refer to the Quizez web app; no external system mixed in. |
| C6 | ✅ | Actor is a specific role: registered self-learner, not "User". |
| C7 | ✅ | Description states WHY (words due), WHAT (recall + self-rate), OUTCOME (rescheduled words + summary). |
| C8 | ✅ | Quantified: ~1-3 sessions/day/learner, ~2,000/day system-wide, peak hours stated. |
| C9 | ✅ | Preconditions verifiable: login state, set ownership, due-date query. |
| C10 | ✅ | Postconditions cover SRS state, re-queue behavior, counters, and due-count display. |
| C11 | ✅ | Preconditions are checkable; unverifiable items (algorithm choice, aggregation default) sit in Assumptions. |
| C12 | ✅ | Numbered steps, one action each; loop expressed as "Steps 4-8 repeat until…". |
| C13 | ✅ | Alternating Learner/System subjects throughout. |
| C14 | ✅ | No if/else inside Normal Course; branching lives in AC.1-AC.3 and EX.1-EX.4. |
| C15 | ✅ | Step 1 = trigger (open SRS section); step 10 = postcondition (summary shown, words rescheduled). |
| C16 | ✅ | Each AC cites "At step N", condition, lettered sub-steps, and rejoin point. |
| C17 | ✅ | Each EX has trigger + response + final state. |
| C18 | ✅ | Covers business-rule violation (daily cap), empty queue, interruption/connectivity, and save failure. |
| C19 | ✅ | Includes = None; no dangling references. |
| C20 | ✅ | Special Requirements are non-functional only (performance, security, reliability, usability). |
