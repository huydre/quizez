# UC-CLASS-02: Join a Class

| **Use Case ID:** | UC-CLASS-02 |
| ---: | :--- |
| **Use Case Name:** | Join a class |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner invited to a class). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a learner receives a join code or invite link from a teacher, the learner enters the code (or opens the link), reviews the class details, and confirms enrollment. The UC ends when the learner is added to the class roster and sees the class feed with its assignments. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. Learner has received a join code or invite link for the class.<br>3. The target class exists and has status='Active'. |
| **Postconditions:** | 1. Learner is added to the class roster as a member.<br>2. The class appears in the learner's **My Classes** list.<br>3. The learner can view the class feed and all currently published assignments.<br>4. The teacher's roster shows the new member. |
| **Priority:** | High — required entry point for all classwork UCs (UC-CLASS-03/04); without it the classroom module has no members. |
| **Frequency of Use:** | ~1–3 joins per learner per school term; system-wide peak at semester start (~hundreds of joins/day). [TBD-1] |
| **Normal Course of Events:** | 1. Learner navigates to the **Classes** section and clicks **Join class**.<br>2. System displays the Join Class form with a join code input field.<br>3. Learner enters the join code and clicks **Continue**.<br>4. System validates the code and retrieves the matching class.<br>5. System displays a class preview: class name, teacher name, member count, and a **Join** button.<br>6. Learner clicks the **Join** button.<br>7. System adds the learner to the class roster.<br>8. System displays the class feed showing published assignments and announcements. |
| **Alternative Courses:** | **UC-CLASS-02.AC.1: Join via invite link**<br>At step 1, if the learner opens a shared invite link instead of entering a code manually:<br>1a. System opens the class preview directly (code embedded in the link) → continue from step 5 of the Normal Course.<br><br>**UC-CLASS-02.AC.2: Join as a Guest (unauthenticated visitor)**<br>At step 1a (AC.1), if the visitor is not logged in:<br>1b. System displays the class preview in read-only mode with a **Log in to join** prompt.<br>1c. Guest completes UC-AUTH-02 (log in) or UC-AUTH-01 (register).<br>1d. System returns the learner to the class preview → continue from step 5 of the Normal Course. |
| **Exceptions:** | **UC-CLASS-02.EX.1: Invalid join code**<br>Trigger: At step 4, no class matches the entered code (typo, wrong code, or code regenerated after the learner received it).<br>Response: System displays "This code doesn't match any class — check the code and try again."<br>Final state: Form remains open; learner is not enrolled; no roster change.<br><br>**UC-CLASS-02.EX.2: Expired or revoked code**<br>Trigger: At step 4, the code matches a class but has been regenerated (invalidated) by the teacher or has passed its expiry.<br>Response: System displays "This invite code is no longer valid — ask your teacher for a new one."<br>Final state: Learner is not enrolled; teacher must share the current code.<br><br>**UC-CLASS-02.EX.3: Already a member**<br>Trigger: At step 6, the learner is already on the class roster.<br>Response: System skips enrollment and displays "You're already a member of this class" with a **Go to class** button.<br>Final state: Roster unchanged (no duplicate membership); learner proceeds to the class feed.<br><br>**UC-CLASS-02.EX.4: Class archived or full**<br>Trigger: At step 4, the matching class has status='Archived', or at step 7 the class has reached its member limit.<br>Response: For an archived class, system displays "This class has ended and no longer accepts new members." For a full class, system displays "This class is full — contact your teacher."<br>Final state: Learner is not enrolled; no roster change. |
| **Includes:** | UC-AUTH-02: Log in to account (invoked at step 1c of AC.2).<br>UC-AUTH-01: Register account (invoked at step 1c of AC.2). |
| **Special Requirements:** | **Performance**: Code validation and class preview load ≤ 2s.<br>**Security**: Join codes are rate-limited per account/IP to prevent brute-force guessing; invite links carry no privileges beyond joining the one class.<br>**Reliability**: Enrollment is idempotent — a double-click on **Join** never creates duplicate roster entries.<br>**Usability**: Code input is case-insensitive and ignores spaces/hyphens. |
| **Assumptions:** | 1. Learners receive codes/links out-of-band (chat, LMS, printed handout) — distribution is the teacher's responsibility.<br>2. A learner may join multiple classes; there is no per-learner class cap in this phase.<br>3. Class preview exposes only non-sensitive data (name, teacher display name, member count) — not the roster. |
| **Notes and Issues:** | [TBD-1] Maximum members per class — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-2] Whether join codes expire by default or only on regeneration — Owner: Product Owner \| Due: before dev start \| Resolution: pending (EX.2 covers both cases). |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Join a class" = verb + object, active voice |
| C2 | ✅ | Postcondition: roster membership + class feed access — complete goal |
| C3 | ✅ | UC-CLASS-02 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner), single goal |
| C5 | ✅ | All steps refer to the Quizez system only |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role |
| C7 | ✅ | WHY (received invite) + WHAT (enter code, confirm join) + OUTCOME (member, sees feed) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, code possession, class status) |
| C10 | ✅ | Postconditions cover roster, learner's class list, feed access, teacher view |
| C11 | ✅ | Out-of-band distribution and no-cap beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Learner/System subjects alternate throughout |
| C14 | ✅ | No if/else/loop in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (click Join class) → final step achieves postcondition |
| C16 | ✅ | 2 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 4 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers invalid input, revoked code, duplicate membership (idempotency), archived/full class |
| C19 | ✅ | Includes reference existing UCs (UC-AUTH-01, UC-AUTH-02) |
| C20 | ✅ | Special Requirements are non-functional only |
