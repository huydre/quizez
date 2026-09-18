## UC-AUTH-03: Configure Learning Goal

| **Use Case ID:** | UC-AUTH-03 |
| ---: | :--- |
| **Use Case Name:** | Configure learning goal |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (newly registered or returning account holder). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a learner completes registration (or opens goal settings later), the learner selects a target language, current proficiency level, an optional exam goal, and a daily study goal so that Quizez can recommend suitable learning paths and content. The UC ends when the goal profile is saved and the home page displays personalized recommendations. |
| **Preconditions:** | 1. Learner is authenticated (active session).<br>2. Learner is on the onboarding flow (first login after registration) or on the goal-settings screen.<br>3. The catalog of supported languages, proficiency levels, and exam goals is loaded. |
| **Postconditions:** | 1. The learner's profile stores the selected target language, proficiency level, exam goal (or "none"), and daily goal.<br>2. The onboarding flag is marked complete and is not shown again on subsequent logins.<br>3. The home page displays recommended learning paths and word sets matching the saved profile.<br>4. Personalized recommendations are enabled for the learner. |
| **Priority:** | High — Personalization drives the core retention loop; without a goal profile the home page cannot recommend relevant paths. |
| **Frequency of Use:** | ~50–200 completions/day (once per new learner) plus ~20–50 edits/day from settings; peak mirrors registration peaks. |
| **Normal Course of Events:** | 1. System displays the onboarding screen after registration (or the learner opens **Learning Goal** in settings).<br>2. Learner selects a target language (e.g. English) from the supported-language list.<br>3. System displays the proficiency-level options (A1–C2).<br>4. Learner selects a proficiency level.<br>5. System displays the exam-goal options (IELTS, TOEIC, THPT, or **No exam goal**).<br>6. Learner selects an exam goal and a daily study goal (target words or minutes per day).<br>7. Learner selects **Confirm**.<br>8. System saves the goal profile to the learner's account.<br>9. System marks onboarding complete and displays the home page with recommended learning paths matching the saved profile. |
| **Alternative Courses:** | **UC-AUTH-03.AC.1: Skip onboarding**<br>At step 2 of the Normal Course, if the learner selects **Skip**:<br>2a. System marks onboarding complete without saving a goal profile.<br>2b. System displays the home page with default (non-personalized) recommendations → the UC ends; the learner can configure a goal later via settings, which restarts this UC at step 1.<br><br>**UC-AUTH-03.AC.2: No exam goal selected**<br>At step 6 of the Normal Course, if the learner selects **No exam goal**:<br>6a. System records the profile without an exam goal.<br>6b. System generates recommendations based on the selected proficiency level only → continue from step 7 of the Normal Course.<br><br>**UC-AUTH-03.AC.3: Reconfigure goal from settings**<br>At step 1 of the Normal Course, if the learner opens **Learning Goal** in settings (pre-filled with current values):<br>1a. Learner adjusts any of the four fields.<br>1b. Learner selects **Confirm** → continue from step 8 of the Normal Course; the updated profile replaces the previous one and recommendations refresh. |
| **Exceptions:** | **UC-AUTH-03.EX.1: Required selection missing**<br>Trigger: At step 7, the learner selects **Confirm** without choosing a target language or proficiency level.<br>Response: System highlights the missing field(s) inline and does not save.<br>Final state: No profile saved; the learner remains on the onboarding screen and may complete the selection or skip.<br><br>**UC-AUTH-03.EX.2: Save failure**<br>Trigger: At step 8, the profile-save request fails (network loss or server error).<br>Response: System displays "Could not save your goal — please try again" with a **Retry** action and preserves all selections.<br>Final state: No profile saved; onboarding remains incomplete until a save succeeds or the learner skips.<br><br>**UC-AUTH-03.EX.3: Session expires mid-flow**<br>Trigger: At any step, the learner's session expires before **Confirm** is submitted.<br>Response: System redirects to the login page (UC-AUTH-02) and, after re-authentication, returns the learner to the onboarding screen with prior selections restored where possible.<br>Final state: No profile saved; the learner resumes the flow after logging in again. |
| **Includes:** | None. UC-AUTH-02 is referenced only as the re-authentication path in EX.3. |
| **Special Requirements:** | **Performance**: Onboarding screens render ≤ 1.5s; recommendation list loads ≤ 3s after save.<br>**Usability**: Onboarding is completable in ≤ 4 taps; all options are localized (vi/en); the flow is usable on mobile viewports.<br>**Reliability**: A skipped or failed onboarding must never re-block the learner — the flag is stored server-side, not only in local storage.<br>**Privacy**: Goal profile data is used solely for content recommendation, per the privacy policy. |
| **Assumptions:** | 1. The MVP supports a single target language per learner (English-first for the Vietnamese market); multi-language profiles are a phase-2 candidate.<br>2. The exam-goal list (IELTS, TOEIC, THPT) covers the dominant Vietnamese learner demand; additional exams (TOEFL, HSK) are deferred.<br>3. Recommendation quality with a level-only profile (no exam goal) is acceptable for MVP.<br>4. Daily-goal enforcement (reminders, streaks) is handled by the progress-tracking features, not this UC. |
| **Notes and Issues:** | [TBD-1] Exact daily-goal units offered (words/day vs. minutes/day vs. sessions/day) and default value \| Owner: Product Team \| Due: 2026-10-15 \| Resolution: TBD<br>[TBD-2] Whether onboarding collects native language separately from UI language (OpenQuiz collects both) \| Owner: Product Team \| Due: 2026-10-15 \| Resolution: TBD<br>[NOTE] No free-tier study-session cap in MVP (resolved 2026-09-18); this UC only stores the learner's chosen goal, not the cap. |

## Quality Validation

| Item | Status | Note |
| --- | :---: | --- |
| C1 | ✅ | "Configure learning goal" = active verb + object, no actor embedded. |
| C2 | ✅ | User-goal level: learner finishes with a saved, working goal profile — coffee-break test passes. |
| C3 | ✅ | ID `UC-AUTH-03` unique per the contract UC list, follows `UC-<module>-<seq>`. |
| C4 | ✅ | One primary actor (Learner); single goal: a saved personalization profile. |
| C5 | ✅ | All "System" steps refer to the Quizez web app; no secondary actor needed. |
| C6 | ✅ | Actor is a specific role (Learner), not generic "User". |
| C7 | ✅ | Description covers WHY (personalized recommendations), WHAT (select goal fields), OUTCOME (saved profile + recommendations). |
| C8 | ✅ | Frequency quantified (~50–200 completions + ~20–50 edits/day); MVP estimate flagged as such. |
| C9 | ✅ | Preconditions are verifiable (session state, screen context, catalog loaded). |
| C10 | ✅ | Postconditions cover data state, onboarding flag, and user-visible recommendation state. |
| C11 | ✅ | Preconditions (verifiable) vs. Assumptions (product beliefs) kept separate. |
| C12 | ✅ | Numbered steps, one action each; Confirm is its own step so exceptions attach cleanly. |
| C13 | ✅ | Learner/System alternation maintained throughout the dialog. |
| C14 | ✅ | No if/else or loops in the Normal Course; skip/no-exam/settings branches live in AC. |
| C15 | ✅ | Step 1 = trigger (onboarding shown / settings opened); step 9 reaches the postcondition. |
| C16 | ✅ | All 3 ACs name the step, condition, lettered sub-steps, and rejoining point. |
| C17 | ✅ | All 3 exceptions specify trigger, response, and final state. |
| C18 | ✅ | Covers validation error, external/network failure, and session expiry. |
| C19 | ✅ | Includes = None (explicitly justified); only contract IDs (UC-AUTH-02, UC-SRS-01) are referenced. |
| C20 | ✅ | Special Requirements are non-functional (performance, usability, reliability, privacy). |
