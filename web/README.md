# Silah Sıfırlama Web App

Next.js 14 ile geliştirilmiş modern web uygulaması.

## Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# .env.local dosyası oluştur
cp .env.example .env.local

# Geliştirme sunucusunu başlat
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacak.

## Production Build

```bash
npm run build
npm start
```

## Vercel'e Deploy

1. Vercel dashboard'a git
2. "Import Project" tıkla
3. GitHub repo'yu seç
4. Root Directory: `web`
5. Environment Variable: `NEXT_PUBLIC_API_URL=https://sifirlamav2-production.up.railway.app`
6. Deploy!

## Teknolojiler

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios
- Zustand
- Recharts
