# UC-GAM-02: Compete on Leaderboard

| **Use Case ID:** | UC-GAM-02 |
| ---: | :--- |
| **Use Case Name:** | Compete on leaderboard |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner). **Secondary:** None. |
| ---: | :--- |
| **Description:** | To stay motivated through social comparison, the learner opens the Leaderboard page to see their rank against other learners on weekly and monthly boards, computed from study points (words learned, streak bonus, game scores). The UC ends when the learner has viewed their current rank, rank tier, percentile, and the top-ranked learners — globally or within a class they belong to. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. The leaderboard service has computed the current period's standings (weekly and monthly).<br>3. For the class leaderboard view: learner is a member of at least one class (see UC-CLASS-02). |
| **Postconditions:** | 1. Learner's current rank, rank tier, study points, and percentile ("top X%") are displayed.<br>2. Top learners for the selected period and scope are displayed.<br>3. No data is mutated — this is a read-only UC; point accrual happens in study/game UCs. |
| **Priority:** | Medium — retention/motivation feature; supports the gamification loop but is not core learning. |
| **Frequency of Use:** | ~2–4 views per active learner per week; peak at period boundaries (Sunday night, month-end) when ranks finalize. [TBD-1] |
| **Normal Course of Events:** | 1. Learner clicks the **Leaderboard** item in the main navigation.<br>2. System displays the current weekly leaderboard: the learner's own rank card (rank, tier, points, percentile) pinned at top, followed by the top-ranked learners.<br>3. Learner selects the **Monthly** tab.<br>4. System displays the monthly standings with the same layout, plus the learner's rank tier progression for the month.<br>5. Learner selects the **Class** tab and picks a class they belong to.<br>6. System displays the class-scoped leaderboard ranking that class's members by study points for the period.<br>7. Learner taps a top learner's row.<br>8. System displays that learner's public profile (display name, tier, streak, public stats). |
| **Alternative Courses:** | **UC-GAM-02.AC.1: View previous periods**<br>At step 3, if the learner selects a past week/month from the period selector:<br>3a. System loads the finalized standings for the selected past period, including the learner's historical rank and any rewards earned → continue from step 4 of the Normal Course.<br><br>**UC-GAM-02.AC.2: Hide from leaderboard (anonymous mode)**<br>At step 2, if the learner clicks **Hide me from leaderboard**:<br>2a. System sets the learner's anonymous flag; the learner's entry is shown to themselves but replaced by an anonymized placeholder for all other viewers.<br>2b. Learner continues browsing → continue from step 3 of the Normal Course. |
| **Exceptions:** | **UC-GAM-02.EX.1: No activity yet (unranked)**<br>Trigger: At step 2, the learner has zero study points in the current period.<br>Response: System displays the unranked state — "Study your first words this week to get ranked" — with the leaderboard still visible below.<br>Final state: Learner sees the board but has no rank; no error.<br><br>**UC-GAM-02.EX.2: Tied scores**<br>Trigger: Two or more learners have identical study points.<br>Response: System applies the tie-break rule (earlier achievement time ranks higher), displays tied learners with the same rank number, and skips the next rank number accordingly.<br>Final state: Deterministic ordering shown; all tied learners see the same shared rank.<br><br>**UC-GAM-02.EX.3: Standings not yet computed**<br>Trigger: At step 2 or 4, the current period's standings are still being computed (e.g., just after period rollover).<br>Response: System displays "Rankings are being updated — check back in a few minutes" with the last finalized period's standings.<br>Final state: Learner sees stale-but-labeled data; no partial ranking shown.<br><br>**UC-GAM-02.EX.4: Not a member of any class**<br>Trigger: At step 5, the learner opens the Class tab but belongs to no class.<br>Response: System displays an empty state — "Join a class to see its leaderboard" — with a call-to-action to UC-CLASS-02.<br>Final state: No class board shown; global boards remain accessible. |
| **Includes:** | None. |
| **Special Requirements:** | **Performance**: Leaderboard page loads ≤ 2s for boards up to 10,000 ranked learners; own-rank lookup O(1) via precomputed standings.<br>**Security**: Only public profile fields are exposed on other learners' rows; anonymous-mode learners are never identifiable.<br>**Reliability**: Standings are computed by a scheduled job; the read path never computes rankings on demand.<br>**Fairness**: Points formula is documented in-app: points = words learned × (1 + streak ÷ 10), with a daily point cap and monthly reset. |
| **Assumptions:** | 1. Rank tiers follow the OpenQuiz-style ladder (Bronze → Silver → Gold → Genius → World); tier names are a design decision.<br>2. Study points accrue from words learned, streaks, and game scores (UC-GAM-01); the exact weighting is a product decision.<br>3. Rank rewards (coins per tier at period end) are paid via UC-GAM-03.<br>4. Learners can opt out of public ranking via anonymous mode. |
| **Notes and Issues:** | [TBD-1] Exact point formula weights and daily cap — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-2] Whether class leaderboards rank by the same study points or by assignment completion — Owner: Product Owner \| Due: before dev start \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Compete on leaderboard" = verb + object, active voice |
| C2 | ✅ | Postcondition: rank viewed — a complete, meaningful result for a read-only goal |
| C3 | ✅ | UC-GAM-02 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner), single goal |
| C5 | ✅ | All steps refer to the Quizez system only |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role |
| C7 | ✅ | WHY (motivation via comparison) + WHAT (view ranks across scopes) + OUTCOME (rank/tier/percentile seen) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, computed standings, class membership) |
| C10 | ✅ | Postconditions cover all displayed state; explicitly notes read-only |
| C11 | ✅ | Tier ladder and point-formula beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Actor/System subjects alternate throughout |
| C14 | ✅ | No if/else in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (open Leaderboard) → final step achieves postcondition |
| C16 | ✅ | 2 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 4 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers unranked state, tie handling, stale standings, missing membership |
| C19 | ✅ | No Includes — field correctly states None |
| C20 | ✅ | Special Requirements are non-functional only |
