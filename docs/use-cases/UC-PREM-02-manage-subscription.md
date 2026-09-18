# UC-PREM-02: Manage Subscription

| **Use Case ID:** | UC-PREM-02 |
| ---: | :--- |
| **Use Case Name:** | Manage subscription |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner with an active or expired premium subscription). **Secondary:** Payment Gateway (for payment history and renewal data). |
| ---: | :--- |
| **Description:** | When a premium learner wants to review or change their subscription, the learner opens the Subscription settings page to view the current plan, renewal/expiry date, and payment history, and can cancel auto-renewal. The UC ends when the learner has viewed the subscription state and, if chosen, auto-renewal is disabled while premium remains active until the paid period ends. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. Learner has a current or past premium subscription record. |
| **Postconditions:** | 1. The subscription page displays the learner's plan, status, and renewal/expiry date.<br>2. If the learner cancelled auto-renewal: subscription status='Active_Until_Expiry' with auto_renew=false; premium features remain available until the paid expiry date.<br>3. A cancellation confirmation notification is sent when auto-renew is disabled. |
| **Priority:** | Medium — required for trust and compliance; lower volume than the upgrade path. |
| **Frequency of Use:** | ~20–60 views per day platform-wide; ~5–15 cancellations per day; peaks after renewal charges and at campaign end dates. [TBD-1] |
| **Normal Course of Events:** | 1. Learner navigates to **Settings → Subscription**.<br>2. System displays the current subscription: plan name, status, next renewal date (or expiry date), and price.<br>3. Learner scrolls to the **Payment history** section.<br>4. System displays the list of past transactions: date, plan, amount, and status.<br>5. Learner clicks **Cancel auto-renewal**.<br>6. System displays a confirmation dialog explaining that premium stays active until the paid expiry date.<br>7. Learner confirms the cancellation.<br>8. System sets auto_renew=false on the subscription and displays "Auto-renewal off — premium active until {expiry date}".<br>9. System sends a cancellation confirmation email to the learner. |
| **Alternative Courses:** | **UC-PREM-02.AC.1: View only (no changes)**<br>At step 5, if the learner only wants to review the subscription:<br>5a. Learner reviews the plan details and payment history.<br>5b. Learner leaves the page without clicking **Cancel auto-renewal** → UC ends; no state changes.<br><br>**UC-PREM-02.AC.2: Re-enable auto-renewal**<br>At step 5, if auto-renewal is already off and the learner wants to restore it:<br>5a. Learner clicks **Resume auto-renewal**.<br>5b. System sets auto_renew=true and displays the next scheduled renewal date → continue from step 9 of the Normal Course (confirmation email sent).<br><br>**UC-PREM-02.AC.3: Download invoice**<br>At step 4, if the learner needs a receipt:<br>4a. Learner clicks the **Invoice** icon on a transaction row.<br>4b. System generates and downloads the invoice PDF for that transaction → continue from step 5 of the Normal Course. |
| **Exceptions:** | **UC-PREM-02.EX.1: Cancellation requested after renewal was charged**<br>Trigger: At step 7, the learner confirms cancellation but a renewal charge was already captured within the current billing cycle.<br>Response: System cancels future renewals, displays the refund policy link, and offers **Request refund** which routes to the support flow.<br>Final state: auto_renew=false; the charged period remains active; refund outcome is handled by ops per refund policy — no automatic reversal.<br><br>**UC-PREM-02.EX.2: Expired payment method blocks renewal**<br>Trigger: The subscription page shows a scheduled renewal but the stored payment method is expired or was declined on the last attempt.<br>Response: System displays a warning banner "Your renewal may fail — update your payment method" with an **Update payment method** action.<br>Final state: Subscription remains active; learner is directed to the payment-method update flow; if renewal later fails, the subscription lapses per the dunning policy.<br><br>**UC-PREM-02.EX.3: Payment history unavailable**<br>Trigger: At step 4, the Payment Gateway or transaction store fails to return history.<br>Response: System displays "Payment history is temporarily unavailable" with a **Retry** button; plan details still render.<br>Final state: Page remains usable; history section is empty until a successful retry.<br><br>**UC-PREM-02.EX.4: No subscription found**<br>Trigger: At step 2, the learner has never subscribed (edge case: reached the page via a stale link).<br>Response: System displays "You don't have a subscription yet" with a **View plans** link to UC-PREM-01.<br>Final state: No subscription data shown; learner is routed to the upgrade flow. |
| **Includes:** | None. |
| **Special Requirements:** | **Performance**: Subscription page loads ≤ 2s; payment history of 100 rows paginated.<br>**Security**: Payment history shows only masked references — no full bank account numbers; page requires an authenticated session.<br>**Reliability**: Cancellation must be effective immediately in the system even if the gateway sync is delayed (reconcile asynchronously).<br>**Compliance**: Cancellation flow and refund policy disclosure must satisfy consumer-protection requirements for recurring payments. |
| **Assumptions:** | 1. QR/bank-transfer plans renew via a new payment each cycle; "auto-renew" applies where the provider supports recurring charges — for manual-renew plans the toggle becomes a renewal-reminder preference.<br>2. Refund policy document exists and is linked from the cancellation dialog.<br>3. Learner's email on file is deliverable for confirmations. |
| **Notes and Issues:** | [TBD-1] View/cancel volumes pending launch analytics — Owner: Product Owner \| Due: after launch \| Resolution: pending.<br>[TBD-2] Whether bank-transfer plans support true auto-renew or manual re-payment each cycle — depends on provider selection [UC-PREM-01 TBD-2] \| Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-3] Refund window (e.g., 7 days) for post-renewal cancellations — Owner: Product Owner + Ops \| Due: before dev start \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Manage subscription" — borderline verb; accepted as the standard label for view/cancel/history scope |
| C2 | ✅ | Postcondition: subscription reviewed / auto-renew disabled — meaningful result |
| C3 | ✅ | UC-PREM-02 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner); Payment Gateway is secondary |
| C5 | ✅ | "System" = Quizez platform; gateway is an external actor |
| C6 | ✅ | "Learner (…with an active or expired premium subscription)" is a specific role |
| C7 | ✅ | WHY (review/change subscription) + WHAT (view plan, history, cancel) + OUTCOME (state shown/updated) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, subscription record exists) |
| C10 | ✅ | Postconditions cover displayed state, auto_renew flag, confirmation |
| C11 | ✅ | Renewal-mechanism and refund-policy beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Actor/System subjects alternate throughout |
| C14 | ✅ | No if/else/loop in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (open Subscription settings) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 4 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers post-charge cancel, expired payment method, service failure, no subscription |
| C19 | ✅ | No Includes — field correctly states None |
| C20 | ✅ | Special Requirements are non-functional only |
