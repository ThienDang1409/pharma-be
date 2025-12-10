"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useLanguage } from "@/app/context/LanguageContext";
import { blogApi } from "@/lib/api";
import type { Blog } from "@/lib/api";
import enTranslations from "@/locales/en.json";
import viTranslations from "@/locales/vi.json";

const translations = {
  en: enTranslations,
  vi: viTranslations,
};

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function BlogSlider() {
  const { language } = useLanguage();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[language];

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogApi.getAll({ status: "published" });
        
        // Handle both paginated and non-paginated responses
        const allBlogs = 'data' in response ? response.data : response;
        // Get 7 latest blogs
        const latestBlogs = allBlogs.slice(0, 7);
        setBlogs(latestBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  if (loading) {
    return (
      <div className="h-[500px] bg-primary-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[600px] md:h-[700px] bg-gray-700">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        navigation={true}
        loop={true}
        className="h-full w-full"
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog._id}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800/90 to-gray-900/70">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover mix-blend-overlay opacity-40"
                  />
                )}
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 md:px-8">
                  <div className="max-w-3xl ml-4 md:ml-12">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
                      {blog.title}
                    </h2>

                    {/* Excerpt from first section */}
                    {blog.sections && blog.sections.length > 0 && (
                      <p className="text-white/90 text-base md:text-lg mb-6 md:mb-8 line-clamp-2">
                        {blog.sections[0].content
                          ?.replace(/<[^>]*>/g, "")
                          .substring(0, 150)}
                        ...
                      </p>
                    )}

                    {/* Read More Button */}
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-block bg-primary-900 hover:bg-primary-800 text-white font-semibold px-6 md:px-8 py-2 md:py-3 rounded-md transition-colors duration-300 uppercase text-sm tracking-wider"
                    >
                      {t.pages.readMore}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Optional: Category badge */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="absolute top-4 md:top-8 left-4 md:left-8 bg-primary-900 text-white px-3 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm font-semibold">
                  {blog.tags[0]}
                </div>
              )}  
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #881a44 !important;
          background: none !important;
          padding: 8px !important;
          border-radius: 50% !important;
          width: 40px !important;
          height: 40px !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          transform: scale(1.1);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px !important;
          font-weight: 900 !important;
          line-height: 1 !important;
        }

        .swiper-button-disabled {
          opacity: 0.3 !important;
        }

        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
          width: 10px !important;
          height: 10px !important;
        }

        .swiper-pagination-bullet-active {
          background: #881a44 !important;
          opacity: 1;
        }

        .swiper-pagination {
          bottom: 20px !important;
        }
      `}</style>
    </div>
  );
}
