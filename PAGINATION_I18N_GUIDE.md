# 📘 Hướng Dẫn Sử Dụng Pagination & Đa Ngôn Ngữ (i18n)

## 🎯 Tổng quan

Đã cập nhật hệ thống với 2 tính năng chính:
1. **Phân trang (Pagination)** - API trả về data có phân trang
2. **Đa ngôn ngữ (i18n)** - Blog và Category có field tiếng Anh/Việt

---

## 🗄️ Backend Changes

### 1. Database Models

#### **Blog Model** (`blogModel.js`)
Thêm fields mới:
```javascript
{
  title: String,          // Tiêu đề (VI - bắt buộc)
  title_en: String,       // Tiêu đề (EN - tùy chọn)
  excerpt: String,        // Mô tả ngắn (VI)
  excerpt_en: String,     // Mô tả ngắn (EN)
  // ... các field khác giữ nguyên
}
```

#### **Information Model** (`informationModel.js`)
Thêm fields mới:
```javascript
{
  name: String,           // Tên (VI - bắt buộc)
  name_en: String,        // Tên (EN - tùy chọn)
  description: String,    // Mô tả (VI)
  description_en: String, // Mô tả (EN)
  // ... các field khác giữ nguyên
}
```

### 2. API Routes

#### **Blog API** (`/blog`)

**GET /blog** - Lấy danh sách với phân trang:
```javascript
// Request params:
{
  page: 1,              // Trang hiện tại (mặc định: 1)
  limit: 10,            // Số item mỗi trang (mặc định: 10)
  status: 'published',  // Lọc theo status
  informationId: '...', // Lọc theo category
  search: 'keyword',    // Tìm kiếm
  includeDescendants: true  // Lấy cả blog của category con
}

// Response:
{
  data: [/* array of blogs */],
  pagination: {
    page: 1,
    limit: 10,
    total: 45,          // Tổng số items
    totalPages: 5       // Tổng số trang
  }
}
```

**POST/PUT /blog** - Tạo/Cập nhật blog:
```javascript
// Body cần thêm:
{
  title: "...",        // Bắt buộc
  title_en: "...",     // Tùy chọn
  excerpt: "...",      // Tùy chọn
  excerpt_en: "...",   // Tùy chọn
  // ... các field khác
}
```

#### **Information API** (`/information`)

**POST/PUT /information** - Tạo/Cập nhật category:
```javascript
// Body cần thêm:
{
  name: "...",           // Bắt buộc
  name_en: "...",        // Tùy chọn
  description: "...",    // Tùy chọn
  description_en: "..." // Tùy chọn
  // ... các field khác
}
```

---

## 🎨 Frontend Changes

### 1. TypeScript Interfaces (`lib/api.ts`)

```typescript
// Blog interface
export interface Blog {
  _id?: string;
  title: string;
  title_en?: string;       // MỚI
  excerpt?: string;        // MỚI
  excerpt_en?: string;     // MỚI
  // ... các field khác
}

// Information interface
export interface Information {
  _id: string;
  name: string;
  name_en?: string;        // MỚI
  description?: string;
  description_en?: string; // MỚI
  // ... các field khác
}

// Paginated Response
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

### 2. Helper Functions (`lib/utils/i18n.ts`)

```typescript
import { getLocalizedText } from "@/lib/utils/i18n";

// Sử dụng:
const title = getLocalizedText(blog.title, blog.title_en, language);
// Nếu language = "en" và có title_en → trả về title_en
// Ngược lại → trả về title (VI)
```

### 3. Pagination Component (`app/components/Pagination.tsx`)

```tsx
import Pagination from "@/app/components/Pagination";

// Sử dụng:
<Pagination
  currentPage={currentPage}
  totalPages={pagination.totalPages}
  total={pagination.total}
  limit={pagination.limit}
  onPageChange={(page) => setCurrentPage(page)}
  labels={{
    previous: t.pagination.previous,
    next: t.pagination.next,
    showing: t.pagination.showing,
    of: t.pagination.of,
    items: t.pagination.items,
  }}
/>
```

### 4. Translation Keys (vi.json / en.json)

```json
{
  "pagination": {
    "showing": "Hiển thị" / "Showing",
    "of": "của" / "of",
    "items": "mục" / "items",
    "previous": "← Trước" / "← Previous",
    "next": "Sau →" / "Next →"
  }
}
```

---

## 📝 Ví Dụ Sử Dụng

### Ví dụ 1: Trang Blog List với Pagination

```tsx
"use client";

import { useState, useEffect } from "react";
import { blogApi, Blog, PaginatedResponse } from "@/lib/api";
import { useLanguage } from "@/app/context/LanguageContext";
import { getLocalizedText } from "@/lib/utils/i18n";
import Pagination from "@/app/components/Pagination";

export default function BlogListPage() {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs(pagination.page);
  }, [pagination.page]);

  const fetchBlogs = async (page: number) => {
    try {
      setLoading(true);
      const response = await blogApi.getAll({
        page,
        limit: 10,
        status: 'published'
      }) as PaginatedResponse<Blog>;
      
      setBlogs(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <>
          {blogs.map(blog => (
            <div key={blog._id}>
              <h2>{getLocalizedText(blog.title, blog.title_en, language)}</h2>
              <p>{getLocalizedText(blog.excerpt, blog.excerpt_en, language)}</p>
            </div>
          ))}

          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={(page) => setPagination(prev => ({ ...prev, page }))}
          />
        </>
      )}
    </div>
  );
}
```

### Ví dụ 2: Hiển thị Category với i18n

```tsx
const { language } = useLanguage();
const [category, setCategory] = useState<Information | null>(null);

// ...fetch category...

return (
  <div>
    <h1>{getLocalizedText(category.name, category.name_en, language)}</h1>
    <p>{getLocalizedText(category.description, category.description_en, language)}</p>
  </div>
);
```

---

## 🔧 Admin Forms - Thêm Input Đa Ngôn Ngữ

### Form Thêm/Sửa Blog

```tsx
const [formData, setFormData] = useState({
  title: "",
  title_en: "",       // Thêm field EN
  excerpt: "",
  excerpt_en: "",     // Thêm field EN
  // ... các field khác
});

return (
  <form>
    {/* Tiêu đề VI */}
    <input
      name="title"
      placeholder="Tiêu đề (VI) *"
      value={formData.title}
      onChange={handleChange}
      required
    />

    {/* Tiêu đề EN */}
    <input
      name="title_en"
      placeholder="Title (EN)"
      value={formData.title_en}
      onChange={handleChange}
    />

    {/* Mô tả ngắn VI */}
    <textarea
      name="excerpt"
      placeholder="Mô tả ngắn (VI)"
      value={formData.excerpt}
      onChange={handleChange}
    />

    {/* Mô tả ngắn EN */}
    <textarea
      name="excerpt_en"
      placeholder="Short description (EN)"
      value={formData.excerpt_en}
      onChange={handleChange}
    />

    {/* Submit */}
    <button type="submit">Lưu</button>
  </form>
);
```

### Form Thêm/Sửa Category

```tsx
const [formData, setFormData] = useState({
  name: "",
  name_en: "",          // Thêm field EN
  description: "",
  description_en: "",   // Thêm field EN
  // ... các field khác
});

return (
  <form>
    {/* Tên danh mục VI */}
    <input
      name="name"
      placeholder="Tên danh mục (VI) *"
      value={formData.name}
      onChange={handleChange}
      required
    />

    {/* Tên danh mục EN */}
    <input
      name="name_en"
      placeholder="Category name (EN)"
      value={formData.name_en}
      onChange={handleChange}
    />

    {/* Mô tả VI */}
    <textarea
      name="description"
      placeholder="Mô tả (VI)"
      value={formData.description}
      onChange={handleChange}
    />

    {/* Mô tả EN */}
    <textarea
      name="description_en"
      placeholder="Description (EN)"
      value={formData.description_en}
      onChange={handleChange}
    />

    <button type="submit">Lưu</button>
  </form>
);
```

---

## 📋 Checklist Cập Nhật Các Trang

### ✅ Đã hoàn thành:
- [x] Backend Models (Blog, Information)
- [x] Backend Routes (Pagination logic)
- [x] Frontend API interfaces
- [x] Pagination component
- [x] i18n helper functions
- [x] Translation keys

### 🔄 Cần cập nhật:

#### **Admin Pages:**
1. `/admin/blogs/add/page.tsx` - Form thêm blog
2. `/admin/blogs/edit/[id]/page.tsx` - Form sửa blog
3. `/admin/information/page.tsx` - Form thêm/sửa category
4. `/admin/page.tsx` - Dashboard (nếu cần pagination)

#### **Public Pages:**
1. `/app/(public)/search/page.tsx` - Trang tìm kiếm
2. `/app/(public)/category/[slug]/page.tsx` - Trang category
3. `/app/(public)/blog/[slug]/page.tsx` - Trang chi tiết blog
4. `/app/components/Header.tsx` - Dropdown categories
5. `/app/components/LatestNews.tsx` - Latest news section
6. `/app/components/ProductCategories.tsx` - Product categories

---

## 🚀 Migration Tips

### Dữ liệu Cũ (Không có field EN):
- Không cần migration ngay
- Field EN là tùy chọn (optional)
- Hệ thống tự fallback về VI nếu không có EN
- Có thể từ từ thêm EN sau

### Test API với Postman:
```javascript
// GET với pagination
GET http://localhost:5001/api/blog?page=1&limit=10

// POST blog với EN
POST http://localhost:5001/api/blog
{
  "title": "Sản phẩm mới",
  "title_en": "New Product",
  "excerpt": "Mô tả ngắn",
  "excerpt_en": "Short description",
  // ... other fields
}
```

---

## 📞 Hỗ Trợ

Nếu cần hỗ trợ thêm cho việc cập nhật các trang cụ thể, hãy cho tôi biết trang nào cần ưu tiên!
