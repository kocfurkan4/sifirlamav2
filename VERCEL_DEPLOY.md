# Vercel Deployment Guide

## Web App Deployment

### 1. Vercel'e Giriş Yap
- https://vercel.com adresine git
- **"Continue with GitHub"** ile giriş yap

### 2. Yeni Proje Oluştur
1. **"Add New..."** → **"Project"** tıkla
2. **"Import Git Repository"** → **sifirlamav2** seç
3. **"Import"** butonuna tıkla

### 3. Proje Ayarları
- **Framework Preset:** Next.js (otomatik seçilmeli)
- **Root Directory:** `web` (ÖNEMLİ! Düğmeye tıklayıp "web" seç)
- **Build Command:** `npm run build` (otomatik)
- **Output Directory:** `.next` (otomatik)
- **Install Command:** `npm install` (otomatik)

### 4. Environment Variables
**"Environment Variables"** kısmına şunu ekle:

```
NEXT_PUBLIC_API_URL=https://sifirlamav2-production.up.railway.app
```

### 5. Deploy
- **"Deploy"** butonuna tıkla
- 2-3 dakika bekle
- Deploy tamamlandığında URL'yi kopyala (örn: `https://sifirlamav2.vercel.app`)

### 6. Railway'de CORS Güncelle
Railway backend environment variables'da `CORS_ORIGIN` değerini Vercel URL'inle güncelle:
```
CORS_ORIGIN=https://sifirlamav2.vercel.app
```

## Notlar
- Backend URL: https://sifirlamav2-production.up.railway.app
- Frontend URL: (Vercel'den alınacak)
- Her GitHub push'ta otomatik deploy olur
