# Nguyên Tắc Xây Dựng & Kiến Trúc Next.js (Frontend)

Tài liệu này định nghĩa kiến trúc tổng thể, quy tắc thiết kế và cách viết code chuẩn cho phần Frontend (Next.js App Router + TypeScript + Tailwind/CSS) của dự án **Workflow**.

---

## 1. Kiến Trúc Tổng Thể (Overall Architecture)

Frontend được xây dựng dựa trên phiên bản **Next.js App Router** hiện đại nhất, chú trọng vào trải nghiệm người dùng (UX), hiệu năng (Performance) và tối ưu hóa tìm kiếm (SEO).

```
                  [Client Web Browser]
                           |
                           v
              [App Router (src/app/*)]
                           |
       +-------------------+-------------------+
       |                                       |
[Server Components (RSC)]              [Client Components]
 - Render trên server                   - "use client"
 - Fetch dữ liệu bảo mật                - Trạng thái động (useState, useEffect)
 - SEO tốt, nhẹ bundle size             - Tương tác nút bấm, form, animation
```

### Triết lý Render (RSC & Client Components):
1. **React Server Components (RSC) làm mặc định:** Tất cả các component/trang trong thư mục `app/` mặc định là Server Components. Chúng giúp tải trang nhanh hơn, giảm dung lượng Javascript tải về client và cải thiện điểm SEO.
2. **Client Components chỉ dùng khi cần thiết:** Chỉ thêm chỉ thị `"use client"` ở đầu file khi component đó cần:
   * Sử dụng React Hooks (như `useState`, `useReducer`, `useEffect`, `useContext`).
   * Sử dụng Event Listeners (như `onClick`, `onChange`, `onSubmit`).
   * Sử dụng Browser APIs (như `window`, `localStorage`, `document`).

---

## 2. Tổ Chức Thư Mục (Folder Structure Rules)

Cấu trúc thư mục được thiết kế theo hướng module hóa, dễ dàng mở rộng và tái sử dụng:

```
src/
├── app/                      # Nơi định nghĩa Routing, Layouts và Pages
│   ├── layout.tsx            # Root layout dùng chung
│   ├── page.tsx              # Trang chủ (Homepage)
│   ├── globals.css           # CSS toàn cục / Tailwind CSS
│   └── (features)/           # Các route hoặc nhóm tính năng (ví dụ: dashboard, auth, workflows)
├── components/               # Các UI components tái sử dụng
│   ├── ui/                   # Các component cơ bản (Button, Input, Card, Modal, v.v.)
│   ├── common/               # Component Layout chung (Header, Footer, Sidebar)
│   └── features/             # Component gắn liền với nghiệp vụ của một tính năng cụ thể
├── hooks/                    # Các Custom React Hooks
├── lib/                      # Các thư viện/cấu hình dùng chung (vd: axios, prisma client if any, utils)
├── services/                 # Định nghĩa các API call gửi lên backend
├── types/                    # Nơi định nghĩa các Type/Interface của TypeScript
└── utils/                    # Các hàm helper, định dạng ngày tháng, tiền tệ, v.v.
```

---

## 3. Quy Tắc Phát Triển Code (Coding Rules)

### 3.1. Lấy Dữ Liệu (Data Fetching & Mutations)
* **Server-side fetching:** Ưu tiên lấy dữ liệu trực tiếp trong Server Components bằng cách sử dụng `async/await` và hàm `fetch` có hỗ trợ cache/revalidate của Next.js.
* **Client-side fetching:** Đối với các luồng dữ liệu cần tải động liên tục hoặc sau tương tác của người dùng, sử dụng **SWR** hoặc **TanStack Query (React Query)** để quản lý state và cache.
* **Server Actions:** Sử dụng Server Actions (`"use server"`) cho các thao tác gửi form hoặc thay đổi dữ liệu (mutations) nhằm đơn giản hóa việc kết nối Client-Server và tối ưu hoá UX.

### 3.2. Quản Lý Trạng Thái (State Management)
* **Local State:** Sử dụng `useState` cho các trạng thái cục bộ của component.
* **UI/URL State:** Ưu tiên sử dụng Query Parameters (URL search params) cho các tác vụ như bộ lọc, phân trang, tìm kiếm để người dùng có thể chia sẻ liên kết trực tiếp.
* **Global State:** Sử dụng React Context API cho các dữ liệu toàn cục đơn giản (như Dark Mode, Theme, Auth User). Với các logic quá phức tạp, có thể cân nhắc dùng `Zustand`.

### 3.3. Tối Ưu Hóa Tài Nguyên (Performance & Asset Optimization)
* **Images:** Luôn sử dụng component `<Image>` từ `next/image` thay vì thẻ `<img>` truyền thống để tự động tối ưu định dạng (WebP/AVIF), tự động co giãn kích thước (lazy load) và chống Layout Shift.
* **Fonts:** Sử dụng thư viện `next/font` để load các font chữ từ Google Fonts nhằm tránh tình trạng giật font (FOIT/FAF) khi tải trang.
* **Navigation:** Luôn sử dụng `<Link>` từ `next/link` thay vì thẻ `<a>` để Next.js prefetch (tải trước) trang đích giúp việc chuyển trang nhanh tức thì.

### 3.4. SEO và Metadata
* Mỗi trang hoặc layout cần định nghĩa rõ ràng Metadata (Title, Description, OpenGraph tags) bằng cách export hằng số `metadata` hoặc sử dụng hàm `generateMetadata()` cho các nội dung động.

```typescript
export const metadata: Metadata = {
  title: 'Tên Trang | Hệ Thống Quản Lý Quy Trình',
  description: 'Mô tả chi tiết nội dung trang giúp SEO tốt hơn.',
};
```
