"use client";

import Layout from "../components/Layout";
import Link from "next/link";
import { useState } from "react";

interface NewsArticle {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      date: "18 September 2025",
      title:
        "Visit Pharma Test at POWTECH TECHNOPHARM 2025 in Nuremberg from 23-25 September 2025 in hall 10, booth 258!",
      excerpt:
        "Visit Pharma Test at POWTECH TECHNOPHARM 2025 in Nuremberg from 23-25 September 2025 in hall 10, booth 258!",
      image: "/news-powtech.jpg",
      category: "Events",
    },
    {
      id: 2,
      date: "22 August 2025",
      title: "New PTF Line of Tablet Friability Testing Instruments",
      excerpt:
        "Introducing our latest line of friability testing instruments...",
      image: "/news-ptf.jpg",
      category: "Products",
    },
    {
      id: 3,
      date: "9 July 2025",
      title: "Presenting: Newly Revised PTB 330 Tablet Hardness Tester",
      excerpt: "Enhanced features and improved accuracy...",
      image: "/news-ptb.jpg",
      category: "Products",
    },
    {
      id: 4,
      date: "6 June 2025",
      title:
        "On/Offline Dissolution System: Amazing Flexibility Yet Accurate Results either Way",
      excerpt: "Revolutionary dissolution testing technology...",
      image: "/news-dissolution.jpg",
      category: "Products",
    },
    {
      id: 5,
      date: "15 May 2025",
      title:
        "Visit Pharma Test at exhibition Vietnam 2025 from 10-12 June 2025 in Ho Chi Minh City, Hall A1-C1, Booth 305!",
      excerpt: "Join us at the largest pharmaceutical exhibition in Vietnam...",
      image: "/news-vietnam.jpg",
      category: "Events",
    },
    {
      id: 6,
      date: "3 April 2025",
      title: "Introducing New PT-CT-310 Cold Chain Tester for Vaccines",
      excerpt: "Essential equipment for vaccine storage monitoring...",
      image: "/news-cold-chain.jpg",
      category: "Products",
    },
    {
      id: 7,
      date: "20 March 2025",
      title: "New Portable Tablet Abrasion Tester PTa-1",
      excerpt: "Compact and portable solution for tablet testing...",
      image: "/news-portable.jpg",
      category: "Products",
    },
    {
      id: 8,
      date: "10 February 2025",
      title:
        "New Automated sampling NexPhase Colloidal for Inline Sampling on PTWK 1225",
      excerpt: "Advanced automation for pharmaceutical testing...",
      image: "/news-automated.jpg",
      category: "Technology",
    },
    {
      id: 9,
      date: "25 January 2025",
      title: "Happy Holidays and a great start into 2025!",
      excerpt: "Season greetings from Pharma Test team...",
      image: "/news-holidays.jpg",
      category: "Company",
    },
  ];

  const totalPages = Math.ceil(newsArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = newsArticles.slice(startIndex, endIndex);

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
          <div className="grid md:grid-cols-3 gap-8">
            {currentArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
              >
                {/* Article Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {article.category === "Events" && (
                      <span className="text-6xl opacity-40">#️⃣</span>
                    )}
                    {article.category === "Products" && (
                      <span className="text-6xl opacity-40">🔬</span>
                    )}
                    {article.category === "Technology" && (
                      <span className="text-6xl opacity-40">💻</span>
                    )}
                    {article.category === "Company" && (
                      <span className="text-6xl opacity-40">🎉</span>
                    )}
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <p className="text-red-600 text-sm mb-2">{article.date}</p>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                  <Link
                    href={`/news/${article.id}`}
                    className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 text-sm"
                  >
                    <span>→ Read more</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
        </div>
      </section>
    </Layout>
  );
}
