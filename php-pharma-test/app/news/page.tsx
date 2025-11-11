"use client";

import Layout from "../components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { blogApi } from "@/lib/api";

interface NewsArticle {
  _id: string;
  title: string;
  category: string;
  excerpt: string;
  image?: string;
  createdAt: string;
}

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const blogs = await blogApi.getAll();
        // Map Blog[] to NewsArticle[]
        const articles: NewsArticle[] = blogs.map((blog) => ({
          _id: blog._id || "",
          title: blog.title,
          category: blog.tags?.[0] || "General",
          excerpt: blog.sections?.[0]?.content?.substring(0, 150) + "..." || "",
          image: blog.image,
          createdAt: blog.createdAt || new Date().toISOString(),
        }));
        setNewsArticles(articles);
      } catch (error) {
        console.error("Failed to fetch news:", error);
        setNewsArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const totalPages = Math.ceil(newsArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = newsArticles.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getCategoryIcon = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes("event")) return "📅";
    if (categoryLower.includes("product")) return "🔬";
    if (categoryLower.includes("technology") || categoryLower.includes("tech"))
      return "💻";
    if (
      categoryLower.includes("company") ||
      categoryLower.includes("announcement")
    )
      return "🎉";
    if (categoryLower.includes("health") || categoryLower.includes("medical"))
      return "💊";
    return "📰";
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <span className="text-9xl">📰</span>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold text-gray-800">News</h1>
        </div>
      </div>

      {/* Yellow Separator Bar */}
      <div className="h-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400"></div>

      {/* News Grid Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
          ) : newsArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No news articles available at this time.
              </p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {currentArticles.map((article) => (
                  <Link
                    href={`/news/${article._id}`}
                    key={article._id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow cursor-pointer"
                  >
                    {/* Article Image */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl opacity-40">
                            {getCategoryIcon(article.category)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Article Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded">
                          {article.category}
                        </span>
                        <p className="text-gray-500 text-sm">
                          {formatDate(article.createdAt)}
                        </p>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors line-clamp-3">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 text-sm">
                        <span>→ Read more</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-gray-600 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-full ${
                            currentPage === page
                              ? "bg-red-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-gray-600 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
