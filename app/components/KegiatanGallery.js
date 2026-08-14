export default function KegiatanGallery({ kegiatan }) {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Galeri Dokumentasi Kegiatan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kegiatan.galeri.map((foto, index) => (
            <div 
              key={index} 
              className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundImage: `url('${foto}')` }}
              ></div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
