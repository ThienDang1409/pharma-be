# 📚 Hướng Dẫn Sử Dụng Pharma Test - Hệ Thống Quản Lý Sản Phẩm & Tin Tức

## 📋 Mục Lục
1. [Cài Đặt & Chạy](#cài-đặt--chạy)
2. [Tính Năng Chính](#tính-năng-chính)
3. [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng)
4. [Quản Lý Nội Dung](#quản-lý-nội-dung)
5. [Xác Thực & Bảo Mật](#xác-thực--bảo-mật)
6. [Tìm Kiếm & Lọc](#tìm-kiếm--lọc)
7. [Đa Ngôn Ngữ](#đa-ngôn-ngữ)
8. [Troubleshooting](#troubleshooting)

---

## 🚀 Cài Đặt & Chạy

### Yêu Cầu Hệ Thống
- Node.js v18+
- npm hoặc yarn
- MongoDB Atlas (hoặc local MongoDB)
- Port 3000 (Backend), 3001 (Frontend)

### Cài Đặt Backend

```bash
cd php-pharma-backend
npm install

# Tạo file .env
# MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
# PORT=3000

npm start
# hoặc
node app.js
```

### Cài Đặt Frontend

```bash
cd php-pharma-test
npm install

# Tạo file .env.local
# NEXT_PUBLIC_API_URL=http://localhost:3000

npm run dev
# Truy cập: http://localhost:3001
```

---

## ✨ Tính Năng Chính

### 👥 Xác Thực & Phân Quyền
- ✅ Đăng nhập/Đăng xuất
- ✅ Quản lý tài khoản cá nhân
- ✅ Reset mật khẩu
- ✅ JWT Token (15 phút access, 7 ngày refresh)
- ✅ Phân quyền (Admin/User)

### 📱 Công Khai (Public)
- ✅ Trang chủ với slider sản phẩm & tin tức
- ✅ Danh mục sản phẩm phân cấp
- ✅ Trang chi tiết sản phẩm/bài viết
- ✅ Xem tin tức mới nhất
- ✅ Tìm kiếm toàn văn (Products/News)
- ✅ Liên hệ

### 🛠️ Admin Panel
- ✅ Quản lý bài viết (Create/Read/Update/Delete)
- ✅ Quản lý danh mục
- ✅ Quản lý thông tin công ty
- ✅ Upload ảnh (Tiptap Editor)
- ✅ Phân loại Sản phẩm/Tin tức

### 🌐 Đa Ngôn Ngữ
- ✅ Tiếng Việt (VI)
- ✅ Tiếng Anh (EN)
- ✅ Tự động chuyển ngôn ngữ

---

## 📖 Hướng Dẫn Sử Dụng

### 🏠 Trang Chủ

#### Các Thành Phần
1. **Header** - Thanh điều hướng chính
   - Logo công ty
   - Menu danh mục (Sản phẩm, Tin tức, Liên hệ)
   - Thanh tìm kiếm
   - Chuyển đổi ngôn ngữ (VI/EN)

2. **Hero Section** - Banner chính với hình ảnh nổi bật

3. **Product Slider** - Slider sản phẩm nổi bật
   - Cuộn qua lại giữa các sản phẩm
   - Click để xem chi tiết

4. **Latest News** - Tin tức mới nhất
   - Hiển thị 6 bài viết mới nhất
   - Link "Xem tất cả"

5. **Company Banner** - Thông tin công ty

6. **Footer** - Chân trang với liên kết & thông tin liên hệ

---

### 🔍 Tìm Kiếm

#### Cách Sử Dụng
1. Click biểu tượng 🔍 ở header
2. Nhập từ khóa tìm kiếm
3. Nhấn Enter hoặc click nút "Tìm kiếm"
4. Xem kết quả với bộ lọc:
   - **Tất cả** - Hiển thị toàn bộ kết quả
   - **Sản phẩm** - Chỉ sản phẩm
   - **Tin tức** - Chỉ bài viết/tin tức

#### Tính Năng
- ✅ Tìm kiếm trong tiêu đề, nội dung, tags
- ✅ Phân trang 9 kết quả/trang
- ✅ Hiển thị badge Sản phẩm/Tin tức
- ✅ Thông tin tác giả & ngày đăng

---

### 🛍️ Danh Mục Sản Phẩm

#### Cấu Trúc Danh Mục
```
Sản Phẩm (Root)
├── Danh mục 1
│   ├── Danh mục con 1
│   └── Danh mục con 2
└── Danh mục 2
```

#### Cách Duyệt
1. Hover vào "Sản Phẩm" ở header
2. Thấy bố cục dạng lưới danh mục
3. Click danh mục để xem sản phẩm

#### Dropdown Sản Phẩm
- **Bên trái** - Hình ảnh danh mục (3/4 chiều rộng)
- **Bên phải** - Danh sách danh mục con (1/4 chiều rộng)
- Click danh mục con để xem sản phẩm

---

### 📰 Tin Tức

#### Xem Tin Tức
1. Vào menu "Tin Tức"
2. Xem danh sách tin tức mới nhất
3. Phân trang 9 bài/trang
4. Click bài viết để xem chi tiết

#### Cấu Trúc Danh Mục Tin Tức
- Tương tự danh mục sản phẩm
- Hỗ trợ danh mục con

---

### 📄 Xem Chi Tiết Sản Phẩm/Bài Viết

#### Các Phần

1. **Header Chi Tiết**
   - Tiêu đề, tác giả, ngày đăng
   - Hình ảnh đại diện

2. **Nội Dung Chính**
   - Các section (tiêu đề + nội dung)
   - Hỗ trợ HTML formatting (Bold, Italic, etc.)
   - Hình ảnh trong nội dung

3. **Phần "Liên Quan"**
   - **Nếu là Sản phẩm** → Hiển thị "Sản phẩm liên quan"
   - **Nếu là Tin tức** → Hiển thị "Bài viết liên quan"
   - Grid 3 cột, max 6 items

4. **Breadcrumb**
   - Đường dẫn hiện vị trí: Home > Category > Product

---

## 🛠️ Quản Lý Nội Dung (Admin)

### Đăng Nhập Admin

```
URL: /auth/login
Email: admin@example.com
Password: (được tạo bởi admin hệ thống)
```

### Trang Admin Dashboard

#### Menu Admin
- Dashboard (chính)
- Quản lý Bài viết
- Quản lý Danh mục
- Quản lý Thông tin

---

### ➕ Tạo Bài Viết Mới

#### Bước 1: Truy Cập
Admin → Bài viết → "Thêm bài viết mới"

#### Bước 2: Điền Thông Tin Cơ Bản
- **Tiêu đề** - Tên bài viết
- **URL Slug** - Auto-generate từ tiêu đề (có thể chỉnh)
- **Tác giả** - Tên người viết
- **Danh mục** - Chọn danh mục (có hỗ trợ danh mục con)

#### Bước 3: Hình Ảnh
- **Upload ảnh** - Click chọn file hoặc drag-drop
- **Hoặc URL** - Dán link ảnh trực tiếp
- Xem preview ảnh

#### Bước 4: Tags
1. Nhập tag trong ô input
2. Nhấn Enter hoặc click "Add"
3. Xóa tag bằng nút × trên tag

#### Bước 5: Nội Dung Section

**Thêm Section:**
1. Click "Add Section" (hoặc thêm tự động 1 section)
2. Nhập tiêu đề section (auto-generate slug)
3. Soạn nội dung bằng Tiptap Editor

**Editor Tiptap:**
- **Bold** - Ctrl+B
- **Italic** - Ctrl+I
- **Heading** - Dropdown H1-H3
- **Link** - Ctrl+K
- **List** - Bullet/Numbered
- **Upload ảnh** - Button 📷

**Xóa Section:**
Click nút ❌ ở góc trên phải

#### Bước 6: Phân Loại
- **Checkbox "Đây là sản phẩm"**
  - ✅ Ticked = Sản phẩm (isProduct: true)
  - ⬜ Unticked = Bài viết/Tin tức (isProduct: false)

#### Bước 7: Xuất Bản
- **Trạng thái**: Draft hoặc Published
- **🚀 Xuất bản ngay** - Công khai ngay lập tức
- **💾 Lưu nháp** - Lưu nhưng không công khai

### ✏️ Chỉnh Sửa Bài Viết

1. Admin → Bài viết
2. Click bài viết cần chỉnh sửa
3. Sửa thông tin
4. Click "Cập nhật"

### 🗑️ Xóa Bài Viết

1. Admin → Bài viết
2. Tìm bài viết
3. Click nút xóa (thùng rác)
4. Xác nhận

---

### 📁 Quản Lý Danh Mục

#### Tạo Danh Mục
1. Admin → Danh mục → "Thêm danh mục"
2. Nhập:
   - Tên danh mục
   - Slug (auto-generate)
   - Mô tả
   - Hình ảnh
   - Danh mục cha (nếu là con)

#### Cấp Độ Danh Mục
- **Level 1** - Root (Sản phẩm, Tin tức, etc.)
- **Level 2** - Con của Level 1
- **Level 3+** - Con của Level 2 (không giới hạn)

---

### ℹ️ Quản Lý Thông Tin Công Ty

1. Admin → Thông tin
2. Nhập thông tin:
   - Tên công ty
   - Địa chỉ
   - Số điện thoại
   - Email
   - Website
   - Mô tả công ty
3. Click Cập nhật

---

## 🔐 Xác Thực & Bảo Mật

### Đăng Nhập

#### Admin
```
Email: admin@example.com
Password: (do admin thiết lập)
```

#### Người Dùng
- Đăng ký công khai: **DISABLED** (chỉ admin tạo)
- Click "Đăng nhập" để nhập credentials

### Token JWT

- **Access Token** - 15 phút (trong request header)
- **Refresh Token** - 7 ngày (tự động refresh)
- **Lưu trữ** - LocalStorage

### Bảo Mật Routes

#### Public Routes (Ai cũng vào được)
- `/` - Trang chủ
- `/blog/[slug]` - Chi tiết bài viết
- `/category/[slug]` - Danh mục
- `/search` - Tìm kiếm
- `/news` - Tin tức

#### Protected Routes (Phải login)
- `/admin/*` - Admin panel (require role: admin)
- `/profile` - Trang cá nhân

#### No Auth Required
- `/auth/login` - Đăng nhập
- `/auth/register` - Đăng ký (commented out)

---

## 🔍 Tìm Kiếm & Lọc

### Tìm Kiếm Toàn Văn
- Tìm trong: Tiêu đề, nội dung sections, tags
- Case-insensitive (không phân biệt hoa thường)
- Regex search (hỗ trợ pattern)

### Filter Theo Loại
- **Tất cả** - Sản phẩm + Tin tức
- **Sản phẩm** - isProduct = true
- **Tin tức** - isProduct = false

### Pagination
- 9 kết quả/trang
- Navigation: Previous/Next
- Jump to page: Click số trang

---

## 🌐 Đa Ngôn Ngữ

### Hỗ Trợ Ngôn Ngữ
- 🇻🇳 Tiếng Việt (VI)
- 🇬🇧 Tiếng Anh (EN)

### Chuyển Ngôn Ngữ
1. Click biểu tượng 🌍 ở header (show VI/EN)
2. Chọn ngôn ngữ muốn
3. Trang tự động reload và thay đổi ngôn ngữ

### Translation Keys
Tất cả text được quản lý trong:
- `locales/vi.json` - Tiếng Việt
- `locales/en.json` - Tiếng Anh

### Thêm Ngôn Ngữ Mới
1. Tạo file `locales/[code].json`
2. Copy cấu trúc từ `vi.json`
3. Dịch toàn bộ values
4. Import trong component: `useLanguage()` hook

---

## 🆘 Troubleshooting

### ❌ Lỗi: "Cannot find backend"
**Nguyên nhân**: Backend không chạy hoặc sai port
```bash
# Kiểm tra
curl http://localhost:3000

# Fix
cd php-pharma-backend
npm start
```

### ❌ Lỗi: "MongoDB connection failed"
**Nguyên nhân**: Connection string sai hoặc cluster bị pause
```bash
# Kiểm tra .env
MONGO_URI=mongodb+srv://user:pass@cluster.xxx.mongodb.net/dbname

# Nếu dùng MongoDB Atlas
# 1. Vào cloud.mongodb.com
# 2. Resume cluster nếu bị pause
# 3. Thêm IP vào Network Access (0.0.0.0/0 để test)
```

### ❌ Lỗi: "Search bar không mở được khi scroll"
**Fix**: Header giờ hỗ trợ mở search khi scroll. Khi search mở, header sẽ luôn hiện.

### ❌ Lỗi: "quá nhiều API calls"
**Fix**: Đã optimize cache categories & blogs. Chỉ fetch 1 lần per category.

### ❌ Lỗi: "Deploy failed - Suspense boundary"
**Fix**: Search page đã wrap Suspense. Sử dụng fallback loading.

### ⚠️ Chậm tải trang?
**Optimize**:
1. Giảm số lượng tags
2. Giảm kích thước ảnh
3. Dùng CDN cho ảnh
4. Enable caching ở backend

---

## 📊 Database Schema

### Blog Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  slug: String (unique, required),
  sections: [{
    type: String,
    title: String,
    slug: String,
    content: String (HTML)
  }],
  author: String,
  informationId: ObjectId (reference Information),
  image: String (URL),
  tags: [String],
  isProduct: Boolean (default: false),
  status: "draft" | "published",
  createdAt: Date,
  updatedAt: Date
}
```

### Information Model
```javascript
{
  _id: ObjectId,
  name: String,
  slug: String,
  parentId: ObjectId | null,
  description: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### User Model
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  role: "user" | "admin",
  refreshTokens: [String],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔄 API Endpoints

### Blog Endpoints
```
GET    /blog                 - Lấy danh sách (support: search, category, status)
GET    /blog/:id             - Lấy chi tiết theo ID
GET    /blog/slug/:slug      - Lấy chi tiết theo slug
POST   /blog                 - Tạo mới (admin only)
PUT    /blog/:id             - Cập nhật (admin only)
DELETE /blog/:id             - Xóa (admin only)
```

### Information Endpoints
```
GET    /information          - Lấy danh sách danh mục
GET    /information/:id      - Lấy chi tiết danh mục
POST   /information          - Tạo danh mục (admin only)
PUT    /information/:id      - Cập nhật danh mục (admin only)
DELETE /information/:id      - Xóa danh mục (admin only)
```

### Auth Endpoints
```
POST   /auth/login           - Đăng nhập
POST   /auth/register        - Đăng ký (disabled)
POST   /auth/logout          - Đăng xuất
GET    /auth/me              - Lấy thông tin user hiện tại
POST   /auth/refresh         - Refresh token
PUT    /auth/profile         - Cập nhật profile
POST   /auth/change-password - Đổi mật khẩu
POST   /auth/forgot-password - Quên mật khẩu
POST   /auth/reset-password  - Reset mật khẩu
```

---

## 📝 Lưu Ý Quan Trọng

### ⚡ Performance
- Ảnh nên < 500KB
- Tối đa 5 sections per bài viết
- Tối đa 20 tags per bài viết

### 🔒 Bảo Mật
- Không share access token
- Reset mật khẩu định kỳ
- Logout khi sử dụng chung máy

### 📱 Mobile
- Site fully responsive
- Dropdown tự động adjust
- Touch-friendly UI

### 🌍 SEO
- Slug tự động từ tiêu đề
- Meta tags được sinh từ content
- Breadcrumb hỗ trợ schema.org

---

## 📞 Hỗ Trợ

- **Email**: support@pharmatest.com
- **Điện thoại**: +84 123 456 789
- **Website**: https://pharmatest.com

---

**Phiên bản**: 1.0.0  
**Cập nhật lần cuối**: 5/12/2025  
**Tác giả**: Pharma Test Team
