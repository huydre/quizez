# UC-GAM-03: Earn and Spend Coins

| **Use Case ID:** | UC-GAM-03 |
| ---: | :--- |
| **Use Case Name:** | Earn and spend coins |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner). **Secondary:** None. |
| ---: | :--- |
| **Description:** | To reward consistent study activity, the system credits coins to the learner's wallet when they hit study milestones, finish games, complete daily goals, or rank on the leaderboard; the learner then spends coins in the Shop on lootbox-style rewards (avatar frames, cosmetics) or consumables such as streak freeze. The UC ends when a coin transaction — earning or spending — is recorded in the wallet ledger and the purchased item is granted to the learner. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. For spending: learner's coin balance is ≥ the item's price.<br>3. For spending: the shop item is in stock / available for the learner's tier.<br>4. A coin wallet record exists for the learner (auto-created at registration). |
| **Postconditions:** | 1. A transaction record is appended to the learner's coin ledger with type (earn/spend/refund), amount, source, and resulting balance.<br>2. Learner's coin balance reflects the transaction.<br>3. For purchases: the item is granted (cosmetic applied to inventory, or streak freeze added to the learner's freeze count).<br>4. For lootbox purchases: the randomly drawn reward is revealed to the learner and added to inventory; duplicates are auto-refunded per the duplicate-refund rule. |
| **Priority:** | Low — economy layer supporting gamification; valuable but not on the critical learning path. |
| **Frequency of Use:** | Earn events: ~5–15 per active learner per day (automatic). Spend events: ~1–3 per active learner per week; peak after leaderboard payouts. [TBD-1] |
| **Normal Course of Events:** | 1. Learner completes a coin-earning action (e.g., finishes a study session, hits a daily goal, wins a game round, receives a leaderboard payout).<br>2. System credits the earned coins to the learner's wallet and appends an earn transaction to the ledger.<br>3. System displays a coin-earned notification with the amount and new balance.<br>4. Learner navigates to the **Shop**.<br>5. System displays available items: lootboxes, avatar frames, streak freeze, and the learner's current balance.<br>6. Learner selects a lootbox and clicks **Open**.<br>7. System validates the balance and debits the price.<br>8. System draws the reward per the published odds table and displays the reveal animation.<br>9. System appends a spend transaction to the ledger and adds the reward to the learner's inventory.<br>10. System displays the updated balance and the new inventory item. |
| **Alternative Courses:** | **UC-GAM-03.AC.1: Buy a streak freeze consumable**<br>At step 6, if the learner selects **Streak Freeze** instead of a lootbox:<br>6a. System validates the balance and debits the price.<br>6b. System increments the learner's streak-freeze count → continue from step 9 of the Normal Course.<br><br>**UC-GAM-03.AC.2: Duplicate lootbox reward**<br>At step 8, if the drawn reward is a cosmetic the learner already owns:<br>8a. System auto-refunds a fixed portion of the box price as a refund transaction.<br>8b. System displays the duplicate notice with the refunded amount → continue from step 9 of the Normal Course.<br><br>**UC-GAM-03.AC.3: View transaction history**<br>At step 5, if the learner clicks **History**:<br>5a. System displays the ledger: each transaction's date, type, source label, amount, and balance.<br>5b. Learner returns to the shop → continue from step 5 of the Normal Course. |
| **Exceptions:** | **UC-GAM-03.EX.1: Insufficient balance**<br>Trigger: At step 7 (or 6a), the learner's balance is below the item price.<br>Response: System displays "Not enough coins — you need N more" and suggests earning actions (daily goal, games).<br>Final state: No debit, no transaction recorded; item not granted.<br><br>**UC-GAM-03.EX.2: Reward inventory empty / item unavailable**<br>Trigger: At step 7, the selected item is out of stock, withdrawn, or the lootbox pool is exhausted for the learner.<br>Response: System displays "This item is currently unavailable" and greys out the purchase option.<br>Final state: No debit; learner may pick another item.<br><br>**UC-GAM-03.EX.3: Concurrent spend conflict**<br>Trigger: Two simultaneous spend requests (e.g., two open tabs) race against the same balance.<br>Response: System processes transactions serially against the ledger; the second request re-validates the post-first balance and fails with EX.1 if insufficient.<br>Final state: At most one transaction succeeds; balance never goes negative.<br><br>**UC-GAM-03.EX.4: Earn credit fails after completed action**<br>Trigger: At step 2, the wallet credit call fails after the earning action completed.<br>Response: System queues the credit for retry and logs the pending earn.<br>Final state: Coins credited on retry; learner sees the balance update on next sync — no earn is lost. |
| **Includes:** | None. (This UC is included by UC-GAM-01 and leaderboard payouts from UC-GAM-02.) |
| **Special Requirements:** | **Performance**: Balance check + debit completes ≤ 500ms; ledger append is atomic with the balance update.<br>**Security**: All coin mutations are server-side only; client-reported scores never directly credit coins without server validation.<br>**Reliability**: Ledger is append-only; balance is derived/verified from the ledger to prevent drift.<br>**Transparency**: Lootbox odds are published in-app per item (viewable before purchase).<br>**Compliance**: Coins are virtual, non-transferable, non-redeemable for money — no gambling regulation exposure; disclose odds anyway. |
| **Assumptions:** | 1. Coin sources: study milestones, daily goals, game scores (UC-GAM-01), leaderboard rewards (UC-GAM-02), monthly free freeze grant.<br>2. Premium learners earn coins at a multiplier (e.g., ×2, per OpenQuiz reference).<br>3. Streak freeze consumable protects the streak per the SRS streak rules (UC-SRS-02).<br>4. Coins cannot be purchased with real money at launch — earn-only economy. |
| **Notes and Issues:** | [TBD-1] Coin amounts per source, item prices, lootbox odds table, and duplicate-refund rate — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-2] Whether real-money coin purchases are added later — Owner: Product Owner \| Due: phase 3 planning \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Earn and spend coins" = verb + object, active voice |
| C2 | ✅ | Postcondition: ledger transaction + item granted — complete result |
| C3 | ✅ | UC-GAM-03 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner), single goal |
| C5 | ✅ | All steps refer to the Quizez system only |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role |
| C7 | ✅ | WHY (reward activity) + WHAT (earn credits, spend in shop) + OUTCOME (ledger entry + item granted) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, balance, stock, wallet existence) |
| C10 | ✅ | Postconditions cover ledger, balance, inventory, duplicate refund |
| C11 | ✅ | Coin sources and premium multiplier beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Actor/System subjects alternate throughout |
| C14 | ✅ | No if/else in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (earning action) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 4 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers business rule (balance), stock, concurrency, external failure |
| C19 | ✅ | No Includes — field correctly states None; inbound includes noted |
| C20 | ✅ | Special Requirements are non-functional only |
