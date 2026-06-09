# Quy Trình Làm Việc Với Git (Git Flow & Commit Guidelines)

Tài liệu này định nghĩa quy trình quản lý mã nguồn (Git Flow) và quy chuẩn viết commit nhằm giúp các thành viên trong nhóm cộng tác hiệu quả, giữ lịch sử Git sạch sẽ và đảm bảo tính ổn định của mã nguồn.

---

## 1. Mô Hình Nhánh (Branching Model)

Dự án áp dụng mô hình **Git Flow** rút gọn gồm 2 nhánh chính chạy suốt vòng đời dự án và các nhánh phụ tạm thời:

```
[main]       <------------------------------------------- (Hotfixes/Releases)
  ^
  | (Merge PR)
[develop]    <--- [feature/...] <--- [feature/...]       (Nhánh phát triển chính)
```

### 1.1. Các nhánh chính (Long-lived Branches)
* **`main`**: Nhánh lưu trữ mã nguồn chạy trên môi trường Production (sản phẩm thực tế). Code trên `main` phải luôn luôn hoạt động ổn định và được build thành công. **Tuyệt đối không commit trực tiếp lên `main`.**
* **`develop`**: Nhánh tích hợp chính để phát triển. Code của các tính năng mới sau khi hoàn thành sẽ được merge vào đây để test.

### 1.2. Các nhánh phụ (Temporary Branches)
* **`feature/*`**: Dùng để phát triển tính năng mới.
  * *Tạo từ:* `develop`
  * *Merge về:* `develop`
  * *Quy tắc đặt tên:* `feature/<tên-tính-năng>` hoặc `feature/<jira-ticket-id>-<tên-tính-năng>`.
  * *Ví dụ:* `feature/auth-login`, `feature/WF-102-drag-drop`
* **`hotfix/*`**: Dùng để sửa lỗi khẩn cấp trực tiếp trên production.
  * *Tạo từ:* `main`
  * *Merge về:* Cả `main` và `develop`
  * *Quy tắc đặt tên:* `hotfix/<tên-lỗi>` hoặc `hotfix/v<phiên-bản>-<tên-lỗi>`.
  * *Ví dụ:* `hotfix/fix-payment-crash`
* **`release/*`**: Dùng để chuẩn bị đóng gói sản phẩm trước khi đưa lên production (thực hiện fix lỗi nhỏ, làm tài liệu release).
  * *Tạo từ:* `develop`
  * *Merge về:* Cả `main` và `develop`
  * *Quy tắc đặt tên:* `release/v<phiên-bản>` (Ví dụ: `release/v1.0.0`).

---

## 2. Quy Chuẩn Viết Commit (Commit Message Convention)

Commit message cần viết ngắn gọn, rõ ràng theo chuẩn **Conventional Commits**:

```
<type>(<scope>): <description>

[body - tùy chọn]
```

### 2.1. Định nghĩa các loại `type`:
* **`feat`**: Tính năng mới (Feature).
* **`fix`**: Sửa lỗi (Bug fix).
* **`docs`**: Thay đổi hoặc bổ sung tài liệu hướng dẫn (Documentation).
* **`style`**: Thay đổi định dạng code (khoảng trắng, dấu chấm phẩy, format) mà không đổi logic chạy của code.
* **`refactor`**: Tái cấu trúc code (cải tiến hiệu năng hoặc cấu trúc code nhưng không sửa lỗi hay thêm tính năng).
* **`test`**: Thêm hoặc sửa các bài test (Unit test, Integration test).
* **`chore`**: Các công việc lặt vặt khác (cập nhật dependency, thay đổi build script, cấu hình docker, gitignore).

### 2.2. Phạm vi ảnh hưởng `scope` (Tùy chọn):
Chỉ ra phần dự án bị ảnh hưởng (vd: `backend`, `frontend`, `db`, `auth`, `workflow`).

### 2.3. Ví dụ mẫu:
* Đúng chuẩn:
  * `feat(auth): add login with Google button`
  * `fix(db): resolve prisma relation constraint`
  * `docs(readme): update build instructions for docker`
  * `style: format code according to eslint rules`
* Sai chuẩn (Không được viết):
  * `fix bug` (Không rõ sửa cái gì)
  * `cập nhật code` (Chung chung)
  * `add feature` (Không chỉ rõ loại feature)

---

## 3. Quy Trình Gửi và Duyệt Code (Pull Request Workflow)

Để đưa mã nguồn mới vào nhánh chính, mọi lập trình viên đều phải tuân thủ quy trình Pull Request (PR):

1. **Cập nhật mã nguồn mới nhất:**
   Trước khi bắt đầu code, hãy cập nhật nhánh `develop` ở local:
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Tạo nhánh feature:**
   ```bash
   git checkout -b feature/auth-login
   ```

3. **Code và Commit cục bộ:**
   Hãy commit thường xuyên với các thay đổi nhỏ, logic rõ ràng. Tuân thủ chuẩn viết commit ở mục 2.

4. **Đẩy code lên Remote & Tạo PR:**
   ```bash
   git push -u origin feature/auth-login
   ```
   * Mở GitHub, tạo một Pull Request từ nhánh `feature/auth-login` sang nhánh `develop`.
   * Ghi rõ các thay đổi trong phần mô tả PR và gắn nhãn (labels) nếu cần.

5. **Code Review:**
   * Cần ít nhất **1 người khác trong nhóm** (Reviewer) xem và phê duyệt (Approve) PR.
   * Nếu có phản hồi/yêu cầu thay đổi (Request changes), lập trình viên sửa code trực tiếp trên nhánh đó và push tiếp lên. PR tự động cập nhật.

6. **Merge PR:**
   * Sau khi được Approve và vượt qua tất cả các đợt check tự động (CI/CD nếu có), PR sẽ được merge vào `develop`.
   * Khuyến khích chọn chế độ **Squash and merge** để gộp tất cả các commit nhỏ thành một commit duy nhất trên nhánh chính giúp lịch sử Git gọn gàng.
   * Xóa nhánh feature trên remote sau khi merge.
