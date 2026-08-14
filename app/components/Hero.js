export default function Hero() {
  return (
    <section id="beranda" className="relative h-[500px] sm:h-[550px] flex items-center justify-center text-white">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-screen-lg mx-auto px-8 sm:px-12 lg:px-16 text-center">
        <div className="inline-block bg-yellow-400 text-black px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wide">
          DESA SUKAMAJU
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
          Karang Taruna RT 03<br />Desa Sukamaju
        </h1>
        
        <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Membangun Desa dengan Kreativitas dan Solidaritas Pemuda.<br />
          Bersama mewujudkan lingkungan yang aktif, inovatif, dan harmonis.
        </p>
      </div>
    </section>
  );
}
