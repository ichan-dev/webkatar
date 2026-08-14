import Link from "next/link";

export default function ProfileSection() {
  return (
    <section id="profil" className="py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Profil Organisasi
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              Karang Taruna RT 03 Desa Sukamaju adalah organisasi kepemudaan yang berdiri sejak tahun 2022. 
              Kami berkomitmen untuk mengembangkan potensi pemuda melalui berbagai kegiatan positif yang 
              memberikan manfaat bagi masyarakat sekitar.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              Dengan semangat gotong royong dan inovasi, kami aktif menyelenggarakan program-program 
              yang mendukung pembangunan desa dan pengembangan karakter pemuda.
            </p>
            <Link 
              href="/profil" 
              className="inline-flex items-center text-amber-700 hover:text-amber-800 font-semibold group"
            >
              Pelajari Selengkapnya
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2070')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
