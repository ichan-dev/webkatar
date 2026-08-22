"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ArsipDetailPage({ params }) {
  const router = useRouter();
  const [arsip, setArsip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [arsipId, setArsipId] = useState(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await Promise.resolve(params);
      setArsipId(resolvedParams.id);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!arsipId) return;

    console.log("Fetching arsip with ID:", arsipId);
    const arsipRef = ref(database, `arsip/${arsipId}`);
    const unsubscribe = onValue(arsipRef, (snapshot) => {
      console.log("Firebase snapshot exists:", snapshot.exists());
      if (snapshot.exists()) {
        console.log("Arsip data:", snapshot.val());
        setArsip({
          id: arsipId,
          ...snapshot.val()
        });
        setNotFound(false);
      } else {
        console.log("Arsip not found in Firebase");
        setNotFound(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [arsipId]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat detail arsip...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Arsip tidak ditemukan.</p>
            <Link 
              href="/arsip"
              className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Arsip
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="py-8 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
          <Link 
            href="/arsip"
            className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium mb-6 group"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Arsip
          </Link>

          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              {arsip.periode}
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Arsip Program Kerja {arsip.periode}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ketua</p>
                <p className="text-lg font-semibold text-gray-900">{arsip.ketua}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Jabatan</p>
                <p className="text-lg font-semibold text-gray-900">{arsip.jabatan}</p>
              </div>
              {arsip.deskripsi && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Deskripsi</p>
                  <p className="text-gray-700 leading-relaxed">{arsip.deskripsi}</p>
                </div>
              )}
            </div>
          </div>

          {arsip.programs && arsip.programs.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Kerja</h2>
              <ul className="space-y-4">
                {arsip.programs.map((program, idx) => {
                  const programNama = typeof program === 'string' ? program : program.nama;
                  const programDeskripsi = typeof program === 'object' ? program.deskripsi : null;
                  const programTanggal = typeof program === 'object' ? program.tanggal : null;
                  
                return (
                  <li key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-gray-900">{programNama}</p>
                          {programTanggal && (
                            <p className="text-xs text-amber-700 mt-1 font-medium">{new Date(programTanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                          )}
                        </div>
                        {programDeskripsi && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Deskripsi</p>
                            <p className="text-sm text-gray-700">{programDeskripsi}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
                })}
              </ul>
            </div>
          )}

          {arsip.foto && arsip.foto.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dokumentasi Foto</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {arsip.foto.map((fotoUrl, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={fotoUrl} 
                      alt={`Dokumentasi ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => window.open(fotoUrl, '_blank')}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {arsip.dokumen && arsip.dokumen.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dokumen Pendukung</h2>
              <div className="space-y-3">
                {arsip.dokumen.map((doc, idx) => (
                  <a
                    key={idx}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">{doc.nama}</p>
                        <p className="text-sm text-gray-500">{doc.ukuran}</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-amber-700 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
