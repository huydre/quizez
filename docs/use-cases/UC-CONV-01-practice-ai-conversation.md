# UC-CONV-01: Practice AI Conversation

| **Use Case ID:** | UC-CONV-01 |
| ---: | :--- |
| **Use Case Name:** | Practice AI conversation |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner). **Secondary:** LLM Service (generates dialogue turns and session feedback), TTS Service (synthesizes AI speech for voice mode). |
| ---: | :--- |
| **Description:** | When a learner wants to practice speaking in a realistic dialogue, the learner opens the Conversation mode, picks a topic or exam scenario (including IELTS Speaking Part 1/2/3 formats with cue cards), and holds a real-time voice or text dialogue with the AI. The UC ends when the learner ends the session and the system presents a session summary with feedback on vocabulary usage and grammar. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. At least one conversation topic or exam scenario is available in the catalog.<br>3. LLM Service is reachable for session creation.<br>4. For voice mode: learner's device has a working microphone and browser/OS mic permission is grantable. |
| **Postconditions:** | 1. A conversation session record is saved with the selected topic, mode (voice/text), and full turn transcript.<br>2. A session summary is stored containing AI feedback on vocabulary and grammar, plus per-turn evaluations where applicable.<br>3. The session counts toward the learner's speaking history and activity statistics.<br>4. If the session was an exam simulation, the estimated score/band is recorded under that exam type. |
| **Priority:** | High — flagship differentiator; core speaking practice tied to retention and premium conversion. |
| **Frequency of Use:** | ~3–5 sessions per active learner per week; peak evenings and pre-exam periods. [TBD-1] |
| **Normal Course of Events:** | 1. Learner navigates to the **Conversation** section.<br>2. System displays the topic catalog grouped by category (general topics, exam simulations such as IELTS Speaking Part 1, Part 2 cue cards, Part 3, and mixed mode).<br>3. Learner selects a topic or exam scenario.<br>4. System creates a new conversation thread via the LLM Service and displays the session screen with the AI's opening turn.<br>5. System plays the AI's opening turn as synthesized speech via the TTS Service (voice mode).<br>6. Learner replies by speaking into the microphone.<br>7. System transcribes the learner's speech, sends the turn to the LLM Service, and displays the AI's next reply.<br>8. System plays the AI reply as speech and shows the turn in the transcript.<br>9. Steps 6–8 repeat until the learner clicks **End Session**.<br>10. System requests a session evaluation from the LLM Service.<br>11. System displays the session summary: transcript, vocabulary feedback, grammar corrections, and (for exam scenarios) an estimated score with a recommended higher-band sample answer.<br>12. System saves the session record to the learner's speaking history. |
| **Alternative Courses:** | **UC-CONV-01.AC.1: Text-only mode**<br>At step 6, if the learner prefers typing (or has no microphone):<br>6a. Learner toggles **Text mode** on the session screen.<br>6b. Learner types the reply and presses **Send**.<br>6c. System sends the typed turn to the LLM Service → continue from step 7 of the Normal Course (steps 5 and 8 skip TTS playback; replies are shown as text only).<br><br>**UC-CONV-01.AC.2: Switch topic mid-session**<br>At any point during steps 6–9, if the learner wants a different topic:<br>a. Learner clicks **Change Topic**.<br>b. System displays the topic catalog.<br>c. Learner selects a new topic.<br>d. System closes the current thread, creates a new thread for the new topic → continue from step 4 of the Normal Course. The abandoned thread is saved as a partial session.<br><br>**UC-CONV-01.AC.3: Custom topic**<br>At step 3, if none of the catalog topics fits:<br>3a. Learner selects **Custom topic**.<br>3b. Learner enters a free-text topic description (max 200 characters).<br>3c. System creates a thread seeded with the custom topic → continue from step 4 of the Normal Course.<br><br>**UC-CONV-01.AC.4: Topic suggested from a word set**<br>At step 3, if the learner launched Conversation mode from a word set (e.g., UC-WSET study screen):<br>3a. System auto-selects a topic generated from the word set's vocabulary and skips the catalog → continue from step 4 of the Normal Course. |
| **Exceptions:** | **UC-CONV-01.EX.1: Microphone permission denied**<br>Trigger: At step 6, the browser/OS reports mic permission denied or no microphone is present.<br>Response: System displays "Microphone access is needed for voice practice — enable it in your browser settings, or switch to Text mode" with a **Use Text Mode** button.<br>Final state: Session stays open in text mode if the learner accepts; otherwise the thread is discarded and the learner returns to the topic catalog.<br><br>**UC-CONV-01.EX.2: LLM Service failure mid-session**<br>Trigger: At step 7 or step 10, the LLM Service times out or returns an error.<br>Response: System displays "The AI is having trouble responding — retry or end the session" with **Retry** and **End Session** options; on retry the last learner turn is resent.<br>Final state: On successful retry the session continues; on end, all completed turns are saved as a partial session without a summary evaluation.<br><br>**UC-CONV-01.EX.3: Session timeout from inactivity**<br>Trigger: No learner turn is submitted for 10 consecutive minutes during steps 6–9.<br>Response: System auto-ends the session, runs the evaluation on completed turns, and displays "Session ended due to inactivity" above the summary.<br>Final state: Partial session with ≥1 completed turn is saved with its summary; an empty session is discarded.<br><br>**UC-CONV-01.EX.4: Free-tier turn quota exhausted**<br>Trigger: At step 4 or during the dialogue, the learner's remaining conversation quota for the period reaches zero.<br>Response: System displays the premium upsell dialog ("You've used all free conversation turns this month") and blocks new turns.<br>Final state: Current session (if any) is saved; learner is routed to UC-PREM-01 or exits to the catalog. |
| **Includes:** | UC-PREM-01: Upgrade to premium (invoked from EX.4 upsell dialog). |
| **Special Requirements:** | **Performance**: AI turn response ≤ 5s at P95; TTS playback starts ≤ 2s after reply text arrives.<br>**Security**: Voice recordings and transcripts are tied to the learner account; no raw audio is shared with third parties beyond the LLM/TTS processors.<br>**Reliability**: A dropped turn must be retryable without losing prior transcript; partial sessions are always persisted.<br>**Usability**: Session screen must work hands-free (auto-play AI speech, push-to-talk or auto-detect end of utterance) on mobile and desktop. |
| **Assumptions:** | 1. Topic catalog ships with ~120 topics including ~57 IELTS Part 2 cue cards (OpenQuiz parity baseline).<br>2. Learner's speech transcription (ASR) is handled by the platform's speech pipeline and is out of scope for this UC.<br>3. Free-tier conversation turns are capped per month; premium removes the cap (premium introduces usage limits as its value prop — no free-tier study/SRS cap exists in MVP).<br>4. Exam-mode scoring rubrics (IELTS band estimation) are provided by the LLM Service; no human examiner is involved. |
| **Notes and Issues:** | [TBD-1] Exact free-tier monthly turn quota (OpenQuiz reference: 3 turns/month) — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-2] Whether conversation sessions can be assigned as classwork (UC-CLASS-03) with AI rubric grading — Owner: Product Owner \| Due: phase 2 planning \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Practice AI conversation" = verb + object, active voice |
| C2 | ✅ | Postcondition: completed session + feedback summary — coffee-break worthy |
| C3 | ✅ | UC-CONV-01 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner); LLM/TTS are secondary services |
| C5 | ✅ | All steps refer to the Quizez system; external services are secondary actors |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role |
| C7 | ✅ | WHY (speaking practice) + WHAT (topic → dialogue → summary) + OUTCOME (saved session with feedback) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, catalog, service health, mic hardware) |
| C10 | ✅ | Postconditions cover transcript, summary, history, exam score state |
| C11 | ✅ | Catalog size, ASR scope, quota policy placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each; repeat loop stated explicitly |
| C13 | ✅ | Actor/System subjects alternate throughout |
| C14 | ✅ | No if/else in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (open Conversation) → final step saves session record |
| C16 | ✅ | 4 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 4 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers permission denied, external service failure, timeout, quota |
| C19 | ✅ | Includes UC-PREM-01 — exists in phase 2 UC list |
| C20 | ✅ | Special Requirements are non-functional only |
