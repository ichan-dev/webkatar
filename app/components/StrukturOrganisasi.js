export default function StrukturOrganisasi() {
  const struktur = {
    ketua: {
      nama: "Budi Santoso",
      jabatan: "KETUA",
      foto: "https://ui-avatars.com/api/?name=Budi+Santoso&size=200&background=f59e0b&color=fff"
    },
    anggota: [
      {
        nama: "Siti Rahma",
        jabatan: "Wakil Ketua",
        foto: "https://ui-avatars.com/api/?name=Siti+Rahma&size=200&background=6b7280&color=fff"
      },
      {
        nama: "Andi Wijaya",
        jabatan: "Sekretaris",
        foto: "https://ui-avatars.com/api/?name=Andi+Wijaya&size=200&background=6b7280&color=fff"
      },
      {
        nama: "Dewi Lestari",
        jabatan: "Bendahara",
        foto: "https://ui-avatars.com/api/?name=Dewi+Lestari&size=200&background=6b7280&color=fff"
      }
    ]
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Struktur Kepengurusan
          </h2>
          <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500">
            <option>Periode 2022-2024</option>
            <option>Periode 2020-2022</option>
          </select>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xs text-center">
            <div className="relative w-24 h-24 mx-auto mb-3">
              <img 
                src={struktur.ketua.foto}
                alt={struktur.ketua.nama}
                className="w-full h-full rounded-full object-cover"
              />
              <div className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {struktur.ketua.jabatan}
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{struktur.ketua.nama}</h3>
          </div>

          <div className="relative w-full max-w-4xl">
            <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-gray-300 -translate-x-1/2"></div>
            
            <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gray-300 -translate-x-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {struktur.anggota.map((anggota, index) => (
                <div key={index} className="relative">
                  <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-gray-300 -translate-x-1/2 hidden md:block"></div>
                  
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="w-20 h-20 mx-auto mb-3">
                      <img 
                        src={anggota.foto}
                        alt={anggota.nama}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">{anggota.nama}</h3>
                    <p className="text-sm text-gray-600">{anggota.jabatan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
