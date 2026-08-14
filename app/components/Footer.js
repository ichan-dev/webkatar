export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="max-w-screen-2xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Karang Taruna RT 03
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Karang Taruna RT 03 Desa Sukamaju. Wadah kreativitas, pengembangan diri, 
              dan pengabdian masyarakat untuk pemuda desa.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">TAUTAN CEPAT</h4>
            <ul className="space-y-3">
              <li>
                <a href="#beranda" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#profil" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Profil
                </a>
              </li>
              <li>
                <a href="#kegiatan" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Kegiatan
                </a>
              </li>
              <li>
                <a href="#galeri" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Galeri
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">INFORMASI</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 text-sm">
            © 2024 Karang Taruna RT 03 Desa Sukamaju.
          </p>
        </div>
      </div>
    </footer>
  );
}
