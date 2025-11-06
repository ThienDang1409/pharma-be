import Link from "next/link";
import Image from "next/image";

interface NewsArticle {
  id: number;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  featured?: boolean;
}

export default function LatestNews() {
  const newsArticles: NewsArticle[] = [
    {
      id: 1,
      date: "18 September 2025",
      title:
        "Visit Pharma Test at POWTECH TECHNOPHARM 2025 in Nuremberg from 23-25 September 2025 in hall 10, booth 258!",
      excerpt:
        'Visit Pharma Test at POWTECH TECHNOPHARM 2025 in Nuremberg from 23-25 September 2025 in hall 10, booth 258! POWTECH TECHNOPHARM 2025, the "international exhibition for technologies for processing powders, solids and liquids in Europe" in Nuremberg is about to start after a long break. Pharma Test is exhibiting again at POWTECH TECHNOPHARM 2025.',
      image: "/news-powtech.jpg",
      featured: true,
    },
    {
      id: 2,
      date: "22 August 2025",
      title: "New PTF Line of Tablet Friability Testing Instruments",
      excerpt: "",
      image: "/news-ptf.jpg",
    },
    {
      id: 3,
      date: "9 July 2025",
      title: "Presenting: Newly Revised PTB 330 Tablet Hardness Tester",
      excerpt: "",
      image: "/news-ptb.jpg",
    },
    {
      id: 4,
      date: "6 June 2025",
      title:
        "On/Offline Dissolution System: Amazing Flexibility Yet Accurate Results either Way",
      excerpt: "",
      image: "/news-dissolution.jpg",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-gray-300 w-24 md:w-64"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-red-600">
              Latest News
            </h2>
            <div className="h-px bg-gray-300 w-24 md:w-64"></div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid gap-8">
          {/* Featured Article */}
          <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64 md:h-auto">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-8xl opacity-30">#️⃣</span>
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <p className="text-red-600 text-sm mb-2">
                {newsArticles[0].date}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                {newsArticles[0].title}
              </h3>
              <p className="text-gray-600 mb-6 line-clamp-4">
                {newsArticles[0].excerpt}
              </p>
              <Link
                href={`/news/${newsArticles[0].id}`}
                className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
              >
                <span>→ Read more</span>
              </Link>
            </div>
          </div>

          {/* Regular Articles Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {newsArticles.slice(1).map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                  {article.id === 2 && <div className="text-6xl">🔄</div>}
                  {article.id === 3 && <div className="text-6xl">💻</div>}
                  {article.id === 4 && <div className="text-6xl">⚗️</div>}
                </div>
                <div className="p-6">
                  <p className="text-red-600 text-sm mb-2">{article.date}</p>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 group-hover:text-red-600 transition-colors">
                    {article.title}
                  </h3>
                  <Link
                    href={`/news/${article.id}`}
                    className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
                  >
                    <span>→ Read more</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* More News Button */}
        <div className="text-center mt-12">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-8 py-3 rounded hover:border-red-600 hover:text-red-600 transition-all font-semibold"
          >
            <span>→ MORE NEWS</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
