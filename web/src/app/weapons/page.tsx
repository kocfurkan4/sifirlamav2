'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import api from '@/lib/api'

interface Weapon {
  _id: string
  name: string
  type: string
  caliber: string
  serialNumber?: string
  createdAt: string
}

export default function WeaponsPage() {
  const router = useRouter()
  const [weapons, setWeapons] = useState<Weapon[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'Tüfek',
    caliber: '',
    serialNumber: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    fetchWeapons()
  }, [])

  const fetchWeapons = async () => {
    try {
      const response = await api.get('/api/weapons')
      setWeapons(response.data)
    } catch (error) {
      console.error('Silahlar yüklenemedi:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await api.post('/api/weapons', formData)
      setShowAddForm(false)
      setFormData({ name: '', type: 'Tüfek', caliber: '', serialNumber: '' })
      fetchWeapons()
    } catch (error: any) {
      alert(error.response?.data?.message || 'Silah eklenemedi')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu silahı silmek istediğinizden emin misiniz?')) return

    try {
      await api.delete(`/api/weapons/${id}`)
      fetchWeapons()
    } catch (error) {
      alert('Silah silinemedi')
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
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-xl font-bold text-gray-900">
                Silah Sıfırlama
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <span className="text-primary-600 font-semibold">Silahlarım</span>
            </div>
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Silahlarım</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition"
          >
            {showAddForm ? 'İptal' : '+ Yeni Silah Ekle'}
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Yeni Silah Ekle</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Silah Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                    placeholder="Örn: M4 Karabina"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Silah Tipi *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                  >
                    <option value="Tüfek">Tüfek</option>
                    <option value="Tabanca">Tabanca</option>
                    <option value="Makineli Tüfek">Makineli Tüfek</option>
                    <option value="Keskin Nişancı">Keskin Nişancı</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kalibre *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.caliber}
                    onChange={(e) => setFormData({ ...formData, caliber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                    placeholder="Örn: 5.56mm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seri Numarası (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900"
                    placeholder="Seri numarası"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition"
              >
                Silah Ekle
              </button>
            </form>
          </div>
        )}

        {weapons.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">Henüz silah eklenmemiş</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition"
            >
              İlk Silahınızı Ekleyin
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weapons.map((weapon) => (
              <div key={weapon._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{weapon.name}</h3>
                  <button
                    onClick={() => handleDelete(weapon._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Sil
                  </button>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-semibold">Tip:</span> {weapon.type}</p>
                  <p><span className="font-semibold">Kalibre:</span> {weapon.caliber}</p>
                  {weapon.serialNumber && (
                    <p><span className="font-semibold">Seri No:</span> {weapon.serialNumber}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
