## UC-PATH-02: Study recommended path

| **Use Case ID:** | UC-PATH-02 |
| ---: | :--- |
| **Use Case Name:** | Study recommended path |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner with an active session). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a learner wants a structured curriculum without building one manually, the learner browses system-recommended learning paths matched to their goal (e.g. IELTS, TOEIC, THPT, communication), previews the contained word sets, and starts a study session. The UC ends when a study session is launched on the path's vocabulary and the learner's progress on that path is tracked. |
| **Preconditions:** | 1. Learner is logged in to Quizez.<br>2. At least 1 recommended learning path exists in the catalog (curated content, e.g. "IELTS Vocabulary" with its word sets).<br>3. Learner's profile may contain a target exam/level from onboarding (UC-AUTH-03) — used to rank recommendations but not required. |
| **Postconditions:** | 1. A study session is launched containing the selected vocabulary scope (whole path or one set).<br>2. The learner's progress on the recommended path is recorded (sets studied, words covered) and visible on the path detail screen.<br>3. The studied words enter the learner's progress/SRS tracking like words from any owned set. |
| **Priority:** | High — primary content-discovery and activation funnel; recommended paths convert onboarding goals into immediate study. |
| **Frequency of Use:** | ~3-5 sessions per active learner per week on recommended paths; system-wide ~5,000 path-study launches/day at 10k registered learners; peak evenings 19:00-23:00 local time. |
| **Normal Course of Events:** | 1. Learner opens the home page or the **Learning Paths** section.<br>2. System displays recommended learning paths ranked by the learner's profile goal, each showing title, number of word sets, total words, and author.<br>3. Learner selects a recommended path (e.g. "IELTS Vocabulary").<br>4. System displays the path detail screen: goal description, the ordered list of contained word sets with word counts, and the learner's progress on the path.<br>5. Learner clicks **Study all words in this path**.<br>6. System aggregates the vocabulary of all sets in the path into one study scope and displays the total word count.<br>7. Learner selects a study mode (Flashcards, Learn, Test, or Dictation).<br>8. System launches the study session via the corresponding study-mode use case and records the session against the path's progress. |
| **Alternative Courses:** | **UC-PATH-02.AC.1: Study a single set within the path**<br>At step 5, if the learner prefers to study one set instead of the whole path:<br>5a. Learner selects a specific word set from the path's set list.<br>5b. System opens that set's detail view with all study modes available.<br>5c. Learner selects a study mode.<br>→ continue from step 8 of the Normal Course; progress is recorded against both the set and the parent path.<br><br>**UC-PATH-02.AC.2: Save the recommended path to the learner's library**<br>At step 4, if the learner wants the path in their own library before studying:<br>4a. Learner clicks **Save** on the path detail screen.<br>4b. System adds the path to the learner's **Saved** list (per UC-WSET-05 save semantics).<br>→ continue from step 5 of the Normal Course.<br><br>**UC-PATH-02.AC.3: Browse paths outside the learner's goal**<br>At step 2, if the learner wants recommendations beyond their profile goal:<br>2a. Learner selects a different goal/category filter (e.g. TOEIC, Business English, A1-C2 Everyday).<br>2b. System refreshes the list with paths tagged to the selected category.<br>→ continue from step 3 of the Normal Course. |
| **Exceptions:** | **UC-PATH-02.EX.1: No recommended paths available**<br>Trigger: At step 2, the recommended-path catalog is empty or the content service returns nothing.<br>Response: System displays an empty state ("No recommended paths yet") and suggests creating a path (UC-PATH-01) or browsing public word sets.<br>Final state: No session is launched; learner remains on the paths screen.<br><br>**UC-PATH-02.EX.2: Path content unavailable at launch**<br>Trigger: At step 6, one or more sets in the path have been removed or made private since the detail screen loaded.<br>Response: System excludes the unavailable sets, displays "Some content in this path is no longer available", and shows the revised word count.<br>Final state: If vocabulary remains, the learner may continue from step 7; if the path is now empty, the session is not launched.<br><br>**UC-PATH-02.EX.3: Daily study-session cap reached**<br>Trigger: At step 8, the learner has reached the free-tier daily study-session limit.<br>Response: System displays a notice that the daily limit is reached and when it resets.<br>Final state: No session is launched; path progress is unchanged. (Cap value TBD — see Notes.)<br><br>**UC-PATH-02.EX.4: Session launch fails**<br>Trigger: At step 8, the study session cannot be created (network or service failure).<br>Response: System displays a retry option and keeps the learner on the path detail screen.<br>Final state: No session record and no progress change; learner may retry. |
| **Includes:** | UC-STUDY-01: Review flashcards (invoked at step 8 when Flashcards is selected).<br>UC-STUDY-02: Practice with Learn mode (invoked at step 8 when Learn is selected).<br>UC-STUDY-03: Take a test (invoked at step 8 when Test is selected).<br>UC-STUDY-04: Practice dictation (invoked at step 8 when Dictation is selected). |
| **Special Requirements:** | **Performance**: Recommended-path list loads ≤ 2s; path detail with up to 50 sets renders ≤ 2s.<br>**Personalization**: Ranking uses the learner's onboarding goal (target exam, level); learners without a goal see a default ordering by popularity.<br>**Usability**: Path detail shows per-set progress so the learner can resume where they stopped.<br>**Reliability**: Progress recording is idempotent — retrying a failed launch must not double-count studied words. |
| **Assumptions:** | 1. Recommended paths are curated by the Quizez content team and published as public paths; learners cannot edit them.<br>2. Studying a recommended path does not require saving it first; saving (AC.2) is optional.<br>3. "Study all words" deduplicates terms that appear in multiple sets of the same path. |
| **Notes and Issues:** | [TBD-1] Free-tier daily study-session cap — RESOLVED 2026-09-18: no cap in MVP; design keeps a hook for a future premium cap. \| Owner: Product Team \| Resolution: resolved — OpenQuiz reference is 6 SRS sessions/day; MVP cap to be confirmed.<br>[TBD-2] Does path progress require a completion criterion per set (e.g. all words "Learning" or better)? \| Owner: Quizez BA \| Due: 2026-09-25 \| Resolution: TBD — MVP tracks words studied per set.<br>[NOTE] Guest browsing of public paths before login is covered by UC-AUTH-04; this UC assumes an authenticated learner. |

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Study recommended path" = verb + object, active voice. |
| C2 | ✅ | User-goal level: learner ends in a launched study session with tracked progress. |
| C3 | ✅ | UC-PATH-02 unique, matches naming convention. |
| C4 | ✅ | Single primary actor (Learner); single goal (start studying a recommended path). |
| C5 | ✅ | One system boundary (Quizez); study modes delegated via Includes. |
| C6 | ✅ | Specific actor role: registered self-learner. |
| C7 | ✅ | WHY (structured curriculum without manual building), WHAT (browse → preview → study), OUTCOME (session launched, progress tracked). |
| C8 | ✅ | Quantified: ~3-5/learner/week, ~5,000/day system-wide, evening peak. |
| C9 | ✅ | Preconditions verifiable: login state, catalog non-empty, optional profile goal. |
| C10 | ✅ | Postconditions cover session launch, path progress record, and SRS/progress integration. |
| C11 | ✅ | Verifiable conditions in Preconditions; belief-level items (curation, dedup) in Assumptions. |
| C12 | ✅ | Numbered steps, one action each. |
| C13 | ✅ | Alternates Learner/System subjects. |
| C14 | ✅ | No embedded if/else/loops; branches in AC.1-AC.3, failures in EX.1-EX.4. |
| C15 | ✅ | Step 1 = trigger (open paths); step 8 = postcondition (session launched + progress recorded). |
| C16 | ✅ | Each AC cites step, condition, lettered sub-steps, rejoin point. |
| C17 | ✅ | Each EX has trigger + response + final state. |
| C18 | ✅ | Covers empty catalog (EX.1), stale content (EX.2), quota/business rule (EX.3), service failure (EX.4). |
| C19 | ✅ | Includes reference existing UC-STUDY-01..04 with invocation step. |
| C20 | ✅ | Special Requirements are non-functional (performance, personalization, usability, reliability). |
