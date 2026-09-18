# UC-SRS-02: Track Learning Progress

| **Use Case ID:** | UC-SRS-02 |
| ---: | :--- |
| **Use Case Name:** | Track learning progress |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner, logged in). **Secondary:** none. |
| ---: | :--- |
| **Description:** | To stay motivated and know where they stand, the learner opens the home dashboard to review their learning progress. The system presents the current study streak, words learned today versus the daily goal, the number of mastered words, words due for review, and a 7-day review forecast. The UC ends when the dashboard is displayed with up-to-date figures and the learner has an accurate picture of their progress. |
| **Preconditions:** | 1. Learner is logged in to Quizez.<br>2. Learner's account exists (progress data may be empty for a brand-new account — see UC-SRS-02.EX.1). |
| **Postconditions:** | 1. The dashboard displays the learner's current streak, today's learned-words count against the daily goal, mastered-word count, due-word count, and 7-day review forecast.<br>2. If the learner reached the daily goal today, the streak shown already reflects today's increment.<br>3. If a full day elapsed without the daily goal being met, the streak is shown reset to 0. |
| **Priority:** | Medium — Important for motivation and retention, but the app remains usable without the dashboard. |
| **Frequency of Use:** | ~2-5 views/day per active learner (dashboard is the default landing view); system-wide ~4,000 views/day at 1,000 DAU; peak at session start and end. |
| **Normal Course of Events:** | 1. Learner logs in or navigates to the home page.<br>2. System aggregates the learner's progress data across all owned and saved word sets.<br>3. System evaluates the streak: increments it when today's daily goal is already met, resets it to 0 when a day passed without meeting the goal.<br>4. System displays the dashboard: current streak (days), words learned today vs daily goal (e.g. 7/10), mastered-word count, words due today, and a 7-day review forecast.<br>5. Learner reviews the figures and selects a next action (e.g. start review, open a set) or leaves the page. |
| **Alternative Courses:** | **UC-SRS-02.AC.1: Daily goal reached during today**<br>At step 3, if the learner has already met the daily word goal today:<br>3a. System displays the streak including today's increment and a "Goal reached" confirmation state.<br>3b. System shows today's counter at or above the goal (e.g. 10/10) → continue from step 4 of the Normal Course.<br><br>**UC-SRS-02.AC.2: Streak broken since last visit**<br>At step 3, if at least one full day elapsed without the daily goal being met:<br>3a. System resets the streak to 0 and displays it accordingly.<br>3b. System may show a neutral "Start a new streak" prompt → continue from step 4 of the Normal Course.<br><br>**UC-SRS-02.AC.3: Drill into per-set progress**<br>At step 5, if the learner opens a specific word set:<br>5a. System displays that set's progress breakdown: counts of not-started, learning, and mastered words.<br>5b. Learner reviews the per-set figures → UC ends (goal achieved: progress reviewed). |
| **Exceptions:** | **UC-SRS-02.EX.1: New learner with no learning data**<br>Trigger: At step 2, the learner has never completed a study activity (no words learned, no streak, no due words).<br>Response: System displays an empty-state dashboard: streak 0, today 0/goal, mastered 0, forecast empty, plus a call-to-action to start a recommended path or create a first word set.<br>Final state: No progress records are created by viewing; the learner is routed toward a first learning action.<br><br>**UC-SRS-02.EX.2: Progress data fails to load**<br>Trigger: At step 2, the progress aggregation request fails (server error or network failure).<br>Response: System displays an error state ("Could not load your progress") with a retry option; cached figures are not shown as if current.<br>Final state: No dashboard figures are displayed; underlying progress data is unchanged.<br><br>**UC-SRS-02.EX.3: Daily goal not configured**<br>Trigger: At step 3, the learner skipped onboarding and no daily-goal preference exists.<br>Response: System falls back to the default daily goal (10 words/day, per OpenQuiz reference) and displays the counter against it.<br>Final state: Dashboard renders with the default goal; the learner's profile remains without an explicit goal until set via UC-AUTH-03. |
| **Includes:** | None. |
| **Special Requirements:** | **Performance**: Dashboard renders ≤ 2s including aggregation across up to 100 sets / 10,000 words.<br>**Security**: Progress data is visible only to the owning learner; no public exposure in MVP.<br>**Reliability**: Streak evaluation is computed from stored daily-goal completion records, not from session-local state, so it survives device changes.<br>**Usability**: Key figures readable at a glance on mobile; streak and goal states distinguishable without color alone. |
| **Assumptions:** | 1. The daily goal defaults to 10 words/day (OpenQuiz reference) and is configurable via the learner's learning-goal settings (UC-AUTH-03).<br>2. "Words learned today" counts words that reached a studied state today across any study mode or SRS review.<br>3. Streak counts consecutive calendar days meeting the daily goal; freeze/coin mechanics are out of MVP scope. |
| **Notes and Issues:** | [TBD-1] Exact definition of "word learned" for the daily counter (first correct answer vs any studied word). \| Owner: Product Owner \| Due: 2026-10-01 \| Resolution: TBD<br>[TBD-2] Whether the 7-day forecast is per-set or aggregated only. \| Owner: Quizez BA \| Due: 2026-10-01 \| Resolution: TBD<br>[NOTE] Gamification elements seen in OpenQuiz (coins, streak freeze, ranks, leaderboard) are explicitly out of MVP scope. |

## Quality Validation

| Item | Status | Note |
| --- | --- | --- |
| C1 | ✅ | "Track learning progress" = verb + object, active voice. |
| C2 | ✅ | User-goal level: learner views a complete progress picture in one visit. |
| C3 | ✅ | UC-SRS-02 unique, follows naming convention. |
| C4 | ✅ | One primary actor (Learner); one goal: review progress dashboard. |
| C5 | ✅ | Single system boundary (Quizez web app). |
| C6 | ✅ | Specific actor role, not generic "User". |
| C7 | ✅ | WHY (motivation/awareness), WHAT (open dashboard), OUTCOME (accurate progress view) all present. |
| C8 | ✅ | Quantified: ~2-5 views/day/learner, ~4,000/day system-wide. |
| C9 | ✅ | Preconditions verifiable (login state, account existence). |
| C10 | ✅ | Postconditions cover displayed figures, streak increment, and reset state. |
| C11 | ✅ | Unverifiable beliefs (goal default, counter definition) placed in Assumptions, not Preconditions. |
| C12 | ✅ | Numbered steps, one action each. |
| C13 | ✅ | Alternating Learner/System subjects. |
| C14 | ✅ | No embedded if/else; streak branches live in AC.1/AC.2, failures in EX. |
| C15 | ✅ | Trigger (open home) → final step achieves postcondition (dashboard displayed). |
| C16 | ✅ | Each AC cites step number, condition, sub-steps, rejoin point. |
| C17 | ✅ | Each EX has trigger + response + final state. |
| C18 | ✅ | Covers empty data, load failure, and missing configuration — the relevant failure modes for a read-only dashboard. |
| C19 | ✅ | Includes = None; no dangling references. |
| C20 | ✅ | Special Requirements non-functional only. |
