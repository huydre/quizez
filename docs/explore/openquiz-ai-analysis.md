# Phân tích OpenQuiz.ai — Khảo sát chi tiết

> Ngày khảo sát: 2026-09-18 · Phương pháp: duyệt trực tiếp qua Chrome relay (session đã đăng nhập), phân tích SPA bundle `index-CFVHKBEQ.js` (~1.6MB) + ~20 lazy chunk, sitemap, robots.txt, các trang tĩnh (about/pricing/vs-*/privacy), Play Store listing, và giải nén Chrome extension (CRX).

## 1. Tổng quan sản phẩm

- **Định vị**: "Free Vocabulary Learning | Quizlet & Anki Alternative" — nền tảng học từ vựng ngoại ngữ bằng flashcard + AI, hướng chủ yếu đến **người Việt học tiếng Anh** (UI tiếng Việt native, nội dung IELTS/TOEIC/THPT), mở rộng sang Hàn/Nhật/Trung và 68 ngôn ngữ học.
- **Quy mô tự công bố**: 120,000+ MAU (meta description, trang so sánh); JSON-LD ghi `userInteractionCount: 60000` — hai con số không khớp, con số marketing không nhất quán.
- **Nền tảng**: Web SPA (React + Vite, Capacitor cho mobile), Android (`com.openquiz.ai`), iOS (`id6767530658`), Chrome Extension (`openquiz-ytnetflix-shadow`, ~20.000 users, rating 4.2/20), PWA (manifest + FCM push).
- **Kiến trúc**: FE tĩnh trên openquiz.ai; BE tại `openquiz-be-production.up.railway.app/api` (Railway, FastAPI — lỗi trả về dạng `{"detail": …}`); auth bằng **Firebase** (ID token trong header `authorization`); env dev `dev.openquiz.ai`, staging `staging.openquiz.ai`, local dev BE `:8096`.
- **Analytics**: Microsoft Clarity (`clarity.ms/tag/u7cl98uyxh`), hệ thống ads attribution tự xây (`/ads/event` + `oq-ads-visitor-id`).

## 2. Danh sách chức năng (map từ routes + UI thực tế)

### 2.1 Học từ vựng — lõi
- **Bộ thẻ (word set / study-set)**: term, definition, ảnh, phát âm IPA, loại từ, ví dụ, từ đồng nghĩa. Public/private toggle.
- **Lộ trình học (learning path)**: nhóm nhiều bộ thẻ theo chủ đề/mục tiêu; có lộ trình gợi ý do "Openquiz Team" tuyển chọn (IELTS, TOEIC, A1–C2, THPT, Business, Medical, Technical English…).
- **9 chế độ học mỗi bộ từ** (xác nhận trên UI + onboarding):
  1. Flashcard (ôn mặt chữ/nghĩa)
  2. Học (Learn — ghi nhớ, gõ đáp án, tự nhớ trước khi xem)
  3. Kiểm tra / Test & Game (multiple choice, matching, typing…)
  4. Nghe chép (Dictation — nghe rồi viết lại)
  5. Speaking (luyện nói với từ)
  6. Hội thoại (AI conversation theo chủ đề)
  7. Ngữ pháp (dịch câu, đặt câu — `/grammar/generate-sentence`, `/grammar/evaluate-translation`)
  8. Đọc hiểu (AI sinh bài đọc — `/reading/generate-reading`)
  9. Đánh giá phát âm (Pronunciation assessment — **Microsoft Azure Speech**, "Powered by Microsoft", chấm điểm tới từng phoneme, quảng cáo "độ chính xác 99%")
- **Lặp lại ngắt quãng (SRS)**: SM-2 cải tiến, dashboard "Từ đến hạn / Thuần thục / Dự báo ôn tập 7 ngày", `/repetition/*`, `/user-srs/summary`, `/repetition/memory-stats`. Freeze streak bằng coin.
- **AI Study** (`/ai-study/:id`): chế độ học có AI đi kèm.
- **Comprehensive mode** (`/comprehensive/:id`): ôn tổng hợp theo **chunk 5 từ**, kết quả test lưu localStorage (`comprehensive-test-results-{id}`).
- **Exam mode** (`/exam/:id`): bài kiểm tra trắc nghiệm/điền từ theo vòng, lọc theo từ đánh dấu sao hoặc chưa học.
- **Game** (`/game/:gameType/:id`): 3 game — `word-matching`, `tank-crash` ("Húc Cổng"), `word-runner` — score + lives + leaderboard riêng từng game (`/game/session/start`, `/game/score`, `/game/quota`).

### 2.2 Tạo & nhập nội dung (data ingestion — mục 3 chi tiết)
- Tạo bộ thẻ thủ công (không giới hạn, kèm auto-suggest).
- **Import paste** từ Word/Excel/Google Docs — delimiter tùy chọn (tab/comma/semicolon/newline); marketing nói hỗ trợ CSV từ Quizlet và Anki package.
- **"Thêm từ vựng thông minh"**: 2 tab — *Chụp ảnh* (upload `image/*` → `/wset-generate/extract-words-from-image`, `/image-search/upload`) và *AI Chat* (prompt text → `/wset-generate/generate-words-flexible`, `/generate-wsets-flexible`).
- **AI tạo lộ trình**: mô tả yêu cầu + số bộ thẻ → sinh cả learning path.
- **Tra từ** (dictionary popup): tra nghĩa/IPA/loại từ/ví dụ/đồng nghĩa/từ ghép → nút "Thêm vào thẻ". Tra từ AI bị rate-limit (free ~5 lượt/tháng).
- **Chrome Extension**: dịch từ trên bất kỳ trang nào, tự trích xuất câu ví dụ, reverse-translate từ ngôn ngữ mẹ đẻ → ngôn ngữ đang học, lưu thẳng vào bộ từ; xem tiến độ trong extension. Có trang privacy/terms riêng cho extension.
- Sao chép/lưu lộ trình & bộ thẻ public của người khác (`/learning-paths/saved-status`, `/words/wset/saved-status`).

### 2.3 Luyện nói & AI
- **Hội thoại AI** (`/conversation/:id`, `/chat/create-thread`, `/chat/send-message`, `/chat/save-message-evaluation`): chọn chủ đề hoặc AI tự chọn theo bộ từ; giới hạn lượt min/max; có thể giao thành bài tập lớp học với **AI chấm điểm theo rubric**.
- **Mô phỏng thi IELTS Speaking**: 121 chủ đề chia Part 1 / Part 2 (**57 cue-card dạng "Describe a…"**) / Part 3 / general / mixed; chủ đề lưu theo từng part trong localStorage; có custom topic.
- **Speaking practice**: `/speaking-question/generate-question`, `/speaking-feedback/assess-sentence`, `/speaking-feedback/analyze-phrases`, `/wset-generate/evaluate-speaking`.
- **Shadowing** (extension + app): nghe-nói lại kèm đánh giá phát âm.
- **TTS**: `/tts/get-word-mp3`, `/tts/stream-tts` (BE proxy).
- **AI chấm bài theo kỳ thi**: `/ielts-evaluation/*`, `/toeic-evaluation/*`, `/hsk-evaluation/*`, `/course-evaluation/*`, `/general-evaluation/*` (evaluate-answer + recommend-answer — AI chấm và gợi ý câu trả lời band cao hơn).
- **Speaking history theo kỳ thi**: `/speaking-history/scores-by-exam` — lưu điểm theo từng loại kỳ thi (IELTS band…), kèm recommended answer có nút nghe TTS.

### 2.4 Lớp học & giáo viên
- Tạo/tham gia lớp (`/classes`, `/class/:id/manage`), giao bài tập mọi dạng (trắc nghiệm, viết, nghe chép, speaking, shadowing, essay), deadline tới từng phút, AI auto-grading hoặc giáo viên chấm tay, bảng xếp hạng lớp, exercise library (`/exercise-library`).
- Gói Premium nhóm cho lớp (`/payment-qr-group/:planType/:groupSize`, `/premium-group/*`) — giảm 10%.

### 2.5 Cộng đồng & gamification
- **Discussion forum** (`/discussion`, `/discussion/:slug`): bài viết, upvote, comment, ghim, gắn lớp/lộ trình, trending.
- **Xếp hạng**: weekly/monthly leaderboard (`/user-activities/weekly-leaderboard`), hệ rank Đồng→Thế Giới, nhận thưởng theo hạng.
- **Shop + Lootbox**: coin, mua avatar frame/freeze, mở hộp quà (`/shop/*`, `/lootbox/open`, `/lootbox/{item}/odds`).
- **Streak + Freeze**: chuỗi ngày học, freeze cứu streak.
- **Referral**: "Giới thiệu nhận Premium" (`/gioi-thieu-nhan-premium`, `/free-premium`).
- User profile công khai (`/user/:userId`), tìm user qua email (`/user-info/search-by-email`).

### 2.6 Khác
- **Khoá học Speaking** theo band (`/courses/:level/part/:n/lesson/:n`) — Band 4.5–5.5 với 6 part × 5 bài + sổ từ vựng.
- **Writing practice / luyện viết Kanji** (`/writing-practice/:id`, `/print`) — chấm bằng **so sánh pixel canvas** (render font vs nét vẽ qua `getImageData`, không dùng AI), xuất file in luyện chữ.
- **Báo lỗi từ vựng** (`/vocabulary-lookup/report`), feedback (`/user-feedback`, `/user-votes` + admin trả lời email tự động).
- **Hình nền** tuỳ biến (ảnh/GIF/YouTube).
- SEO/GEO: sitemap hreflang en/vi, robots.txt **cho phép mọi AI crawler** (GPTBot, ClaudeBot, PerplexityBot…), blog + learning-guides + trang so sánh "vs Quizlet/Anki/Knowt" + landing "học tiếng X miễn phí".

## 3. Cách OpenQuiz tiếp thu dữ liệu người dùng

| Kênh | Cơ chế | Endpoint/điểm chạm |
|---|---|---|
| Nhập tay | Form từng thẻ: term, definition, IPA, POS, ví dụ, đồng nghĩa, ảnh | `/words/bulk-add`, `/words/wset` |
| Paste import | Copy từ Word/Excel/Docs, chọn delimiter; migrate từ Quizlet/Anki qua CSV | dialog "Nhập" |
| Ảnh → flashcard | Upload/chụp ảnh, AI trích xuất từ vựng | `/wset-generate/extract-words-from-image`, `/image-search/upload` |
| AI Chat | Prompt mô tả → AI sinh danh sách từ / cả lộ trình | `/wset-generate/generate-words-flexible`, `/generate-wsets-flexible` |
| Tra từ | Lookup từ điển → "Thêm vào thẻ" | `/vocabulary-lookup`, `/vocabulary-lookup/by-definition` |
| Extension | Dịch từ trong ngữ cảnh trang web + YouTube/Netflix, tự bắt câu ví dụ, lưu vào bộ từ | `/words/bulk-add`, `/words/wset` |
| Clone cộng đồng | Lưu bộ thẻ/lộ trình public của người khác | `*/saved-status` |
| Lớp học | Giáo viên giao bài, học sinh nộp → dữ liệu bài làm + recording | `/classes/*`, `/exercises` |
| Hành vi học | Mọi lượt học/nói/chat/chấm điểm → SRS state, streak, leaderboard, admin analytics (DAU, retention cohort, LTV, conversion…) | `/user-srs/*`, `/admin/*` (rất nhiều metric) |
| Ảnh upload | Lưu server, gắn tài khoản (privacy policy §1.3) | — |
| Tracking | Clarity + `/ads/event` + visitor-id | — |

**Dữ liệu thu thập** (privacy policy): email/tên/ảnh profile, ngôn ngữ & mục tiêu học, lịch sử mua (Stripe/SePay/App Store/Play — không giữ số thẻ), user content (flashcard, bài viết, bài luyện), device/log/crash, cookies, ảnh upload cho photo-to-flashcard. Không bán dữ liệu; chia sẻ cho vendor (cloud, payment, email, analytics, **AI/ML services**).

## 4. Nguồn dữ liệu tiếng Anh

| Loại dữ liệu | Nguồn |
|---|---|
| Định nghĩa/IPA/POS/ví dụ/synonym (tra từ thường) | **`freedictionaryapi.com`** + **`api.dictionaryapi.dev`** (Free Dictionary API) — chunk `dictionaryApi-DFadUT2T.js` |
| Dịch nghĩa | **Google Translate** endpoints (`translate.googleapis.com/translate_a/single`, `clients5.google.com/translate_a/t` — endpoint dict-chrome-ex), fallback **MyMemory** (`api.mymemory.translated.net`) |
| Tra từ AI (giàu hơn: từ ghép, collocations) | Backend `/vocabulary-lookup` — LLM phía server (provider không lộ trong bundle) |
| Nội dung tuyển chọn | "Openquiz Team" tự biên: IELTS (1142 từ/20 set), TOEIC 600, A1–C2 Everyday, THPT 2016–2025, Business/Medical/Technical English, collocations, chunking |
| Nội dung sinh động | LLM server-side: bài đọc, câu hỏi speaking, câu ngữ pháp, hội thoại, chấm điểm IELTS/TOEIC/HSK |
| TTS | `/tts/*` qua BE; mp3 lưu Azure Blob (`oqwords2.blob.core.windows.net`), tên file dạng `hello__en__Ruth-neural.mp3` → **Azure neural voices**; site có badge "ElevenLabs Startup Grants" (có thể dùng ElevenLabs cho một phần TTS) |
| Chấm phát âm | **Microsoft Azure Speech** Pronunciation Assessment — request gửi `grading_system:"HundredMark"`, `enable_miscue:true`, `enable_prosody:true` (chấm từng phoneme, bắt lỗi đọc sai/thiếu từ, đánh giá ngữ điệu); audio ghi `webm/opus` → convert WAV → base64 → `/pronunciation/assess-base64` |
| LLM (chat/sinh nội dung/chấm điểm) | **Không lộ** — mọi call qua BE FastAPI (request-signing), response là JSON/SSE custom không chứa model metadata; bundle, policies, pitch deck, extension đều không nêu provider. Pitch deck chỉ nói "LLM evaluation". |
| Tỷ giá (pricing) | `open.er-api.com` |

## 5. Điểm khác biệt so với thị trường (theo trang vs-* + quan sát)

1. **Free tier rộng hơn Quizlet/Knowt**: Learn/Test/Dictation/SRS không giới hạn miễn phí — Quizlet khóa Learn & Test sau paywall (~$36/năm). Đây là wedge chính.
2. **Luyện nói tích hợp** mà Quizlet/Anki/Knowt không có: hội thoại AI theo chủ đề, mô phỏng IELTS Speaking Part 1/2/3, shadowing, chấm phát âm phoneme-level (Azure).
3. **AI ingestion**: ảnh → flashcard, prompt → cả lộ trình — Anki không có, Quizlet chỉ Q-Chat hạn chế.
4. **Extension dịch-ngữ-cảnh + YouTube/Netflix shadowing**: bắt từ + câu ví dụ từ trang đang đọc và phụ đề video đang xem — gần giống LingQ/Language Reactor nhưng gắn vào flashcard SRS.
5. **Việt-first**: UI tiếng Việt native, nội dung IELTS/TOEIC/THPT/đề thi VN, thanh toán SePay QR, giá VNĐ — đối thủ quốc tế không localize mức này.
6. **Lớp học cho giáo viên**: giao bài đa dạng + AI chấm theo rubric + leaderboard lớp — Quizlet có Class nhưng không AI grading.
7. **Gói năm giữ trọn đời** SRS + ví dụ/đồng nghĩa sau khi hết hạn — cơ chế retention khác thường.
8. **Gamification đầy đủ**: streak/freeze/coin/lootbox/shop/avatar/rank — bắt chước Duolingo trên nền flashcard.
9. **GEO/SEO aggressive**: mở cửa cho mọi AI crawler, loạt trang "vs X", "học tiếng X miễn phí" — chiến lược acquisition qua AI search.

## 6. Monetization

- **Giá VN** (SePay QR): 159k₫/tháng (giá gốc 260k) · 289k₫/quý · **790k₫/năm** (giảm từ 1.188k, scarcity "còn 15/100 suất" + countdown). Trang pricing hiển thị "66k/tháng" = giá năm quy ra tháng.
- **Giá quốc tế** (Stripe/IAP): $7.98/tháng (gốc $26) · $26.99/quý · $52.98/năm (gốc $312) — parity pricing, VN rẻ hơn nhiều.
- Paywall: Speaking/Hội thoại/Ngữ pháp (3 lượt/tháng free), Đọc hiểu (3 bài), khoá học Speaking (1 bài), ảnh→flashcard & AI gen (5 lượt), chấm phát âm (5 lượt), tra từ AI (5 lượt), shadowing extension (5 lượt), SRS giới hạn 6 phiên/ngày.
- Thanh toán: **SePay QR** (monthly/quarterly/yearly + group, có form `invoice-info` xuất hoá đơn), Stripe, IAP.
- Kênh khác: premium-group cho lớp (owner mua N seat, claim qua email), referral-đổi-Premium, ads endpoint.

## 7. Ghi chú kỹ thuật

- SPA React + Vite, code-split **196 lazy chunk**; Capacitor → mobile app dùng chung codebase; DotLottie WASM player cho animation.
- BE Railway FastAPI (`:8096` local dev), Firebase Auth, REST `/api/*`, mọi request ký HMAC (xem §9.1).
- Admin dashboard nội bộ rất đầy đủ: DAU/WAU/MAU ratio, retention cohort, LTV, conversion, speaking/chat stats, ban user, grant premium, campaign review — vận hành data-driven.
- Trạng thái client: localStorage (`flash-glass-user-info`, `studying_wsets`, `oq-ads-visitor-id`, `repetition_daily_count`, `conversation-topic-*`…).
- **68 ngôn ngữ học, 14 ngôn ngữ UI** (vi, en, zh, zh-Hant, ko, ja, fr, de, es, it, pt, ru, ar, th).

## 8. Hàm ý cho sản phẩm của mình (quizez)

- Wedge của OpenQuiz = "Quizlet free + speaking AI + Việt-first". Muốn khác biệt cần chọn trục khác: ví dụ chất lượng nội dung kiểm chứng, định dạng đề thi thật, hoặc kênh ingestion mới (PDF/đề thi scan → quiz).
- Các endpoint AI của họ đều server-side → không lộ provider; dữ liệu từ điển free (dictionaryapi.dev) là nguồn rẻ có thể dùng lại.
- Extension "lưu từ trong ngữ cảnh" là kênh ingestion mạnh, chi phí thấp — đáng cân nhắc.

## 9. Deep dive — temuan teknis lanjutan

### 9.1 Request signing (và lỗ hổng của nó)
- Mọi request `/api/*` bắt buộc mang `X-Request-Signature` + `X-Request-Timestamp`: `HMAC-SHA256(secret, "{ts}:{METHOD}:{path}")`, thêm `X-Body-Signature` = `HMAC(secret, "{ts}:{body}")` cho POST.
- **Secret nằm cứng trong bundle FE**: `theSecretkeyFromBEVCL2819GAUISNB728GHDBosshiiiiiit` (literal trong `index-*.js`, được export qua `hmac-*.js` sang cả extension). Signing chỉ chặn được abuse đơn giản — bất kỳ ai cũng trích được secret từ bundle/extension và giả mạo request. Không phải security boundary; rate-limit + Firebase auth mới là lớp bảo vệ thật.
- Body signature ký `"{ts}:{body}"` — cửa sổ replay bị giới hạn bởi timestamp (BE có thể từ chối timestamp cũ).

### 9.2 Study algorithm (client-side, `studyAlgorithm-*.js`)
- Thẻ được chia **segment 5 thẻ**; thứ tự: not-started → learning → mastered.
- Nếu >30% set đã mastered, **15% thẻ mastered được chèn lại làm review** vào mỗi segment (spaced interleaving nhẹ trong phiên học).
- Thẻ trả lời sai **được đưa lại vào hàng đợi** ở segment sau (`lastAnswered==="incorrect"`); thẻ đúng được đánh dấu theo segment (`appearedInSegment`).
- Distractor trắc nghiệm lấy từ cùng field giữa các thẻ (definition/term/synonym/pronunciation), xáo trộn Fisher-Yates.
- **Giới hạn SRS phía client**: `repetition_daily_count` trong localStorage, cap **6 phiên/ngày cho free** — enforce hoàn toàn phía client, bypass được bằng cách xoá localStorage. Paywall SRS thực ra rất mỏng.

### 9.3 SEO/GEO engineering (rất aggressive cho một sản phẩm nhỏ)
- **Pre-hydration SEO fallback**: div `#seo-fallback` trong `#root` chứa HTML nội dung đầy đủ (h1, danh sách lộ trình theo ngôn ngữ/kỳ thi, FAQ, bảng giá) — render cho crawler, bị React thay thế khi hydration. Comment trong HTML nói rõ: "SEO content for crawlers and AI engines… Avoids Google's hidden-text spam pattern."
- **5 khối JSON-LD**: WebApplication (kèm `offers` giá + `interactionStatistic` 60k users), FAQPage (Q&A viết sẵn để AI Overviews/ChatGPT trích), Product, BreadcrumbList, Organization.
- **Workaround bug GPU Android**: inline script pre-paint phát hiện Chrome 148 Mali/Adreno (crbug.com/513880229) và ẩn fallback pre-paint để không để lại ghost tiles — comment giải thích vì sao phải inline trước first paint.
- **SW health check** (`sw-check.js`): nếu `#root` rỗng sau 3 giây → xoá mọi cache + unregister SW + reload kèm cache-buster. Có thêm handler capture-phase cho lỗi entry-chunk 404 (index.html cũ sau deploy).
- `interactive-widget=resizes-content` trong viewport — fix bàn phím Android che bottom-sheet "Tra từ".
- **Hreflang en/vi + x-default**, sitemap có comment giải thích thiết kế (vì sao một file, vì sao dynamic routes không liệt kê).
- robots.txt: cho phép tường minh **mọi** AI crawler (GPTBot, ClaudeBot, PerplexityBot, CCBot, Meta-ExternalAgent, Applebot-Extended…) — chiến lược GEO: muốn được AI search trích dẫn.
- **Giá trong SEO fallback lệch giá thật**: fallback ghi "Premium tháng 159.000đ" trong khi trang pricing quảng cáo "66k/tháng" (giá quy đổi từ gói năm) — nội dung SEO không đồng bộ.

### 9.4 Attribution & analytics tự xây
- **Attribution quảng cáo TikTok/Meta tự xây**: `oq-ads-visitor-id` (UUID, localStorage), capture `utm_source/medium/campaign/content` + `ttclid` + `landing_page` + `platform`, TTL 30 ngày, gửi `/ads/event` mỗi event; admin dashboard `/admin/ads/overview` + `/admin/ads/app-overview` (lọc theo utm_source/campaign). Không dùng pixel bên thứ ba cho attribution — chỉ Clarity cho session analytics.
- Admin dashboard: DAU/WAU/MAU ratio, retention cohort (exact-day & n-day), LTV monthly, conversion rate, premium plan stats + demographics, speaking/chat usage per user, user votes + **email trả lời do AI sinh** (`/admin/user-votes/generate-reply-email`, `/send-reply-email`), ban/unban by email, grant premium by email, campaign review.
- `/admin/pitch-deck/:variant` — pitch deck gọi vốn nằm ngay trong app (3 variant: Admin/Growth/Detailed-Revenue), export PDF, các field tuỳ chỉnh được trước khi export.
- `/colab` — mount lại Admin component với `mode="colab"` (dashboard cho cộng tác viên).

### 9.5 Gamification economy
- **Ví coin** có transaction ledger (`txLabels`: LOOTBOX_OPEN, LOOTBOX_DUPLICATE_REFUND, SHOP_PURCHASE, LEADERBOARD reward…); **Premium = coin ×2**.
- **Lootbox** có endpoint xem odds (`/lootbox/{item}/odds`) — minh bạch xác suất.
- **Freeze**: thường (cứu 1 ngày trong 3 ngày gần nhất, tính như học đủ 10 từ) & "Freeze Tối Thượng"; `check-and-award` tặng freeze miễn phí mỗi tháng.
- **Rank**: Đồng→Bạc→Vàng→Thiên Tài→Thế Giới; **Điểm = số từ học × (1 + streak ÷ 10)**, cap điểm/ngày, reset theo tháng, thưởng coin theo hạng; leaderboard tuần + lịch sử tháng; hiển thị "top X%".
- **Anonymous mode**: ẩn mình khỏi leaderboard (`/user-info/anonymous`).

### 9.6 Lớp học/B2B
- Exercise types: trắc nghiệm, fill-in, essay, dictation, speaking, shadowing, conversation — tất cả giao được thành assignment với deadline tới từng phút.
- Conversation assignment: min/max turns, AI auto-grading theo rubric (Premium) hoặc giáo viên chấm tay; `SubmissionRecordings` — giáo viên nghe lại được recording của học sinh.
- Premium-group: owner mua N seat (`/premium-group/*`, price-quote, claim, members by email) — mầm B2B.

### 9.7 Chi tiết nhỏ đáng chú ý
- **Câu ví dụ có thể kèm clip YouTube** (`ExampleYtTag`): embed video với `#t=start,end` — ví dụ lấy từ video thật.
- **WordTooltipPopover + RenderTextWithTooltips**: hover từ trong văn bản ra tooltip định nghĩa.
- **StudyHintBlur**: blur từng lớp (loại từ, phát âm, ảnh, term) làm gợi ý dần trước khi lật.
- **Onboarding thu thập**: role, proficiency level (A1–C2/IELTS band), exam_preparation (ielts/toeic/toefl/hsk/topik/jlpt), native_language, list_learning_language — dùng để gợi ý lộ trình.
- **FCM push**: nhắc ôn tập hàng ngày lúc 22:00 giờ địa phương qua Firebase Cloud Messaging (PWA + native).
- **Anonymous mode** trên leaderboard (`/user-info/anonymous`).
- **Rate-limit UX**: HTTP 429 → emit event `SHOW_PREMIUM_DIALOG` (upsell ngay khi chạm limit, không phải error trần).
- **localStorage eviction policy**: TTL theo prefix (bảng `Rh`) + recovery khi quota-exceeded — quản lý state client kỹ lưỡng hơn thường gặp.
- **Recovery nhiều lớp**: sw-check (root rỗng 3s → xoá cache + reload), handler capture-phase cho entry-chunk-404 (index.html cũ sau deploy), workaround ghost-tile GPU Android (crbug.com/513880229).
- **Giá kép**: VN (159k/tháng, 289k/quý, 790k/năm) vs Quốc tế ($7.98/tháng, $26.99/quý, $52.98/năm) — parity pricing, giá VN rẻ hơn nhiều so với USD.
- **FreePremium = UGC-đổi-Premium**: tài khoản ≥4 ngày tuổi, submit link bài đăng mạng xã hội quảng bá OpenQuiz, admin duyệt thủ công → premium miễn phí. Growth loop chứ không phải referral-link thường.
- **121 chủ đề hội thoại** gồm 57 cue-card IELTS Part 2 ("Describe a…"), Part 1/3, chế độ mixed, custom topic, và topic tự chọn theo bộ từ.
- **3 game**: word-matching, tank-crash ("Húc Cổng"), word-runner — score + lives + leaderboard riêng từng game.
- **68 ngôn ngữ học, 14 ngôn ngữ UI**.
- **Speaking history lưu điểm theo loại kỳ thi** (`/speaking-history/scores-by-exam`) — ước lượng band IELTS từ các buổi luyện.
- **Extension YouTube/Netflix**: đọc caption DOM (`ytp-caption-segment`), ẩn caption gốc bằng clip-path và render panel riêng; chế độ dictation/cloze/shadowing trên từng câu phụ đề, auto-translate, ghi âm shadowing rồi chấm phát âm.
