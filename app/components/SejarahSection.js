export default function SejarahSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="border-l-4 border-amber-600 pl-6 bg-gray-50 p-6 rounded-r-lg">
              <h2 className="text-xl font-bold text-amber-700 mb-4">
                Sejarah Singkat
              </h2>
              <p className="text-gray-700 text-base leading-relaxed">
                Didirikan secara resmi pada tahun 2022, inisiatif ini bermula dari 
                semangat gotong royong pemuda setempat untuk menciptakan lingkungan 
                yang lebih aktif dan positif. Sejak saat itu, kami terus berkomitmen 
                menyelenggarakan berbagai program kerja yang inovatif dan bermanfaat 
                bagi warga.
              </p>
            </div>
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
