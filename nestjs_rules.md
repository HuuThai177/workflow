# Nguyên Tắc Xây Dựng & Kiến Trúc NestJS (Backend)

Tài liệu này định nghĩa kiến trúc tổng thể, quy tắc thiết kế và các chuẩn mực code áp dụng cho phần Backend (NestJS + Prisma) của dự án **Workflow**.

---

## 1. Kiến Trúc Tổng Thể (Overall Architecture)

Hệ thống Backend được thiết kế theo mô hình **Modular Architecture** (Kiến trúc Module) kết hợp với **Separation of Concerns** (Phân tách các mối quan tâm) và **Dependency Injection** (Tiêm phụ thuộc).

```
[Client] ---> [Controller] ---> [Service] ---> [Prisma Service / DB]
                  |                |
                  v                v
             [DTOs/Pipes]     [Business Logic]
```

### Quy tắc phân lớp:
1. **Controller Layer:** Nhận request, định tuyến (routing), phân tích tham số (params, query, body), xác thực dữ liệu đầu vào (DTOs), và trả về response cho client. Không chứa logic nghiệp vụ (business logic).
2. **Service Layer (Business Logic):** Nơi xử lý toàn bộ logic nghiệp vụ của ứng dụng, tính toán dữ liệu, kiểm tra quyền hạn nghiệp vụ, và tương tác với lớp dữ liệu.
3. **Data Access Layer (Prisma):** Tương tác trực tiếp với cơ sở dữ liệu thông qua `PrismaService`. Không viết trực tiếp các câu truy vấn phức tạp hoặc raw SQL trong Controller.

---

## 2. Quy Tắc Tổ Chức Thư Mục (Folder Structure Rules)

Mỗi tính năng (feature) cần được gom nhóm trong một module riêng biệt nằm trong `src/`:

```
src/
├── app.module.ts            # Module gốc của ứng dụng
├── main.ts                  # Entry point (Khởi động NestJS app)
├── prisma/                  # Prisma module & service dùng chung
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── [feature]/               # Module cho từng tính năng (vd: users, workflows, tasks)
│   ├── [feature].module.ts
│   ├── [feature].controller.ts
│   ├── [feature].service.ts
│   ├── dto/                 # Chứa các Data Transfer Objects
│   │   ├── create-[feature].dto.ts
│   │   └── update-[feature].dto.ts
│   └── entities/            # Định nghĩa types hoặc models riêng (nếu cần)
```

---

## 3. Quy Tắc Phát Triển Code (Coding Rules)

### 3.1. Xác thực và Kiểm tra dữ liệu (Validation & DTOs)
* Luôn sử dụng **DTOs** cho tất cả các HTTP Request Payload (Body, Query, Param).
* Sử dụng thư viện `class-validator` và `class-transformer` để khai báo các điều kiện xác thực trong DTO.
* Cấu hình `ValidationPipe` toàn cục (`globalPipe`) với `{ whitelist: true, forbidNonWhitelisted: true }` để tự động lọc và từ chối các thuộc tính không hợp lệ từ client gửi lên.

### 3.2. Quản lý Lỗi (Exception Handling)
* Sử dụng các **Built-in HTTP Exceptions** của NestJS để trả về mã lỗi và thông báo trực quan (ví dụ: `NotFoundException`, `BadRequestException`, `ForbiddenException`, `UnauthorizedException`).
* Tránh ném lỗi chung chung hoặc trả về mã lỗi 500 nếu đó là lỗi do phía client (nhập sai dữ liệu, không có quyền, v.v.).

### 3.3. Quản lý Biến Môi Trường (Configuration)
* Không truy cập trực tiếp `process.env` trong các file Service/Controller.
* Sử dụng `@nestjs/config` thông qua `ConfigModule` và `ConfigService` để quản lý biến môi trường một cách tập trung, giúp dễ dàng kiểm tra kiểu dữ liệu và mock khi viết test.

### 3.4. Dependency Injection & Decorators
* Luôn khai báo dependencies trong hàm khởi tạo (`constructor`) thông qua cơ chế Dependency Injection của NestJS.
* Các Service phải được gắn decorator `@Injectable()`.
* Đăng ký Service vào mảng `providers` và export nếu module khác cần sử dụng.

### 3.5. Formatting & Linting
* Code tuân thủ nghiêm ngặt chuẩn cấu hình ESLint và Prettier được định nghĩa trong dự án.
* Sử dụng phím tắt định dạng code tự động trước khi commit.

---

## 4. Kiểm Thử (Testing)

* **Unit Test:** Mỗi service lớn nên đi kèm file `.spec.ts` tương ứng để kiểm thử các hàm logic nghiệp vụ. Sử dụng `@nestjs/testing` để tạo testing module và mock các database service (Prisma).
* **Integration Test:** Viết integration test (e2e) trong thư mục `test/` để kiểm tra toàn bộ luồng hoạt động của API từ khâu nhận request đến lúc trả về kết quả.
