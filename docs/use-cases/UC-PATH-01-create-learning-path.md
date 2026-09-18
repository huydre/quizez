## UC-PATH-01: Create learning path

| **Use Case ID:** | UC-PATH-01 |
| ---: | :--- |
| **Use Case Name:** | Create learning path |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Learner (registered self-learner with an active session). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a learner wants to organize vocabulary study by topic or goal instead of studying isolated word sets, the learner creates a learning path that groups multiple existing word sets in a chosen order. The UC ends when the path is saved, appears in the learner's path list with its ordered sets and total word count, and is ready to be studied. |
| **Preconditions:** | 1. Learner is logged in to Quizez.<br>2. Learner owns or has saved at least 1 word set (created via UC-WSET-01/UC-WSET-02 or saved via UC-WSET-05).<br>3. Learner is on a screen that exposes the **Create Path** action (Learning Paths section or home page). |
| **Postconditions:** | 1. A learning path record is saved with a title, an optional goal description, and an ordered list of ≥ 1 word sets.<br>2. The path appears in the learner's **My Paths** list showing the ordered sets and the total word count.<br>3. The path is available as a study source for all study modes (UC-STUDY-01..04). |
| **Priority:** | Medium — organizational feature that improves retention but is not required for the core study loop. |
| **Frequency of Use:** | ~1-2 paths created per active learner per month; system-wide ~300 creations/day at 10k registered learners; peak after onboarding and at the start of exam-prep seasons. |
| **Normal Course of Events:** | 1. Learner navigates to the **Learning Paths** section and clicks **Create Path**.<br>2. System displays the path creation form with fields for title and goal description, plus an empty set list.<br>3. Learner enters a path title and an optional goal description (e.g. "IELTS Reading vocabulary").<br>4. Learner clicks **Add Word Sets**.<br>5. System displays a picker listing the learner's created and saved word sets, each with title and word count.<br>6. Learner selects one or more word sets and confirms.<br>7. System appends the selected sets to the path in selection order and refreshes the total word count.<br>8. Learner clicks **Create**.<br>9. System validates that the title is non-empty and the path contains at least 1 word set.<br>10. System saves the learning path and displays the path detail screen with the ordered sets and total word count. |
| **Alternative Courses:** | **UC-PATH-01.AC.1: Reorder sets before saving**<br>At step 7, if the learner wants a different study order:<br>7a. Learner drags a set to a new position (or uses the move up/down controls).<br>7b. System reorders the set list and updates the displayed order numbers.<br>→ continue from step 8 of the Normal Course.<br><br>**UC-PATH-01.AC.2: Remove a set before saving**<br>At step 7, if the learner added a set by mistake:<br>7a. Learner clicks the **Remove** icon on a set row.<br>7b. System removes the set from the path and refreshes the total word count.<br>→ continue from step 8 of the Normal Course.<br><br>**UC-PATH-01.AC.3: Save path as draft and add sets later**<br>At step 8, if the learner wants to finish organizing later:<br>8a. Learner clicks **Save Draft** instead of **Create**.<br>8b. System saves the path with status "Draft" and returns to the **My Paths** list.<br>→ UC ends; the draft can be completed via the path edit flow (see Notes). |
| **Exceptions:** | **UC-PATH-01.EX.1: Path submitted with zero word sets**<br>Trigger: At step 9, the path contains no word sets.<br>Response: System displays "Add at least 1 word set to create a path" and highlights the empty set list.<br>Final state: No path is created; the form retains the entered title and goal.<br><br>**UC-PATH-01.EX.2: Set already in the path**<br>Trigger: At step 6, the learner selects a word set that is already in the path's set list.<br>Response: System marks the duplicate set as already added in the picker and excludes it from the confirmed selection.<br>Final state: The set list is unchanged; other valid selections are still appended.<br><br>**UC-PATH-01.EX.3: Missing path title**<br>Trigger: At step 9, the title field is empty or whitespace-only.<br>Response: System displays "Enter a path title" and focuses the title field.<br>Final state: No path is created; selected sets remain in the form.<br><br>**UC-PATH-01.EX.4: Referenced set no longer available**<br>Trigger: At step 9, a selected set has been deleted or made private by its author since the picker loaded.<br>Response: System removes the stale set from the list, displays "One set is no longer available and was removed", and re-validates.<br>Final state: If ≥ 1 set remains, the learner may resubmit; if the list is now empty, EX.1 applies. |
| **Includes:** | None. (Creating the underlying word sets is covered by UC-WSET-01 and UC-WSET-02; saving public sets by UC-WSET-05.) |
| **Special Requirements:** | **Performance**: Path creation form and set picker load ≤ 2s with up to 200 learner-owned/saved sets.<br>**Usability**: Set picker supports search/filter by title; reorder works via drag-and-drop on desktop and move controls on mobile.<br>**Reliability**: Form state is preserved locally if the learner navigates away mid-creation (consistent with word-set draft autosave).<br>**Security**: Only sets the learner owns or has saved are selectable; server re-validates set accessibility on save. |
| **Assumptions:** | 1. A learning path references word sets rather than copying them — edits to a set propagate to every path containing it.<br>2. There is no hard cap on the number of sets per path for MVP (UI remains usable up to ~50 sets).<br>3. Path visibility follows the same public/private model as word sets; default is private. |
| **Notes and Issues:** | [TBD-1] Should a dedicated "Edit learning path" UC be specified separately, or does this UC's edit flow cover post-creation changes? \| Owner: Quizez BA \| Due: 2026-09-25 \| Resolution: TBD — currently assumed covered by re-entering this flow on an existing path.<br>[TBD-2] Can learners add public sets they have not saved to a path? \| Owner: Product Team \| Due: 2026-09-25 \| Resolution: TBD — MVP assumes only owned/saved sets are selectable.<br>[NOTE] Recommended/system-curated paths are created by the content team, not through this learner-facing flow — see UC-PATH-02. |

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Create learning path" = verb + object, active voice, no actor name. |
| C2 | ✅ | User-goal level: learner ends with a saved, study-ready path — passes coffee-break test. |
| C3 | ✅ | UC-PATH-01 unique in the UC register, matches UC-<module>-<seq>. |
| C4 | ✅ | Single primary actor (Learner); single goal (path created). |
| C5 | ✅ | All "System" steps refer to the Quizez web app; no external system mixed in. |
| C6 | ✅ | Actor is a specific role: registered self-learner. |
| C7 | ✅ | Description covers WHY (organize study by topic), WHAT (group sets in order), OUTCOME (saved path). |
| C8 | ✅ | Quantified: ~1-2/learner/month, ~300/day system-wide, seasonal peak. |
| C9 | ✅ | Preconditions verifiable: login state, ≥1 owned/saved set, entry point exists. |
| C10 | ✅ | Postconditions cover data state (path record), list visibility, and study-mode availability. |
| C11 | ✅ | Preconditions are system-checkable; unverifiable items (reference semantics, caps) are in Assumptions. |
| C12 | ✅ | Numbered steps, one action each; compound inputs (title + goal) are same-kind form fields. |
| C13 | ✅ | Alternates Learner/System subjects throughout the dialog. |
| C14 | ✅ | No if/else/loops in Normal Course; branching moved to AC.1-AC.3 and EX.1-EX.4. |
| C15 | ✅ | Step 1 = trigger (Create Path); step 10 achieves the postcondition (path saved and displayed). |
| C16 | ✅ | Each AC cites its step, condition, lettered sub-steps, and rejoin point. |
| C17 | ✅ | Each EX has trigger + response + final state. |
| C18 | ✅ | Covers validation errors (EX.1, EX.3), business-rule violation (EX.2), and stale-data/concurrency (EX.4). |
| C19 | ✅ | Includes = None; related UCs referenced by ID in Notes only. |
| C20 | ✅ | Special Requirements are non-functional only (performance, usability, reliability, security). |
