"use client";

import Layout from "../../components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { blogApi } from "@/lib/api";
import type { Blog } from "@/lib/api";

export default function NewsDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await blogApi.getById(id);
        setBlog(response);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError("Failed to load article. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <span className="text-9xl">📰</span>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center">
            <Link
              href="/news"
              className="text-red-600 hover:text-red-700 font-semibold mb-2 inline-block"
            >
              ← Back to News
            </Link>
            <h1 className="text-4xl font-bold text-gray-800">News Article</h1>
          </div>
        </div>
      </div>

      {/* Yellow Separator Bar */}
      <div className="h-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400"></div>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <Link
                href="/news"
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                ← Back to News
              </Link>
            </div>
          ) : blog ? (
            <article className="bg-white">
              {/* Article Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  {blog.tags && blog.tags.length > 0 && (
                    <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded">
                      {blog.tags[0]}
                    </span>
                  )}
                  <span className="text-gray-500 text-sm">
                    {formatDate(blog.createdAt)}
                  </span>
                  {blog.author && (
                    <>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600 text-sm">
                        By {blog.author}
                      </span>
                    </>
                  )}
                </div>
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                  {blog.title}
                </h1>
              </div>

              {/* Featured Image */}
              {blog.image && (
                <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {blog.sections && blog.sections.length > 0 ? (
                  blog.sections.map((section, index) => (
                    <div key={index} className="mb-8">
                      {section.title && (
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                          {section.title}
                        </h2>
                      )}
                      <div
                        className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No content available.</p>
                )}
              </div>

              {/* Tags Section */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Tags:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to News Link */}
              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <Link
                  href="/news"
                  className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold text-lg"
                >
                  <span>←</span>
                  <span>Back to All News</span>
                </Link>
              </div>
            </article>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-4">Article not found.</p>
              <Link
                href="/news"
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                ← Back to News
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
