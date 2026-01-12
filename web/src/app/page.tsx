import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">
            Silah Sıfırlama Uygulaması
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Profesyonel atış takip ve analiz sistemi
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              href="/login"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Giriş Yap
            </Link>
            <Link
              href="/register"
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Kayıt Ol
            </Link>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-3">🎯 Kolay Sıfırlama</h3>
            <p className="text-gray-300">
              Hedef fotoğrafını yükle, otomatik analiz al
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-3">📊 Detaylı Analiz</h3>
            <p className="text-gray-300">
              Grup dağılımı, click ayarları ve istatistikler
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-3">📱 Cross-Platform</h3>
            <p className="text-gray-300">
              Web ve mobil cihazlardan erişim
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
