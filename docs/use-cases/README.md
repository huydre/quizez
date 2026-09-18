# Use Cases — Quizez MVP

> 19 use cases at user-goal level, generated 2026-09-18 from `docs/user-stories/mvp-core-user-stories.md` and grounded in `docs/explore/openquiz-ai-analysis.md`.
> Format: 13-field template (Wiegers/IIBA) + 20-point quality validation table per file.

## Index

### Auth & Onboarding
| UC | File | Actor | Priority |
|---|---|---|---|
| UC-AUTH-01 Register account | [link](UC-AUTH-01-register-account.md) | Guest | High |
| UC-AUTH-02 Log in to account | [link](UC-AUTH-02-log-in-to-account.md) | Learner | High |
| UC-AUTH-03 Configure learning goal | [link](UC-AUTH-03-configure-learning-goal.md) | Learner | High |
| UC-AUTH-04 Browse public content | [link](UC-AUTH-04-browse-public-content.md) | Guest | Medium |

### Word Sets
| UC | File | Actor | Priority |
|---|---|---|---|
| UC-WSET-01 Create word set manually | [link](UC-WSET-01-create-word-set-manually.md) | Learner | High |
| UC-WSET-02 Import words in bulk | [link](UC-WSET-02-import-words-in-bulk.md) | Learner | High |
| UC-WSET-03 Edit word set | [link](UC-WSET-03-edit-word-set.md) | Learner | High |
| UC-WSET-04 Delete word set | [link](UC-WSET-04-delete-word-set.md) | Learner | Medium |
| UC-WSET-05 Save public word set | [link](UC-WSET-05-save-public-word-set.md) | Learner | High |

### Learning Paths
| UC | File | Actor | Priority |
|---|---|---|---|
| UC-PATH-01 Create learning path | [link](UC-PATH-01-create-learning-path.md) | Learner | Medium |
| UC-PATH-02 Study recommended path | [link](UC-PATH-02-study-recommended-path.md) | Learner | High |

### Study Modes
| UC | File | Actor | Priority |
|---|---|---|---|
| UC-STUDY-01 Review flashcards | [link](UC-STUDY-01-review-flashcards.md) | Learner | High |
| UC-STUDY-02 Practice with Learn mode | [link](UC-STUDY-02-practice-with-learn-mode.md) | Learner | High |
| UC-STUDY-03 Take a test | [link](UC-STUDY-03-take-a-test.md) | Learner | High |
| UC-STUDY-04 Practice dictation | [link](UC-STUDY-04-practice-dictation.md) | Learner | Medium |

### SRS & Progress
| UC | File | Actor | Priority |
|---|---|---|---|
| UC-SRS-01 Review due words | [link](UC-SRS-01-review-due-words.md) | Learner | High |
| UC-SRS-02 Track learning progress | [link](UC-SRS-02-track-learning-progress.md) | Learner | Medium |
| UC-SRS-03 Star and filter words | [link](UC-SRS-03-star-and-filter-words.md) | Learner | Medium |

### Dictionary
| UC | File | Actor | Priority |
|---|---|---|---|
| UC-DICT-01 Look up and save word | [link](UC-DICT-01-look-up-and-save-word.md) | Learner | High |

## Phase 2

### AI Content Generation
| UC | File | Actor | Priority |
|---|---|---|---|
| UC-AI-01 Generate word set with AI | [link](UC-AI-01-generate-word-set-with-ai.md) | Learner | High |
| UC-AI-02 Extract words from image | [link](UC-AI-02-extract-words-from-image.md) | Learner | Medium |

### AI Conversation & Pronunciation
| UC | File | Actor | Priority |
|---|---|---|---|
| UC-CONV-01 Practice AI conversation | [link](UC-CONV-01-practice-ai-conversation.md) | Learner | High |
| UC-CONV-02 Assess pronunciation | [link](UC-CONV-02-assess-pronunciation.md) | Learner | High |

### Classes
| UC | File | Actor | Priority |
|---|---|---|---|
| UC-CLASS-01 Create and manage class | [link](UC-CLASS-01-create-and-manage-class.md) | Teacher | High |
| UC-CLASS-02 Join a class | [link](UC-CLASS-02-join-a-class.md) | Learner | High |
| UC-CLASS-03 Assign classwork | [link](UC-CLASS-03-assign-classwork.md) | Teacher | High |
| UC-CLASS-04 Submit and grade classwork | [link](UC-CLASS-04-submit-and-grade-classwork.md) | Learner | High |

### Gamification
| UC | File | Actor | Priority |
|---|---|---|---|
| UC-GAM-01 Play vocabulary games | [link](UC-GAM-01-play-vocabulary-games.md) | Learner | Medium |
| UC-GAM-02 Compete on leaderboard | [link](UC-GAM-02-compete-on-leaderboard.md) | Learner | Medium |
| UC-GAM-03 Earn and spend coins | [link](UC-GAM-03-earn-and-spend-coins.md) | Learner | Low |

### Browser Extension
| UC | File | Actor | Priority |
|---|---|---|---|
| UC-EXT-01 Save words from any webpage | [link](UC-EXT-01-save-words-from-any-webpage.md) | Learner | High |
| UC-EXT-02 Practice with video captions | [link](UC-EXT-02-practice-with-video-captions.md) | Learner | Medium |

### Premium
| UC | File | Actor | Priority |
|---|---|---|---|
| UC-PREM-01 Upgrade to premium | [link](UC-PREM-01-upgrade-to-premium.md) | Learner | High |
| UC-PREM-02 Manage subscription | [link](UC-PREM-02-manage-subscription.md) | Learner | Medium |
| UC-PREM-03 Redeem promotional premium | [link](UC-PREM-03-redeem-promotional-premium.md) | Learner | Low |

## TBD Status (updated 2026-09-18)

- **RESOLVED — Free-tier limits**: no study/SRS session cap in MVP; design keeps a hook for a future premium cap. Per-set card limits remain open (UC-WSET-01/02 TBD-1).
- **RESOLVED — Import formats**: Anki `.apkg` import added to MVP scope (UC-WSET-02 AC.1). Quizlet exports covered by paste import.
- **OPEN — Frequency numbers**: usage-frequency estimates pending real analytics (multiple files).
- **OPEN — Per-file TBDs**: rating scale (UC-SRS-01), filter combination (UC-SRS-03), conflict-resolution UX (UC-WSET-03), etc. — see each file's Notes and Issues.
