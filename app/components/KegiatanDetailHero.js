import Link from "next/link";

export default function KegiatanDetailHero({ kegiatan }) {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
        <Link 
          href="/kegiatan" 
          className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium mb-6 group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Daftar Kegiatan
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-96">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${kegiatan.image}')` }}
            ></div>
          </div>

          <div className="p-8">
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              {kegiatan.kategori}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {kegiatan.judul}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{kegiatan.tanggalLengkap}</span>
              </div>

              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{kegiatan.lokasi}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
