# UC-GAM-01: Play Vocabulary Games

| **Use Case ID:** | UC-GAM-01 |
| ---: | :--- |
| **Use Case Name:** | Play vocabulary games |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a learner wants a more playful way to reinforce vocabulary, the learner opens the Games section of a word set, picks a game type (word matching, timed runner-style, or arcade-style), and plays one or more rounds built from the set's cards. The UC ends when the game session finishes, the final score is recorded on the per-game leaderboard, the played words' mastery state is updated, and earned coins are credited via UC-GAM-03. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. Learner has at least one accessible word set (own or saved public set).<br>3. The selected word set meets the minimum card count required by the chosen game type.<br>4. Learner has remaining game quota for the current period (free-tier daily quota applies). |
| **Postconditions:** | 1. A game session record is stored with game type, word set, score, rounds played, and duration.<br>2. The score is submitted to the per-game leaderboard for that game type.<br>3. Mastery state of each played word is updated (correct answers reinforce, wrong answers flag for review).<br>4. Earned coins are credited to the learner's coin wallet per UC-GAM-03.<br>5. Learner's daily game quota is decremented by one session. |
| **Priority:** | Medium — engagement/retention feature; reinforces learning but is not the core study loop. |
| **Frequency of Use:** | ~3–5 sessions per active learner per week; peak in evenings and weekends. [TBD-1] |
| **Normal Course of Events:** | 1. Learner opens a word set and clicks the **Games** tab.<br>2. System displays the available game types with the learner's best score and remaining quota for each.<br>3. Learner selects a game type (e.g., **Word Matching**).<br>4. System validates the set's card count against the game's minimum and starts a new game session.<br>5. System deals a round built from the set's cards (terms and definitions shuffled).<br>6. Learner plays the round — matching, answering, or dodging — within the game's rules (score, timer, lives).<br>7. System scores each answer in real time and updates the on-screen score and remaining lives.<br>8. Steps 5–7 repeat until the game ends (all lives lost, timer expired, or all cards cleared).<br>9. System displays the **Game Over** screen with final score, correct/wrong breakdown, and coins earned.<br>10. System submits the score to the per-game leaderboard and updates word mastery.<br>11. System credits earned coins to the learner's wallet via UC-GAM-03. |
| **Alternative Courses:** | **UC-GAM-01.AC.1: Play again with the same set**<br>At step 9, if the learner clicks **Play Again**:<br>9a. System validates remaining game quota.<br>9b. System starts a new session with the same game type and word set → continue from step 5 of the Normal Course.<br><br>**UC-GAM-01.AC.2: Switch game type or word set**<br>At step 9, if the learner clicks **Change Game**:<br>9a. System returns to the game picker → continue from step 2 of the Normal Course.<br><br>**UC-GAM-01.AC.3: Quit mid-game**<br>At any point during steps 5–8, if the learner clicks **Quit**:<br>5a. System pauses the session and asks for confirmation.<br>5b. Learner confirms quitting.<br>5c. System records the session as abandoned with the partial score → continue from step 9 of the Normal Course (partial score is still submitted). |
| **Exceptions:** | **UC-GAM-01.EX.1: Word set too small for the selected game**<br>Trigger: At step 4, the set's card count is below the game's minimum (e.g., matching needs ≥ 6 cards).<br>Response: System displays "This set needs at least N words for this game" and offers to pick another set or another game.<br>Final state: No session created; quota not consumed.<br><br>**UC-GAM-01.EX.2: Game quota exhausted**<br>Trigger: At step 4 (or 9a), the learner has no remaining free game sessions for the day.<br>Response: System displays the quota-exhausted message with the quota reset time and a premium upsell prompt.<br>Final state: No session created; learner may wait for reset or upgrade via UC-PREM-01.<br><br>**UC-GAM-01.EX.3: Mid-game interruption (app closed, network loss)**<br>Trigger: During steps 5–8, the learner closes the app or loses connectivity.<br>Response: System auto-saves the session state locally; on next launch, offers to resume or discard the interrupted session.<br>Final state: If discarded, the session is recorded as abandoned with partial score; quota is still consumed.<br><br>**UC-GAM-01.EX.4: Score submission fails**<br>Trigger: At step 10, the leaderboard submission fails (network or server error).<br>Response: System queues the score for retry and shows "Score saved locally — will sync when you're back online".<br>Final state: Session record kept locally; leaderboard updated on next successful sync; coins still credited. |
| **Includes:** | UC-GAM-03: Earn and spend coins (invoked at step 11 — coin credit). |
| **Special Requirements:** | **Performance**: Game round rendering ≤ 100ms per interaction; no network calls during active play (session data buffered locally).<br>**Security**: Score submissions are server-validated against plausible score ranges to deter cheating.<br>**Reliability**: Session state auto-saved every round so an interruption never loses more than one round of progress.<br>**Usability**: All games playable on mobile touch and desktop keyboard/mouse. |
| **Assumptions:** | 1. Game types at launch: word matching, timed runner-style, and one arcade-style game (per OpenQuiz reference: word-matching, word-runner, tank-crash).<br>2. Free tier has a daily game-session quota; premium raises or removes it (premium caps are the premium value prop — see UC-PREM-01).<br>3. Each game type maintains its own leaderboard (linked to UC-GAM-02). |
| **Notes and Issues:** | [TBD-1] Exact quota numbers per tier and minimum card counts per game — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-2] Whether game results feed SRS scheduling or only a separate mastery flag — Owner: Product Owner \| Due: before dev start \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Play vocabulary games" = verb + object, active voice |
| C2 | ✅ | Postcondition: session recorded, score ranked, mastery updated — complete result |
| C3 | ✅ | UC-GAM-01 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner), single goal |
| C5 | ✅ | All steps refer to the Quizez system only |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role |
| C7 | ✅ | WHY (playful reinforcement) + WHAT (pick game, play rounds) + OUTCOME (score + mastery + coins) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, set access, card count, quota) |
| C10 | ✅ | Postconditions cover session record, leaderboard, mastery, coins, quota |
| C11 | ✅ | Game catalog and quota beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each; repeat-loop expressed as "steps repeat until" |
| C13 | ✅ | Actor/System subjects alternate throughout |
| C14 | ✅ | No if/else in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (open Games tab) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 4 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers validation (set size), business rule (quota), interruption, external failure (submission) |
| C19 | ✅ | Includes UC-GAM-03 — exists in phase-2 UC list |
| C20 | ✅ | Special Requirements are non-functional only |
