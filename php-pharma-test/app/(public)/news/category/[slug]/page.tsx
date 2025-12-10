"use client";

import Layout from "@/app/components/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { blogApi, informationApi } from "@/lib/api";
import type { Blog, Information } from "@/lib/api";
import { useLanguage } from "@/app/context/LanguageContext";
import { getLocalizedText } from "@/lib/utils/i18n";

interface NewsArticle {
  _id: string;
  title: string;
  title_en?: string;
  category: string;
  category_en?: string;
  excerpt: string;
  excerpt_en?: string;
  image?: string;
  createdAt: string;
}

export default function NewsCategoryPage() {
  const params = useParams();
  const categorySlug = params.slug as string;
  const { language } = useLanguage();

  const [currentPage, setCurrentPage] = useState(1);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [category, setCategory] = useState<Information | null>(null);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Get all categories to find the one matching the slug
        const categories = await informationApi.getAll();
        const foundCategory = categories.find(
          (cat) => cat.slug === categorySlug
        );

        if (foundCategory) {
          setCategory(foundCategory);

          // Fetch blogs for this category
          const response = await blogApi.getAll({
            informationId: foundCategory._id,
          });
          
          // Handle both paginated and non-paginated responses
          const blogs = 'data' in response ? response.data : response;

          // Map Blog[] to NewsArticle[] with i18n
          const articles: NewsArticle[] = blogs
            .filter((blog) => blog.status === "published")
            .map((blog) => ({
              _id: blog._id || "",
              title: blog.title,
              title_en: blog.title_en,
              category: blog.tags?.[0] || foundCategory.name,
              category_en: blog.tags?.[0], // Tags usually not translated
              excerpt:
                blog.sections?.[0]?.content
                  ?.replace(/<[^>]*>/g, "")
                  .substring(0, 150) + "..." || "",
              excerpt_en:
                blog.sections?.[0]?.content_en
                  ?.replace(/<[^>]*>/g, "")
                  .substring(0, 150) + "..." || "",
              image: blog.image,
              createdAt: blog.createdAt || new Date().toISOString(),
            }));

          setNewsArticles(articles);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setNewsArticles([]);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchData();
    }
  }, [categorySlug]);

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
    if (categoryLower.includes("medical")) return "🏥";
    if (categoryLower.includes("health")) return "💊";
    if (categoryLower.includes("promotion")) return "🎁";
    if (categoryLower.includes("event")) return "📅";
    if (categoryLower.includes("product")) return "🔬";
    if (categoryLower.includes("technology") || categoryLower.includes("tech"))
      return "💻";
    return "📰";
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <span className="text-9xl">
            {category ? getCategoryIcon(getLocalizedText(category.name, category.name_en, language)) : "📰"}
          </span>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center">
            <Link
              href="/news"
              className="text-red-600 hover:text-red-700 font-semibold mb-2 inline-block"
            >
              ← Back to News
            </Link>
            <h1 className="text-5xl font-bold text-gray-800">
              {category ? getLocalizedText(category.name, category.name_en, language) : "Loading..."}
            </h1>
            {category?.description && (
              <p className="text-gray-600 mt-2">{getLocalizedText(category.description, category.description_en, language)}</p>
            )}
          </div>
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
                No articles available in this category at this time.
              </p>
              <Link
                href="/news"
                className="text-red-600 hover:text-red-700 font-semibold mt-4 inline-block"
              >
                ← Back to All News
              </Link>
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
                          alt={getLocalizedText(article.title, article.title_en, language)}
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
                        {getLocalizedText(article.title, article.title_en, language)}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {getLocalizedText(article.excerpt, article.excerpt_en, language)}
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
