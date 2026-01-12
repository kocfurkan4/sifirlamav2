# 🎯 Silah Sıfırlama ve Atış Analizi Uygulaması

> Askeri atış talimatnamelerine dayalı profesyonel silah sıfırlama ve atış performansı analiz platformu

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 İçindekiler

- [Genel Bakış](#genel-bakış)
- [Özellikler](#özellikler)
- [Teknoloji Stack](#teknoloji-stack)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [API Dokümantasyonu](#api-dokümantasyonu)
- [Sıfırlama Metodolojisi](#sıfırlama-metodolojisi)
- [Atış Hatası Kategorileri](#atış-hatası-kategorileri)
- [Katkıda Bulunma](#katkıda-bulunma)

## 🎯 Genel Bakış

Bu uygulama, Türk Silahlı Kuvvetleri'nin atış talimatnamelerine (KKY 167-1, KKYY 167-1-4) dayanarak geliştirilmiş profesyonel bir silah sıfırlama ve atış analizi platformudur.

### Temel Özellikler

✅ **Hassas Sıfırlama Hesaplamaları**
- 25m mesafeden 200m nişangâh ile sıfırlama
- OVN (Orta Vuruş Noktası) otomatik hesaplama
- Yan ayar ve yükseliş/alçalış düzeltme değerleri

✅ **AI Destekli Fotoğraf Analizi**
- Hedef fotoğrafından vuruş noktası tespiti
- Atım grup analizi
- Pattern recognition (dikey, yatay, dağınık)

✅ **Performans Değerlendirmesi**
- 10 üzerinden otomatik puanlama
- Atış hatalarının tespiti ve kategorilendirmesi
- Kişiselleştirilmiş iyileştirme önerileri

✅ **Kapsamlı Kayıt Sistemi**
- Kullanıcı bazlı atış geçmişi
- Hedef fotoğrafları arşivi
- İstatistikler ve grafikler

## 🚀 Özellikler

### 1. Silah Sıfırlama

```
📏 Mesafe Girişi → 📸 Hedef Fotoğrafı → 🎯 OVN Hesaplama → ⚙️ Düzeltme Değerleri
```

**Desteklenen Silahlar:**
- G-3 Piyade Tüfeği
- HK-33E Piyade Tüfeği
- MPT-76 Piyade Tüfeği
- Kaleşnikov Serisi (AK-47, AKM)
- Dragunov (Kanas) Keskin Nişancı Tüfeği
- MG3 Makineli Tüfek
- PKM Hafif Makineli Tüfek

### 2. Atış Analizi

**Otomatik Tespit:**
- ✓ Vuruş noktaları (X, Y koordinatları)
- ✓ Grup merkezi ve dağılım
- ✓ Maksimum grup çapı
- ✓ Pattern analizi

**Hata Kategorileri:**
- 🎯 **Nişan Hataları:** Göz hizası, nişan noktası seçimi, arpacık-gez hizalama
- 🎮 **Tüfeğe Hâkimiyet Hataları:** Nefes kesme, tetik düşürme, göz kırpma

### 3. Puanlama Sistemi

| Puan | Değerlendirme | Grup Çapı |
|------|--------------|-----------|
| 9-10 | Mükemmel ⭐⭐⭐ | ≤ 3 cm |
| 7-8  | Çok İyi ⭐⭐ | ≤ 5 cm |
| 5-6  | İyi ⭐ | ≤ 10 cm |
| 3-4  | Orta | ≤ 15 cm |
| 1-2  | Zayıf | > 15 cm |

### 4. Düzeltme Önerileri

**Örnek Çıktı:**
```
🎯 Yan Ayar: 2 cm sağa → Vidayı saat yönünde 0.5 tur çevirin
📐 Yükseliş: 3 cm yukarı → Gezi saat yönünün tersine 0.75 tur çevirin
✅ Sıfırlama Başarılı: Tolerans içinde (±1.5cm)
```

## 🛠️ Teknoloji Stack

### Backend
```javascript
├── Node.js 20+
├── Express.js (REST API)
├── MongoDB + Mongoose (Database)
├── JWT (Authentication)
├── Multer (File Upload)
├── Sharp (Image Processing)
└── TensorFlow.js (AI Analysis)
```

### Web App
```javascript
├── Next.js 14 (React Framework)
├── TypeScript
├── Tailwind CSS
├── Zustand (State Management)
├── React Hook Form + Zod
└── Recharts (Graphs)
```

### Mobile App
```javascript
├── React Native
├── Expo SDK 50+
├── React Navigation
├── Expo Camera
└── AsyncStorage
```

## 📦 Kurulum

### Gereksinimler

- Node.js 20+
- MongoDB 7+
- npm veya yarn

### Backend Kurulumu

```bash
# Backend klasörüne git
cd backend

# Bağımlılıkları yükle
npm install

# Environment variables oluştur
cp .env.example .env

# MongoDB'yi başlat (ayrı terminal)
mongod

# Sunucuyu başlat
npm run dev
```

**Backend çalışacak:** `http://localhost:5000`

### Web App Kurulumu

```bash
# Web klasörüne git
cd web

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

**Web uygulaması çalışacak:** `http://localhost:3000`

### Mobile App Kurulumu

```bash
# Mobile klasörüne git
cd mobile

# Bağımlılıkları yükle
npm install

# Expo başlat
npx expo start
```

## 🎮 Kullanım

### 1. Kayıt Olma

```bash
POST /api/auth/register
{
  "username": "kullanici_adi",
  "email": "email@example.com",
  "password": "123456",
  "firstName": "Ad",
  "lastName": "Soyad"
}
```

### 2. Giriş Yapma

```bash
POST /api/auth/login
{
  "username": "kullanici_adi",
  "password": "123456"
}

# Response
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { ... }
  }
}
```

### 3. Sıfırlama İşlemi

1. **Dashboard'a git**
2. **"Yeni Sıfırlama"** butonuna tıkla
3. **Silah tipi seç** (G-3, HK-33E, vb.)
4. **Mesafe gir** (25m, 100m, vb.)
5. **Hedef fotoğrafı yükle** (kamera veya galeri)
6. **"Analiz Et"** butonuna tıkla
7. **Sonuçları gör:**
   - OVN koordinatları
   - Düzeltme değerleri
   - Puanlama
   - Öneriler

## 📖 API Dokümantasyonu

### Authentication

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/api/auth/register` | POST | Yeni kullanıcı kaydı |
| `/api/auth/login` | POST | Kullanıcı girişi |
| `/api/auth/profile` | GET | Profil bilgisi (Protected) |
| `/api/auth/profile` | PUT | Profil güncelleme (Protected) |

### Weapons

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/api/weapons` | GET | Tüm silahları listele |
| `/api/weapons/:id` | GET | Silah detayı |

### Shooting Sessions

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/api/shooting` | POST | Yeni atış kaydı |
| `/api/shooting` | GET | Kullanıcı atışları (Protected) |
| `/api/shooting/:id` | GET | Atış detayı |
| `/api/shooting/:id` | DELETE | Atış silme |

### Analysis

| Endpoint | Method | Açıklama |
|----------|--------|----------|
| `/api/analysis/zeroing` | POST | Sıfırlama analizi |
| `/api/analysis/image` | POST | Hedef fotoğraf analizi |

## 🎯 Sıfırlama Metodolojisi

### Askeri Talimat (KKY 167-1)

#### 1. Temel Prensipler

```
📍 Mesafe: 25 metre
🎯 Nişangâh: 200 metre ayarı
🔫 Atım Sayısı: 3 mermi
📊 Hedef: OVN nişan noktasının 2cm üstünde
✅ Tolerans: ±1.5cm
```

#### 2. OVN (Orta Vuruş Noktası) Hesaplama

```javascript
function calculateOVN(hits) {
  // 1. En yakın 2 vuruşu bul
  const [hit1, hit2] = findClosestHits(hits);
  
  // 2. Ortalarını işaretle
  const midpoint = {
    x: (hit1.x + hit2.x) / 2,
    y: (hit1.y + hit2.y) / 2
  };
  
  // 3. Üçüncü vuruşla birleştir
  const hit3 = hits[2];
  
  // 4. OVN = ilk iki vuruşa 1/3 yakın nokta
  const ovn = {
    x: midpoint.x + (hit3.x - midpoint.x) / 3,
    y: midpoint.y + (hit3.y - midpoint.y) / 3
  };
  
  return ovn;
}
```

#### 3. Düzeltme Hesaplama

**Yan Ayar (Windage):**
```
Sapma = OVN.x - Hedef.x
Yön = Sapma > 0 ? "Sol" : "Sağ"
Düzeltme = Math.abs(Sapma) + " cm " + Yön
```

**Yükseliş/Alçalış (Elevation):**
```
Sapma = OVN.y - Hedef.y (2cm)
Yön = Sapma > 0 ? "Aşağı" : "Yukarı"

// G-3 için: 1 tur = 4cm @ 25m
Tur = Math.abs(Sapma) / 4
Düzeltme = Tur.toFixed(2) + " tur " + Yön
```

### Mermi Yolu Balistiği

```
Mesafe | Nişan Hattından Yükseklik
-------|---------------------------
25m    | +2 cm
100m   | +8 cm
200m   | +16 cm
300m   | 0 cm (kesişme)
```

## 🔍 Atış Hatası Kategorileri

### 1. Nişan Hataları

| Hata | Belirtisi | Düzeltme |
|------|-----------|----------|
| **Göz Hizası** | Tutarsız vuruşlar | Kaynak noktasını kontrol et |
| **Nişan Noktası** | Yatay/dikey kayma | Doğru nişan noktası seç |
| **Arpacık-Gez** | Grup kaymış | Üç köşe teşkil |
| **Paralel Hata** | Sürekli kayma | Nişangâhı ayarla |

### 2. Tüfeğe Hâkimiyet Hataları

| Hata | Belirtisi | Düzeltme |
|------|-----------|----------|
| **Nefes Kesme** | Dikey dağılım | Doğru nefes tekniği |
| **Tetik Düşürme** | Yatay veya dikey | Yavaş ve düzgün ez |
| **Göz Kırpma** | Rastgele dağılım | Tetik düşene kadar açık tut |
| **Dipçik Kaynağı** | Tutarsız vuruşlar | Kaynak noktasını sabitle |

## 📊 Pattern Analizi

```javascript
// Atış pattern'ini tespit et
function analyzePattern(hits) {
  const xSpread = max(hits.x) - min(hits.x);
  const ySpread = max(hits.y) - min(hits.y);
  
  if (xSpread > ySpread * 2) return "HORIZONTAL";
  if (ySpread > xSpread * 2) return "VERTICAL";
  if (max(xSpread, ySpread) <= 3) return "TIGHT";
  return "SCATTERED";
}
```

**Düzeltme Önerileri:**
- **VERTICAL**: Tetik kontrolü
- **HORIZONTAL**: Nişan veya rüzgâr
- **SCATTERED**: Pozisyon ve nefes
- **TIGHT**: Mükemmel! ⭐

## 📱 Ekran Görüntüleri

```
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│                     │  │                     │  │                     │
│   🏠 Ana Sayfa      │  │   📊 Dashboard      │  │   📸 Sıfırlama      │
│                     │  │                     │  │                     │
│   • Özellikler      │  │   • İstatistikler   │  │   • Fotoğraf        │
│   • Silahlar        │  │   • Son Atışlar     │  │   • Analiz          │
│   • Kayıt/Giriş     │  │   • Grafikler       │  │   • Sonuçlar        │
│                     │  │                     │  │                     │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları takip edin:

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

**Proje Sahibi:** Axer
**Email:** [email protected]
**GitHub:** [github-link]

## 🙏 Teşekkürler

Bu proje aşağıdaki askeri talimatnamelere dayanmaktadır:

- KKY 167-1 (A) - Piyade Silahları ile Atış Yönergesi
- KKYY 167-1-4 - Piyade Hafif Silahları Mekanik Nişancılık
- KKT 315-27 - HK-33E Piyade Tüfeği Talimnamesi
- KKT 315-25 - Kaleşnikov Serisi Tüfekler

---

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

**🚀 Başarılı atışlar!**
