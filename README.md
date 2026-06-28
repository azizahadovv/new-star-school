# New Star School — Maktab boshqaruv tizimi

Maktab boshqaruvi uchun rolga asoslangan (RBAC) to'liq tizim: **React frontend + Spring Boot backend + PostgreSQL**. 5 ta foydalanuvchi roli (Admin, Direktor, Zavuch, O'qituvchi, O'quvchi) bitta tizimda ishlaydi.

---

## 📁 Repozitoriya tuzilishi (monorepo)

```
new-star-school/
├── backend/                          # Spring Boot 3 (Java 17) REST API + JWT auth
├── frontend/                         # ✅ BIRLASHTIRILGAN frontend (React 18, 5 rol)
├── New-Star-School-Dashboard-Hujjatlari/   # 📘 dizayn-tizimi va arxitektura hujjatlari (.md)
└── README.md                         # shu fayl — umumiy kirish nuqtasi
```

> **Diqqat:** avval 5 ta alohida React ilovasi (`admin`, `deputy director`, `director`,
> `student`, `teacher`) bor edi — bir xil backend, bir xil auth, faqat rol bo'yicha
> farq qilardi. Ular **`frontend/`** ostida bitta ilovaga birlashtirildi va eski
> alohida papkalar o'chirildi.

---

## 🏗 Arxitektura (umumiy)

```
┌─────────────────────────────────────────────┐
│  Frontend — frontend/  (React 18, CRA)        │
│  • Bitta login  →  roles[] ga qarab yo'naltirish
│  • Bir vaqtda BITTA rol root'da mount bo'ladi │
│  • Rol panellari lazy-load (alohida chunk)    │
└───────────────┬─────────────────────────────┘
                │ HTTPS  (Authorization: Bearer <JWT>)
                ▼
┌─────────────────────────────────────────────┐
│  Backend — backend/  (Spring Boot 3, Java 17) │
│  • /api/v1/auth/**  →  login, refresh, validate
│  • JWT filter + SecurityConfiguration (RBAC)  │
│  • Layered: api → service → repository → entity
└───────────────┬─────────────────────────────┘
                ▼
        ┌──────────────┐
        │ PostgreSQL 16 │   + Telegram bot integratsiyasi
        └──────────────┘
```

Asl xavfsizlik **backend** da: har endpoint JWT va rolga tekshiriladi
(`/api/v1/admins/**` → `hasRole('ADMIN')`, qolgani `authenticated()`).
Frontend route himoyasi (rolga qarab mount) faqat qulaylik uchun.

---

## 👥 Rollar va RBAC

Backend `UserRole` enum (frontend `roles.js` bilan aynan mos):

| Rol (`UserRole`) | Panel | Asosiy modullar |
|------------------|-------|-----------------|
| `ADMIN` | Admin | Dars jadvali, Sinflar, O'qituvchilar, O'quvchilar, Fanlar |
| `DIRECTOR` | Direktor | Reyting, O'qituvchilar/O'quvchilar (ko'rish), Xodimlar |
| `DEPUTY_DIRECTOR` | Zavuch | Admin bilan o'xshash, Fanlarsiz |
| `TEACHER` | O'qituvchi | Sinflar (o'ziniki) |
| `STUDENT` | O'quvchi | Dars jadvali, Baholar, Davomat |

To'liq RBAC matritsasi: [24-Foydalanuvchi-rollari.md](New-Star-School-Dashboard-Hujjatlari/24-Foydalanuvchi-rollari.md)

---

## 🚀 Ishga tushirish

### Backend (port 8000)
```bash
cd backend
# PostgreSQL (5432) va backendni Docker bilan:
docker-compose up -d
# yoki lokal Maven bilan (PostgreSQL alohida ishlab turishi kerak):
./mvnw spring-boot:run
```
Sozlamalar `backend/src/main/resources/application.yaml` da
(DB: `DB_URL`, `DB_USERNAME`; JWT muddati: 1 soat, refresh: 7 kun).
Swagger: `http://localhost:8000/swagger-ui/`

### Frontend (port 3000)
```bash
cd frontend
npm install
npm start          # dev server
npm run build      # production build
```
API manzili universal: `frontend/src/shared/config.js` (`API_BASE_URL`).
Lokal ulanish uchun `frontend/.env.local` da `REACT_APP_API_URL=http://localhost:8000/api/`.

---

## 🧩 Frontend birlashtirilgan arxitekturasi (`frontend/src`)

```
src/
├── index.js              # ReactDOM root, BrowserRouter, tokens.css, CSS, i18n
├── App.js                # top router: /login → SharedLogin · /* → RoleApp
├── i18n.js               # barcha rollarning tarjimalari birlashtirilgan (uz/ru/en)
├── shared/
│   ├── SharedLogin.jsx   # bitta login (asl dizayn) → roles[] ga qarab yo'naltiradi
│   ├── RoleApp.jsx       # aktiv rolni lazy-load qilib root'da mount qiladi
│   ├── config.js         # universal API_BASE_URL (yagona manba)
│   ├── api.js            # config'dan axios + request interceptor (real-vaqt token)
│   ├── auth-service.js   # login / refresh / validate
│   ├── roles.js          # rol prioriteti, IMPLEMENTED_ROLES, pickActiveRole()
│   └── tokens.css        # dizayn tokenlari (03-Design-Tokens.md)
└── roles/
    ├── admin/  director/  deputy/  teacher/  student/
                           # har rolning to'liq UI'si (o'zgarmagan) + <Role>Entry.jsx
                           # service/api.js → shared/api ga re-export (takror yo'q)
```

**Asosiy g'oya:** foydalanuvchining bitta aktiv roli bor, shuning uchun bir vaqtda
faqat o'sha rolning daraxti root'da mount qilinadi — har rolning mavjud router'i va
absolute link'lari (`/teachers`, `/class-schedule`) o'zgarmaydi, to'qnashuv yo'q.

Texnik tafsilotlar: [27-Frontend-arxitektura.md](New-Star-School-Dashboard-Hujjatlari/27-Frontend-arxitektura.md) ·
[32-Frontend-routing-auth.md](New-Star-School-Dashboard-Hujjatlari/32-Frontend-routing-auth.md)

---

## 📘 Hujjatlar

To'liq dizayn-tizimi, sahifa spetsifikatsiyalari va backend hujjatlari:
[New-Star-School-Dashboard-Hujjatlari/](New-Star-School-Dashboard-Hujjatlari/README.md)

| Mavzu | Fayllar |
|-------|---------|
| Dizayn tizimi (token, tipografika, layout) | `02`–`11` |
| Sahifalar (login, jadval, sinflar, ...) | `12`–`23` |
| Rollar, user-flow, workflow | `24`–`26` |
| Frontend arxitektura | `27`–`32` |
| Backend (arxitektura, entity, REST, JWT, DB) | `33`–`37` |
| SEO, Accessibility | `38`–`39` |

---

## ⚠️ Texnik qarz (audit'dan)

- `azizahadovv` (root) — git config dump'i xato commit qilingan, **o'chirilishi kerak**.
- Eski service'larda: `getLocalData` `setItem` ishlatadi (getItem bo'lishi kerak),
  `error.massage` typo (5 joy), App.js refresh interval 360000 = 6 daqiqa (izoh 1 soat deydi).
  Birlashtirilgan `app/` da token muammosi `shared/api.js` interceptor bilan tuzatilgan.
- UI kutubxonalari ko'p (MUI + Bootstrap + Tailwind + antd + rodal) — kelajakda kamaytirish.
