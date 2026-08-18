"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const storedUsername = localStorage.getItem("username");
    
    if (authStatus === "true") {
      setIsAuthenticated(true);
      setUsername(storedUsername || "Admin");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
    setShowUserMenu(false);
    router.push("/");
  };

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
            <Link 
              href="/kegiatan" 
              className={`transition-colors pb-1 ${
                pathname === "/kegiatan" 
                  ? "text-amber-700 hover:text-amber-800 border-b-2 border-amber-600 font-medium" 
                  : "text-gray-700 hover:text-amber-700"
              }`}
            >
              Kegiatan
            </Link>
            <Link 
              href="/arsip" 
              className={`transition-colors pb-1 ${
                pathname === "/arsip" 
                  ? "text-amber-700 hover:text-amber-800 border-b-2 border-amber-600 font-medium" 
                  : "text-gray-700 hover:text-amber-700"
              }`}
            >
              Arsip Program Kerja
            </Link>

            {isAuthenticated ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`transition-colors pb-1 ${
                    pathname.startsWith("/dashboard") 
                      ? "text-amber-700 hover:text-amber-800 border-b-2 border-amber-600 font-medium" 
                      : "text-gray-700 hover:text-amber-700"
                  }`}
                >
                  Dashboard
                </Link>
                
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-amber-700 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-700 flex items-center justify-center text-white font-medium text-sm">
                      {username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{username}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Keluar</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link 
                href="/login"
                className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors"
              >
                Login
              </Link>
            )}
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
              <Link 
                href="/kegiatan" 
                className={`transition-colors pl-3 ${
                  pathname === "/kegiatan" 
                    ? "text-amber-700 hover:text-amber-800 font-medium border-l-2 border-amber-600" 
                    : "text-gray-700 hover:text-amber-700"
                }`}
              >
                Kegiatan
              </Link>
              <Link 
                href="/arsip" 
                className={`transition-colors pl-3 ${
                  pathname === "/arsip" 
                    ? "text-amber-700 hover:text-amber-800 font-medium border-l-2 border-amber-600" 
                    : "text-gray-700 hover:text-amber-700"
                }`}
              >
                Arsip Program Kerja
              </Link>

              {isAuthenticated ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className={`transition-colors pl-3 ${
                      pathname.startsWith("/dashboard") 
                        ? "text-amber-700 hover:text-amber-800 font-medium border-l-2 border-amber-600" 
                        : "text-gray-700 hover:text-amber-700"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <div className="pl-3 pt-2 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Masuk sebagai: <span className="font-medium text-gray-900">{username}</span></p>
                    <button
                      onClick={handleLogout}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors w-full text-center block"
                    >
                      Keluar
                    </button>
                  </div>
                </>
              ) : (
                <Link 
                  href="/login"
                  className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors w-full text-center block"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
