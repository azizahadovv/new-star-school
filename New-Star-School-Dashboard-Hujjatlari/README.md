# New Star School — Dizayn va Texnik Hujjatlar

![New Star School](rasmlar/login.png)

**New Star School Dashboard** — maktab boshqaruv axborot tizimi (LMS). Bu hujjat to'plami Figma dizaynini to'liq tahlil qiladi va uni ishlab chiqishga tayyor texnik spetsifikatsiyaga aylantiradi: UI/UX tahlil, dizayn tizimi, design token'lar, **React (JSX)** frontend, **Java Spring Boot** backend, **PostgreSQL** modeli, oqim diagrammalari, SEO va accessibility tavsiyalari.

> 5 ta foydalanuvchi roli (Admin, Direktor, Zavuch, O'qituvchi, O'quvchi) · 10+ modul · to'liq RBAC

---

## 📚 Mundarija

### Kirish
| № | Hujjat | Tavsif |
|---|--------|--------|
| 01 | [Loyiha haqida](01-Loyiha-haqida.md) | Tizim maqsadi, modullar va umumiy tuzilma |

### 🎨 Dizayn tizimi
| № | Hujjat | Tavsif |
|---|--------|--------|
| 02 | [Dizayn tizimi](02-Dizayn-tizimi.md) | Umumiy ko'rinish (ranglar, shrift, komponentlar) |
| 03 | [Design Tokens](03-Design-Tokens.md) | To'liq token tizimi — CSS o'zgaruvchilari, JSON |
| 04 | [Typography](04-Typography.md) | Shrift, o'lcham shkalasi, matn ierarxiyasi |
| 05 | [Layout, Grid, Spacing](05-Layout-Grid-Spacing.md) | Karkas, grid, 4pt oraliq tizimi |
| 06 | [Komponentlar](06-Komponentlar.md) | Har bir UI komponent: holatlar va spetsifikatsiya |
| 07 | [Responsive qoidalar](07-Responsive.md) | Breakpointlar, mobil moslashuv strategiyalari |
| 08 | [Animatsiyalar](08-Animatsiyalar.md) | Motion token'lar, keyframe'lar, prefers-reduced-motion |
| 09 | [Brending va logotip](09-Brending-logotip.md) | Logotip variantlari va qo'llanilish qoidalari |
| 10 | [Navigatsiya](10-Navigatsiya.md) | Sidebar va topbar tafsilotlari |
| 11 | [Ikonkalar](11-Ikonkalar.md) | Ikonka to'plami (chiziqli / to'ldirilgan) |

### 📄 Sahifalar UI/UX tahlili
| № | Hujjat | Tavsif |
|---|--------|--------|
| 12 | [Kirish (Login)](12-Sahifa-Login.md) | Autentifikatsiya ekrani |
| 13 | [Asosiy sahifa](13-Sahifa-Asosiy.md) | Dashboard — modul kartochkalari |
| 14 | [Dars jadvali](14-Sahifa-Dars-jadvali.md) | Haftalik jadval moduli |
| 15 | [Sinflar ro'yhati](15-Sahifa-Sinflar.md) | Sinflar va guruhlar |
| 16 | [O'qituvchilar](16-Sahifa-Oqituvchilar.md) | Ro'yxat + profil |
| 17 | [O'quvchilar](17-Sahifa-Oquvchilar.md) | Ro'yxat + profil |
| 18 | [Fanlar](18-Sahifa-Fanlar.md) | Fanlar boshqaruvi |
| 19 | [Xodimlar](19-Sahifa-Xodimlar.md) | Texnik xodimlar |
| 20 | [Davomat](20-Sahifa-Davomat.md) | Yo'qlama hisoboti |
| 21 | [Baholar reytingi](21-Sahifa-Baholar-reytingi.md) | Baholar hisoboti |
| 22 | [Shaxsiy ma'lumotlar](22-Sahifa-Shaxsiy-malumotlar.md) | Profil sahifasi |
| 23 | [Modal oynalar](23-Modal-oynalar.md) | Yaratish/tahrirlash oynalari, dropdownlar |

### 👥 Rollar va oqimlar
| № | Hujjat | Tavsif |
|---|--------|--------|
| 24 | [Foydalanuvchi rollari](24-Foydalanuvchi-rollari.md) | RBAC matritsasi, 5 rol tafsiloti |
| 25 | [User flow diagramlari](25-User-flow.md) | Mermaid oqim diagrammalari |
| 26 | [Admin workflow](26-Admin-workflow.md) | Ma'mur ish jarayoni |

### ⚛️ Frontend (React, JSX — TypeScript'siz)
| № | Hujjat | Tavsif |
|---|--------|--------|
| 27 | [Arxitektura](27-Frontend-arxitektura.md) | Stek, papka tuzilishi, ma'lumot oqimi |
| 28 | [Tokenlar va Global CSS](28-Frontend-tokens-css.md) | tokens.css, global.css, util'lar |
| 29 | [Layout komponentlar](29-Frontend-layout-komponentlar.md) | AppShell, Sidebar, Topbar |
| 30 | [UI komponentlar](30-Frontend-ui-komponentlar.md) | Button, Input, Table, Modal va h.k. |
| 31 | [Sahifa komponentlar](31-Frontend-sahifa-komponentlar.md) | Login, Dashboard, ro'yxat, detal |
| 32 | [Routing va Auth](32-Frontend-routing-auth.md) | React Router, ProtectedRoute |

### ☕ Backend (Java Spring Boot)
| № | Hujjat | Tavsif |
|---|--------|--------|
| 33 | [Arxitektura](33-Backend-arxitektura.md) | Qatlamli tuzilma, paketlar, konfiguratsiya |
| 34 | [Entity modellar](34-Backend-entity-modellar.md) | JPA entity'lar va munosabatlar |
| 35 | [REST API](35-Backend-rest-api.md) | Endpointlar, DTO, controller/service |
| 36 | [Security va JWT](36-Backend-security-jwt.md) | Spring Security, JWT, parol himoyasi |

### 🗄️ Ma'lumotlar bazasi
| № | Hujjat | Tavsif |
|---|--------|--------|
| 37 | [PostgreSQL model](37-PostgreSQL-model.md) | To'liq DDL, ER diagramma, indekslar |

### 🔍 Optimizatsiya
| № | Hujjat | Tavsif |
|---|--------|--------|
| 38 | [SEO tavsiyalari](38-SEO.md) | Meta teglar, indeksatsiya, unumdorlik |
| 39 | [Accessibility](39-Accessibility.md) | WCAG 2.1 AA — qulaylik tavsiyalari |

---

## 🎨 Asosiy ranglar

| Rang | HEX | Vazifa |
|------|-----|--------|
| 🔵 Navy | `#34414F` | Sidebar, sarlavhalar |
| 🟢 Yashil | `#41C981` | Brend, muvaffaqiyat |
| 🔷 Primary ko'k | `#125DAC` | Asosiy harakatlar |
| 🔴 Qizil | `#C70909` | Chiqish, o'chirish, xato |
| ⬜ Fon | `#F4F7F9` | Sahifa foni |

---

## 🛠️ Texnologiya steki

**Frontend:** React 18 (JSX) · Vite · React Router v6 · TanStack Query · React Hook Form · Axios · lucide-react · CSS Modules · react-i18next

**Backend:** Java 17+ · Spring Boot 3.x · Spring Data JPA · Spring Security + JWT · MapStruct · Flyway

**Ma'lumotlar bazasi:** PostgreSQL 15+

---

## ⚠️ Muhim topilmalar (xulosa)

| Daraja | Topilma | Hujjat |
|--------|---------|--------|
| 🔴 Kritik | Profilda parol ochiq matnda ko'rsatilgan — bcrypt hash zarur, ko'rsatilmasin | [36](36-Backend-security-jwt.md), [22](22-Sahifa-Shaxsiy-malumotlar.md) |
| 🟡 O'rta | "№" ustunlari ketma-ket emas (hamma "1") | [20](20-Sahifa-Davomat.md), [21](21-Sahifa-Baholar-reytingi.md) |
| 🟡 O'rta | Fanlar sahifasida qidiruv placeholderi noto'g'ri | [18](18-Sahifa-Fanlar.md) |
| 🟢 Yaxshilash | Davomat/baho "faqat rang" emas, matn bilan ham | [39](39-Accessibility.md) |
| 🟢 Yaxshilash | Dashboard kartochkalariga statistika qo'shish | [13](13-Sahifa-Asosiy.md) |

---

## 📁 Hujjat tuzilishi

```
New-Star-School-Dashboard-Hujjatlari/
├── README.md                    ← shu fayl (mundarija)
├── 01–39-*.md                   ← 39 ta bo'lim
└── rasmlar/                     ← 100 ta ekran tasviri
```

> 💡 Mermaid diagrammalari GitHub, Obsidian, VS Code (Markdown Preview) va boshqa muharrirlarda avtomatik render qilinadi.

---

*New Star School Dashboard texnik hujjatlari · O'zbek tilida · 39 bo'lim*
