"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface BlogSection {
  title: string;
  slug: string;
  type: string;
  content: string;
}

interface BlogInformation {
  _id: string;
  name: string;
  slug: string;
  id: string;
}

interface Blog {
  _id: string;
  id: string;
  title: string;
  slug: string;
  author: string;
  image: string;
  informationId: BlogInformation;
  tags: string[];
  sections: BlogSection[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<BlogInformation[]>([]);

  // Suppress browser extension errors
  useEffect(() => {
    const handleError = (event: ErrorEvent | PromiseRejectionEvent) => {
      const error = "error" in event ? event.error : event.reason;
      // Suppress errors from browser extensions
      if (
        error?.message?.includes("permission error") ||
        error?.message?.includes("extension") ||
        error?.originalError?.stack?.includes("chrome-extension")
      ) {
        event.preventDefault();
        return;
      }
    };

    window.addEventListener("error", handleError as any);
    window.addEventListener("unhandledrejection", handleError as any);

    return () => {
      window.removeEventListener("error", handleError as any);
      window.removeEventListener("unhandledrejection", handleError as any);
    };
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [searchQuery, selectedCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategory) params.append("informationId", selectedCategory);
      params.append("status", "published"); // Only show published blogs

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
      const response = await fetch(`${apiUrl}/blog?${params.toString()}`);
      // log response
      console.log("Blog response:", response);
      if (!response.ok) throw new Error("Failed to fetch blogs");

      const data: Blog[] = await response.json();
      setBlogs(data);

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Map(
          data
            .filter((blog) => blog.informationId)
            .map((blog) => [blog.informationId._id, blog.informationId])
        ).values()
      );
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "").substring(0, 150) + "...";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & News</h1>
          <p className="text-xl text-blue-100">
            Khám phá những tin tức và bài viết mới nhất
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search & Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block shacdun animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && blogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Không tìm thấy bài viết nào.
            </p>
          </div>
        )}

        {!loading && blogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                href={`/blog/${blog.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-200">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}

                  {/* Category Badge */}
                  {blog.informationId && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                        {blog.informationId.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>

                  {/* Excerpt */}
                  {blog.sections && blog.sections.length > 0 && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {stripHtml(blog.sections[0].content)}
                    </p>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">👤 {blog.author}</span>
                    </div>
                    <span>📅 {formatDate(blog.createdAt)}</span>
                  </div>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More */}
                  <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                    <span>Đọc thêm</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
