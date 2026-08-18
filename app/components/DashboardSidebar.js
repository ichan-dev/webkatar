"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Kelola Anggota", path: "/dashboard/anggota", icon: "👥" },
    { name: "Kegiatan", path: "/dashboard/kegiatan", icon: "📅" },
    { name: "Dokumen", path: "/dashboard/dokumen", icon: "📄" },
    { name: "Struktur", path: "/dashboard/struktur", icon: "🏢" },
    { name: "Pengaturan", path: "/dashboard/pengaturan", icon: "⚙️" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-lg font-bold text-amber-800">
          Karang Taruna RT 03
        </h1>
        <p className="text-sm text-gray-600">Desa Sukamaju</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.path
                    ? "bg-amber-700 text-white"
                    : "text-gray-700 hover:bg-amber-50"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link
          href="/"
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span className="text-xl">🏠</span>
          <span className="font-medium">Kembali ke Beranda</span>
        </Link>
        <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full">
          <span className="text-xl">🚪</span>
          <span className="font-medium">Keluar</span>
        </button>
      </div>
    </aside>
  );
}
