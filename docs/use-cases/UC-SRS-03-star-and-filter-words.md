# UC-SRS-03: Star and Filter Words

| **Use Case ID:** | UC-SRS-03 |
| ---: | :--- |
| **Use Case Name:** | Star and filter words |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner, logged in). **Secondary:** none. |
| ---: | :--- |
| **Description:** | To focus study effort on the words that matter most, the learner marks important or difficult words with a star and filters the word list or a study session by starred status or mastery state. The system persists the star flag per learner per word and applies the chosen filter to both the displayed list and any study session started from it. The UC ends when the learner is viewing or studying exactly the filtered group of words. |
| **Preconditions:** | 1. Learner is logged in to Quizez.<br>2. Learner has at least one word set (created or saved) containing ≥ 1 word.<br>3. Learner is viewing a word set's detail page or is inside a study session for that set. |
| **Postconditions:** | 1. Starred/unstarred state of each toggled word is persisted for the learner across sessions and devices.<br>2. The displayed word list reflects the active filter (starred only, not started, learning, mastered, or all).<br>3. A study session started under an active filter contains only words matching that filter. |
| **Priority:** | Medium — High-value study aid that shapes session content, but study modes work without it. |
| **Frequency of Use:** | ~5-15 star toggles/day per active learner; filters applied in ~30% of study sessions; peak alongside evening study sessions. |
| **Normal Course of Events:** | 1. Learner opens a word set's detail page.<br>2. System displays the word list with each word's star icon and current mastery status.<br>3. Learner clicks the star icon on a word they consider important or difficult.<br>4. System toggles the word's starred state, updates the icon, and saves the flag to the learner's profile.<br>5. Learner opens the filter control and selects **Starred only**.<br>6. System re-renders the list showing only starred words and displays the active filter indicator.<br>7. Learner clicks **Study** and picks a study mode (Flashcard, Learn, Test, or Dictation).<br>8. System starts the session containing only the starred words. |
| **Alternative Courses:** | **UC-SRS-03.AC.1: Unstar a word**<br>At step 3, if the learner clicks the star icon on an already-starred word:<br>3a. System clears the starred flag, updates the icon, and saves the change.<br>3b. When the **Starred only** filter is active, the word disappears from the current list → continue from step 5 of the Normal Course.<br><br>**UC-SRS-03.AC.2: Filter by mastery status instead of star**<br>At step 5, if the learner selects a mastery filter (**Not started**, **Learning**, or **Mastered**) instead of **Starred only**:<br>5a. System re-renders the list showing only words in the selected mastery state.<br>5b. System displays the active filter indicator → continue from step 7 of the Normal Course.<br><br>**UC-SRS-03.AC.3: Star a word from inside a study session**<br>At step 3, if the learner is inside a study session (e.g. Flashcard) rather than on the detail page:<br>3a. Learner clicks the star icon on the current card.<br>3b. System saves the flag without interrupting the session.<br>3c. The card remains in the current session queue → UC ends for the starring action; the session continues unchanged. |
| **Exceptions:** | **UC-SRS-03.EX.1: Filter yields zero words**<br>Trigger: At step 6, no word in the set matches the selected filter (e.g. **Starred only** with no starred words).<br>Response: System displays an empty-state message ("No words match this filter") and disables the **Study** action for the filtered view.<br>Final state: No session is started; the learner can clear or change the filter. Word data is unchanged.<br><br>**UC-SRS-03.EX.2: Star flag fails to save**<br>Trigger: At step 4, the save request fails (server error or network failure).<br>Response: System reverts the icon to its previous state and shows a transient error ("Could not save — try again").<br>Final state: The word's starred state is unchanged; the learner may retry.<br><br>**UC-SRS-03.EX.3: Filtered set too small for the chosen study mode**<br>Trigger: At step 8, the filtered word count is below the mode's minimum (e.g. fewer than 4 words for a multiple-choice Test).<br>Response: System notifies the learner of the minimum and offers the modes that support the available count (e.g. fill-in only).<br>Final state: No session is started in the unsupported mode; the filter remains active and the learner may pick another mode. |
| **Includes:** | None. (Filtered sessions reuse UC-STUDY-01 through UC-STUDY-04 as entry points, but the filter is applied before those UCs begin.) |
| **Special Requirements:** | **Performance**: Star toggle persists ≤ 500ms; list re-filter renders ≤ 1s for sets up to 5,000 words.<br>**Security**: Star flags are per-learner data — never readable or writable by other learners, including on public sets.<br>**Reliability**: Star state survives logout, device change, and set edits; unstarring never deletes learning progress.<br>**Usability**: Star icon reachable in one tap on both list rows and study cards; active filter always visibly indicated. |
| **Assumptions:** | 1. Starred state is stored per learner per word, so starring a word in a saved public set does not affect the original author's copy.<br>2. Mastery states follow the three OpenQuiz buckets: not started, learning, mastered.<br>3. Filters apply to all four study modes and to the word list view; SRS review queue is governed by due dates, not by this filter. |
| **Notes and Issues:** | [TBD-1] Should filters combine (e.g. starred AND learning) or remain single-select? \| Owner: Product Owner \| Due: 2026-10-01 \| Resolution: TBD<br>[TBD-2] Does the starred flag sync to the SRS review queue ordering (starred-first option seen in OpenQuiz flashcard ordering)? \| Owner: Quizez BA \| Due: 2026-10-01 \| Resolution: TBD |

## Quality Validation

| Item | Status | Note |
| --- | --- | --- |
| C1 | ✅ | "Star and filter words" = verb + object, active voice. |
| C2 | ✅ | User-goal level: learner ends with a persisted star flag and a filtered view/session. |
| C3 | ✅ | UC-SRS-03 unique, follows naming convention. |
| C4 | ✅ | One primary actor (Learner); one goal: mark and focus on a subset of words. |
| C5 | ✅ | Single system boundary (Quizez web app). |
| C6 | ✅ | Specific actor role. |
| C7 | ✅ | WHY (focus effort), WHAT (star + filter), OUTCOME (filtered list/session) all present. |
| C8 | ✅ | Quantified: ~5-15 toggles/day/learner, filters in ~30% of sessions. |
| C9 | ✅ | Preconditions verifiable (login, set with ≥1 word, viewing context). |
| C10 | ✅ | Postconditions cover persisted flags, filtered list, and filtered session content. |
| C11 | ✅ | Per-learner storage and mastery buckets are Assumptions, not Preconditions. |
| C12 | ✅ | Numbered steps, one action each. |
| C13 | ✅ | Alternating Learner/System subjects. |
| C14 | ✅ | No embedded if/else; unstar, mastery filter, and in-session star live in ACs. |
| C15 | ✅ | Trigger (open set detail) → final step achieves postcondition (filtered session started). |
| C16 | ✅ | Each AC cites step number, condition, sub-steps, rejoin point. |
| C17 | ✅ | Each EX has trigger + response + final state. |
| C18 | ✅ | Covers empty filter result, save failure, and mode-minimum business rule — the relevant failure modes. |
| C19 | ✅ | Includes = None with explicit rationale; study-mode UCs referenced by ID only as entry points. |
| C20 | ✅ | Special Requirements non-functional only. |
