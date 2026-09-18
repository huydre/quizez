# UC-CLASS-01: Create and Manage Class

| **Use Case ID:** | UC-CLASS-01 |
| ---: | :--- |
| **Use Case Name:** | Create and manage class |
| **Created By:** | Quizez BA | **Last Updated By:** | Quizez BA |
| **Date Created:** | 2026-09-18 | **Date Last Updated:** | 2026-09-18 |

| **Actor:** | **Primary:** Teacher (educator managing classes). **Secondary:** None. |
| ---: | :--- |
| **Description:** | When a teacher wants to run guided vocabulary study for a group of learners, the teacher creates a class with a name and description, receives a unique join code and invite link to distribute, and manages the class over time — viewing the roster, removing learners, and updating class settings. The UC ends when the class exists with a shareable join code/link and the teacher has confirmed the roster and settings on the class management page. |
| **Preconditions:** | 1. Teacher is authenticated (valid session).<br>2. Teacher's account has the Teacher role enabled.<br>3. Teacher has not reached the maximum number of active classes per account. |
| **Postconditions:** | 1. A class record exists with status='Active', owned by the teacher.<br>2. A unique join code and a shareable invite link are associated with the class.<br>3. The class appears in the teacher's **Classes** list.<br>4. Any settings edits are saved and reflected on the class management page.<br>5. Any removed learner no longer appears on the roster and loses access to class assignments. |
| **Priority:** | High — foundation of the classroom module; UC-CLASS-02/03/04 all depend on an existing class. |
| **Frequency of Use:** | ~1–3 classes created per active teacher per school term; roster/settings management ~2–5 times per week per active class. Peak at semester start. [TBD-1] |
| **Normal Course of Events:** | 1. Teacher navigates to the **Classes** section and clicks **Create class**.<br>2. System displays the Create Class form with a class name field (required) and a description field (optional).<br>3. Teacher enters the class name and an optional description.<br>4. Teacher clicks the **Create** button.<br>5. System validates the class name (non-empty, within the length limit).<br>6. System creates the class and generates a unique join code and a shareable invite link.<br>7. System displays the class management page showing the join code, the invite link, and the **Members** roster.<br>8. Teacher copies the join code or invite link to distribute to learners.<br>9. Teacher opens **Class settings**, edits the name or description, and clicks **Save**.<br>10. System saves the changes and displays the updated class management page. |
| **Alternative Courses:** | **UC-CLASS-01.AC.1: Remove a learner from the roster**<br>At step 7, if the teacher wants to remove an enrolled learner:<br>7a. Teacher opens the **Members** tab, selects the learner, and clicks **Remove**.<br>7b. System displays a confirmation prompt naming the learner.<br>7c. Teacher confirms the removal.<br>7d. System removes the learner from the roster and revokes their access to class assignments → continue from step 8 of the Normal Course.<br><br>**UC-CLASS-01.AC.2: Regenerate the join code**<br>At step 8, if the current join code has been shared too widely or compromised:<br>8a. Teacher clicks **Regenerate code**.<br>8b. System invalidates the old code and invite link and issues a new unique pair.<br>8c. System displays the new code and link → continue from step 8 of the Normal Course (teacher distributes the new code).<br><br>**UC-CLASS-01.AC.3: Archive the class**<br>At step 9, if the class has ended (e.g., term finished):<br>9a. Teacher clicks **Archive class** and confirms.<br>9b. System sets the class status to 'Archived', hides it from learners' active class lists, and disables joins and new assignments.<br>9c. System retains all assignments, submissions, and grades as read-only → the UC ends (class preserved for record-keeping). |
| **Exceptions:** | **UC-CLASS-01.EX.1: Invalid class name**<br>Trigger: At step 5, the name is empty, whitespace-only, or exceeds the length limit.<br>Response: System displays a validation error next to the name field and does not create the class.<br>Final state: Form remains open with entered values preserved; no class created.<br><br>**UC-CLASS-01.EX.2: Join code collision**<br>Trigger: At step 6, the generated join code already exists for another active class.<br>Response: System discards the colliding code and regenerates, retrying up to 5 times.<br>Final state: Class is created with a verified-unique code. If all retries are exhausted, the class is not created and the system displays "Could not create the class — please try again."<br><br>**UC-CLASS-01.EX.3: Removing a learner with pending work**<br>Trigger: At step 7b (AC.1), the selected learner has in-progress or ungraded submissions.<br>Response: System extends the confirmation prompt with a warning ("This learner has N ungraded submissions") and requires explicit confirmation.<br>Final state: On confirmation, the learner is removed; their existing submissions and grades are preserved as read-only records for the teacher. On cancel, the roster is unchanged.<br><br>**UC-CLASS-01.EX.4: Class limit reached**<br>Trigger: At step 4, the teacher already owns the maximum number of active classes.<br>Response: System displays "You have reached the class limit — archive an existing class to create a new one."<br>Final state: No class created; teacher is directed to the class list to archive an old class. |
| **Includes:** | None. |
| **Special Requirements:** | **Performance**: Class creation including code generation completes ≤ 2s; roster of 200 members loads ≤ 2s.<br>**Security**: Only the owning teacher can view the management page, regenerate codes, remove members, or archive the class; join codes are unguessable (≥ 6 characters from an unambiguous alphabet).<br>**Reliability**: Code regeneration is atomic — the old code stops working the moment the new one is issued.<br>**Compliance**: Removing a learner must not delete their submission records (audit/record-keeping). |
| **Assumptions:** | 1. Duplicate class names are allowed — classes are distinguished by ID and join code, not name.<br>2. One teacher owns one class; co-teacher roles are out of scope for this phase.<br>3. The invite link is a URL embedding the join code that routes to UC-CLASS-02.<br>4. Archived classes are never hard-deleted in this phase. |
| **Notes and Issues:** | [TBD-1] Maximum classes per teacher and maximum learners per class — Owner: Product Owner \| Due: before dev start \| Resolution: pending.<br>[TBD-2] Whether removed learners keep read access to their own past grades — Owner: Product Owner \| Due: before dev start \| Resolution: pending (current spec: teacher retains records; learner access TBD). |

---

## Quality Validation

| Item | Status | Note |
|---|---|---|
| C1 | ✅ | "Create and manage class" = verb + object; "manage" retained per assigned scope (create + roster + settings in one teacher goal) |
| C2 | ✅ | Postcondition: active class with join code — teacher can stop and share it |
| C3 | ✅ | UC-CLASS-01 unique in master list, correct format |
| C4 | ✅ | Single primary actor (Teacher), single goal |
| C5 | ✅ | All steps refer to the Quizez system only |
| C6 | ✅ | "Teacher (educator managing classes)" is a specific role |
| C7 | ✅ | WHY (run guided study) + WHAT (create class, get code, manage roster/settings) + OUTCOME (active class, shareable code) |
| C8 | ⚠️ | Quantified as estimate; real analytics pending [TBD-1] |
| C9 | ✅ | Preconditions verifiable (session, role, class count) |
| C10 | ✅ | Postconditions cover class record, code/link, list visibility, settings, roster state |
| C11 | ✅ | Duplicate-name policy and single-owner belief placed in Assumptions |
| C12 | ✅ | Numbered steps, one action each |
| C13 | ✅ | Teacher/System subjects alternate throughout |
| C14 | ✅ | No if/else/loop in Normal Course; branches in AC/EX |
| C15 | ✅ | Trigger (click Create class) → final step achieves postcondition |
| C16 | ✅ | 3 ACs, each with step reference, sub-steps, rejoin point or explicit end |
| C17 | ✅ | 4 exceptions, each with trigger/response/final state |
| C18 | ✅ | Covers validation error, code collision (concurrency), business-rule violation (limit), pending-work removal |
| C19 | ✅ | No Includes — field correctly states None |
| C20 | ✅ | Special Requirements are non-functional only |
