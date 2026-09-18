## UC-AUTH-01: Register Account

| **Use Case ID:** | UC-AUTH-01 |
| ---: | :--- |
| **Use Case Name:** | Register account |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Guest (unauthenticated visitor). **Secondary:** Email Service (delivers the verification email); Google Identity Provider (OAuth sign-up). |
| ---: | :--- |
| **Description:** | When a first-time visitor wants to save word sets and track personal learning progress, the guest registers a Quizez account with an email and password (or a Google account). The UC ends when a new account is created, a verification email is sent, the guest is automatically logged in, and the onboarding flow (UC-AUTH-03) begins. |
| **Preconditions:** | 1. Guest is not authenticated (no active Quizez session).<br>2. Guest has access to the Quizez web app over a working internet connection.<br>3. The email address used is not already registered in the system.<br>4. Email Service is available to deliver the verification email. |
| **Postconditions:** | 1. A new account record exists with status `active` and `email_verified = false` (or `true` for Google sign-up).<br>2. A verification email has been dispatched to the registered address.<br>3. An authenticated session is open for the new account.<br>4. The learner is on the first screen of the onboarding flow (UC-AUTH-03). |
| **Priority:** | High — Registration is the entry point to every authenticated feature; without it no word sets, progress, or SRS data can be saved. |
| **Frequency of Use:** | ~50–200 registrations/day at MVP launch; peak ~30/hour during marketing campaigns and back-to-school periods. |
| **Normal Course of Events:** | 1. Guest opens the Quizez web app and selects **Sign Up**.<br>2. System displays the registration form with email and password fields and a **Sign up with Google** option.<br>3. Guest enters an email address and a password of at least 8 characters.<br>4. Guest selects **Create Account**.<br>5. System validates the email format, the password strength, and that the email is not already registered.<br>6. System creates the account, sends a verification email to the registered address, and opens an authenticated session.<br>7. System redirects the learner to the first screen of the onboarding flow (UC-AUTH-03). |
| **Alternative Courses:** | **UC-AUTH-01.AC.1: Sign up with Google**<br>At step 3 of the Normal Course, if the guest selects **Sign up with Google**:<br>3a. System redirects the guest to the Google OAuth consent screen.<br>3b. Guest authenticates with Google and grants the requested profile permission.<br>3c. System receives the verified Google profile (email, display name) and creates an account linked to that Google identity.<br>3d. System opens an authenticated session → continue from step 7 of the Normal Course (no separate verification email is required; the Google email is treated as verified).<br><br>**UC-AUTH-01.AC.2: Google email already registered**<br>At sub-step 3c of UC-AUTH-01.AC.1, if the Google email already belongs to an existing account:<br>3c-i. System does not create a duplicate account.<br>3c-ii. System links the Google identity to the existing account (if not already linked) and opens an authenticated session for it.<br>3c-iii. System redirects the learner to the home page instead of onboarding → the UC ends with the goal of account access achieved; no new account is created. |
| **Exceptions:** | **UC-AUTH-01.EX.1: Email already registered**<br>Trigger: At step 5, the submitted email already exists in the account store.<br>Response: System displays "Email is already in use" with a **Log In** link and does not create an account.<br>Final state: No account created; the form retains the entered values so the guest can correct the email or switch to UC-AUTH-02.<br><br>**UC-AUTH-01.EX.2: Password does not meet requirements**<br>Trigger: At step 5, the password is shorter than 8 characters.<br>Response: System displays an inline error "Password must be at least 8 characters" next to the password field.<br>Final state: No account created; the email field retains its value and the guest may retry.<br><br>**UC-AUTH-01.EX.3: Email invalid or verification email undeliverable**<br>Trigger: At step 5 the email fails format validation, or after step 6 the Email Service reports the verification email as undeliverable (bounce).<br>Response: For a format failure, system rejects the submission with "Enter a valid email address". For a bounce, system flags the account `email_verified = false` and displays a banner prompting the learner to correct the address.<br>Final state: Format failure — no account created. Bounce — account exists but remains unverified until a valid address is confirmed.<br><br>**UC-AUTH-01.EX.4: Network failure during submission**<br>Trigger: At step 4 or 5, the registration request times out or the connection drops.<br>Response: System displays "Connection lost — please try again" and preserves all entered form data.<br>Final state: No account created; the guest may resubmit once connectivity returns. |
| **Includes:** | None. UC-AUTH-03 (Configure learning goal) is triggered after registration completes; it is a successor flow, not an included sub-UC. |
| **Special Requirements:** | **Performance**: Registration submission completes ≤ 3s under normal load; verification email dispatched within 60s.<br>**Security**: Passwords are hashed (never stored or logged in plaintext); all traffic over TLS; OAuth flow follows the Google Identity specification; registration endpoint is rate-limited per IP to deter abuse.<br>**Reliability**: Account creation and session creation are atomic — a partial account must never exist without a session or vice versa.<br>**Usability**: Form errors are shown inline in Vietnamese and English; the form is usable on mobile viewports. |
| **Assumptions:** | 1. Guests overwhelmingly register with a personal email they control; disposable-email blocking is not required for MVP.<br>2. Google OAuth covers the majority of social sign-up demand; no other providers are needed for MVP.<br>3. The Email Service provider maintains ≥ 99% delivery for transactional mail.<br>4. Email verification is encouraged but not strictly required before first use (grace period policy — see TBD-1). |
| **Notes and Issues:** | [TBD-1] Exact policy for unverified accounts (feature restrictions vs. reminder banner only, grace-period length) \| Owner: Product Team \| Due: 2026-10-15 \| Resolution: TBD<br>[TBD-2] Whether Apple/Facebook sign-in is added post-MVP \| Owner: Product Team \| Due: 2026-11-01 \| Resolution: TBD<br>[NOTE] Error message wording must match the copy deck ("Email is already in use" / "Password must be at least 8 characters") in both vi and en locales. |

## Quality Validation

| Item | Status | Note |
| --- | :---: | --- |
| C1 | ✅ | "Register account" = active verb + object, no actor embedded. |
| C2 | ✅ | User-goal level: guest finishes with a working account and session — coffee-break test passes. |
| C3 | ✅ | ID `UC-AUTH-01` unique per the contract UC list, follows `UC-<module>-<seq>`. |
| C4 | ✅ | One primary actor (Guest); single goal: obtain a registered account. |
| C5 | ✅ | All "System" steps refer to the Quizez web app; Email Service and Google IdP are secondary actors. |
| C6 | ✅ | Actor is a specific role (Guest), not generic "User". |
| C7 | ✅ | Description covers WHY (save sets/progress), WHAT (register), OUTCOME (account + session + onboarding). |
| C8 | ✅ | Frequency quantified (~50–200/day, peak ~30/hour); MVP estimate flagged as such. |
| C9 | ✅ | Preconditions are verifiable (session state, connectivity, email uniqueness, service availability). |
| C10 | ✅ | Postconditions cover data state, email dispatch, session state, and UI state. |
| C11 | ✅ | Preconditions (verifiable) vs. Assumptions (believed) kept separate. |
| C12 | ✅ | Numbered steps, one action each; submit is its own step so exceptions attach cleanly. |
| C13 | ✅ | Guest/System alternation maintained throughout the dialog. |
| C14 | ✅ | No if/else or loops in the Normal Course; branches live in AC/EX. |
| C15 | ✅ | Step 1 = trigger (selects Sign Up); step 7 reaches the postcondition (onboarding). |
| C16 | ✅ | Both ACs name the step, condition, lettered sub-steps, and rejoining point. |
| C17 | ✅ | All 4 exceptions specify trigger, response, and final state. |
| C18 | ✅ | Covers validation errors, business-rule violation (duplicate email), external failure (email bounce), and network failure. |
| C19 | ✅ | Includes = None (explicitly justified); only contract IDs (UC-AUTH-02, UC-AUTH-03) are referenced. |
| C20 | ✅ | Special Requirements are non-functional (performance, security, reliability, usability). |
