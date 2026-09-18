# UC-PREM-03: Redeem Promotional Premium

| **Use Case ID:** | UC-PREM-03 |
| ---: | :--- |
| **Use Case Name:** | Redeem promotional premium |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner on the free tier). **Secondary:** Admin (reviews submissions; off-stage for the learner-facing flow). |
| ---: | :--- |
| **Description:** | When a learner completes a promotional action for Quizez (e.g., publishing a social-media post that promotes the product), the learner submits proof — typically the public post URL — through the Promotional Premium page to claim a free premium period. An admin reviews the submission against the campaign rules, and on approval the system grants premium to the learner's account. The UC ends when the learner's submission is approved and premium is activated, or when the learner is notified of rejection. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. Learner's account meets the campaign eligibility rules (e.g., minimum account age).<br>3. A promotional-premium campaign is currently active.<br>4. Learner does not already have an approved or pending submission for the same campaign. |
| **Postconditions:** | 1. A submission record exists with status='Approved' and the reviewed proof URL.<br>2. A premium grant is applied to the learner's account with the campaign's duration.<br>3. The learner is notified of the outcome (approval or rejection) in-app and by email. |
| **Priority:** | Low — growth-loop feature; valuable for acquisition but not core learning functionality. |
| **Frequency of Use:** | ~10–40 submissions per day during active campaigns; near zero between campaigns. [TBD-1] |
| **Normal Course of Events:** | 1. Learner navigates to the **Get free premium** page.<br>2. System displays the campaign rules: required action, eligible platforms, reward duration, and the submission form.<br>3. Learner publishes the promotional post on a supported social platform.<br>4. Learner pastes the public post URL into the submission form.<br>5. Learner clicks **Submit for review**.<br>6. System validates the URL format and records the submission with status='Pending_Review'.<br>7. System displays "Submission received — we'll review it within {review SLA}" and notifies the admin review queue.<br>8. Admin reviews the post against the campaign rules and approves it.<br>9. System marks the submission 'Approved', grants premium for the campaign duration, and notifies the learner by email and in-app notification. |
| **Alternative Courses:** | **UC-PREM-03.AC.1: Check submission status**<br>At step 7, if the learner returns to the page while the submission is pending:<br>7a. System displays the existing submission with its status and submission date instead of the form → UC ends; no new submission created.<br><br>**UC-PREM-03.AC.2: Resubmit after rejection**<br>At step 8, if the admin rejected a previous submission and the campaign is still active:<br>8a. Learner opens the page, sees the rejection reason, and clicks **Submit again**.<br>8b. System displays the submission form → continue from step 4 of the Normal Course. |
| **Exceptions:** | **UC-PREM-03.EX.1: Rejected submission — invalid proof**<br>Trigger: At step 8, the admin finds the post invalid (broken link, private post, content doesn't meet campaign rules, or fabricated proof).<br>Response: System marks the submission 'Rejected' with the reason and notifies the learner with the option to resubmit (AC.2).<br>Final state: No premium granted; learner may resubmit once while the campaign is active.<br><br>**UC-PREM-03.EX.2: Learner already premium**<br>Trigger: At step 5, the learner's account has an active paid or promotional premium subscription.<br>Response: System blocks the submission and displays "You already have premium — this offer is for free-tier accounts".<br>Final state: No submission record created.<br><br>**UC-PREM-03.EX.3: Duplicate submission**<br>Trigger: At step 6, a submission with the same post URL or an existing pending submission already exists for this learner/campaign.<br>Response: System rejects the new submission and displays "You've already submitted — check your status above".<br>Final state: Only the original submission remains; no duplicate record created.<br><br>**UC-PREM-03.EX.4: Account not eligible**<br>Trigger: At step 2, the learner's account fails the eligibility check (e.g., account younger than the minimum age — OpenQuiz reference: ≥4 days).<br>Response: System displays the eligibility requirement and the date the account becomes eligible; the submission form is not shown.<br>Final state: No submission possible until eligibility is met.<br><br>**UC-PREM-03.EX.5: Campaign ended**<br>Trigger: At step 2 or step 6, the campaign's end date has passed.<br>Response: System displays "This campaign has ended" and hides the submission form; pending submissions are still reviewed.<br>Final state: No new submissions accepted; existing pending submissions continue to review. |
| **Includes:** | None. |
| **Special Requirements:** | **Performance**: Submission form loads ≤ 2s; status check is instant on page load.<br>**Security**: Submitted URLs are sanitized and rendered as text/links only (no embedded content); admin review actions are audit-logged.<br>**Reliability**: Premium grant on approval must be idempotent — re-running the approval never stacks duplicate grants.<br>**Compliance**: Campaign terms (eligibility, reward, review SLA) must be displayed on the page; promotional-post requirements follow platform advertising-disclosure norms. |
| **Assumptions:** | 1. Campaign mechanics follow the OpenQuiz FreePremium model: learner posts publicly on social media, submits the link, admin reviews manually.<br>2. Minimum account age and reward duration are campaign-configurable values, not hard-coded.<br>3. Admin review is a manual queue in the admin dashboard; SLA (e.g., 3 business days) is set per campaign. |
| **Notes and Issues:** | [TBD-1] Submission volume pending first campaign — Owner: Product Owner \| Due: after first campaign \| Resolution: pending.<br>[TBD-2] Reward duration per campaign (e.g., 1 month premium) and whether rewards stack with paid premium — Owner: Product Owner \| Due: before campaign launch \| Resolution: pending.<br>[TBD-3] Whether automated verification of the post (e.g., fetch URL, check content) assists admin review — Owner: Product Owner + Engineering \| Due: before dev start \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Redeem promotional premium" = verb + object, active voice |
| C2 | ✅ | Postcondition: submission reviewed, premium granted — meaningful result |
| C3 | ✅ | UC-PREM-03 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner); Admin is secondary/off-stage reviewer |
| C5 | ✅ | "System" = Quizez platform including admin review queue |
| C6 | ✅ | "Learner (registered self-learner on the free tier)" is a specific role |
| C7 | ✅ | WHY (claim reward for promotion) + WHAT (submit proof URL) + OUTCOME (premium granted/rejected) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, eligibility, active campaign, no pending submission) |
| C10 | ✅ | Postconditions cover submission record, premium grant, notification |
| C11 | ✅ | Campaign-model and SLA beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Actor/System/Admin subjects are explicit throughout |
| C14 | ✅ | No if/else/loop in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (open promo page) → final step achieves postcondition |
| C16 | ✅ | 2 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 5 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers rejection, already-premium, duplicate, ineligibility, campaign end |
| C19 | ✅ | No Includes — field correctly states None |
| C20 | ✅ | Special Requirements are non-functional only |
