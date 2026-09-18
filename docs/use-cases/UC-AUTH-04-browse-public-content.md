## UC-AUTH-04: Browse Public Content

| **Use Case ID:** | UC-AUTH-04 |
| ---: | :--- |
| **Use Case Name:** | Browse public content |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Guest (unauthenticated visitor). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a visitor wants to evaluate Quizez content quality before deciding to register, the guest browses the catalog of public learning paths and word sets and opens individual sets in read-only mode. The UC ends when the guest has viewed public content — or is redirected to registration/login upon attempting a protected action such as **Study**, **Save**, or **Create word set**. |
| **Preconditions:** | 1. Guest is not authenticated (no active Quizez session).<br>2. Guest has access to the Quizez web app over a working internet connection.<br>3. At least one public word set or learning path exists in the catalog. |
| **Postconditions:** | 1. The guest has viewed the public catalog and/or a public word set's contents in read-only mode.<br>2. No account state is created or modified for the guest.<br>3. If the guest attempted a protected action, the guest is on the login/registration page with the original destination recorded for post-login redirect. |
| **Priority:** | Medium — Supports acquisition and content evaluation; valuable for conversion but not on the core learning loop. |
| **Frequency of Use:** | ~500–1,500 browsing sessions/day at MVP scale; peak ~200/hour from search-engine and campaign landing traffic. |
| **Normal Course of Events:** | 1. Guest opens the Quizez home page or the public search page.<br>2. System displays the catalog of public learning paths and word sets, each entry showing title, card count, and author.<br>3. Guest scrolls the catalog or enters a search keyword.<br>4. System filters the catalog to matching public content.<br>5. Guest selects a public word set.<br>6. System opens the word set in read-only mode, displaying its terms with definitions, pronunciation, and examples.<br>7. Guest reviews the word list and may select another public item → steps 5–6 repeat for each item the guest opens. |
| **Alternative Courses:** | **UC-AUTH-04.AC.1: Guest attempts a protected action**<br>At step 6 of the Normal Course, if the guest selects **Study**, **Save**, or **Create word set**:<br>6a. System records the current page as the post-login destination.<br>6b. System redirects the guest to the login/registration page (UC-AUTH-02 / UC-AUTH-01).<br>6c. After successful authentication, system returns the learner to the recorded page → the UC ends with the guest converted to an authenticated learner.<br><br>**UC-AUTH-04.AC.2: Guest opens a public learning path**<br>At step 5 of the Normal Course, if the guest selects a public learning path instead of a word set:<br>5a. System displays the path's overview: title, description, author, and the ordered list of its word sets.<br>5b. Guest selects a word set inside the path → continue from step 6 of the Normal Course (read-only view).<br><br>**UC-AUTH-04.AC.3: Guest registers or logs in voluntarily**<br>At any step of the Normal Course, if the guest selects **Sign Up** or **Log In** without being prompted:<br>Na. System records the current page as the post-login destination.<br>Nb. Guest completes UC-AUTH-01 or UC-AUTH-02 → the UC ends with the guest converted to an authenticated learner. |
| **Exceptions:** | **UC-AUTH-04.EX.1: Selected content is no longer public**<br>Trigger: At step 6, the selected word set or path has been switched to private or deleted since the catalog was loaded.<br>Response: System displays "This content is no longer available" and offers a link back to the public catalog.<br>Final state: No content displayed; the guest returns to the catalog and may select another item.<br><br>**UC-AUTH-04.EX.2: Catalog fails to load**<br>Trigger: At step 2 or 4, the catalog request times out or the connection drops.<br>Response: System displays "Could not load content — check your connection" with a **Retry** action.<br>Final state: No catalog displayed; the guest may retry once connectivity returns.<br><br>**UC-AUTH-04.EX.3: Search returns no results**<br>Trigger: At step 4, no public content matches the entered keyword.<br>Response: System displays "No public sets or paths found" with suggestions to broaden the keyword or browse featured content.<br>Final state: Empty result list displayed; the guest may adjust the search or return to the full catalog. |
| **Includes:** | None. UC-AUTH-01 and UC-AUTH-02 are invoked only via the redirect paths in AC.1 and AC.3; they are successor flows, not included sub-UCs. |
| **Special Requirements:** | **Performance**: Public catalog renders ≤ 2s on a 4G connection; word-set detail opens ≤ 1.5s.<br>**SEO**: Public catalog and set pages are crawlable and carry correct metadata (the acquisition channel for this UC).<br>**Security**: Read-only mode exposes no edit, save, or study endpoints; protected actions always route through authentication.<br>**Usability**: Catalog is browsable on mobile viewports; card counts and author names are visible without opening each item. |
| **Assumptions:** | 1. A meaningful volume of public content exists at launch (curated sets plus learner-published sets).<br>2. Guests tolerate a login wall for study/save actions; read-only preview is sufficient for evaluation.<br>3. Search relevance over public content is acceptable with simple keyword matching for MVP.<br>4. No rate limiting is needed on public browsing beyond standard API throttling. |
| **Notes and Issues:** | [TBD-1] Whether guests can preview a limited flashcard session (e.g. first 5 cards) before the login wall, or preview is strictly read-only \| Owner: Product Team \| Due: 2026-10-15 \| Resolution: TBD — MVP defaults to read-only<br>[TBD-2] Whether public user profiles are in MVP scope (OpenQuiz exposes `/user/:userId`) \| Owner: Product Team \| Due: 2026-11-01 \| Resolution: TBD<br>[NOTE] Post-login redirect must preserve the exact deep link (set ID, path ID, or search query) — coordinate with UC-AUTH-02.AC.2. |

## Quality Validation

| Item | Status | Note |
| --- | :---: | --- |
| C1 | ✅ | "Browse public content" = active verb + object, no actor embedded. |
| C2 | ✅ | User-goal level: guest finishes having evaluated content — coffee-break test passes. |
| C3 | ✅ | ID `UC-AUTH-04` unique per the contract UC list, follows `UC-<module>-<seq>`. |
| C4 | ✅ | One primary actor (Guest); single goal: evaluate public content. |
| C5 | ✅ | All "System" steps refer to the Quizez web app; no secondary actor needed. |
| C6 | ✅ | Actor is a specific role (Guest), not generic "User". |
| C7 | ✅ | Description covers WHY (evaluate before registering), WHAT (browse catalog/sets), OUTCOME (content viewed or auth redirect). |
| C8 | ✅ | Frequency quantified (~500–1,500 sessions/day, peak ~200/hour); MVP estimate flagged as such. |
| C9 | ✅ | Preconditions are verifiable (session state, connectivity, catalog non-empty). |
| C10 | ✅ | Postconditions cover viewed state, unchanged account state, and redirect state. |
| C11 | ✅ | Preconditions (verifiable) vs. Assumptions (product beliefs) kept separate. |
| C12 | ✅ | Numbered steps, one action each; repeat browsing expressed as a step-range repeat, not an embedded loop. |
| C13 | ✅ | Guest/System alternation maintained throughout the dialog. |
| C14 | ✅ | No if/else in the Normal Course; protected-action and path branches live in AC. |
| C15 | ✅ | Step 1 = trigger (opens home/search); step 7 reaches the postcondition (content reviewed). |
| C16 | ✅ | All 3 ACs name the step, condition, lettered sub-steps, and rejoining point. |
| C17 | ✅ | All 3 exceptions specify trigger, response, and final state. |
| C18 | ✅ | Covers business-rule violation (content privatized), network failure, and empty-result edge case. |
| C19 | ✅ | Includes = None (explicitly justified); only contract IDs (UC-AUTH-01, UC-AUTH-02) are referenced. |
| C20 | ✅ | Special Requirements are non-functional (performance, SEO, security, usability). |
