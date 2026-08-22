"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";

export default function StrukturOrganisasi() {
  const [strukturList, setStrukturList] = useState([]);
  const [selectedPeriode, setSelectedPeriode] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const strukturRef = ref(database, 'struktur');
    const unsubscribe = onValue(strukturRef, (snapshot) => {
      if (snapshot.exists()) {
        const strukturData = snapshot.val();
        const strukturArray = Object.entries(strukturData).map(([id, struktur]) => ({
          id,
          ...struktur
        }));
        
        strukturArray.sort((a, b) => {
          const yearA = parseInt(a.periode.split('-')[0]);
          const yearB = parseInt(b.periode.split('-')[0]);
          return yearB - yearA;
        });
        
        setStrukturList(strukturArray);
        
        if (strukturArray.length > 0 && !selectedPeriode) {
          setSelectedPeriode(strukturArray[0].periode);
        }
      } else {
        setStrukturList([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const currentStruktur = strukturList.find(s => s.periode === selectedPeriode);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat struktur kepengurusan...</p>
          </div>
        </div>
      </section>
    );
  }

  if (strukturList.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Struktur Kepengurusan
          </h2>
          <div className="text-center py-12">
            <p className="text-gray-500">Belum ada struktur kepengurusan yang ditampilkan.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Struktur Kepengurusan
          </h2>
          <select 
            value={selectedPeriode}
            onChange={(e) => setSelectedPeriode(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {strukturList.map((struktur) => (
              <option key={struktur.id} value={struktur.periode}>
                Periode {struktur.periode}
              </option>
            ))}
          </select>
        </div>

        {currentStruktur ? (
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <img
              src={currentStruktur.fotoUrl}
              alt={`Struktur Kepengurusan Periode ${currentStruktur.periode}`}
              className="w-full h-auto rounded-lg"
              onClick={() => window.open(currentStruktur.fotoUrl, '_blank')}
              style={{ cursor: 'pointer' }}
            />
            <p className="text-sm text-gray-500 text-center mt-4">
              Klik gambar untuk melihat ukuran penuh
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Struktur untuk periode yang dipilih tidak tersedia.</p>
          </div>
        )}
      </div>
    </section>
  );
}
