"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";

export default function ArsipPeriodCards() {
  const [periods, setPeriods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const arsipRef = ref(database, 'arsip');
    const unsubscribe = onValue(arsipRef, (snapshot) => {
      if (snapshot.exists()) {
        const arsipData = snapshot.val();
        const arsipArray = Object.entries(arsipData).map(([id, arsip]) => ({
          id,
          ...arsip
        }));
        arsipArray.sort((a, b) => {
          const periodeA = a.periode.match(/\d{4}/g);
          const periodeB = b.periode.match(/\d{4}/g);
          if (periodeA && periodeB) {
            return parseInt(periodeB[0]) - parseInt(periodeA[0]);
          }
          return 0;
        });
        setPeriods(arsipArray);
      } else {
        setPeriods([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat arsip...</p>
          </div>
        </div>
      </section>
    );
  }

  if (periods.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center py-12">
            <p className="text-gray-500">Belum ada arsip program kerja yang ditambahkan.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {periods.map((period, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-semibold mb-4">
                {period.periode}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {period.ketua}
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                {period.jabatan}
              </p>

              <ul className="space-y-3 mb-6">
                {period.programs.map((program, idx) => {
                  const programNama = typeof program === 'string' ? program : program.nama;
                  const programTanggal = typeof program === 'object' ? program.tanggal : null;
                  
                  return (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1">
                        <span className="text-sm">{programNama}</span>
                        {programTanggal && (
                          <span className="text-xs text-amber-600 block mt-0.5">{new Date(programTanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <Link 
                href={`/arsip/${period.id}`}
                className="w-full bg-white border-2 border-amber-700 text-amber-700 py-2.5 px-4 rounded-lg hover:bg-amber-700 hover:text-white transition-colors font-medium flex items-center justify-center gap-2 group"
              >
                Lihat Detail Program
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
