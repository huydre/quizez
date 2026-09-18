# UC-CONV-02: Assess Pronunciation

| **Use Case ID:** | UC-CONV-02 |
| ---: | :--- |
| **Use Case Name:** | Assess pronunciation |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner). **Secondary:** Speech Assessment Service (Azure-style pronunciation scoring: accuracy, fluency, prosody, phoneme-level miscue detection), TTS Service (model audio playback). |
| ---: | :--- |
| **Description:** | When a learner wants to check and improve their pronunciation, the learner opens Pronunciation Assessment on a word or sentence, listens to the model audio, records themselves reading or shadowing it, and receives a detailed score breakdown. The UC ends when the system returns overall and per-dimension scores (accuracy, fluency, prosody) with phoneme-level miscue detection showing missed or mispronounced words. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. Learner has a word set, dictionary entry, or practice sentence open with at least one assessable item.<br>3. Learner's device has a working microphone and browser/OS mic permission is grantable.<br>4. Speech Assessment Service is reachable. |
| **Postconditions:** | 1. An assessment record is saved containing the reference text, the learner's recording reference, and the score breakdown (accuracy, fluency, prosody, overall).<br>2. Miscue results are stored: missed words, mispronounced words, and per-phoneme error flags.<br>3. The result counts toward the learner's speaking history and per-exam score tracking where applicable.<br>4. The learner's attempt count for the item is incremented for progress tracking. |
| **Priority:** | High — key differentiator vs. flashcard-only competitors; drives premium conversion (scored assessments are quota-limited on free tier). |
| **Frequency of Use:** | ~10–20 assessments per active learner per week; peak during speaking-exam preparation periods. [TBD-1] |
| **Normal Course of Events:** | 1. Learner opens **Pronunciation Assessment** on a word or sentence (from a word set, dictionary popup, or speaking practice screen).<br>2. System displays the reference text with its IPA transcription and a **Play model audio** button.<br>3. Learner clicks **Play model audio**.<br>4. System plays the reference pronunciation via the TTS Service.<br>5. Learner clicks the **Record** button and reads or shadows the reference text aloud.<br>6. System records the audio and displays a recording indicator with elapsed time.<br>7. Learner clicks **Stop**.<br>8. System submits the recording and reference text to the Speech Assessment Service.<br>9. System displays the results: overall score plus accuracy, fluency, and prosody sub-scores.<br>10. System highlights miscues on the reference text — missed words, mispronounced words, and phoneme-level error markers.<br>11. System saves the assessment record to the learner's speaking history. |
| **Alternative Courses:** | **UC-CONV-02.AC.1: Retry immediately**<br>At step 9, if the learner wants another attempt on the same item:<br>9a. Learner clicks **Try again**.<br>9b. System resets the recorder while keeping the previous result visible for comparison → continue from step 5 of the Normal Course. Each attempt is saved as a separate assessment record.<br><br>**UC-CONV-02.AC.2: Slow playback of model audio**<br>At step 3, if the learner needs a slower model:<br>3a. Learner selects the **Slow** playback option.<br>3b. System plays the reference audio at reduced speed via the TTS Service → continue from step 5 of the Normal Course.<br><br>**UC-CONV-02.AC.3: Shadowing mode (sentence-by-sentence)**<br>At step 1, if the learner opened assessment from a video-caption or shadowing context (UC-EXT-02):<br>1a. System presents one caption line at a time as the reference text.<br>1b. Steps 3–11 repeat per caption line until the learner exits or finishes the clip → each line produces its own assessment record. |
| **Exceptions:** | **UC-CONV-02.EX.1: Microphone permission denied**<br>Trigger: At step 5, the browser/OS reports mic permission denied or no microphone is present.<br>Response: System displays "Microphone access is needed to assess your pronunciation — enable it in your browser settings" and keeps the learner on the item screen.<br>Final state: No recording is created; learner may grant permission and retry or leave the screen.<br><br>**UC-CONV-02.EX.2: No speech detected**<br>Trigger: At step 8, the submitted audio contains silence or no recognizable speech.<br>Response: System displays "We couldn't hear any speech — check your microphone and try again" and returns to the recording-ready state.<br>Final state: No assessment record is created; the attempt is not counted against quota.<br><br>**UC-CONV-02.EX.3: Speech Assessment Service unavailable**<br>Trigger: At step 8, the Speech Assessment Service times out or returns an error.<br>Response: System displays "Pronunciation scoring is temporarily unavailable — retry in a moment" with a **Retry** button; the recorded audio is retained for resubmission.<br>Final state: Recording is kept locally pending retry; no assessment record is created until scoring succeeds.<br><br>**UC-CONV-02.EX.4: Background noise too high**<br>Trigger: At step 6 or step 8, the audio signal quality check detects ambient noise above the acceptable threshold.<br>Response: System displays "Too much background noise — move to a quieter place and record again" and discards the noisy take.<br>Final state: No assessment record is created; learner returns to the recording-ready state.<br><br>**UC-CONV-02.EX.5: Free-tier assessment quota exhausted**<br>Trigger: At step 8, the learner's remaining pronunciation-assessment quota for the period is zero.<br>Response: System displays the premium upsell dialog ("You've used all free pronunciation assessments this month") and does not submit the recording.<br>Final state: Recording is discarded; learner is routed to UC-PREM-01 or returns to the item screen. |
| **Includes:** | UC-PREM-01: Upgrade to premium (invoked from EX.5 upsell dialog).<br>UC-EXT-02: Practice with video captions (source context for AC.3 shadowing mode). |
| **Special Requirements:** | **Performance**: Score results returned ≤ 5s at P95 for a ≤ 30s recording; model audio starts ≤ 1s after click.<br>**Security**: Recordings are transmitted over TLS and stored tied to the learner account; audio is shared only with the Speech Assessment processor.<br>**Reliability**: A failed scoring submission must be retryable without forcing the learner to re-record.<br>**Usability**: Results must visualize per-word and per-phoneme errors inline on the reference text (color-coded), readable on mobile screens. |
| **Assumptions:** | 1. Speech Assessment Service provides 0–100 scoring with accuracy, fluency, prosody dimensions and miscue detection (Azure Pronunciation Assessment parity).<br>2. Reference audio is generated by the platform's TTS pipeline; slow playback is a speed-adjusted variant of the same audio.<br>3. Free-tier assessments are capped per month; premium removes the cap (premium introduces usage limits as its value prop — no free-tier study/SRS cap exists in MVP).<br>4. Recordings are retained so teachers can replay them when assessment is assigned as classwork (UC-CLASS-04). |
| **Notes and Issues:** | [TBD-1] Exact free-tier monthly assessment quota (OpenQuiz reference: 5 assessments/month) — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-2] Noise-threshold detection: client-side signal check vs. service-side rejection — Owner: Tech Lead \| Due: design phase \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Assess pronunciation" = verb + object, active voice |
| C2 | ✅ | Postcondition: scored assessment saved — a complete, meaningful result |
| C3 | ✅ | UC-CONV-02 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner); Speech Assessment/TTS are secondary |
| C5 | ✅ | All steps refer to the Quizez system; external services are secondary actors |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role |
| C7 | ✅ | WHY (improve pronunciation) + WHAT (record & score) + OUTCOME (score breakdown with miscues) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, item, mic hardware, service health) |
| C10 | ✅ | Postconditions cover record, miscues, history, attempt count |
| C11 | ✅ | Scoring scale, TTS source, quota policy placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Actor/System subjects alternate throughout |
| C14 | ✅ | No if/else/loop in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (open assessment) → final step saves assessment record |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 5 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers permission denied, no speech, service failure, noise, quota |
| C19 | ✅ | Includes UC-PREM-01 and UC-EXT-02 — both exist in phase 2 UC list |
| C20 | ✅ | Special Requirements are non-functional only |
