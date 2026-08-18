import Link from "next/link";

export default function ArsipPeriodCards() {
  const periods = [
    {
      id: 1,
      periode: "Periode 2022 - 2023",
      ketua: "Budi Santoso",
      jabatan: "Ketua Umum",
      programs: [
        "Revitalisasi Lapangan Olahraga Warga",
        "Program Bimbingan Belajar Gratis",
        "Festival Seni Pemuda Tahunan"
      ]
    },
    {
      id: 2,
      periode: "Periode 2023 - 2024",
      ketua: "Siti Rahmawati",
      jabatan: "Ketua Umum",
      programs: [
        "Satgas Tanggap Darurat Pandemi",
        "Dapur Umum Warga Isoman",
        "Pelatihan UMKM Digital"
      ]
    },
    {
      id: 3,
      periode: "Periode 2024 - 2025",
      ketua: "Agus Setiawan",
      jabatan: "Ketua Umum",
      programs: [
        "Pembangunan Poskamling Modern",
        "Gerakan Penghijauan Lingkungan",
        "Turnamen Futsal Antar RT"
      ]
    }
  ];

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
                {period.programs.map((program, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-amber-700 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">{program}</span>
                  </li>
                ))}
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
