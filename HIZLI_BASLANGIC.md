# 🚀 Hızlı Başlangıç Kılavuzu

## 5 Dakikada Başla!

### Adım 1: Projeyi İndir

```bash
git clone [repo-url]
cd silah-sifirlama-app
```

### Adım 2: MongoDB'yi Başlat

```bash
# MongoDB kurulu değilse:
# macOS: brew install mongodb-community
# Ubuntu: sudo apt-get install mongodb
# Windows: Download from mongodb.com

# MongoDB'yi başlat
mongod
```

### Adım 3: Backend'i Başlat

```bash
# Backend klasörüne git
cd backend

# Bağımlılıkları yükle (ilk seferde)
npm install

# .env dosyası oluştur
cp .env.example .env

# Sunucuyu başlat
npm run dev
```

✅ Backend çalışıyor: `http://localhost:5000`

### Adım 4: Web App'i Başlat (Yeni terminal)

```bash
# Ana dizine dön
cd ..

# Web klasörüne git
cd web

# Bağımlılıkları yükle (ilk seferde)
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

✅ Web uygulaması çalışıyor: `http://localhost:3000`

### Adım 5: Tarayıcıda Aç

```
http://localhost:3000
```

## 🎯 İlk Kullanım

1. **Kayıt Ol** - Sağ üst köşeden "Kayıt Ol" butonuna tıkla
2. **Giriş Yap** - Kullanıcı adı ve şifreyle giriş yap
3. **Dashboard** - Ana sayfanda istatistiklerini gör
4. **Yeni Sıfırlama** - "+" butonuna tıklayarak yeni atış ekle

## 📱 Mobil Uygulama (Opsiyonel)

```bash
cd mobile
npm install
npx expo start

# QR kodu telefonunuzla tarayın
# Expo Go uygulaması gerekli (App Store/Play Store'dan ücretsiz)
```

## 🔧 Sorun Giderme

### Port Zaten Kullanılıyor

```bash
# Backend port değiştir
# backend/.env dosyasında PORT=5001 yap

# Web port değiştir  
# web'de: npm run dev -- -p 3001
```

### MongoDB Bağlanamıyor

```bash
# MongoDB servisini kontrol et
sudo systemctl status mongodb

# Veya
brew services list
```

### Bağımlılık Hataları

```bash
# node_modules'u sil ve tekrar yükle
rm -rf node_modules package-lock.json
npm install
```

## 📚 Daha Fazla Bilgi

- **API Dokümantasyonu**: `http://localhost:5000/api-docs`
- **README**: Ana dizindeki README.md
- **Proje Planı**: PROJE_PLANI.md

## 💡 İpuçları

- Backend ve Web'i aynı anda çalıştırın
- MongoDB'nin çalıştığından emin olun
- .env dosyalarını kontrol edin
- İlk kullanımda bağımlılık yüklemesi zaman alabilir

## 🆘 Yardım

Sorun mu yaşıyorsunuz? 

1. Terminal çıktılarını kontrol edin
2. MongoDB'nin çalıştığını doğrulayın
3. Port çakışması var mı kontrol edin
4. GitHub Issues'da sorun açın

**Başarılı atışlar! 🎯**
