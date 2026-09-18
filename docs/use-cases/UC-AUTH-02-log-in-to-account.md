## UC-AUTH-02: Log In to Account

| **Use Case ID:** | UC-AUTH-02 |
| ---: | :--- |
| **Use Case Name:** | Log in to account |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered account holder). **Secondary:** Google Identity Provider (OAuth login). |
| ---: | :--- |
| **Description:** | When a returning learner wants to access saved word sets and learning progress on any device, the learner logs in with email and password (or a linked Google account). The UC ends when an authenticated session is established and the learner lands on the home page — or on the originally requested page when login was triggered by a protected action. |
| **Preconditions:** | 1. A Quizez account exists for the credentials being used.<br>2. Learner is not currently authenticated (no valid active session).<br>3. Learner has access to the Quizez web app over a working internet connection.<br>4. The account is not locked due to repeated failed attempts. |
| **Postconditions:** | 1. An authenticated session is open and bound to the learner's account.<br>2. The session persists across browser restarts for up to 30 days.<br>3. The learner is on the home page showing their own data, or on the originally requested page after a login redirect.<br>4. The failed-attempt counter for the account is reset to zero. |
| **Priority:** | High — Login gates every authenticated feature; returning learners cannot reach their data without it. |
| **Frequency of Use:** | ~300–800 logins/day at MVP scale; peak ~100/hour in evening study hours (19:00–23:00 local time). |
| **Normal Course of Events:** | 1. Learner opens the Quizez web app and selects **Log In** (or is redirected to the login page after attempting a protected action).<br>2. System displays the login form with email and password fields and a **Log in with Google** option.<br>3. Learner enters the registered email address and password.<br>4. Learner selects **Log In**.<br>5. System verifies the credentials against the account store.<br>6. System opens an authenticated session with a 30-day persistence window.<br>7. System redirects the learner to the home page (or back to the originally requested page when login followed a redirect). |
| **Alternative Courses:** | **UC-AUTH-02.AC.1: Log in with Google**<br>At step 3 of the Normal Course, if the learner selects **Log in with Google**:<br>3a. System redirects the learner to the Google OAuth consent screen.<br>3b. Learner authenticates with Google.<br>3c. System matches the Google identity to a linked Quizez account.<br>3d. System opens an authenticated session → continue from step 7 of the Normal Course.<br><br>**UC-AUTH-02.AC.2: Login triggered by a protected action**<br>At step 1 of the Normal Course, if the learner arrived via a redirect from a protected page or action (e.g. **Save**, **Study**, **Create word set** while browsing public content — see UC-AUTH-04):<br>1a. System records the originally requested destination.<br>1b. Learner completes steps 3–6 of the Normal Course (or AC.1).<br>1c. System redirects the learner back to the recorded destination instead of the home page → the UC ends at step 7 with the deep-link target restored. |
| **Exceptions:** | **UC-AUTH-02.EX.1: Invalid credentials**<br>Trigger: At step 5, the email does not exist or the password does not match.<br>Response: System displays the generic error "Email or password is incorrect" without revealing which part failed, and increments the failed-attempt counter.<br>Final state: No session created; the learner may retry until the lockout threshold (see EX.3).<br><br>**UC-AUTH-02.EX.2: Email not yet verified**<br>Trigger: At step 5, credentials are valid but the account has `email_verified = false`.<br>Response: System opens a limited session, displays a persistent "Verify your email" banner with a **Resend verification email** action, and restricts sensitive account operations until verification completes.<br>Final state: Learner is logged in with restricted privileges; full access is granted once the email is verified.<br><br>**UC-AUTH-02.EX.3: Too many failed attempts — account locked**<br>Trigger: At step 5, the failed-attempt counter reaches the threshold (5 consecutive failures).<br>Response: System locks the account for 15 minutes, displays "Too many attempts — try again later or reset your password", and offers a **Forgot password** link.<br>Final state: No session created; the account is locked for 15 minutes and the counter resets after the lockout expires or a successful login.<br><br>**UC-AUTH-02.EX.4: Network failure during submission**<br>Trigger: At step 4 or 5, the login request times out or the connection drops.<br>Response: System displays "Connection lost — please try again" and preserves the entered email.<br>Final state: No session created; the learner may resubmit once connectivity returns. |
| **Includes:** | None. UC-AUTH-02 may be invoked as a redirect target from other UCs (e.g. UC-AUTH-04, UC-WSET-05), but it includes no sub-UCs itself. |
| **Special Requirements:** | **Performance**: Credential verification completes ≤ 2s under normal load.<br>**Security**: Generic error messages never disclose whether an email is registered; failed-attempt counting and lockout are enforced server-side; sessions use secure, httpOnly cookies or equivalent tokens; all traffic over TLS.<br>**Reliability**: Session persistence survives browser restarts for 30 days unless the learner logs out.<br>**Usability**: Login form is usable on mobile viewports; error copy is localized (vi/en). |
| **Assumptions:** | 1. A 30-day session window is acceptable for a self-study app; no "remember me" opt-out is required for MVP.<br>2. A 15-minute lockout after 5 failures balances security and learner frustration.<br>3. Password reset ("Forgot password") is handled by a separate flow outside MVP scope; the link is present but its UC is not specified here.<br>4. Most learners use a single device; concurrent-session limits are not required for MVP. |
| **Notes and Issues:** | [TBD-1] Exact restrictions applied to unverified accounts (which operations are blocked vs. allowed) \| Owner: Product Team \| Due: 2026-10-15 \| Resolution: TBD<br>[TBD-2] Whether lockout policy should also rate-limit per IP in addition to per account \| Owner: Engineering \| Due: 2026-10-15 \| Resolution: TBD<br>[NOTE] "Forgot password" flow is referenced but out of MVP scope — track as a candidate UC for phase 2. |

## Quality Validation

| Item | Status | Note |
| --- | :---: | --- |
| C1 | ✅ | "Log in to account" = active verb + object, no actor embedded. |
| C2 | ✅ | User-goal level: learner finishes with a working session — coffee-break test passes. |
| C3 | ✅ | ID `UC-AUTH-02` unique per the contract UC list, follows `UC-<module>-<seq>`. |
| C4 | ✅ | One primary actor (Learner); single goal: establish an authenticated session. |
| C5 | ✅ | All "System" steps refer to the Quizez web app; Google IdP is a secondary actor. |
| C6 | ✅ | Actor is a specific role (Learner), not generic "User". |
| C7 | ✅ | Description covers WHY (access saved data), WHAT (log in), OUTCOME (session + landing page). |
| C8 | ✅ | Frequency quantified (~300–800/day, peak ~100/hour); MVP estimate flagged as such. |
| C9 | ✅ | Preconditions are verifiable (account exists, no session, connectivity, not locked). |
| C10 | ✅ | Postconditions cover session state, persistence window, landing page, and counter reset. |
| C11 | ✅ | Preconditions (verifiable) vs. Assumptions (policy beliefs) kept separate. |
| C12 | ✅ | Numbered steps, one action each; submit is its own step so exceptions attach cleanly. |
| C13 | ✅ | Learner/System alternation maintained throughout the dialog. |
| C14 | ✅ | No if/else or loops in the Normal Course; branches live in AC/EX. |
| C15 | ✅ | Step 1 = trigger (selects Log In / redirect); step 7 reaches the postcondition. |
| C16 | ✅ | Both ACs name the step, condition, lettered sub-steps, and rejoining point. |
| C17 | ✅ | All 4 exceptions specify trigger, response, and final state. |
| C18 | ✅ | Covers validation/auth failure, business-rule violation (lockout), restricted state (unverified), and network failure. |
| C19 | ✅ | Includes = None (explicitly justified); only contract IDs (UC-AUTH-04, UC-WSET-05) are referenced. |
| C20 | ✅ | Special Requirements are non-functional (performance, security, reliability, usability). |
