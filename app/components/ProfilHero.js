export default function ProfilHero() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Membangun Pemuda, <span className="text-amber-700">Memajukan Desa.</span>
            </h1>
            
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              Karang Taruna RT 03 adalah wadah pengembangan generasi muda non-partisan, 
              yang tumbuh atas dasar kesadaran dan rasa tanggung jawab sosial dari, oleh, 
              dan untuk masyarakat. Kami fokus pada kesejahteraan sosial, terutama di 
              wilayah RT 03 RW 10, Desa Sukamaju.
            </p>
          </div>

          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
