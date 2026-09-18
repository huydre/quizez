## UC-STUDY-04: Practice Dictation

| **Use Case ID:** | UC-STUDY-04 |
| ---: | :--- |
| **Use Case Name:** | Practice dictation |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner). **Secondary:** TTS Service (generates the audio of each dictated term). |
| ---: | :--- |
| **Description:** | When a learner wants to train listening comprehension and spelling at the same time, the learner starts a Dictation session in which the system plays the audio of each term and the learner types exactly what they hear. The UC ends when every item in the session has been transcribed correctly at least once, the system displays a session summary, and per-card results are recorded for progress tracking and spaced repetition. |
| **Preconditions:** | 1. Learner is logged in to Quizez.<br>2. Learner has access to at least one word set (self-created, saved, or public). |
| **Postconditions:** | 1. A study-session record is saved containing per-item results (correct on first attempt vs. re-answered, hints used).<br>2. Each dictated card's learning state (not studied / learning / mastered) is updated for SRS scheduling and progress tracking.<br>3. The session summary (items correct on first try, items re-answered, hints used) has been displayed to the learner.<br>4. Daily progress counters (words studied today, streak eligibility) reflect the completed session. |
| **Priority:** | Medium — valuable listening/spelling drill but secondary to the core recall modes (Flashcards, Learn, Test). |
| **Frequency of Use:** | ~1 session/day per active learner; ~400 sessions/day system-wide at 500 DAU; peak 19:00–23:00 ICT. |
| **Normal Course of Events:** | 1. Learner opens a word set and selects the **Dictation** study mode.<br>2. System builds the session queue from the set's cards and loads the first item.<br>3. System plays the TTS audio of the item's term (or example sentence).<br>4. Learner types what they hear into the answer field and submits it.<br>5. System compares the input with the expected text, marks the item correct, and advances to the next item.<br>6. Steps 3–5 repeat until the learner has transcribed every item in the queue correctly at least once.<br>7. System displays the session summary: items correct on the first attempt, items that required re-answering, and hints used.<br>8. System saves the session results for progress tracking and SRS scheduling. |
| **Alternative Courses:** | **UC-STUDY-04.AC.1: Replay audio**<br>At step 4 of the Normal Course, if the learner clicks the replay button before submitting:<br>4a. System plays the item's audio again.<br>→ continue from step 4 of the Normal Course; replays are unlimited.<br><br>**UC-STUDY-04.AC.2: Request a hint**<br>At step 4 of the Normal Course, if the learner clicks **Hint**:<br>4a. System displays a hint such as the first letter and the character count of the expected text.<br>4b. System records that a hint was used for this item.<br>→ continue from step 4 of the Normal Course.<br><br>**UC-STUDY-04.AC.3: Reveal the answer**<br>At step 4 of the Normal Course, if the learner clicks **Reveal Answer**:<br>4a. System displays the correct text and marks the item as not passed.<br>4b. System re-inserts the item into the queue later in the same session.<br>→ continue from step 6 of the Normal Course.<br><br>**UC-STUDY-04.AC.4: Incorrect spelling re-queued**<br>At step 5 of the Normal Course, if the submitted text does not match the expected text:<br>5a. System displays the correct answer with the differing characters highlighted.<br>5b. System re-inserts the item into the queue later in the same session.<br>→ continue from step 6 of the Normal Course; the session completes only after the item is transcribed correctly. |
| **Exceptions:** | **UC-STUDY-04.EX.1: Audio load failure**<br>Trigger: At step 3, the TTS Service fails to return audio or playback fails.<br>Response: System shows an "Audio unavailable" error on the item and offers **Retry** or **Skip item**.<br>Final state: On retry success the session continues normally; on skip, the item is excluded from the session and marked as not attempted in the results.<br><br>**UC-STUDY-04.EX.2: Selected word set is empty**<br>Trigger: At step 2, the selected word set contains 0 cards.<br>Response: System displays "This set has no cards yet" with actions to add words manually or import in bulk.<br>Final state: No session is created; the learner remains on the word-set detail screen.<br><br>**UC-STUDY-04.EX.3: Session interrupted**<br>Trigger: The learner closes the tab or navigates away before completing the session.<br>Response: System persists progress up to the last evaluated answer; when the learner reopens Dictation mode on the same set, it offers **Resume session** or **Start over**.<br>Final state: Results recorded before the interruption are retained; resuming restores the queue position.<br><br>**UC-STUDY-04.EX.4: Authentication session expires mid-session**<br>Trigger: The learner's login session expires while a Dictation session is in progress.<br>Response: System keeps the session running locally, prompts the learner to log in again, and syncs recorded results after re-authentication.<br>Final state: Results recorded up to the interruption are preserved; if the learner abandons, evaluated answers are saved on next successful sync. |
| **Includes:** | None — session results saved at step 8 are consumed by UC-SRS-01 (Review due words) and UC-SRS-02 (Track learning progress); see Notes. |
| **Special Requirements:** | **Performance**: Audio for each item starts playing within 1 s of the item loading; answer evaluation returns feedback within 300 ms.<br>**Reliability**: If the TTS Service is degraded, the session degrades gracefully per EX.1 without losing recorded progress.<br>**Usability**: The answer field is focused automatically after each playback; Enter submits; replay is reachable by keyboard shortcut.<br>**Accessibility**: Dictation is inherently audio-based; the UI provides a visible hint/reveal path so learners with hearing difficulties can still complete items. |
| **Assumptions:** | 1. TTS audio is available for English terms; coverage for other study languages may vary.<br>2. The learner's device has working audio output.<br>3. Spelling comparison tolerates case differences and surrounding whitespace; exact matching rules are a design decision.<br>4. The learner's browser supports local storage, which is used for session persistence. |
| **Notes and Issues:** | [TBD-1] Free-tier daily study-session cap — RESOLVED 2026-09-18: no cap in MVP; design keeps a hook for a future premium cap. \| Owner: Product Team \| Resolution: resolved<br>[TBD-2] Confirm whether dictation covers terms only or also example sentences, and whether playback speed options (slow/normal) are in MVP scope. \| Owner: Product Team \| Due: TBD \| Resolution: TBD<br>[NOTE] Session results feed UC-SRS-01 (due-word scheduling) and UC-SRS-02 (progress dashboard); no separate synchronization UC is required. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Practice dictation" = verb + object, no actor name. |
| C2 | ✅ | User-goal level: learner completes a dictation session and can stop — passes coffee-break test. |
| C3 | ✅ | UC-STUDY-04 is unique and follows UC-\<module\>-\<seq\>. |
| C4 | ✅ | One primary actor (Learner); single goal (transcribe a set's items by ear). |
| C5 | ✅ | All "System" steps refer to the Quizez web app; TTS Service is a labeled secondary actor. |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role. |
| C7 | ✅ | Description states WHY (listening + spelling), WHAT (hear audio, type exact text), OUTCOME (summary + recorded results). |
| C8 | ✅ | Quantified: ~1 session/day per learner, ~400/day system-wide, peak hours stated. |
| C9 | ✅ | Both preconditions are verifiable (auth state, set access). |
| C10 | ✅ | Postconditions cover session record, card states, displayed summary, and progress counters. |
| C11 | ✅ | Preconditions are checkable; unverifiable items (TTS coverage, audio hardware, matching rules) sit in Assumptions. |
| C12 | ✅ | Numbered steps; one action per step; loop expressed as "Steps 3–5 repeat until…". |
| C13 | ✅ | Steps alternate Learner / System subjects. |
| C14 | ✅ | No if/else inside Normal Course; branches live in AC.1–AC.4. |
| C15 | ✅ | Step 1 matches the trigger; step 8 fulfills the postconditions. |
| C16 | ✅ | Each AC has ID, "At step N, if…", lettered sub-steps, and a rejoin instruction. |
| C17 | ✅ | Each of EX.1–EX.4 has trigger, response, and final state. |
| C18 | ✅ | Covers external-service failure (TTS), empty content, interruption, and auth expiry. |
| C19 | ✅ | Includes is explicitly "None"; referenced UCs (UC-SRS-01, UC-SRS-02) exist in the UC register. |
| C20 | ✅ | Special Requirements are non-functional only (performance, reliability, usability, accessibility). |
