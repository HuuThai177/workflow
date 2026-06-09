# Hệ Thống Quản Lý Quy Trình Nội Bộ (Internal Workflow Management System)

Dự án này là hệ thống quản lý và tự động hóa quy trình nghiệp vụ nội bộ (Workflows) dành cho các doanh nghiệp vừa và nhỏ (SMEs). Hệ thống cho phép doanh nghiệp tự tạo các mẫu quy trình, thiết lập các bước duyệt, gán người chịu trách nhiệm và tự động luân chuyển các yêu cầu của nhân viên.

---

## 💡 Ý Tưởng Cốt Lõi & Tính Năng Chính

### 1. Quản lý Quy trình Mẫu (Workflow Templates)
Doanh nghiệp có thể tự tạo các quy trình khác nhau dựa trên nhu cầu thực tế:
*   **Quy trình xin nghỉ phép:** Nhân viên xin nghỉ -> Quản lý trực tiếp duyệt -> Nhân sự (HR) ghi nhận.
*   **Quy trình duyệt chi phí:** Đề xuất chi phí -> Trưởng phòng duyệt -> Kế toán duyệt chi.
*   **Quy trình mua thiết bị:** Nhân viên yêu cầu -> Trưởng bộ phận duyệt -> Bộ phận mua sắm mua thiết bị.
*   **Quy trình xử lý yêu cầu khách hàng:** Tiếp nhận -> Phân phối cho kỹ thuật viên -> Kỹ thuật viên xử lý -> Chăm sóc khách hàng đóng yêu cầu.
*   **Quy trình tuyển dụng:** HR đề xuất vị trí -> Giám đốc duyệt -> Lên lịch phỏng vấn -> Đánh giá ứng viên.
*   **Quy trình giao việc nội bộ:** Tạo việc -> Giao người thực hiện -> Người thực hiện nộp kết quả -> Quản lý nghiệm thu.
*   **Quy trình báo lỗi thiết bị:** Báo cáo lỗi -> Bộ phận IT/Cơ sở vật chất kiểm tra -> Sửa chữa/Thay thế -> Xác nhận hoàn thành.
*   **Quy trình duyệt nội dung marketing:** Biên tập viên viết nội dung -> Trưởng nhóm duyệt nội dung -> Đăng tải.

### 2. Thiết lập Các Bước Xử Lý & Người Phụ Trách
*   Tự do thêm/bớt các bước phê duyệt cho mỗi quy trình mẫu.
*   Thiết lập thứ tự duyệt (`stepOrder`) của các bước.
*   Gán người duyệt cụ thể hoặc theo vai trò hệ thống cho từng bước.

### 3. Tự động Luân chuyển & Phê duyệt
*   **Gửi yêu cầu:** Nhân viên chọn quy trình mẫu, điền các thông tin cần thiết (form data dưới dạng JSON) và gửi đi.
*   **Tự động chuyển tiếp:** Hệ thống chuyển trạng thái yêu cầu sang bước tiếp theo trong quy trình và thông báo cho người duyệt tương ứng.
*   **Phê duyệt / Từ chối:** Người duyệt thực hiện hành động Approve (Đồng ý) hoặc Reject (Từ chối) kèm theo lời nhắn (comment). Nếu đồng ý, yêu cầu sẽ tự động đi tiếp bước sau; nếu từ chối, yêu cầu có thể quay lại DRAFT hoặc bị đóng (REJECTED).
*   **Trạng thái cuối cùng:** Khi đi qua hết tất cả các bước phê duyệt, yêu cầu sẽ chuyển sang trạng thái APPROVED.

### 4. Lịch Sử & Báo Cáo
*   Ghi lại chi tiết toàn bộ lịch sử thao tác phê duyệt (ai duyệt lúc nào, nội dung bình luận là gì).
*   Trang Dashboard hiển thị tổng quan số lượng yêu cầu đang chờ xử lý, tỷ lệ hoàn thành, thời gian xử lý trung bình.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

Hệ thống được thiết kế theo mô hình Monorepo đơn giản giúp phát triển nhanh chóng:
*   **Frontend (Ứng dụng Client):** [Next.js 15](file:///c:/Users/HuuThai/OneDrive/Desktop/workflow/apps/frontend) (App Router, Tailwind CSS, TypeScript) chạy ở cổng **3000**.
*   **Backend (Ứng dụng API):** [NestJS 11](file:///c:/Users/HuuThai/OneDrive/Desktop/workflow/apps/backend) (TypeScript, REST API, CORS) chạy ở cổng **4000**.
*   **Cơ sở dữ liệu:** **PostgreSQL** kết hợp cùng **Prisma ORM** để quản lý migration và truy vấn dữ liệu hiệu quả.
*   **Môi trường:** Chạy database nhanh chóng thông qua **Docker Compose**.

---

## 🗄️ Cấu Trúc Cơ Sở Dữ Liệu (Prisma Models)

*   `User`: Quản lý thông tin tài khoản người dùng và vai trò (`ADMIN`, `MANAGER`, `EMPLOYEE`).
*   `Workflow`: Lưu trữ các mẫu quy trình do doanh nghiệp tạo lập.
*   `WorkflowStep`: Lưu trữ cấu trúc các bước phê duyệt của từng quy trình (thứ tự bước, người duyệt được gán).
*   `WorkflowInstance`: Lưu trữ các yêu cầu thực tế do nhân viên gửi lên từ quy trình mẫu. Dữ liệu form được lưu động dưới trường `data: Json`.
*   `WorkflowLog`: Ghi chép nhật ký phê duyệt chi tiết của từng bước duyệt.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 📋 Yêu cầu hệ thống
*   Đã cài đặt **Node.js** (Phiên bản v18 trở lên) và **npm**.
*   Đã cài đặt **Docker** & **Docker Compose**.

### ⚙️ Các bước cài đặt nhanh

1.  **Khởi động Cơ sở dữ liệu PostgreSQL:**
    Tại thư mục gốc của dự án, chạy lệnh sau để bật PostgreSQL:
    ```bash
    npm run db:up
    ```
    *(Hoặc chạy lệnh `docker compose up -d`)*

2.  **Đồng bộ Cơ sở dữ liệu (Prisma Migrations):**
    Chạy lệnh sau để khởi chạy cấu trúc bảng và tạo database Schema:
    ```bash
    npm run prisma:migrate
    ```

3.  **Khởi chạy Môi trường Phát triển (Cả Front-end & Back-end):**
    Khởi động cả 2 ứng dụng bằng 1 lệnh duy nhất:
    ```bash
    npm run dev
    ```
    *   **Frontend Next.js** sẽ chạy tại: [http://localhost:3000](http://localhost:3000)
    *   **Backend NestJS** sẽ chạy tại: [http://localhost:4000](http://localhost:4000)

4.  **Xem cơ sở dữ liệu qua giao diện đồ họa (Tùy chọn):**
    Để xem và quản lý trực quan dữ liệu đang có trong database:
    ```bash
    npm run prisma:studio
    ```
    *   Truy cập giao diện quản trị tại: [http://localhost:5555](http://localhost:5555)

---

## 📁 Cấu Trúc Thư Mục Dự Án

```
workflow/
├── apps/
│   ├── frontend/         # Mã nguồn frontend Next.js (Port 3000)
│   │   ├── src/
│   │   │   ├── app/      # Next.js App Router (pages & layouts)
│   │   │   └── components/# Các components UI tái sử dụng
│   │   └── package.json
│   │
│   └── backend/          # Mã nguồn backend NestJS (Port 4000)
│       ├── src/          # Modules, Controller, Service
│       ├── prisma/       # Cấu hình Prisma schema & migrations
│       └── package.json
│
├── docker-compose.yml    # File cấu hình Docker khởi tạo PostgreSQL
├── package.json          # Root package.json cài đặt concurrently
└── readme.md             # Tài liệu này
```
