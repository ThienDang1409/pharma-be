"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getLocalizedText } from "@/lib/utils/i18n";
import { blogApi, Blog, informationApi } from "@/lib/api";
import NewsCard from "./NewsCard";
import enTranslations from "@/locales/en.json";
import viTranslations from "@/locales/vi.json";

const translations = {
  en: enTranslations,
  vi: viTranslations,
};

export default function LatestNews() {
  const { language } = useLanguage();
  const [newsArticles, setNewsArticles] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const t = translations[language];
  
  const articlesPerPage = 4; // 1 featured + 3 regular

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const fetchLatestNews = async () => {
    try {
      setLoading(true);
      
      // First, find the News category
      const categories = await informationApi.getAll();
      const newsCategory = categories.find(
        cat => cat.slug === 'news' || cat.name.toLowerCase().includes('news')
      );
      
      if (!newsCategory) {
        console.error('News category not found');
        setNewsArticles([]);
        return;
      }
      
      // Fetch blogs from News category and all its descendants using blogApi
      const response = await blogApi.getAll({
        informationId: newsCategory._id,
        status: 'published'
      });
      
      // Handle both paginated and non-paginated responses
      const blogs = 'data' in response ? response.data : response;
      
      // Sort by createdAt descending (newest first) and take top 4
      const sortedBlogs = Array.isArray(blogs) 
        ? blogs
            .sort((a, b) => {
              const dateA = new Date(a.createdAt || 0).getTime();
              const dateB = new Date(b.createdAt || 0).getTime();
              return dateB - dateA;
            })
        : [];
      
      setNewsArticles(sortedBlogs);
    } catch (error) {
      console.error('Error fetching latest news:', error);
      setNewsArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getExcerpt = (blog: Blog) => {
    if (!blog.sections || blog.sections.length === 0) return '';
    const content = getLocalizedText(
      blog.sections[0]?.content || '',
      blog.sections[0]?.content_en,
      language
    );
    return content.replace(/<[^>]*>/g, '').substring(0, 200);
  };

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = newsArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(newsArticles.length / articlesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to the section
    const section = document.getElementById('latest-news-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) {
    return (
      <section>
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary-600"></div>
            <p className="mt-4 text-gray-600">{t.pages.loadingLatestNews}</p>
          </div>
        </div>
      </section>
    );
  }

  if (newsArticles.length === 0) {
    return null;
  }

  return (
    <section id="latest-news-section">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gray-300 w-24 md:w-64"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-700">
              {t.pages.latestNews}
            </h2>
            <div className="h-px bg-gray-300 w-24 md:w-64"></div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid gap-8">
          {/* Featured Article */}
          {currentArticles[0] && (
            <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-all">
              <div className="relative h-100 bg-gray-100 overflow-hidden">
                {currentArticles[0].image ? (
                  <img
                    src={currentArticles[0].image}
                    alt={getLocalizedText(currentArticles[0].title, currentArticles[0].title_en, language)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <p className="text-gray-700 text-sm mb-2">
                  {formatDate(currentArticles[0].createdAt)}
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 group-hover:text-primary-600 transition-colors">
                  {getLocalizedText(currentArticles[0].title, currentArticles[0].title_en, language)}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-4">
                  {getExcerpt(currentArticles[0]) || t.pages.noDescription}
                </p>
                <Link
                  href={`/blog/${currentArticles[0].slug}`}
                  className="text-primary-900 hover:text-primary-800 font-semibold flex items-center gap-2"
                >
                  <span>→ {t.pages.readMore}</span>
                </Link>
              </div>
            </div>
          )}

          {/* Regular Articles Grid */}
          {currentArticles.length > 1 && (
            <div className="grid md:grid-cols-3 gap-8">
              {currentArticles.slice(1, 4).map((article) => (
                <NewsCard 
                  key={article._id} 
                  article={article} 
                  formatDate={formatDate} 
                />
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t.common.previous || 'Previous'}
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              // Show first, last, current, and adjacent pages
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-primary-600 text-white border-primary-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2 text-gray-500">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t.common.next || 'Next'}
            </button>
          </div>
        )}

        {/* More News Button */}
        <div className="text-center mt-12">
          <Link
            href="/category/news"
            className="inline-flex items-center gap-2 border-2 border-primary-900 text-gray-700 px-8 py-3 rounded hover:bg-primary-800 hover:text-white transition-all font-semibold"
          >
            <span>→ {t.pages.moreNews}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
