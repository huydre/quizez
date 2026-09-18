## UC-STUDY-01: Review Flashcards

| **Use Case ID:** | UC-STUDY-01 |
| ---: | :--- |
| **Use Case Name:** | Review flashcards |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner). **Secondary:** TTS Service (plays pronunciation audio on demand). |
| ---: | :--- |
| **Description:** | When a learner wants to memorize vocabulary through self-paced recall, the learner opens a word set in Flashcard mode to flip through two-sided cards (term ↔ definition) and self-assess each card as known or unknown. The UC ends when the learner finishes reviewing the card queue, the system displays a session summary, and per-card results are recorded for progress tracking and spaced repetition. |
| **Preconditions:** | 1. Learner is logged in to Quizez.<br>2. Learner has access to at least one word set (self-created, saved, or public). |
| **Postconditions:** | 1. A study-session record is saved containing per-card results (known / unknown marks).<br>2. Each reviewed card's learning state (not studied / learning / mastered) is updated for SRS scheduling and progress tracking.<br>3. The session summary (cards reviewed, known count, unknown count) has been displayed to the learner.<br>4. Daily progress counters (words studied today, streak eligibility) reflect the completed session. |
| **Priority:** | High — core study mode; the primary daily-use feature driving learner retention. |
| **Frequency of Use:** | ~3–5 sessions/day per active learner; ~2,000 sessions/day system-wide at 500 DAU; peak 19:00–23:00 ICT. |
| **Normal Course of Events:** | 1. Learner opens a word set and selects the **Flashcards** study mode.<br>2. System builds the card queue in the default order and displays the first card showing its term side, with a "Card 1 / N" counter.<br>3. Learner clicks the card (or presses Space) to flip it.<br>4. System reveals the definition side, including pronunciation, part of speech, and example sentence when available.<br>5. Learner marks the card as **Known** or **Unknown**.<br>6. System records the mark, updates the card's learning state, and advances to the next card.<br>7. Steps 3–6 repeat until the learner has reviewed all cards in the queue.<br>8. System displays the session summary: total cards reviewed, number marked Known, number marked Unknown.<br>9. System saves the session results for progress tracking and SRS scheduling. |
| **Alternative Courses:** | **UC-STUDY-01.AC.1: Play pronunciation audio**<br>At step 4 of the Normal Course, if the learner clicks the speaker icon:<br>4a. System requests the term's audio from the TTS Service.<br>4b. System plays the audio of the term (and of the example sentence when available).<br>→ continue from step 5 of the Normal Course.<br><br>**UC-STUDY-01.AC.2: Change card order or scope**<br>At step 1 of the Normal Course, if the learner selects a review order ("Not studied first" / "Learning first" / "Mastered first" / "Starred first") or a "Starred only" scope before starting:<br>1a. System builds the card queue according to the selected order and scope.<br>→ continue from step 2 of the Normal Course.<br><br>**UC-STUDY-01.AC.3: Navigate without marking**<br>At step 5 of the Normal Course, if the learner presses ← / → (or taps the navigation arrows) instead of marking the card:<br>5a. System moves to the previous or next card without recording a mark.<br>→ continue from step 3 of the Normal Course. |
| **Exceptions:** | **UC-STUDY-01.EX.1: Selected word set is empty**<br>Trigger: At step 2, the selected word set contains 0 cards.<br>Response: System displays "This set has no cards yet" with actions to add words manually or import in bulk.<br>Final state: No session is created; the learner remains on the word-set detail screen.<br><br>**UC-STUDY-01.EX.2: Session interrupted**<br>Trigger: The learner closes the tab or navigates away before completing the queue.<br>Response: System persists progress up to the last marked card; when the learner reopens Flashcard mode on the same set, it offers **Resume session** or **Start over**.<br>Final state: Marks recorded before the interruption are retained; resuming restores the learner's position in the queue.<br><br>**UC-STUDY-01.EX.3: Audio playback failure**<br>Trigger: At AC.1, the TTS Service fails to return audio or playback fails.<br>Response: System shows an "Audio unavailable" toast and keeps the card fully usable.<br>Final state: The session continues without audio; the card's result is unaffected.<br><br>**UC-STUDY-01.EX.4: Authentication session expires mid-session**<br>Trigger: The learner's login session expires while a flashcard session is in progress.<br>Response: System keeps the session running locally, prompts the learner to log in again, and syncs recorded results after re-authentication.<br>Final state: Results recorded up to the interruption are preserved; if the learner abandons, marks already made are saved on next successful sync. |
| **Includes:** | None — session results saved at step 9 are consumed by UC-SRS-01 (Review due words) and UC-SRS-02 (Track learning progress); see Notes. |
| **Special Requirements:** | **Performance**: Card flip and navigation respond within 100 ms; a set of up to 500 cards loads in ≤ 2 s.<br>**Usability**: Full keyboard operation (Space to flip, ← / → to navigate); touch targets ≥ 44 px on mobile.<br>**Reliability**: Session progress is auto-saved after every marked card, so an interruption loses at most one card.<br>**Accessibility**: Card content is readable by screen readers; audio playback is available for terms. |
| **Assumptions:** | 1. TTS audio is available for English terms; coverage for other study languages may vary.<br>2. The learner's browser supports local storage, which is used for session persistence.<br>3. Card learning states already exist from prior study activity or default to "not studied". |
| **Notes and Issues:** | [TBD-1] Free-tier daily study-session cap — RESOLVED 2026-09-18: no cap in MVP; design keeps a hook for a future premium cap. \| Owner: Product Team \| Resolution: resolved<br>[NOTE] Session results feed UC-SRS-01 (due-word scheduling) and UC-SRS-02 (progress dashboard); no separate synchronization UC is required. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Review flashcards" = verb + object, no actor name. |
| C2 | ✅ | User-goal level: learner completes a review session and can stop — passes coffee-break test. |
| C3 | ✅ | UC-STUDY-01 is unique and follows UC-\<module\>-\<seq\>. |
| C4 | ✅ | One primary actor (Learner); single goal (review a set's cards). |
| C5 | ✅ | All "System" steps refer to the Quizez web app; TTS Service is a labeled secondary actor. |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role. |
| C7 | ✅ | Description states WHY (self-paced recall), WHAT (flip and mark cards), OUTCOME (summary + recorded results). |
| C8 | ✅ | Quantified: ~3–5 sessions/day per learner, ~2,000/day system-wide, peak hours stated. |
| C9 | ✅ | Both preconditions are verifiable (auth state, set access). |
| C10 | ✅ | Postconditions cover session record, card states, displayed summary, and progress counters. |
| C11 | ✅ | Preconditions are checkable; unverifiable items (TTS coverage, browser storage) sit in Assumptions. |
| C12 | ✅ | Numbered steps; one action per step; loop expressed as "Steps 3–6 repeat until…". |
| C13 | ✅ | Steps alternate Learner / System subjects. |
| C14 | ✅ | No if/else inside Normal Course; branches live in AC.1–AC.3. |
| C15 | ✅ | Step 1 matches the trigger; step 9 fulfills the postconditions. |
| C16 | ✅ | Each AC has ID, "At step N, if…", lettered sub-steps, and a rejoin instruction. |
| C17 | ✅ | Each of EX.1–EX.4 has trigger, response, and final state. |
| C18 | ✅ | Covers empty content, interruption, external-service failure (TTS), and auth expiry. |
| C19 | ✅ | Includes is explicitly "None"; referenced UCs (UC-SRS-01, UC-SRS-02) exist in the UC register. |
| C20 | ✅ | Special Requirements are non-functional only (performance, usability, reliability, accessibility). |
