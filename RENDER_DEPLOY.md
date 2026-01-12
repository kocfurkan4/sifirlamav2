# Render.com Deployment Guide

## Backend Deployment

### 1. Render'a Giriş Yap
- https://render.com adresine git
- **"Get Started for Free"** veya **"Sign In"**
- **"Continue with GitHub"** ile giriş yap

### 2. Yeni Web Service Oluştur
1. Dashboard'da **"New +"** butonuna tıkla
2. **"Web Service"** seç
3. Repository'yi bul: **kocfurkan4/sifirlamav2**
4. **"Connect"** butonuna tıkla

### 3. Web Service Ayarları

**Basic Settings:**
- **Name:** `silah-sifirlama-backend`
- **Region:** `Frankfurt (EU Central)` (veya size yakın)
- **Branch:** `main`
- **Root Directory:** `backend` ⚠️ ÖNEMLİ!
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- **Free** seçin

### 4. Environment Variables Ekle

**"Advanced"** butonuna tıklayıp şu değişkenleri ekle:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `JWT_SECRET` | `super_gizli_jwt_secret_buraya_random_key_123456` |
| `CORS_ORIGIN` | `https://sifirlamav2.vercel.app` |
| `PORT` | `5000` |

**MongoDB için** (2 seçenek):

#### Seçenek A: Render MongoDB (Önerilen - Kolay)
1. Environment Variables'da **"Add from Database"**'e tıkla
2. **"Create a MongoDB Database"** seç
3. Database Name: `sifirlamadb`
4. Region: Frankfurt seç
5. Plan: Free seç
6. "Create Database"
7. Otomatik olarak `MONGODB_URI` eklenecek

#### Seçenek B: MongoDB Atlas (Ücretsiz, Daha Güçlü)
1. https://mongodb.com/cloud/atlas adresine git
2. Ücretsiz hesap oluştur
3. Cluster oluştur (M0 Free Tier)
4. Database Access → Kullanıcı ekle
5. Network Access → 0.0.0.0/0 ekle (veya Render IP'leri)
6. Connect → Connection string kopyala
7. Render'da `MONGODB_URI` olarak ekle

### 5. Deploy Et
- **"Create Web Service"** butonuna tıkla
- Deploy başlayacak (3-5 dakika)
- Logs'u takip et

### 6. Backend URL'sini Al
Deploy tamamlandığında, üstte URL göreceksiniz:
```
https://silah-sifirlama-backend.onrender.com
```

Bu URL'yi kopyalayın!

### 7. CORS'u Güncelle (Deploy sonrası)
1. Render dashboard → Backend service
2. "Environment" → `CORS_ORIGIN` değişkenini düzenle
3. Değeri Vercel URL'iniz olarak ayarlayın: `https://sifirlamav2.vercel.app`
4. "Save Changes" → Otomatik restart

### 8. Vercel'de Backend URL'sini Güncelle
1. Vercel dashboard → sifirlamav2 projesi
2. Settings → Environment Variables
3. `NEXT_PUBLIC_API_URL` değişkenini düzenle
4. Yeni değer: `https://silah-sifirlama-backend.onrender.com`
5. Save → Redeploy

## Test Etme

Backend URL'sine tarayıcıdan git:
```
https://silah-sifirlama-backend.onrender.com
```

Şu yanıtı görmelisiniz:
```json
{
  "message": "Silah Sıfırlama API",
  "version": "1.0.0",
  "status": "running"
}
```

## Notlar

- **Free tier** 15 dakika hareketsizlikten sonra uyur
- İlk istek 30-60 saniye sürebilir (cold start)
- Her 14 günde bir otomatik suspend olur, tekrar ziyaret edin
- Production için ücretli plan önerilir

## Sorun Giderme

### Deploy Başarısız
- Logs'u kontrol et
- Root Directory'nin `backend` olduğundan emin ol
- Node.js versiyonu uyumlu mu kontrol et

### MongoDB Bağlantı Hatası
- `MONGODB_URI` değişkeninin doğru olduğunu kontrol et
- MongoDB Atlas kullanıyorsanız, Network Access'te 0.0.0.0/0 ekleyin
- Connection string'de şifrenizin doğru olduğunu kontrol edin

### CORS Hatası
- `CORS_ORIGIN` değişkeninin Vercel URL'iniz olduğunu kontrol edin
- URL sonunda `/` olmamalı
