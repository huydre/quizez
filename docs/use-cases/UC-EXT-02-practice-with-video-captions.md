# UC-EXT-02: Practice with Video Captions

| **Use Case ID:** | UC-EXT-02 |
| ---: | :--- |
| **Use Case Name:** | Practice with video captions |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner, signed in to the Quizez browser extension). **Secondary:** Speech Assessment Service (pronunciation scoring for shadowing), TTS Service. |
| ---: | :--- |
| **Description:** | When a learner watches a captioned video on a supported site (e.g., YouTube or a Netflix-style streaming page), the Quizez extension replaces the site's original captions with its own interactive caption panel so the learner can practice each line. The learner chooses a practice mode — dictation, cloze, or shadowing — works through the caption lines, and optionally records shadowing attempts for pronunciation scoring. The UC ends when the learner completes a practice pass over the video's captions and the results are saved to the learner's practice history. |
| **Preconditions:** | 1. Quizez browser extension is installed, enabled, and the learner is authenticated.<br>2. Learner is on a supported video page with a playable video.<br>3. The video exposes caption/subtitle data readable by the extension. |
| **Postconditions:** | 1. A practice session record is saved with mode, per-line results, and shadowing scores.<br>2. Words the learner saved during practice are added to the chosen word set (see UC-EXT-01).<br>3. Shadowing recordings and scores are available in the learner's speaking history (feeds UC-CONV-02). |
| **Priority:** | Medium — differentiated feature (video-context practice) but depends on the extension channel and supported sites. |
| **Frequency of Use:** | ~3–7 sessions per active extension user per week; average session 10–20 minutes; peak evenings/weekends. [TBD-1] |
| **Normal Course of Events:** | 1. Learner opens a video on a supported site and clicks the Quizez extension's **Practice captions** toggle.<br>2. System hides the site's original captions and renders the Quizez caption panel listing the video's caption lines with timestamps.<br>3. Learner selects a practice mode: **Dictation**, **Cloze**, or **Shadowing**.<br>4. System starts the video and displays the current caption line in the chosen mode (blanked text for dictation, gapped text for cloze, full text for shadowing).<br>5. Learner completes the line — types the dictation/cloze answer, or clicks **Record** and repeats the line aloud.<br>6. System evaluates the attempt: text match for dictation/cloze, or sends the recording to the Speech Assessment Service and displays the pronunciation score for shadowing.<br>7. System advances to the next caption line.<br>8. Steps 4–7 repeat until the learner finishes the video or clicks **End session**.<br>9. System displays a session summary: lines completed, accuracy, and average shadowing score.<br>10. System saves the session record to the learner's practice history. |
| **Alternative Courses:** | **UC-EXT-02.AC.1: Auto-translate a caption line**<br>At step 4, if the learner wants the line's meaning:<br>4a. Learner clicks the **Translate** icon on the caption line.<br>4b. System displays the line translated into the learner's native language beneath the original → continue from step 5 of the Normal Course.<br><br>**UC-EXT-02.AC.2: Save a word from a caption**<br>At step 4, if the learner clicks a word inside a caption line:<br>4a. System pauses the video and opens the dictionary popup for that word (invokes UC-EXT-01 lookup).<br>4b. Learner saves the word to a word set per UC-EXT-01.<br>4c. System resumes the video at the paused caption line → continue from step 5 of the Normal Course.<br><br>**UC-EXT-02.AC.3: Replay a line**<br>At step 5, if the learner wants to hear the line again:<br>5a. Learner clicks the **Replay** button.<br>5b. System seeks the video back to the line's start timestamp and replays it → continue from step 5 of the Normal Course. |
| **Exceptions:** | **UC-EXT-02.EX.1: No captions available**<br>Trigger: At step 2, the video has no caption track readable by the extension.<br>Response: System displays "No captions found for this video" and offers **Try auto-generated captions** where the site provides them.<br>Final state: If no caption source exists, the panel does not open and no session is created; the site's original captions are untouched.<br><br>**UC-EXT-02.EX.2: DRM-blocked video**<br>Trigger: At step 2, the page's content protection prevents the extension from reading caption data or overlaying the video.<br>Response: System displays "This video is protected — caption practice isn't available here" and disables the practice toggle for the page.<br>Final state: No caption panel is rendered; no session is created.<br><br>**UC-EXT-02.EX.3: Unsupported site**<br>Trigger: At step 1, the learner opens the extension on a site not on the supported list.<br>Response: System shows the practice toggle as disabled with the tooltip "Caption practice isn't supported on this site yet".<br>Final state: No panel is rendered; learner may still use UC-EXT-01 word saving on the page's text.<br><br>**UC-EXT-02.EX.4: Speech assessment unavailable**<br>Trigger: At step 6, the Speech Assessment Service times out or returns an error for a shadowing recording.<br>Response: System displays "Couldn't score that attempt — try again" and keeps the recording queued for one retry.<br>Final state: On retry success the flow resumes at step 6; on repeated failure the line is marked unscored and the session continues at step 7.<br><br>**UC-EXT-02.EX.5: Microphone permission denied**<br>Trigger: At step 5, the learner clicks **Record** in Shadowing mode but the browser has not granted microphone access.<br>Response: System shows the browser permission prompt guidance and a **Grant microphone access** button.<br>Final state: If permission is granted, flow resumes at step 5; if denied, shadowing recording is unavailable — the learner may switch to Dictation or Cloze mode. |
| **Includes:** | UC-EXT-01: Save words from any webpage (invoked at AC.2).<br>UC-CONV-02: Assess pronunciation (shadowing scoring invoked at step 6 via the Speech Assessment Service). |
| **Special Requirements:** | **Performance**: Caption panel renders within 2s of toggling; per-line evaluation feedback ≤ 1s for text modes, ≤ 4s for shadowing scoring.<br>**Security**: Recordings are transmitted over TLS and processed per the audio retention policy; no page credentials are accessed by the extension.<br>**Reliability**: Original site captions must be restored exactly when the panel is closed or the extension errors.<br>**Usability**: Panel must not obstruct essential video controls; supports keyboard shortcuts for replay/record. |
| **Assumptions:** | 1. Supported sites expose caption text in the DOM or via a readable caption track (OpenQuiz reference: reads caption segments and hides originals).<br>2. Free tier may cap caption-practice sessions per month — premium introduces caps as its value prop; exact limit TBD.<br>3. Learner's browser allows microphone capture on the site for shadowing mode. |
| **Notes and Issues:** | [TBD-1] Usage volume pending extension analytics — Owner: Product Owner \| Due: after beta \| Resolution: pending.<br>[TBD-2] Initial supported-site list (YouTube confirmed; Netflix-style DRM sites likely EX.2) — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-3] Free-tier monthly session cap for caption practice — Owner: Product Owner \| Due: before dev start \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Practice with video captions" = verb + object, active voice |
| C2 | ✅ | Postcondition: practice session recorded — complete, meaningful result |
| C3 | ✅ | UC-EXT-02 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner), single goal |
| C5 | ✅ | "System" = Quizez extension + backend; Speech Assessment/TTS are secondary actors |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role |
| C7 | ✅ | WHY (watching captioned video) + WHAT (per-line practice) + OUTCOME (session saved) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (extension auth, supported page, caption data present) |
| C10 | ✅ | Postconditions cover session record, saved words, speaking history |
| C11 | ✅ | DOM-caption and free-cap beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each; repeat stated as "Steps 4–7 repeat until…" |
| C13 | ✅ | Actor/System subjects alternate throughout |
| C14 | ✅ | No if/else in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (toggle on video page) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 5 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers no captions, DRM, unsupported site, service failure, permission denied |
| C19 | ✅ | Includes UC-EXT-01 and UC-CONV-02 — both in the UC register |
| C20 | ✅ | Special Requirements are non-functional only |
