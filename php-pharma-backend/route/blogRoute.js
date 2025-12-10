const express = require('express');
const router = express.Router();
const Blog = require('../model/blogModel');
const Information = require('../model/informationModel');
const { generateSlug, generateUniqueSlug } = require('../utils/slugHelper');

// =============================
// 🔹 1. Lấy danh sách Blog (tất cả hoặc lọc theo category / tìm kiếm) - CÓ PHÂN TRANG
// Hỗ trợ includeDescendants=true để lấy cả blogs của category con/cháu
// =============================
router.get('/', async (req, res) => {
  try {
    const { informationId, search, status, includeDescendants, page = 1, limit = 10 } = req.query;
    const filter = {};

    // Nếu có informationId và includeDescendants=true, lấy cả con cháu
    if (informationId && includeDescendants === 'true') {
      // Lấy tất cả categories
      const allCategories = await Information.find({});
      
      // Hàm đệ quy lấy tất cả ID con cháu
      const getAllDescendantIds = (categoryId, categories) => {
        const children = categories.filter(cat => 
          cat.parentId && cat.parentId.toString() === categoryId.toString()
        );
        let descendantIds = [];
        
        children.forEach(child => {
          descendantIds.push(child._id);
          descendantIds = descendantIds.concat(
            getAllDescendantIds(child._id, categories)
          );
        });
        
        return descendantIds;
      };
      
      // Lấy tất cả IDs (bao gồm cả category hiện tại)
      const categoryIds = [informationId, ...getAllDescendantIds(informationId, allCategories)];
      filter.informationId = { $in: categoryIds };
    } else if (informationId) {
      // Chỉ lấy blogs trực tiếp của category này
      filter.informationId = informationId;
    }

    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { title: new RegExp(search, 'i') },
        { title_en: new RegExp(search, 'i') },
        { sections: new RegExp(search, 'i') },
        { tags: new RegExp(search, 'i') }
      ];
    }

    // Pagination calculation
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Get total count
    const total = await Blog.countDocuments(filter);

    // Get paginated results
    const blogs = await Blog.find(filter)
      .populate('informationId', 'name name_en slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // Return paginated response
    res.status(200).json({
      data: blogs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Lỗi khi lấy danh sách blog.' });
  }
});

// =============================
// 🔹 2. Lấy chi tiết 1 Blog theo ID
// =============================
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('informationId', 'name slug');
    if (!blog) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết.' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    res.status(500).json({ message: 'Lỗi khi lấy bài viết.' });
  }
});

// =============================
// 🔹 3. Lấy blog theo slug (SEO-friendly)
// =============================
router.get('/slug/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate('informationId', 'name slug');
    if (!blog) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết theo slug.' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    res.status(500).json({ message: 'Lỗi khi lấy bài viết theo slug.' });
  }
});

// =============================
// 🔹 4. Thêm mới Blog
// =============================
router.post('/', async (req, res) => {
  try {
    let { title, title_en, slug, sections, author, informationId, image, tags, isProduct, status, excerpt, excerpt_en } = req.body;

    // Auto-generate slug from English title (preferred) or Vietnamese title
    if (!slug) {
      const baseSlug = generateSlug(title_en || title);
      slug = await generateUniqueSlug(baseSlug, Blog);
    } else {
      // Check if provided slug exists
      const existing = await Blog.findOne({ slug });
      if (existing) {
        return res.status(400).json({ message: 'Slug đã tồn tại.' });
      }
    }

    // Kiểm tra category hợp lệ (nếu có)
    if (informationId) {
      const category = await Information.findById(informationId);
      if (!category) {
        return res.status(400).json({ message: 'Category không hợp lệ.' });
      }
    }

    const newBlog = new Blog({
      title,
      title_en,
      slug,
      sections,
      author,
      informationId,
      image,
      tags,
      excerpt,
      excerpt_en,
      isProduct: isProduct || false,
      status: status || 'draft'
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Lỗi khi tạo bài viết.' });
  }
});

// =============================
// 🔹 5. Cập nhật Blog
// =============================
router.put('/:id', async (req, res) => {
  try {
    let { title, title_en, slug, sections, author, informationId, image, tags, isProduct, status, excerpt, excerpt_en } = req.body;

    // Get existing blog
    const existingBlog = await Blog.findById(req.params.id);
    if (!existingBlog) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết để cập nhật.' });
    }

    // If title_en or title changed and no slug provided, regenerate slug
    // Prioritize English title for slug generation
    const titleForSlug = title_en || title;
    const existingTitleForSlug = existingBlog.title_en || existingBlog.title;
    
    if (titleForSlug !== existingTitleForSlug && !slug) {
      const baseSlug = generateSlug(titleForSlug);
      slug = await generateUniqueSlug(baseSlug, Blog, req.params.id);
    } else if (!slug) {
      slug = existingBlog.slug; // Keep existing slug
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, title_en, slug, sections, author, informationId, image, tags, isProduct, status, excerpt, excerpt_en },
      { new: true }
    );

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Lỗi khi cập nhật bài viết.' });
  }
});

// =============================
// 🔹 6. Xóa Blog
// =============================
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Không tìm thấy bài viết để xóa.' });
    }
    res.status(200).json({ message: 'Đã xóa bài viết thành công.' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Lỗi khi xóa bài viết.' });
  }
});

// =============================
// 🔹 7. Lấy blog theo danh mục (category slug)
// =============================
router.get('/category/:slug', async (req, res) => {
  try {
    const category = await Information.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ message: 'Không tìm thấy category.' });
    }

    const blogs = await Blog.find({ informationId: category._id })
      .populate('informationId', 'name slug')
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs by category:', error);
    res.status(500).json({ message: 'Lỗi khi lấy bài viết theo danh mục.' });
  }
});

// =============================
// 🔹 8. Đếm số lượng bài viết theo category
// =============================
router.get('/stats/count-by-category', async (req, res) => {
  try {
    const stats = await Blog.aggregate([
      { $group: { _id: '$informationId', count: { $sum: 1 } } },
      {
        $lookup: {
          from: 'informations',
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $project: {
          _id: 1,
          count: 1,
          category: { $arrayElemAt: ['$category.name', 0] }
        }
      }
    ]);

    res.status(200).json(stats);
  } catch (error) {
    console.error('Error counting blogs by category:', error);
    res.status(500).json({ message: 'Lỗi khi thống kê số lượng bài viết.' });
  }
});

module.exports = router;
