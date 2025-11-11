"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { informationApi, Information } from "@/lib/api";

// Translation dictionary
const translations = {
  en: {
    login: "Login",
    company: "Tel Pharma Test Group",
  },
  vi: {
    login: "Đăng nhập",
    company: "Tập đoàn Pharma Test",
  },
};

export default function Header() {
  const [categories, setCategories] = useState<Information[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [language, setLanguage] = useState<"en" | "vi">("vi");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await informationApi.getAll();
      console.log("Categories response:", response); // Debug log
      // Response is the array directly
      setCategories(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Get root categories (no parentId or parentId is null)
  const rootCategories = categories.filter(
    (cat) => !cat.parentId || cat.parentId === null || cat.parentId === "null"
  );

  console.log("Root categories:", rootCategories); // Debug log
  console.log("All categories:", categories); // Debug log

  // Get children of a category
  const getChildren = (parentId: string) => {
    return categories.filter((cat) => cat.parentId === parentId);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "vi" : "en"));
  };

  const t = translations[language];

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold">
              <span className="text-gray-800">PHARMA</span>
              <span className="text-red-600">▲</span>
              <br />
              <span className="text-sm text-gray-600">TEST</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {rootCategories.map((category) => {
              const children = getChildren(category._id);
              const hasChildren = children.length > 0;

              return (
                <div
                  key={category._id}
                  className="relative group"
                  onMouseEnter={() =>
                    hasChildren && setOpenDropdown(category._id)
                  }
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={`/${category.slug}`}
                    className="text-gray-700 hover:text-red-600 text-sm uppercase font-medium transition-colors"
                  >
                    {category.name}
                  </Link>

                  {/* Dropdown Menu */}
                  {hasChildren && openDropdown === category._id && (
                    <div className="absolute left-0 top-full pt-2 w-56 z-50">
                      <div className="bg-white shadow-lg rounded-lg py-2">
                        {children.map((child) => (
                          <Link
                            key={child._id}
                            href={`/${category.slug}/${child.slug}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <span className="text-red-600 mr-2">›</span>
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right side - Language, Phone and Login */}
          <div className="flex items-center space-x-6">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-sm text-gray-700 hover:text-red-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">{language.toUpperCase()}</span>
            </button>

            <div className="text-sm text-gray-700">
              <span className="font-semibold">{t.company}</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                href="/login"
                className="text-sm text-gray-700 hover:text-red-600"
              >
                {t.login}
              </Link>
            </div>
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
