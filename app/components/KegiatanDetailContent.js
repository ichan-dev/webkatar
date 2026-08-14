export default function KegiatanDetailContent({ kegiatan }) {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Deskripsi Kegiatan
          </h2>
          
          <div className="prose prose-lg max-w-none">
            {kegiatan.deskripsiLengkap.map((paragraf, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-4">
                {paragraf}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
