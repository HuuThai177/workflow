# Hướng Dẫn Cài Đặt và Khởi Chạy với Docker

Tài liệu này hướng dẫn cách cài đặt Docker, cấu hình và khởi chạy các dịch vụ (PostgreSQL) phục vụ cho dự án **Workflow**.

---

## 1. Yêu Cầu Hệ Thống & Cài Đặt Ban Đầu

Trước khi bắt đầu, máy tính của bạn cần cài đặt **Docker** và **Docker Desktop** (nếu dùng Windows/macOS).

* **Tải xuống & Cài đặt Docker Desktop:** [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
* Đảm bảo ứng dụng **Docker Desktop** đã được mở và chạy (có biểu tượng cá voi màu xanh lá ở thanh tác vụ).

---

## 2. Các Lệnh Khởi Chạy Cơ Bản

Dự án sử dụng Docker Compose để quản lý container PostgreSQL. Các lệnh dưới đây được thực hiện tại **thư mục gốc** của dự án (nơi có file `docker-compose.yml`).

### Khởi chạy PostgreSQL Container (chạy ngầm)
```bash
docker compose up -d
```
*Lệnh này sẽ tự động tải image PostgreSQL về máy (nếu chưa có) và khởi động cơ sở dữ liệu.*

### Kiểm tra trạng thái các container đang chạy
```bash
docker compose ps
```

### Dừng các container đang chạy
```bash
docker compose down
```

---

## 3. Thông Tin Kết Nối Cơ Sở Dữ Liệu

Theo cấu hình trong file [docker-compose.yml](file:///c:/Users/HuuThai/OneDrive/Desktop/workflow/docker-compose.yml):

* **Host:** `localhost` (hoặc `127.0.0.1`)
* **Port:** `5432`
* **User (Tên đăng nhập):** `postgres`
* **Password (Mật khẩu):** `postgres`
* **Database (Tên cơ sở dữ liệu mặc định):** `workflow_db`
* **Volume lưu trữ dữ liệu:** Lưu trữ thực tế trên máy của bạn thông qua volume `postgres_data` (không sợ mất dữ liệu khi dừng container).

---

## 4. Chạy Migrations (Đồng bộ cấu hình Database)

Sau khi PostgreSQL trên Docker đã được khởi động ở **Bước 2**, bạn cần chạy Migrations của Prisma để tạo các bảng trong cơ sở dữ liệu:

1. Di chuyển vào thư mục backend:
   ```bash
   cd apps/backend
   ```
2. Thực thi lệnh chạy migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
   *Lệnh này sẽ tự động cập nhật cấu hình database theo đúng schema định nghĩa trong file `schema.prisma`.*

---

## 5. Xử Lý Các Lỗi Thường Gặp (Troubleshooting)

### Lỗi 1: Trùng cổng 5432 (Port conflict)
* **Mô tả:** Nếu máy tính của bạn đã cài sẵn một bản PostgreSQL cục bộ (không chạy qua Docker), bạn sẽ gặp lỗi trùng cổng `5432`.
* **Cách khắc phục:** 
  1. Tắt dịch vụ PostgreSQL cục bộ chạy trên máy trước khi chạy Docker:
     * *Windows:* Mở ứng dụng **Services**, tìm dịch vụ `postgresql-x64` (hoặc tương tự), nhấn chuột phải chọn **Stop**.
  2. Hoặc sửa cổng chuyển tiếp trong [docker-compose.yml](file:///c:/Users/HuuThai/OneDrive/Desktop/workflow/docker-compose.yml) (ví dụ: đổi `'5432:5432'` thành `'5433:5432'`) và cập nhật lại `DATABASE_URL` trong file `.env`.

### Lỗi 2: `fe_sendauth: no password supplied` (trong Navicat hoặc các GUI quản lý)
* **Nguyên nhân:** Khi kết nối bằng Navicat/DBeaver, bạn chưa nhập hoặc lưu mật khẩu.
* **Cách khắc phục:** 
  1. Chuột phải vào kết nối trong công cụ quản lý -> Chọn **Properties** (hoặc **Connection Properties**).
  2. Tại phần **Password**, điền mật khẩu là `postgres`.
  3. Nhấn **Save / OK** rồi kết nối lại.
