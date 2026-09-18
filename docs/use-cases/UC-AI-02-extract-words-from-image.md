# UC-AI-02: Extract Words from Image

| **Use Case ID:** | UC-AI-02 |
| ---: | :--- |
| **Use Case Name:** | Extract words from image |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner). **Secondary:** OCR Service (extracts text from the uploaded image), LLM Service (identifies vocabulary candidates in the extracted text). |
| ---: | :--- |
| **Description:** | When a learner has vocabulary embedded in a physical or digital source — a textbook page, worksheet, slide, or screenshot — the learner uploads a photo of it, the system extracts the text via OCR, and AI identifies the vocabulary candidates worth learning. The learner selects which candidates to keep, and the system enriches each selected word into a full card via dictionary lookup. The UC ends when the enriched cards are appended to the word set being edited. |
| **Preconditions:** | 1. Learner is authenticated (valid session).<br>2. Learner has a word set open in the Create or Edit form, or starts from the AI tools page.<br>3. Learner has an image file on the device in a supported format (JPG, PNG, WEBP) within the size limit.<br>4. OCR Service and LLM Service are reachable from the backend. |
| **Postconditions:** | 1. One card is created per learner-selected vocabulary candidate and appended to the current card list.<br>2. Each created card is enriched via dictionary lookup (UC-DICT-01) with definition, part of speech, and example where available.<br>3. The learner's image-extraction quota is decremented by one request.<br>4. The uploaded image is not retained beyond the extraction session unless the learner explicitly saves it.<br>5. No word set is persisted until the learner saves the parent form (see UC-WSET-01 / UC-WSET-03). |
| **Priority:** | Medium — high-value ingestion shortcut for learners studying from physical textbooks; secondary to prompt-based generation. |
| **Frequency of Use:** | ~1–3 extractions per active learner per month; peak at semester start when learners digitize textbook word lists. [TBD-1] |
| **Normal Course of Events:** | 1. Learner clicks the **Extract from image** button in the word set form.<br>2. System displays the image upload dialog with a file picker and a camera-capture option on mobile.<br>3. Learner selects or captures an image containing the vocabulary source text.<br>4. System validates the file format and size, then uploads the image to the OCR Service.<br>5. OCR Service returns the extracted text.<br>6. System sends the extracted text to the LLM Service to identify vocabulary candidates.<br>7. LLM Service returns a list of candidate terms found in the text.<br>8. System displays the candidates as a selectable checklist, all checked by default.<br>9. Learner reviews the candidate list and unchecks any terms to exclude.<br>10. Learner clicks the **Create cards** button.<br>11. System invokes UC-DICT-01 to enrich each selected term with definition, part of speech, and example.<br>12. System appends the enriched cards to the word set's card list.<br>13. System closes the dialog and displays the updated card list in the word set form. |
| **Alternative Courses:** | **UC-AI-02.AC.1: Edit a candidate term before creating cards**<br>At step 9, if OCR misread a term or the learner wants to correct a candidate:<br>9a. Learner clicks the term's edit control and corrects the text.<br>9b. System updates the candidate in place → continue from step 9 of the Normal Course.<br><br>**UC-AI-02.AC.2: Add a missing term manually**<br>At step 9, if the learner spots a word in the source that was not detected:<br>9a. Learner clicks **Add term** and types the missing word.<br>9b. System appends it to the candidate checklist as checked → continue from step 9 of the Normal Course.<br><br>**UC-AI-02.AC.3: Crop or retake the image**<br>At step 3, if the learner wants to limit extraction to part of the image:<br>3a. Learner uses the crop control to select the region containing the word list.<br>3b. System uploads only the cropped region → continue from step 4 of the Normal Course. |
| **Exceptions:** | **UC-AI-02.EX.1: Unsupported format or file too large**<br>Trigger: At step 4, the selected file fails validation (not JPG/PNG/WEBP, or exceeds the size limit).<br>Response: System displays "Unsupported image — use JPG, PNG, or WEBP up to 10 MB" and rejects the upload.<br>Final state: Dialog remains open; no upload attempted; quota not consumed.<br><br>**UC-AI-02.EX.2: Unreadable image**<br>Trigger: At step 5, the OCR Service returns empty or garbled text (blurry photo, handwriting, low contrast).<br>Response: System displays "We couldn't read any text in this image — try a sharper, well-lit photo" with a **Retake** option.<br>Final state: No candidates produced; learner may upload a different image; quota not consumed.<br><br>**UC-AI-02.EX.3: No vocabulary candidates detected**<br>Trigger: At step 7, the LLM Service finds no learnable vocabulary in the extracted text.<br>Response: System displays "No vocabulary found in this text" and offers to retry with a different image or add terms manually.<br>Final state: No cards added; learner may continue via AC.2 or restart the flow.<br><br>**UC-AI-02.EX.4: OCR or LLM Service failure**<br>Trigger: At step 4–7, either external service times out or returns an error.<br>Response: System displays "Extraction is unavailable right now — please try again" with a **Retry** button.<br>Final state: Dialog remains open with the uploaded image retained for retry; quota not consumed.<br><br>**UC-AI-02.EX.5: Rate limit / quota exhausted**<br>Trigger: At step 4, the learner's account has no remaining image-extraction quota for the current period.<br>Response: System displays the quota-exhausted message with the reset date and an upgrade prompt (see UC-PREM-01).<br>Final state: Upload is not attempted; dialog remains open. |
| **Includes:** | UC-DICT-01: Look up and save word (enrichment of each selected candidate — invoked at step 11).<br>UC-WSET-01: Create word set manually (the created cards land in this form for saving — invoked at step 12). |
| **Special Requirements:** | **Performance**: Upload + OCR + candidate detection completes ≤ 20s for a 5 MB image; progress indicator shown after 3s.<br>**Security**: Uploaded images are transmitted over TLS, processed in memory or short-lived storage, and deleted after the session; images are never used for model training.<br>**Reliability**: A failed extraction never consumes quota; the uploaded image is retained for one retry within the session.<br>**Compliance**: Learner-uploaded images are treated as user content under the privacy policy; no third-party sharing beyond the OCR/LLM vendors. |
| **Assumptions:** | 1. Free-tier learners have a limited monthly image-extraction quota; premium raises or removes the cap (per UC-PREM-01).<br>2. Source images are primarily printed text; handwriting recognition is best-effort and not guaranteed.<br>3. The OCR Service supports the learner's source language; candidate identification targets the learner's study language. |
| **Notes and Issues:** | [TBD-1] Exact free-tier quota and max image size (10 MB assumed) — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-2] Whether multi-page PDF upload should share this flow or get its own UC — Owner: Product Owner \| Resolution: pending. |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Extract words from image" = verb + object, active voice |
| C2 | ✅ | Postcondition: enriched cards appended — a complete, meaningful result |
| C3 | ✅ | UC-AI-02 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Learner), single goal |
| C5 | ✅ | All steps refer to the Quizez system; OCR/LLM are secondary actors |
| C6 | ✅ | "Learner (registered self-learner)" is a specific role |
| C7 | ✅ | WHY (vocabulary in physical/digital source) + WHAT (upload → OCR → select) + OUTCOME (enriched cards) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, open form, file validity, service health) |
| C10 | ✅ | Postconditions cover cards, enrichment, quota, image retention, persistence boundary |
| C11 | ✅ | Quota-tier and OCR-capability beliefs placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Actor/System subjects alternate throughout |
| C14 | ✅ | No if/else/loop in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (click Extract from image) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point |
| C17 | ✅ | 5 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers bad file, unreadable image, empty result, service failure, quota exhaustion |
| C19 | ✅ | Includes point to existing UC-DICT-01 and UC-WSET-01 |
| C20 | ✅ | Special Requirements are non-functional only |
