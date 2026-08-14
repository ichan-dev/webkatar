export default function ActivitiesSection() {
  const activities = [
    {
      badge: "Olahraga",
      badgeColor: "bg-green-500",
      title: "Olahraga Bersama Warga",
      description: "Kegiatan rutin mingguan untuk menjaga kebugaran jasmani dan mempererat tali silaturahm antar warga RT 03.",
      date: "12 Okt 2023",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070"
    },
    {
      badge: "Edukasi",
      badgeColor: "bg-blue-500",
      title: "Workshop Kepemudaan",
      description: "Pelatihan kepemimpinan dan kewirausahaan untuk meningkatkan kapasitas dan daya saing pemuda desa.",
      date: "05 Okt 2023",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070"
    },
    {
      badge: "Seni & Budaya",
      badgeColor: "bg-purple-500",
      title: "Festival Budaya Desa",
      description: "Perayaan seni dan tradisi lokal, menampilkan pentas warga dan pameran kerajinan tangan pemuda.",
      date: "28 Sep 2023",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070"
    }
  ];

  return (
    <section id="kegiatan" className="py-16 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Kegiatan Terbaru
            </h2>
            <p className="text-gray-600 text-base">
              Aksi nyata pemuda untuk lingkungan sekitar.
            </p>
          </div>
          <a 
            href="#" 
            className="hidden sm:inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold group"
          >
            Lihat Semua Kegiatan
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-44">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${activity.image}')` }}
                ></div>
                <div className={`absolute top-4 left-4 ${activity.badgeColor} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                  {activity.badge}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {activity.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {activity.description}
                </p>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {activity.date}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <a 
            href="#" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold group"
          >
            Lihat Semua Kegiatan
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
