# Hướng dẫn sử dụng Form Admin đa ngôn ngữ

## 🎯 Tổng quan

Form thêm/sửa blog đã được cập nhật với **giao diện đa ngôn ngữ tối ưu** giúp người dùng dễ dàng nhập nội dung tiếng Việt và tiếng Anh.

---

## ✨ Tính năng chính

### 1. **Language Toggle Tabs** (Chuyển đổi ngôn ngữ)
- Tab **🇻🇳 Tiếng Việt** (VI) - Bắt buộc nhập
- Tab **🇬🇧 English** (EN) - Tùy chọn (fallback về VI nếu trống)
- Icon ✓ hiển thị khi đã có nội dung tiếng Anh

### 2. **Copy Button** (Nút sao chép)
- Xuất hiện khi đang ở tab English
- Click để copy nội dung từ VI sang EN
- Tiết kiệm thời gian khi cần dịch

### 3. **Collapsible Sections** (Thu gọn phần)
- Thu/mở từng section để giảm scroll
- Giữ màn hình gọn gàng khi có nhiều section
- Biểu tượng mũi tên cho biết trạng thái

### 4. **Visual Status Badges** (Huy hiệu trạng thái)
- Badge xanh **🇻🇳 VI ✓** khi đã nhập tiếng Việt
- Badge xanh dương **🇬🇧 EN ✓** khi đã nhập tiếng Anh
- Dễ dàng kiểm tra section nào đã dịch

---

## 📝 Workflow khuyến nghị

### **Cách 1: Chỉ nhập tiếng Việt**
```
1. Nhập tiêu đề VI
2. Nhập mô tả ngắn VI (nếu có)
3. Thêm sections và nhập nội dung VI
4. Xuất bản → Website tự động hiển thị VI cho cả 2 ngôn ngữ
```

### **Cách 2: Nhập song ngữ (Optimal)**
```
1. Nhập đầy đủ nội dung VI ở tab VI
2. Chuyển sang tab EN
3. Click "📋 Copy từ VI" cho từng trường
4. Chỉnh sửa/dịch nội dung EN
5. Xuất bản → Website hiển thị đúng ngôn ngữ từng user
```

---

## 🖼️ Cấu trúc Form

### **1. Thông tin cơ bản (Basic Info)**

#### Tab Tiếng Việt (VI):
- **Tiêu đề (VI)** * - Bắt buộc
- **Mô tả ngắn (VI)** - Tùy chọn
- **URL Slug** - Tự động tạo từ tiêu đề VI

#### Tab English (EN):
- **Title (EN)** - Tùy chọn
  - Button: `📋 Copy từ VI`
  - Hint: "Falls back to Vietnamese if empty"
- **Excerpt (EN)** - Tùy chọn
  - Button: `📋 Copy từ VI`

### **2. Sections (Các phần nội dung)**

#### Header mỗi section:
- Số thứ tự: `1`, `2`, `3`...
- Tên section: Hiển thị tiêu đề hoặc "Section X"
- Badges: `🇻🇳 VI ✓` và `🇬🇧 EN ✓` (nếu có)
- Buttons:
  - ⬆️/⬇️ Thu gọn/Mở rộng
  - 🗑️ Xóa section

#### Nội dung section - Tab VI:
- **Tiêu đề phần (VI)** * - Bắt buộc
- **Slug** - Tự động tạo từ tiêu đề
- **Nội dung (VI)** * - Bắt buộc, dùng TiptapEditor (WYSIWYG)

#### Nội dung section - Tab EN:
- Button: `Copy từ VI` (copy cả title + content)
- **Title (EN)** - Tùy chọn
- **Content (EN)** - Tùy chọn, dùng TiptapEditor

---

## 💡 Tips & Best Practices

### ✅ Nên làm:
1. **Luôn nhập tiếng Việt đầy đủ** - Đây là fallback cho tất cả
2. **Dùng "Copy từ VI"** - Sau đó sửa thay vì gõ lại
3. **Thu gọn sections đã xong** - Giữ màn hình gọn
4. **Kiểm tra badges** - Đảm bảo sections quan trọng có cả 2 ngôn ngữ
5. **Lưu nháp thường xuyên** - Tránh mất dữ liệu

### ❌ Không nên:
1. ~~Bỏ trống tiếng Việt~~ - Bắt buộc phải có
2. ~~Copy paste HTML trực tiếp~~ - Dùng TiptapEditor
3. ~~Mở quá nhiều sections cùng lúc~~ - Thu gọn khi không dùng
4. ~~Quên kiểm tra slug~~ - Phải unique, URL-friendly

---

## 🎨 UI Components Giải thích

### Language Toggle Button:
```tsx
🇻🇳 Tiếng Việt     [Active: Blue bg, white text]
🇬🇧 English ✓      [Inactive: Gray bg, gray text]
```

### Copy Button:
```tsx
📋 Copy từ VI      [Blue bg, blue text]
```
**Khi click:**
- Main form: Copy `title` → `title_en`, `excerpt` → `excerpt_en`
- Section: Copy `title` → `title_en`, `content` → `content_en`

### Status Badges:
```tsx
🇻🇳 VI ✓          [Green badge - có nội dung VI]
🇬🇧 EN ✓          [Blue badge - có nội dung EN]
```

### Collapse Button:
```tsx
⬇️ Arrow Down     [Section expanded]
➡️ Arrow Right    [Section collapsed]
```

---

## 🔧 Technical Notes

### State Management:
```typescript
// Main language for basic info
const [mainLanguage, setMainLanguage] = useState<"vi" | "en">("vi");

// Per-section language
const [sectionLanguages, setSectionLanguages] = useState<{[key: number]: "vi" | "en"}>({});

// Collapsed sections
const [collapsedSections, setCollapsedSections] = useState<Set<number>>(new Set());
```

### Data Structure:
```typescript
interface BlogFormData {
  title: string;        // Required VI
  title_en?: string;    // Optional EN
  excerpt?: string;     // Optional VI
  excerpt_en?: string;  // Optional EN
  sections: BlogSection[];
  // ... other fields
}

interface BlogSection {
  title: string;        // Required VI
  title_en?: string;    // Optional EN
  content: string;      // Required VI
  content_en?: string;  // Optional EN
  slug: string;
  type: string;
}
```

### API Payload:
```json
{
  "title": "Sản phẩm mới",
  "title_en": "New Product",
  "excerpt": "Giới thiệu sản phẩm...",
  "excerpt_en": "Introducing product...",
  "sections": [
    {
      "title": "Đặc điểm",
      "title_en": "Features",
      "content": "<p>Nội dung VI...</p>",
      "content_en": "<p>EN content...</p>",
      "slug": "dac-diem",
      "type": "text"
    }
  ]
}
```

---

## 🚀 Shortcuts & Keyboard

| Action | Shortcut |
|--------|----------|
| Switch to VI tab | Click `🇻🇳 Tiếng Việt` |
| Switch to EN tab | Click `🇬🇧 English` |
| Copy content | Click `📋 Copy từ VI` |
| Collapse section | Click ⬆️ icon |
| Expand section | Click ⬇️ icon |
| Add section | Click `Thêm phần` |
| Remove section | Click 🗑️ icon |

---

## 📊 Example Workflow

### Ví dụ: Tạo blog về sản phẩm

**Bước 1: Thông tin cơ bản (Tab VI)**
```
Tiêu đề: "Viên uống Vitamin C tăng cường sức đề kháng"
Mô tả ngắn: "Sản phẩm bổ sung vitamin C từ thiên nhiên..."
```

**Bước 2: Chuyển sang Tab EN**
```
Click "📋 Copy từ VI" cho Title
→ Sửa thành: "Vitamin C Supplements for Immune Support"

Click "📋 Copy từ VI" cho Excerpt
→ Dịch thành: "Natural vitamin C supplement product..."
```

**Bước 3: Thêm Section 1 (Tab VI)**
```
Tiêu đề phần: "Thành phần chính"
Nội dung: [Dùng TiptapEditor nhập nội dung rich text]
```

**Bước 4: Dịch Section 1 (Tab EN)**
```
Click "Copy từ VI" ở section header
→ Title tự động thành "Thành phần chính"
→ Content tự động copy

Sửa Title EN: "Main Ingredients"
Sửa Content EN: [Dịch nội dung trong TiptapEditor]
```

**Bước 5: Kiểm tra**
```
✓ Section 1 header hiển thị: 🇻🇳 VI ✓  🇬🇧 EN ✓
✓ Cả 2 badges đều có → Đã dịch xong
```

**Bước 6: Lặp lại cho các section khác**
```
Section 2: "Công dụng" / "Benefits"
Section 3: "Hướng dẫn sử dụng" / "Usage Instructions"
...
```

**Bước 7: Xuất bản**
```
Click "🚀 Xuất bản ngay" hoặc "💾 Lưu nháp"
```

---

## 🐛 Troubleshooting

### **Badge không hiển thị?**
- Kiểm tra đã nhập nội dung chưa (title và content không trống)
- Badge chỉ hiển thị khi có dữ liệu

### **Copy button không hoạt động?**
- Đảm bảo đã nhập nội dung VI trước
- Button chỉ xuất hiện ở tab EN

### **Section bị collapse không mở được?**
- Click vào icon mũi tên ở header
- Kiểm tra không có lỗi console

### **TiptapEditor không lưu content?**
- Đảm bảo onChange được gọi
- Kiểm tra field name (`content` hoặc `content_en`)

### **Slug không tự động tạo?**
- Slug chỉ tự động từ title VI (không phải title_en)
- Có thể sửa thủ công nếu cần

---

## 📞 Liên hệ Support

Nếu gặp vấn đề với form:
1. Check console browser (F12)
2. Kiểm tra network tab (API calls)
3. Xem docs/PAGINATION_I18N_GUIDE.md để biết chi tiết API
4. Liên hệ dev team

---

## 📚 Related Docs

- [PAGINATION_I18N_GUIDE.md](./PAGINATION_I18N_GUIDE.md) - Chi tiết API và Backend
- [ADMIN_DASHBOARD.md](./ADMIN_DASHBOARD.md) - Tổng quan Admin Dashboard
- [ADMIN_QUICK_START.md](./ADMIN_QUICK_START.md) - Hướng dẫn nhanh Admin

---

**Last updated:** 2024-01-09
**Version:** 1.0.0
