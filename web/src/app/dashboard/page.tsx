'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await api.get('/api/users/me')
      setUser(response.data)
    } catch (error) {
      console.error('Kullanıcı bilgisi alınamadı:', error)
      localStorage.removeItem('token')
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Silah Sıfırlama</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hoş Geldiniz, {user?.username || 'Kullanıcı'}!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Rütbe</p>
              <p className="text-xl font-semibold text-gray-900">{user?.rank || 'Er'}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Birlik</p>
              <p className="text-xl font-semibold text-gray-900">{user?.unit || 'Belirtilmemiş'}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Toplam Silah</p>
              <p className="text-xl font-semibold text-gray-900">{user?.weapons?.length || 0}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Silahlarım</h3>
            <p className="text-gray-600">Silahlarınızı yönetin ve sıfırlama geçmişini görün.</p>
            <Link href="/weapons" className="mt-4 inline-block bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition">
              Silahlarımı Görüntüle
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Son Sıfırlamalar</h3>
            <p className="text-gray-600">Yakında eklenecek...</p>
            <button disabled className="mt-4 bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
              Yeni Sıfırlama (Yakında)
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
