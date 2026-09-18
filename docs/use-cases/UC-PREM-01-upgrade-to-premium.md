# UC-PREM-01: Upgrade to Premium

| **Use Case ID:** | UC-PREM-01 |
| ---: | :--- |
| **Use Case Name:** | Upgrade to premium |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner on the free tier). **Secondary:** Payment Gateway (QR bank-transfer provider). |
| ---: | :--- |
| **Description:** | When a learner wants to remove free-tier limits and unlock premium features, the learner opens the Premium page, chooses a billing plan, and pays by scanning a QR code for a bank transfer. The system generates a unique transfer reference, watches for the matching inbound payment via the Payment Gateway, and activates premium on confirmation. The UC ends when the learner's account shows an active premium subscription. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. Learner's account is on the free tier (no active premium subscription).<br>3. Payment Gateway is available for QR generation and payment confirmation. |
| **Postconditions:** | 1. A subscription record exists with status='Active', the chosen plan, and the correct expiry date.<br>2. A payment transaction record is saved with status='Completed' and the matched transfer reference.<br>3. Premium features and limits are unlocked on the learner's account.<br>4. A confirmation notification is shown in-app and sent to the learner's email. |
| **Priority:** | High — primary revenue path; conversion directly funds the product. |
| **Frequency of Use:** | ~50–200 upgrades per day platform-wide; peak during promotional campaigns and paywall moments. [TBD-1] |
| **Normal Course of Events:** | 1. Learner navigates to the **Premium** page (or clicks a premium upsell prompt).<br>2. System displays the available plans — monthly, quarterly, yearly — with prices and the premium feature list.<br>3. Learner selects a plan and clicks **Upgrade now**.<br>4. System creates a pending order with a unique transfer reference and displays a QR code for bank transfer plus the exact amount and transfer note.<br>5. Learner scans the QR code with a banking app and completes the transfer.<br>6. Payment Gateway detects the inbound transfer, matches the amount and reference, and notifies the system.<br>7. System marks the order paid, activates the premium subscription with the plan's expiry date, and records the transaction.<br>8. System displays the **Premium activated** confirmation screen and sends a confirmation email. |
| **Alternative Courses:** | **UC-PREM-01.AC.1: Apply a promo code**<br>At step 3, if the learner has a promotional code:<br>3a. Learner enters the code in the **Promo code** field and clicks **Apply**.<br>3b. System validates the code (expiry, applicability, remaining uses) and displays the discounted price.<br>3c. Learner clicks **Upgrade now** → continue from step 4 of the Normal Course (QR shows the discounted amount).<br><br>**UC-PREM-01.AC.2: Group / family plan purchase**<br>At step 3, if the learner chooses a group plan (e.g., for a class or family):<br>3a. Learner selects the **Group plan** option and enters the number of seats.<br>3b. System displays the group price (per-seat discount applied) → continue from step 4 of the Normal Course.<br>3c. After payment confirmation at step 7, system activates premium for the purchaser and issues seat-claim invitations for the remaining seats → continue to step 8.<br><br>**UC-PREM-01.AC.3: Learner already transferred before QR page**<br>At step 6, if the learner reports having paid but no matching transfer arrived:<br>6a. Learner clicks **I've already paid** on the pending order screen.<br>6b. System re-checks recent inbound transfers for the reference and amount.<br>6c. On a match, continue from step 7 of the Normal Course; on no match, system displays "Payment not found yet — we'll activate automatically once it arrives" and keeps the order pending. |
| **Exceptions:** | **UC-PREM-01.EX.1: Payment timeout**<br>Trigger: No matching transfer arrives within the order's validity window (e.g., 24 hours).<br>Response: System expires the pending order, invalidates the QR/reference, and notifies the learner "Your order expired — please create a new one".<br>Final state: Order status='Expired'; no subscription created; learner may restart the UC.<br><br>**UC-PREM-01.EX.2: Transfer amount mismatch**<br>Trigger: At step 6, an inbound transfer matches the reference but the amount differs from the order total.<br>Response: System flags the order for manual review, notifies the learner "We received a transfer with a different amount — our team will verify it", and alerts the ops queue.<br>Final state: Order status='Under_Review'; premium is not activated until ops confirms or refunds the transfer.<br><br>**UC-PREM-01.EX.3: Webhook confirmation delay**<br>Trigger: At step 6, the Payment Gateway's confirmation webhook is delayed or fails to deliver.<br>Response: System polls the gateway for the order status on a backoff schedule and reconciles on the next successful response.<br>Final state: Premium activates when confirmation arrives (late activation is acceptable); if reconciliation fails beyond the order window, EX.1 applies.<br><br>**UC-PREM-01.EX.4: Invalid promo code**<br>Trigger: At AC.1 step 3b, the entered code is expired, inapplicable, or exhausted.<br>Response: System displays "This code isn't valid" with the reason and restores the full price.<br>Final state: Order remains at full price; learner may retry another code or proceed without one.<br><br>**UC-PREM-01.EX.5: Duplicate payment for the same order**<br>Trigger: A second matching transfer arrives for an already-paid order.<br>Response: System detects the duplicate, queues an automatic refund of the extra transfer, and notifies the learner.<br>Final state: One subscription remains active; the duplicate amount is refunded per refund policy. |
| **Includes:** | None. |
| **Special Requirements:** | **Performance**: QR code and order page render ≤ 2s; activation ≤ 60s after gateway confirmation.<br>**Security**: Transfer reference is unique per order and non-guessable; webhook payloads are signature-verified; no bank credentials are stored.<br>**Reliability**: Order reconciliation must be idempotent — a repeated webhook never double-activates or double-bills.<br>**Compliance**: Issue VAT invoice on request for paid orders (Vietnamese tax regulation); retain transaction records per accounting law. |
| **Assumptions:** | 1. Vietnam-market payment provider is a SePay-style QR/bank-transfer gateway; UC text is provider-agnostic — final provider selection TBD.<br>2. Learner's banking app supports QR-initiated transfers with a transfer note.<br>3. Premium introduces caps/limits on the free tier as its value prop (no free-tier study/SRS cap existed in MVP); exact limits defined in the pricing spec.<br>4. Prices (monthly/quarterly/yearly) come from the pricing configuration, not hard-coded. |
| **Notes and Issues:** | [TBD-1] Conversion volume pending launch analytics — Owner: Product Owner \| Due: after launch \| Resolution: pending.<br>[TBD-2] Final payment provider and whether international card payments are also supported — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-3] Refund policy for mismatched/duplicate transfers — Owner: Product Owner + Ops \| Due: before dev start \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Upgrade to premium" = verb + object, active voice |
| C2 | ✅ | Postcondition: active subscription — complete, meaningful result |
| C3 | ✅ | UC-PREM-01 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner); Payment Gateway is secondary |
| C5 | ✅ | "System" = Quizez platform; gateway is an external actor |
| C6 | ✅ | "Learner (registered self-learner on the free tier)" is a specific role |
| C7 | ✅ | WHY (unlock premium) + WHAT (choose plan, pay via QR) + OUTCOME (subscription active) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, free-tier status, gateway health) |
| C10 | ✅ | Postconditions cover subscription, transaction, feature unlock, notification |
| C11 | ✅ | Provider and pricing beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Actor/System/Payment Gateway subjects are explicit throughout |
| C14 | ✅ | No if/else/loop in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (open Premium page) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 5 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers timeout, amount mismatch, webhook delay, invalid code, duplicate payment |
| C19 | ✅ | No Includes — field correctly states None |
| C20 | ✅ | Special Requirements are non-functional only |
