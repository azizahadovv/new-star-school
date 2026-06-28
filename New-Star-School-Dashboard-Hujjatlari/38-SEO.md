# 38 — SEO tavsiyalari

> **Muhim kontekst:** New Star School — bu autentifikatsiya talab qiladigan **ichki boshqaruv paneli (dashboard)**. Asosiy sahifalar login orqasida — qidiruv tizimlari ularni indekslamaydi va indekslamasligi ham kerak (maxfiylik). Shu sababli klassik SEO bu yerda cheklangan rol o'ynaydi. SEO asosan **ommaviy sahifalar** (login/landing/marketing) uchun muhim.

---

## 1. SEO qayerda muhim, qayerda yo'q

| Sahifa | SEO muhimmi? | Indeksatsiya |
|--------|--------------|--------------|
| Login | Qisman (brend) | Mumkin |
| Landing/marketing (agar bo'lsa) | ✅ Ha | Ha |
| Dashboard, ro'yxatlar, profillar | ❌ Yo'q | **`noindex`** (maxfiy) |

---

## 2. Ichki sahifalarni yashirish (maxfiylik)

Autentifikatsiyalangan sahifalar qidiruvga tushmasligi shart:

```html
<!-- Himoyalangan sahifalar uchun -->
<meta name="robots" content="noindex, nofollow" />
```

```
# robots.txt
User-agent: *
Disallow: /students
Disallow: /teachers
Disallow: /staff
Disallow: /classes
Disallow: /grades
Disallow: /attendance
Disallow: /profile
Allow: /$
Allow: /login
```

---

## 3. Asosiy meta teglar (login/landing uchun)

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Star School — Maktab boshqaruv tizimi</title>
  <meta name="description"
        content="New Star School — o'quvchilar, o'qituvchilar, dars jadvali, baholar va davomatni boshqaruvchi zamonaviy maktab axborot tizimi." />
  <meta name="theme-color" content="#34414F" />
  <html lang="uz" />
</head>
```

> **`lang="uz"`** — o'zbek tili to'g'ri belgilansin (qidiruv va skrinriderlar uchun muhim).

---

## 4. Open Graph (ijtimoiy tarmoqlarda ulashish)

```html
<meta property="og:type" content="website" />
<meta property="og:title" content="New Star School — Maktab boshqaruv tizimi" />
<meta property="og:description" content="Zamonaviy maktab axborot tizimi." />
<meta property="og:image" content="https://newstarschool.uz/og-image.png" />
<meta property="og:url" content="https://newstarschool.uz" />
<meta property="og:locale" content="uz_UZ" />
```

---

## 5. SPA va indekslash muammosi

React SPA (Vite) — kontent JavaScript bilan render qilinadi. Ommaviy sahifalar uchun:

| Yondashuv | Qachon |
|-----------|--------|
| **CSR** (oddiy SPA) | Ichki dashboard uchun yetarli (SEO kerak emas) |
| **Pre-rendering** (`vite-plugin-ssr`/prerender) | Faqat landing/login statik HTML kerak bo'lsa |
| **SSR** (Next.js) | Agar katta ommaviy marketing qismi bo'lsa |

> Bu loyiha uchun: dashboard CSR'da qoladi; agar marketing sahifasi qo'shilsa — o'sha sahifalarni alohida pre-render qilish kifoya.

---

## 6. Texnik SEO / unumdorlik (barcha sahifalarga foydali)

Yaxshi unumdorlik — yaxshi UX va (ommaviy sahifalarda) yaxshi reyting:

- **Tezlik:** Vite + kod bo'lish (`React.lazy`), tasvirlarni optimallashtirish
- **Lazy loading:** rasmlar `loading="lazy"`
- **Caching:** statik resurslar uchun cache sarlavhalari
- **Gzip/Brotli** siqish
- **Core Web Vitals:** LCP < 2.5s, CLS < 0.1, INP yaxshi

```jsx
// Sahifalarni lazy yuklash (bundle hajmini kamaytiradi)
const StudentsPage = React.lazy(() => import('./features/students/StudentsPage'));
```

---

## 7. Semantik HTML (SEO + accessibility uchun)

- Sarlavhalar ierarxiyasi: bitta `<h1>` (sahifa nomi), keyin `<h2>`, `<h3>`
- `<nav>`, `<main>`, `<header>`, `<aside>`, `<section>` semantik teglar
- Havolalar `<a href>` (div emas)
- Tugmalar `<button>` (klikли div emas)

---

## 8. Sitemap (agar ommaviy sahifalar bo'lsa)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://newstarschool.uz/</loc><priority>1.0</priority></url>
  <url><loc>https://newstarschool.uz/login</loc><priority>0.8</priority></url>
</urlset>
```

> Ichki (himoyalangan) sahifalar sitemap'ga **qo'shilmaydi**.

---

## 9. Strukturalangan ma'lumot (landing uchun, ixtiyoriy)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "New Star School",
  "url": "https://newstarschool.uz",
  "inLanguage": "uz"
}
</script>
```

---

## 10. SEO tekshiruv ro'yxati

- [ ] `lang="uz"` o'rnatilgan
- [ ] Himoyalangan sahifalar `noindex` + `robots.txt` da bloklangan
- [ ] Login/landing'da `<title>` va `description` mavjud
- [ ] Open Graph teglari (ulashish uchun)
- [ ] Semantik HTML (h1, nav, main)
- [ ] Tasvirlar `loading="lazy"` + optimallashtirilgan
- [ ] Core Web Vitals yaxshi (tezlik)
- [ ] Sitemap faqat ommaviy sahifalar bilan

---

⬅️ [37 — PostgreSQL model](37-PostgreSQL-model.md) · ➡️ [39 — Accessibility](39-Accessibility.md)
