"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="w-full px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-amber-800">
              Karang Taruna RT 03
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition-colors pb-1 ${
                pathname === "/" 
                  ? "text-amber-700 hover:text-amber-800 border-b-2 border-amber-600 font-medium" 
                  : "text-gray-700 hover:text-amber-700"
              }`}
            >
              Beranda
            </Link>
            <Link 
              href="/profil" 
              className={`transition-colors pb-1 ${
                pathname === "/profil" 
                  ? "text-amber-700 hover:text-amber-800 border-b-2 border-amber-600 font-medium" 
                  : "text-gray-700 hover:text-amber-700"
              }`}
            >
              Profil
            </Link>
            <a href="#kegiatan" className="text-gray-700 hover:text-amber-700 transition-colors pb-1">
              Kegiatan
            </a>
            <a href="#program" className="text-gray-700 hover:text-amber-700 transition-colors pb-1">
              Arsip Program Kerja
            </a>
            <button className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors">
              Login
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-amber-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className={`transition-colors pl-3 ${
                  pathname === "/" 
                    ? "text-amber-700 hover:text-amber-800 font-medium border-l-2 border-amber-600" 
                    : "text-gray-700 hover:text-amber-700"
                }`}
              >
                Beranda
              </Link>
              <Link 
                href="/profil" 
                className={`transition-colors pl-3 ${
                  pathname === "/profil" 
                    ? "text-amber-700 hover:text-amber-800 font-medium border-l-2 border-amber-600" 
                    : "text-gray-700 hover:text-amber-700"
                }`}
              >
                Profil
              </Link>
              <a href="#kegiatan" className="text-gray-700 hover:text-amber-700 transition-colors pl-3">
                Kegiatan
              </a>
              <a href="#program" className="text-gray-700 hover:text-amber-700 transition-colors pl-3">
                Arsip Program Kerja
              </a>
              <button className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors w-full">
                Login
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
