"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";

export default function InfoCards() {
  const [anggotaCount, setAnggotaCount] = useState(0);

  useEffect(() => {
    const usersRef = ref(database, 'users');
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const users = snapshot.val();
        const activeMembers = Object.values(users).filter(
          user => user.role === "member" && user.statusKeaktifan === "Aktif"
        );
        setAnggotaCount(activeMembers.length);
      } else {
        setAnggotaCount(0);
      }
    });

    return () => unsubscribe();
  }, []);

  const cards = [
    {
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Berdiri",
      description: "Tahun 2022"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Lokasi",
      description: "RT 03 RW 10, Desa Sukamaju"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Anggota",
      description: anggotaCount > 0 ? `${anggotaCount}+ Pemuda Aktif` : "Memuat..."
    }
  ];

  return (
    <section className="relative -mt-16 z-20 max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 text-center">
            <div className="flex justify-center mb-3 bg-orange-50 w-14 h-14 rounded-full items-center mx-auto">
              {card.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1.5">{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
