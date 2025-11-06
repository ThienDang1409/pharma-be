"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductsDropdown from "./ProductsDropdown";
import ServicesDropdown from "./ServicesDropdown";
import NewsDropdown from "./NewsDropdown";
import ContactDropdown from "./ContactDropdown";

export default function Header() {
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [showNewsMenu, setShowNewsMenu] = useState(false);
  const [showContactMenu, setShowContactMenu] = useState(false);

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
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-gray-700 hover:text-red-600 text-sm uppercase"
            >
              About
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setShowProductsMenu(true)}
              onMouseLeave={() => setShowProductsMenu(false)}
            >
              <Link
                href="/products"
                className="text-gray-700 hover:text-red-600 text-sm uppercase"
              >
                Products
              </Link>

              {/* Products Dropdown Menu */}
              {showProductsMenu && (
                <ProductsDropdown
                  onMouseEnter={() => setShowProductsMenu(true)}
                  onMouseLeave={() => setShowProductsMenu(false)}
                />
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => setShowServicesMenu(true)}
              onMouseLeave={() => setShowServicesMenu(false)}
            >
              <Link
                href="/services"
                className="text-gray-700 hover:text-red-600 text-sm uppercase"
              >
                Services
              </Link>

              {/* Services Dropdown Menu */}
              {showServicesMenu && (
                <ServicesDropdown
                  onMouseEnter={() => setShowServicesMenu(true)}
                  onMouseLeave={() => setShowServicesMenu(false)}
                />
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => setShowNewsMenu(true)}
              onMouseLeave={() => setShowNewsMenu(false)}
            >
              <Link
                href="/news"
                className="text-gray-700 hover:text-red-600 text-sm uppercase"
              >
                News
              </Link>

              {/* News Dropdown Menu */}
              {showNewsMenu && (
                <NewsDropdown
                  onMouseEnter={() => setShowNewsMenu(true)}
                  onMouseLeave={() => setShowNewsMenu(false)}
                />
              )}
            </div>
            <div
              className="relative"
              onMouseEnter={() => setShowContactMenu(true)}
              onMouseLeave={() => setShowContactMenu(false)}
            >
              <Link
                href="/contact"
                className="text-gray-700 hover:text-red-600 text-sm uppercase"
              >
                Contact
              </Link>

              {/* Contact Dropdown Menu */}
              {showContactMenu && (
                <ContactDropdown
                  onMouseEnter={() => setShowContactMenu(true)}
                  onMouseLeave={() => setShowContactMenu(false)}
                />
              )}
            </div>
          </nav>

          {/* Right side - Phone and Login */}
          <div className="flex items-center space-x-6">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">Tel Pharma Test Group</span>
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
                Login
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
