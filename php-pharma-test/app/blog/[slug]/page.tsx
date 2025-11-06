"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
}

interface Blog {
  _id: string;
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

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

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
    if (slug) {
      fetchBlogBySlug();
    }
  }, [slug]);

  const fetchBlogBySlug = async () => {
    try {
      setLoading(true);
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

      // Fetch all blogs and find by slug
      const response = await fetch(`${apiUrl}/blog?status=published`);
      if (!response.ok) throw new Error("Failed to fetch blog");

      const blogs: Blog[] = await response.json();
      const currentBlog = blogs.find((b) => b.slug === slug);

      if (!currentBlog) {
        router.push("/blog");
        return;
      }

      setBlog(currentBlog);

      // Get related blogs from same category
      const related = blogs
        .filter(
          (b) =>
            b._id !== currentBlog._id &&
            b.informationId?._id === currentBlog.informationId?._id
        )
        .slice(0, 3);
      setRelatedBlogs(related);
    } catch (error) {
      console.error("Error fetching blog:", error);
      router.push("/blog");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative w-full h-96 bg-gray-900">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-8 left-0 right-0">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-white text-sm">
              <Link href="/" className="hover:underline">
                Trang chủ
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
              <span>/</span>
              <span className="text-blue-300">{blog.title}</span>
            </div>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              {blog.informationId && (
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
                  {blog.informationId.name}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center gap-6 text-white/90">
                <span className="flex items-center gap-2">
                  👤 <span className="font-medium">{blog.author}</span>
                </span>
                <span className="flex items-center gap-2">
                  📅 {formatDate(blog.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Sections */}
            <div className="prose prose-lg max-w-none">
              {blog.sections.map((section, index) => (
                <div key={index} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          {relatedBlogs.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Bài viết liên quan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link
                    key={relatedBlog._id}
                    href={`/blog/${relatedBlog.slug}`}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      {relatedBlog.image && (
                        <img
                          src={relatedBlog.image}
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        {formatDate(relatedBlog.createdAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Quay lại danh sách blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
