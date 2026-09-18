# User Stories — MVP Lõi (Quizez)

> Phạm vi: MVP lõi tương đương tầng miễn phí của OpenQuiz — auth, quản lý bộ thẻ/lộ trình, 4 chế độ học (Flashcard, Learn, Test, Dictation), SRS, tra từ, tiến độ học.
> Persona: **Học viên tự học** (đã đăng ký, học ngoại ngữ — chủ yếu tiếng Anh, mục tiêu giao tiếp hoặc luyện thi IELTS/TOEIC/THPT); **Khách** (chưa đăng nhập).
> Ngoài phạm vi MVP: AI features (ảnh→thẻ, AI chat, hội thoại, chấm phát âm), lớp học, gamification (coin/lootbox/rank), extension, premium/payment, admin.

---

## Epic 1 — Xác thực & Onboarding

### US-01: Đăng ký tài khoản bằng email

**As a** khách truy cập lần đầu
**I want to** đăng ký tài khoản bằng email và mật khẩu
**So that** tôi có thể lưu trữ bộ từ và tiến độ học của riêng mình

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Đăng ký thành công**
- **Given** khách đang ở trang đăng ký
- **When** nhập email hợp lệ chưa tồn tại trong hệ thống và mật khẩu ≥ 8 ký tự rồi xác nhận
- **Then** hệ thống tạo tài khoản, đăng nhập tự động và chuyển đến màn hình onboarding
- **And** email xác thực được gửi đến địa chỉ đã đăng ký

**AC2: Email đã tồn tại**
- **Given** email `a@b.com` đã đăng ký trước đó
- **When** khách đăng ký lại với `a@b.com`
- **Then** hệ thống hiển thị lỗi "Email đã được sử dụng" và không tạo tài khoản mới

**AC3: Mật khẩu không đạt yêu cầu**
- **Given** khách đang ở trang đăng ký
- **When** nhập mật khẩu < 8 ký tự và submit
- **Then** hệ thống hiển thị lỗi yêu cầu mật khẩu tối thiểu 8 ký tự, form không bị xoá dữ liệu đã nhập

**AC4: Đăng ký bằng Google**
- **Given** khách chọn "Đăng ký bằng Google"
- **When** hoàn tất xác thực OAuth với tài khoản Google hợp lệ
- **Then** hệ thống tạo tài khoản mới (nếu chưa có) hoặc đăng nhập (nếu email đã liên kết) và chuyển đến onboarding

---

### US-02: Đăng nhập

**As a** học viên đã có tài khoản
**I want to** đăng nhập bằng email/mật khẩu hoặc Google
**So that** tôi truy cập lại bộ từ và tiến độ học đã lưu trên mọi thiết bị

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Đăng nhập thành công**
- **Given** tài khoản `a@b.com` tồn tại
- **When** nhập đúng email + mật khẩu và submit
- **Then** hệ thống đăng nhập và chuyển đến trang chủ hiển thị dữ liệu của tài khoản đó

**AC2: Sai thông tin đăng nhập**
- **Given** khách đang ở trang đăng nhập
- **When** nhập sai mật khẩu hoặc email không tồn tại
- **Then** hệ thống hiển thị lỗi chung "Email hoặc mật khẩu không đúng" (không tiết lộ email có tồn tại hay không)

**AC3: Duy trì phiên đăng nhập**
- **Given** học viên đã đăng nhập thành công
- **When** đóng và mở lại trình duyệt trong vòng 30 ngày
- **Then** phiên đăng nhập vẫn còn hiệu lực, không phải đăng nhập lại

**AC4: Đăng xuất**
- **Given** học viên đang đăng nhập
- **When** chọn "Đăng xuất"
- **Then** phiên kết thúc, các trang yêu cầu đăng nhập chuyển hướng về trang đăng nhập

---

### US-03: Onboarding chọn mục tiêu học

**As a** học viên mới đăng ký
**I want to** chọn ngôn ngữ học, trình độ hiện tại và kỳ thi mục tiêu (nếu có)
**So that** hệ thống gợi ý lộ trình và nội dung phù hợp với mục tiêu của tôi

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Hoàn tất onboarding**
- **Given** học viên vừa đăng ký lần đầu
- **When** chọn ngôn ngữ học (VD: English), trình độ (A1–C2) và kỳ thi mục tiêu (VD: IELTS) rồi xác nhận
- **Then** lựa chọn được lưu vào hồ sơ và trang chủ hiển thị lộ trình gợi ý tương ứng kỳ thi đã chọn

**AC2: Bỏ qua onboarding**
- **Given** học viên đang ở màn hình onboarding
- **When** chọn "Bỏ qua"
- **Then** hệ thống chuyển đến trang chủ với gợi ý mặc định, onboarding không hiển thị lại ở lần đăng nhập sau

**AC3: Không chọn kỳ thi**
- **Given** học viên đang ở bước chọn kỳ thi mục tiêu
- **When** chọn "Không" / để trống và tiếp tục
- **Then** hệ thống lưu hồ sơ không kèm kỳ thi và gợi ý lộ trình theo trình độ đã chọn

---

### US-04: Xem nội dung công khai khi chưa đăng nhập

**As a** khách chưa đăng nhập
**I want to** xem danh sách lộ trình và bộ thẻ công khai
**So that** tôi đánh giá được chất lượng nội dung trước khi quyết định đăng ký

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Xem danh sách public**
- **Given** khách chưa đăng nhập truy cập trang chủ/tìm kiếm
- **When** trang tải xong
- **Then** hiển thị danh sách lộ trình và bộ thẻ công khai kèm tiêu đề, số lượng thẻ, tác giả

**AC2: Xem chi tiết bộ thẻ public**
- **Given** khách đang xem danh sách public
- **When** mở một bộ thẻ công khai
- **Then** xem được danh sách từ (thuật ngữ, định nghĩa, phát âm, ví dụ) ở chế độ chỉ đọc

**AC3: Hành động cần đăng nhập**
- **Given** khách đang xem bộ thẻ công khai
- **When** chọn "Học", "Lưu" hoặc "Tạo bộ thẻ"
- **Then** hệ thống chuyển đến trang đăng nhập/đăng ký và sau khi đăng nhập quay lại đúng trang đang xem

---

## Epic 2 — Quản lý bộ thẻ (Word Set)

### US-05: Tạo bộ thẻ thủ công

**As a** học viên tự học
**I want to** tạo bộ thẻ mới với thuật ngữ, định nghĩa và các trường bổ sung (phát âm, loại từ, ví dụ, đồng nghĩa, ảnh)
**So that** tôi có bộ từ vựng riêng đúng nội dung cần học

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Tạo bộ thẻ thành công**
- **Given** học viên đang ở trang tạo bộ thẻ
- **When** nhập tiêu đề và ít nhất 2 thẻ (mỗi thẻ có thuật ngữ + định nghĩa) rồi chọn "Tạo"
- **Then** bộ thẻ được lưu, xuất hiện trong danh sách "Đã tạo" và mở được ở chế độ học

**AC2: Thiếu dữ liệu bắt buộc**
- **Given** học viên đang ở trang tạo bộ thẻ
- **When** submit khi chưa nhập tiêu đề hoặc có thẻ thiếu thuật ngữ/định nghĩa
- **Then** hệ thống đánh dấu trường lỗi và không lưu bộ thẻ

**AC3: Trường bổ sung tuỳ chọn**
- **Given** học viên đang nhập một thẻ
- **When** điền thêm phát âm, loại từ, ví dụ, đồng nghĩa (phân cách bởi `;`) và/hoặc tải ảnh minh hoạ
- **Then** các trường được lưu cùng thẻ và hiển thị đúng khi học/xem lại

**AC4: Lưu nháp tự động**
- **Given** học viên đã nhập một phần nội dung bộ thẻ
- **When** rời trang mà chưa bấm "Tạo" rồi quay lại trang tạo bộ thẻ
- **Then** nội dung nháp được khôi phục, không mất dữ liệu đã nhập

---

### US-06: Nhập từ vựng hàng loạt (paste import)

**As a** học viên tự học
**I want to** dán dữ liệu từ Word/Excel/Google Docs với delimiter tuỳ chọn
**So that** tôi chuyển nhanh danh sách từ có sẵn vào hệ thống mà không phải gõ từng thẻ

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Import thành công với delimiter mặc định**
- **Given** học viên mở dialog "Nhập" trong trang tạo bộ thẻ
- **When** dán dữ liệu dạng `thuật ngữ<TAB>định nghĩa` mỗi dòng một thẻ và xác nhận
- **Then** hệ thống tạo đúng số thẻ tương ứng số dòng, mỗi thẻ có thuật ngữ và định nghĩa đúng cột

**AC2: Delimiter tuỳ chỉnh**
- **Given** dữ liệu dùng dấu phẩy giữa thuật ngữ–định nghĩa và chấm phẩy giữa các thẻ
- **When** học viên chọn delimiter tương ứng rồi dán dữ liệu
- **Then** hệ thống parse đúng theo delimiter đã chọn, hiển thị preview trước khi thêm vào bộ thẻ

**AC3: Dòng dữ liệu lỗi**
- **Given** dữ liệu dán vào có dòng chỉ chứa 1 cột (thiếu định nghĩa)
- **When** xác nhận import
- **Then** hệ thống báo số dòng lỗi, cho phép bỏ qua dòng lỗi và chỉ import các dòng hợp lệ

---

### US-07: Chỉnh sửa và xoá bộ thẻ

**As a** học viên tự học
**I want to** sửa nội dung, đổi trạng thái công khai/riêng tư và xoá bộ thẻ của mình
**So that** bộ từ của tôi luôn đúng và tôi kiểm soát được ai xem được nó

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Sửa nội dung thẻ**
- **Given** học viên mở bộ thẻ của mình ở chế độ chỉnh sửa
- **When** sửa thuật ngữ/định nghĩa/trường phụ của một thẻ và lưu
- **Then** thay đổi được lưu và hiển thị đúng trong mọi chế độ học

**AC2: Đổi trạng thái công khai**
- **Given** bộ thẻ đang ở trạng thái riêng tư
- **When** học viên bật "Công khai"
- **Then** bộ thẻ xuất hiện trong kết quả tìm kiếm công khai của người dùng khác

**AC3: Xoá bộ thẻ có xác nhận**
- **Given** học viên chọn "Xoá" trên bộ thẻ của mình
- **When** xác nhận xoá trong dialog cảnh báo
- **Then** bộ thẻ bị xoá khỏi danh sách và không còn truy cập được; tiến độ học liên quan cũng bị xoá

**AC4: Không sửa được bộ thẻ của người khác**
- **Given** học viên A đang xem bộ thẻ công khai của học viên B
- **When** truy cập trang chỉnh sửa của bộ thẻ đó
- **Then** hệ thống từ chối và chỉ cho phép thao tác "Lưu bản sao"

---

### US-08: Lưu bộ thẻ/lộ trình công khai của người khác

**As a** học viên tự học
**I want to** lưu (clone) bộ thẻ hoặc lộ trình công khai vào tài khoản của mình
**So that** tôi học ngay nội dung có sẵn mà không cần tạo lại

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Lưu thành công**
- **Given** học viên đang xem bộ thẻ công khai
- **When** chọn "Lưu"
- **Then** bộ thẻ xuất hiện trong danh sách "Đã lưu" của học viên và học được ngay

**AC2: Bỏ lưu**
- **Given** bộ thẻ đã nằm trong danh sách "Đã lưu"
- **When** học viên chọn "Bỏ lưu"
- **Then** bộ thẻ bị gỡ khỏi danh sách; tiến độ học trên bộ đó được giữ hay xoá theo xác nhận của user

**AC3: Bộ thẻ bị chuyển riêng tư**
- **Given** học viên đã lưu bộ thẻ công khai của người khác
- **When** tác giả chuyển bộ thẻ về riêng tư
- **Then** bản đã lưu của học viên vẫn học được bình thường

---

## Epic 3 — Lộ trình học (Learning Path)

### US-09: Tạo lộ trình từ các bộ thẻ

**As a** học viên tự học
**I want to** tạo lộ trình học bằng cách nhóm nhiều bộ thẻ theo thứ tự
**So that** tôi tổ chức việc học theo chủ đề/mục tiêu thay vì học rời rạc từng bộ

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Tạo lộ trình thành công**
- **Given** học viên có ít nhất 1 bộ thẻ (tự tạo hoặc đã lưu)
- **When** tạo lộ trình với tiêu đề và thêm ≥ 1 bộ thẻ vào lộ trình
- **Then** lộ trình được lưu, hiển thị danh sách bộ thẻ theo thứ tự và tổng số từ

**AC2: Sắp xếp thứ tự bộ thẻ**
- **Given** lộ trình có ≥ 2 bộ thẻ
- **When** học viên thay đổi thứ tự các bộ thẻ và lưu
- **Then** thứ tự mới được áp dụng khi học và hiển thị

**AC3: Lộ trình rỗng**
- **Given** học viên đang tạo lộ trình
- **When** submit mà chưa thêm bộ thẻ nào
- **Then** hệ thống báo lỗi yêu cầu ít nhất 1 bộ thẻ

---

### US-10: Học theo lộ trình gợi ý

**As a** học viên tự học
**I want to** chọn một lộ trình gợi ý theo mục tiêu (IELTS, TOEIC, THPT, giao tiếp…) và học toàn bộ từ trong đó
**So that** tôi có lộ trình có cấu trúc ngay mà không phải tự xây dựng

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Xem lộ trình gợi ý theo mục tiêu**
- **Given** hồ sơ học viên có kỳ thi mục tiêu là IELTS
- **When** vào trang chủ
- **Then** hiển thị nhóm lộ trình gợi ý gắn nhãn IELTS kèm số bộ thẻ và tác giả

**AC2: Học tất cả từ trong lộ trình**
- **Given** học viên mở một lộ trình gợi ý
- **When** chọn "Học tất cả từ vựng trong lộ trình"
- **Then** hệ thống gộp toàn bộ từ của các bộ thẻ trong lộ trình vào một phiên học, hiển thị tổng số từ

**AC3: Học từng bộ thẻ trong lộ trình**
- **Given** học viên đang xem danh sách bộ thẻ của lộ trình
- **When** chọn một bộ thẻ cụ thể
- **Then** mở bộ thẻ đó với đầy đủ các chế độ học như bộ thẻ thường

---

## Epic 4 — Chế độ học

### US-11: Học bằng Flashcard

**As a** học viên tự học
**I want to** ôn từ vựng bằng thẻ lật hai mặt (thuật ngữ ↔ định nghĩa)
**So that** tôi tự kiểm tra trí nhớ trước khi xem đáp án

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Lật thẻ và chuyển thẻ**
- **Given** học viên mở chế độ Flashcard của một bộ thẻ
- **When** chạm/phím Space vào thẻ
- **Then** thẻ lật hiển thị mặt còn lại; phím ← → chuyển thẻ trước/sau và cập nhật chỉ số "Thẻ X / N"

**AC2: Nghe phát âm**
- **Given** thẻ có thuật ngữ tiếng Anh
- **When** bấm biểu tượng loa
- **Then** phát âm thanh đọc thuật ngữ (và ví dụ nếu có)

**AC3: Sắp xếp thứ tự ôn tập**
- **Given** học viên đang ở chế độ Flashcard
- **When** chọn thứ tự "Chưa học trước" / "Đang học trước" / "Đã thành thạo trước" / "Đánh dấu sao trước"
- **Then** danh sách thẻ sắp xếp lại theo trạng thái học tương ứng

---

### US-12: Chế độ Học (Learn — gõ đáp án)

**As a** học viên tự học
**I want to** luyện ghi nhớ bằng cách gõ lại định nghĩa/thuật ngữ khi được hỏi
**So that** tôi nhớ sâu hơn thay vì chỉ nhận diện thụ động

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Trả lời đúng**
- **Given** học viên đang trong phiên Learn, câu hỏi hiển thị thuật ngữ
- **When** gõ đúng định nghĩa và submit
- **Then** hệ thống đánh dấu đúng, cập nhật trạng thái thẻ và chuyển câu tiếp theo

**AC2: Trả lời sai**
- **Given** học viên đang trong phiên Learn
- **When** gõ sai đáp án
- **Then** hệ thống hiển thị đáp án đúng và đưa thẻ đó quay lại hàng đợi trong cùng phiên

**AC3: Hoàn thành phiên**
- **Given** tất cả thẻ trong phiên đã được trả lời đúng ít nhất 1 lần
- **When** phiên kết thúc
- **Then** hiển thị thống kê: số thẻ đúng lần đầu, số thẻ phải trả lời lại, thời gian hoàn thành

---

### US-13: Kiểm tra (Test — trắc nghiệm & điền từ)

**As a** học viên tự học
**I want to** làm bài kiểm tra trắc nghiệm và điền từ được sinh từ bộ thẻ
**So that** tôi đánh giá khách quan mức độ ghi nhớ trước kỳ thi

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Sinh đề kiểm tra**
- **Given** bộ thẻ có ≥ 4 thẻ
- **When** học viên mở chế độ Kiểm tra và bắt đầu
- **Then** hệ thống sinh câu hỏi trắc nghiệm (1 đáp án đúng + 3 đáp án nhiễu lấy từ các thẻ khác) và/hoặc câu điền từ

**AC2: Chấm điểm và xem lại**
- **Given** học viên đã trả lời hết câu hỏi
- **When** nộp bài
- **Then** hiển thị điểm (số câu đúng/tổng) và danh sách câu sai kèm đáp án đúng

**AC3: Bộ thẻ quá ít từ**
- **Given** bộ thẻ có < 4 thẻ
- **When** học viên mở chế độ Kiểm tra
- **Then** hệ thống thông báo cần tối thiểu 4 thẻ để tạo trắc nghiệm và chỉ cho phép dạng điền từ (nếu đủ điều kiện)

**AC4: Lọc phạm vi kiểm tra**
- **Given** bộ thẻ có thẻ ở nhiều trạng thái học
- **When** học viên chọn "Chỉ từ đánh dấu sao" hoặc "Chỉ từ chưa học"
- **Then** đề kiểm tra chỉ sinh từ nhóm từ đã chọn

---

### US-14: Nghe chép (Dictation)

**As a** học viên tự học
**I want to** nghe thuật ngữ/câu ví dụ rồi gõ lại chính xác những gì nghe được
**So that** tôi luyện nghe và chính tả đồng thời

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Nghe chép đúng**
- **Given** học viên đang trong phiên Dictation, audio đã phát
- **When** gõ đúng chính xác nội dung nghe được và submit
- **Then** hệ thống đánh dấu đúng và chuyển câu tiếp theo

**AC2: Nghe lại và gợi ý**
- **Given** học viên chưa nghe rõ
- **When** bấm nút nghe lại (không giới hạn số lần) hoặc chọn gợi ý (hiện chữ cái đầu/số ký tự)
- **Then** audio phát lại / gợi ý hiển thị; việc dùng gợi ý được ghi nhận trong kết quả phiên

**AC3: Sai chính tả**
- **Given** học viên gõ sai một phần nội dung
- **When** submit
- **Then** hệ thống hiển thị đáp án đúng, đánh dấu phần sai khác biệt và đưa thẻ quay lại hàng đợi

---

## Epic 5 — Lặp lại ngắt quãng & Tiến độ

### US-15: Ôn tập SRS theo lịch đến hạn

**As a** học viên tự học
**I want to** ôn lại các từ đến hạn theo thuật toán lặp lại ngắt quãng
**So that** tôi nhớ từ lâu dài mà không phải tự lên lịch ôn

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Hiển thị từ đến hạn**
- **Given** học viên có từ đến hạn ôn tập
- **When** vào trang chủ hoặc mục "Lặp lại ngắt quãng"
- **Then** hiển thị số từ đến hạn hôm nay và nút bắt đầu ôn tập

**AC2: Đánh giá mức nhớ**
- **Given** học viên đang trong phiên SRS, thẻ hiển thị mặt hỏi
- **When** lật đáp án và tự đánh giá (quên / khó / nhớ / dễ)
- **Then** hệ thống cập nhật lịch ôn tiếp theo của thẻ theo mức đánh giá

**AC3: Không có từ đến hạn**
- **Given** không có từ nào đến hạn hôm nay
- **When** vào mục "Lặp lại ngắt quãng"
- **Then** hiển thị trạng thái trống và dự báo số từ đến hạn trong 7 ngày tới

---

### US-16: Theo dõi tiến độ và chuỗi ngày học

**As a** học viên tự học
**I want to** xem số từ đã học hôm nay, chuỗi ngày học liên tiếp và mức độ thuần thục
**So that** tôi duy trì động lực và biết mình đang ở đâu

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Dashboard tiến độ**
- **Given** học viên đã học trong ngày
- **When** vào trang chủ
- **Then** hiển thị: số từ học hôm nay / mục tiêu ngày, chuỗi ngày hiện tại, số từ đến hạn, số từ đã thuần thục

**AC2: Cập nhật chuỗi ngày**
- **Given** học viên đạt mục tiêu từ/ngày (VD: 10 từ)
- **When** hoàn thành từ thứ 10 trong ngày
- **Then** chuỗi ngày tăng 1 và hiển thị xác nhận đạt mục tiêu

**AC3: Đứt chuỗi**
- **Given** học viên có chuỗi N ngày
- **When** một ngày trôi qua mà không đạt mục tiêu từ/ngày
- **Then** chuỗi reset về 0 ở lần truy cập tiếp theo

---

### US-17: Đánh dấu sao và lọc từ

**As a** học viên tự học
**I want to** đánh dấu sao các từ quan trọng/khó và lọc danh sách theo trạng thái
**So that** tôi tập trung ôn đúng nhóm từ cần thiết

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Đánh dấu sao**
- **Given** học viên đang xem/học một thẻ
- **When** bấm biểu tượng sao
- **Then** thẻ được đánh dấu và trạng thái sao lưu lại giữa các phiên

**AC2: Lọc theo trạng thái**
- **Given** bộ thẻ có thẻ ở các trạng thái khác nhau
- **When** lọc "Chỉ hiện từ đánh dấu sao" / "Chưa học" / "Đang học" / "Đã thành thạo"
- **Then** danh sách chỉ hiển thị nhóm từ tương ứng

**AC3: Học riêng nhóm từ đánh dấu**
- **Given** bộ thẻ có ≥ 1 thẻ đánh dấu sao
- **When** bắt đầu phiên học với tuỳ chọn "Chỉ từ đánh dấu sao"
- **Then** phiên học chỉ chứa các thẻ đã đánh dấu

---

## Epic 6 — Tra từ & Hỗ trợ nhập liệu

### US-18: Tra từ và thêm vào bộ thẻ

**As a** học viên tự học
**I want to** tra nghĩa, phát âm, loại từ, ví dụ và đồng nghĩa của một từ rồi thêm thẳng vào bộ thẻ
**So that** tôi không phải tự tra và gõ lại định nghĩa khi gặp từ mới

**INVEST Self-check**

| I | N | V | E | S | T |
|---|---|---|---|---|---|
| ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Acceptance Criteria**

**AC1: Tra từ thành công**
- **Given** học viên mở popup "Tra từ"
- **When** nhập một từ tiếng Anh hợp lệ (VD: "serendipity") và tra
- **Then** hiển thị phát âm IPA, loại từ, định nghĩa, ví dụ kèm dịch, đồng nghĩa và từ liên quan

**AC2: Thêm vào bộ thẻ**
- **Given** kết quả tra từ đang hiển thị
- **When** chọn "Thêm vào thẻ" và chọn bộ thẻ đích
- **Then** thẻ mới được thêm vào bộ thẻ đó với đầy đủ thông tin đã tra

**AC3: Từ không tồn tại**
- **Given** học viên nhập chuỗi không phải từ hợp lệ
- **When** tra
- **Then** hiển thị thông báo không tìm thấy và gợi ý kiểm tra chính tả

**AC4: Tra hai chiều**
- **Given** học viên chọn chiều dịch VI → EN
- **When** nhập một từ tiếng Việt và tra
- **Then** hiển thị các từ tiếng Anh tương ứng để chọn và thêm vào thẻ

---

## Notes & Assumptions

1. **Phụ thuộc dữ liệu**: US-18 (tra từ) phụ thuộc nguồn từ điển bên ngoài (dictionaryapi.dev / freedictionaryapi.com + dịch Google Translate/MyMemory — xem `docs/explore/openquiz-ai-analysis.md` §4). Cần PO quyết định: dùng API free trực tiếp từ client hay proxy qua BE.
2. **SRS algorithm**: OpenQuiz dùng SM-2 cải tiến + segment 5 thẻ + inject review 15% (§9.2). MVP có thể bắt đầu với SM-2 chuẩn; cần PO xác nhận mức đánh giá (4 mức quên/khó/nhớ/dễ hay 2 mức).
3. **Mục tiêu từ/ngày**: con số 10 từ/ngày lấy theo OpenQuiz — cần PO chốt có cho user tự chỉnh không.
4. **Câu hỏi mở cho PO**:
   - Giới hạn free tier cho MVP (OpenQuiz: SRS 6 phiên/ngày, tra từ AI 5 lượt/tháng) — áp dụng hay mở hoàn toàn?
   - Bộ thẻ công khai có cần duyệt (moderation) không?
   - Import có cần hỗ trợ file CSV/Anki package ngay MVP không, hay chỉ paste?
5. **Story candidates phase 2** (ngoài MVP): AI tạo thẻ từ ảnh/prompt, hội thoại AI, chấm phát âm, lớp học, gamification, extension, premium.
