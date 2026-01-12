# 🎯 Silah Sıfırlama ve Atış Analizi Uygulaması

## 📋 Proje Özeti

Askeri atış eğitimi talimatlarına dayalı, profesyonel silah sıfırlama ve atış performansı analiz platformu. Web ve mobil platformlarda çalışır.

## 🎯 Ana Özellikler

### 1. **Kullanıcı Yönetimi**
- Kullanıcı adı ve şifre ile kayıt/giriş
- Profil yönetimi
- Kullanıcı bazlı atış geçmişi

### 2. **Sıfırlama Hesaplamaları**
- Mesafe girişi (25m - 1000m arası)
- Silah tipi seçimi (G-3, HK-33E, MPT-76, Kaleşnikov, Dragunov, vb.)
- Hedef fotoğrafı analizi
- Otomatik OVN (Orta Vuruş Noktası) hesaplama
- Yan ayar ve yükseliş/alçalış düzeltme değerleri

### 3. **Hedef Fotoğraf Analizi**
- Kamera ile çekim
- Galeriden yükleme
- AI destekli vuruş noktası tespiti
- Atım gruplaması analizi

### 4. **Atış Geçmişi**
- Tüm atışların kaydı
- Hedef fotoğrafları
- Atış bilgileri (tarih, mesafe, silah, skor)
- İstatistikler ve grafikler

### 5. **Performans Analizi**
- 10 üzerinden puanlama
- Atış hataları tespiti:
  - **Nişan Hataları**
  - **Tüfeğe Hâkimiyet Hataları**
- Detaylı geri bildirim
- İyileştirme önerileri

## 🏗️ Teknik Mimari

### **Backend (Node.js + Express + MongoDB)**
```
├── API Server (Express)
├── Database (MongoDB)
├── Authentication (JWT)
├── Image Processing (Sharp, OpenCV)
├── AI Analysis (TensorFlow.js)
└── File Storage (AWS S3 veya local)
```

### **Web App (Next.js 14 + TypeScript)**
```
├── Frontend (React + Tailwind CSS)
├── State Management (Zustand)
├── Image Upload & Camera
├── Real-time Analysis
└── Responsive Design
```

### **Mobile App (React Native + Expo)**
```
├── Cross-platform (iOS + Android)
├── Camera Integration
├── Offline Support
├── Push Notifications
└── Native Performance
```

## 📊 Veri Modelleri

### **User (Kullanıcı)**
```typescript
{
  _id: ObjectId,
  username: string,
  email: string,
  password: string (hashed),
  firstName: string,
  lastName: string,
  rank?: string,
  unit?: string,
  preferredWeapons: string[],
  createdAt: Date,
  lastLogin: Date
}
```

### **WeaponProfile (Silah Profili)**
```typescript
{
  _id: ObjectId,
  name: string,
  type: "rifle" | "sniper" | "mg",
  caliber: string,
  zeroing: {
    standardDistance: number,
    sight: number,
    ovnTarget: { x: number, y: number }
  },
  adjustments: {
    windage: { unit: "cm" | "click", value: number },
    elevation: { unit: "cm" | "click", value: number }
  }
}
```

### **ShootingSession (Atış Oturumu)**
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  weaponId: ObjectId,
  date: Date,
  distance: number,
  conditions: {
    weather: string,
    wind: string,
    temperature: number
  },
  target: {
    imageUrl: string,
    imageAnalysis: {
      hits: Array<{ x: number, y: number }>,
      ovn: { x: number, y: number },
      groupSize: number
    }
  },
  zeroing: {
    required: boolean,
    adjustments: {
      windage: number,
      elevation: number
    }
  },
  performance: {
    score: number,
    errors: string[],
    recommendations: string[]
  }
}
```

## 🔬 Sıfırlama Algoritması

### **Askeri Talimatlara Göre**

1. **Temel Prensipler**:
   - 25m mesafeden atış
   - 200m nişangâh kullanımı
   - 3 mermi atışı
   - OVN hesaplama

2. **OVN (Orta Vuruş Noktası) Hesaplama**:
```
1. En yakın iki vuruş arasını birleştir
2. Ortasını işaretle
3. Bu noktayı üçüncü vuruşla birleştir
4. Çizgiyi 3 eşit parçaya böl
5. İlk iki vuruşa yakın işaret = OVN
```

3. **Düzeltme Değerleri**:
   - OVN hedef merkezde ve 2cm üstte ise: UYGUN ✅
   - Sapma varsa: Düzeltme gerekli ⚠️

4. **Yan Ayar**:
   - OVN solda → Saat yönünün tersi
   - OVN sağda → Saat yönünde
   - Hedef kağıdındaki değer kadar çevir

5. **Yükseliş/Alçalış Ayarı**:
   - G-3: 1 tur = 25m'de 4cm kayma
   - HK-33E: ¼ tur = 100m'de 4cm kayma
   - Vuruş yüksek → Saat yönünde
   - Vuruş alçak → Saat yönünün tersi

## 🎯 Atış Hatası Kategorileri

### **1. Nişan Hataları**
- Göz hizası hatası
- Nişan noktası seçim hatası
- Arpacık-gez hizalama hatası
- Paralel hata
- Açısal hata

### **2. Tüfeğe Hâkimiyet Hataları**
- Nefes kesme hatası
- Tetik düşürme hatası
- Göz kırpma
- Dipçik kaynağı hatası
- Vücut gevşeme hatası

## 📈 Puanlama Sistemi (10 Üzerinden)

```
9-10 Puan: Mükemmel (3cm içinde gruplandı)
7-8 Puan:  Çok İyi (5cm içinde gruplandı)
5-6 Puan:  İyi (10cm içinde gruplandı)
3-4 Puan:  Orta (15cm içinde gruplandı)
1-2 Puan:  Zayıf (15cm+ dağılım)
0 Puan:    Hedef dışı
```

## 🚀 Geliştirme Aşamaları

### **Faz 1: Backend & API (2 hafta)**
- [ ] MongoDB veritabanı kurulumu
- [ ] Express API endpoint'leri
- [ ] JWT authentication
- [ ] Image upload & storage
- [ ] Basic CRUD operations

### **Faz 2: Sıfırlama Algoritması (1 hafta)**
- [ ] OVN hesaplama algoritması
- [ ] Düzeltme değerleri hesaplama
- [ ] Silah profilleri database
- [ ] Ballistic calculations

### **Faz 3: Image Analysis (2 hafta)**
- [ ] Hedef tespiti (target detection)
- [ ] Vuruş noktası tespiti
- [ ] Grup analizi
- [ ] Atış hatası kategorilendirme

### **Faz 4: Web App (2 hafta)**
- [ ] Next.js setup
- [ ] Authentication pages
- [ ] Dashboard & history
- [ ] Camera & upload
- [ ] Results & recommendations

### **Faz 5: Mobile App (2 hafta)**
- [ ] React Native + Expo setup
- [ ] Camera integration
- [ ] Offline mode
- [ ] Native UI components
- [ ] Push notifications

### **Faz 6: Testing & Deployment (1 hafta)**
- [ ] Unit tests
- [ ] Integration tests
- [ ] Beta testing
- [ ] Production deployment
- [ ] Documentation

## 🛠️ Teknoloji Stack'i

### **Backend**
- Node.js 20+
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Multer (file upload)
- Sharp (image processing)
- OpenCV.js (image analysis)
- TensorFlow.js (AI)

### **Web**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (state)
- React Hook Form
- Zod (validation)
- Axios
- Recharts (graphs)

### **Mobile**
- React Native
- Expo SDK 50+
- React Navigation
- AsyncStorage
- Expo Camera
- Expo Image Picker

### **DevOps**
- Docker
- GitHub Actions
- AWS / DigitalOcean
- Nginx
- PM2

## 📱 Kullanıcı Akışı

### **1. Kayıt & Giriş**
```
Kullanıcı → Kayıt Formu → Email Doğrulama → Dashboard
```

### **2. Sıfırlama İşlemi**
```
Dashboard → Yeni Sıfırlama → Silah Seç → Mesafe Gir → 
Hedef Fotoğraf Yükle → Analiz Et → Sonuçları Gör → Kaydet
```

### **3. Atış Geçmişi**
```
Dashboard → Geçmiş → Atış Seç → Detayları Gör → 
İstatistikleri İncele → Karşılaştır
```

## 🔐 Güvenlik

- Şifre hashleme (bcrypt)
- JWT token authentication
- Rate limiting
- Input validation
- XSS protection
- HTTPS only
- CORS configuration
- Environment variables

## 📊 Analytics & Monitoring

- User activity tracking
- Error logging (Sentry)
- Performance monitoring
- Usage statistics
- A/B testing capability

## 🎨 UI/UX Özellikleri

- Modern ve temiz tasarım
- Dark/Light mode
- Responsive design
- Touch-friendly controls
- Progressive Web App (PWA)
- Offline capability
- Fast loading times

## 📝 Dokümantasyon

- API documentation (Swagger)
- User manual
- Admin guide
- Developer docs
- Video tutorials

## 🔄 Gelecek Özellikler

- [ ] Video atış analizi
- [ ] Gerçek zamanlı atış takibi
- [ ] Sosyal özellikler (yarışmalar)
- [ ] Gelişmiş AI analizi
- [ ] Sesli komutlar
- [ ] AR (Augmented Reality) destekli eğitim
- [ ] Çoklu dil desteği
- [ ] Tablet optimizasyonu

---

## 📞 İletişim & Destek

- GitHub: [repo-link]
- Email: support@example.com
- Docs: docs.example.com

**Proje Durumu**: 🚀 Aktif Geliştirme
**Versiyon**: 1.0.0
**Son Güncelleme**: 2026-01-12
