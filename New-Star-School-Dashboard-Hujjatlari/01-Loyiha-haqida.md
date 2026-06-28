# 01 — Loyiha haqida

## Tizim nima?

**New Star School Dashboard** — bu maktab (yoki o'quv markazi) faoliyatini to'liq boshqarish uchun mo'ljallangan veb-ilovaning interfeys dizayni. Tizim o'quv jarayonining barcha ishtirokchilarini — ma'muriyat, o'qituvchilar va o'quvchilarni — bitta platformada birlashtiradi.

## Maqsadi

- Dars jadvalini markazlashtirilgan holda boshqarish
- Sinflar, o'qituvchilar, o'quvchilar va fanlar ma'lumotlar bazasini yuritish
- Baholar va davomatni elektron shaklda yuritish va kuzatish
- Texnik xodimlar ma'lumotlarini saqlash
- Har bir foydalanuvchiga roliga mos shaxsiy kabinet taqdim etish

## Foydalanuvchi rollari

Tizim **5 ta rol** uchun moslashtirilgan. Har bir rol o'z huquqlari doirasida turli modullarni ko'radi:

| Rol | Asosiy vazifasi |
|-----|-----------------|
| **Admin** | Tizimni to'liq boshqarish — barcha modullar |
| **Direktor** | Nazorat: reyting, o'qituvchilar, o'quvchilar, xodimlar |
| **Zavuch** | O'quv ishlari: dars jadvali, sinflar, o'qituvchi/o'quvchilar |
| **O'qituvchi** | O'z sinflari va shaxsiy ma'lumotlari |
| **O'quvchi** | Dars jadvali, baholar, davomat, profili |

Batafsil → [24-Foydalanuvchi-rollari.md](24-Foydalanuvchi-rollari.md)

## Modullar xaritasi

```
New Star School
│
├── 🔐 Kirish (Login)
│
├── 🏠 Asosiy sahifa (rolga mos kartochkalar)
│
├── 📅 Dars jadvali        → haftalik jadval / sinf tanlash
├── 🏫 Sinflar             → sinf va guruhlar, o'quvchilar soni
├── 👨‍🏫 O'qituvchilar       → ro'yxat + batafsil profil
├── 🎓 O'quvchilar         → ro'yxat + batafsil profil
├── 📚 Fanlar              → fanlar ro'yxati
├── 🪪 Xodimlar            → texnik xodimlar
├── 📋 Davomat             → yo'qlama hisoboti
├── ⭐ Baholar reytingi    → baholar hisoboti
└── 👤 Shaxsiy ma'lumotlar → profil + tahrirlash + tizimdan chiqish
```

## Interfeysning umumiy tuzilishi

Har bir ichki sahifa uchta asosiy qismdan iborat:

1. **Yon panel (sidebar)** — chap tomonda, navy rangda; logotip va rolga mos menyu
2. **Yuqori panel (topbar)** — sahifa nomi, til tanlash, bildirishnoma, foydalanuvchi avatari
3. **Asosiy maydon (content)** — jadvallar, kartochkalar, formalar

![Interfeys tuzilishi — Admin paneli](rasmlar/rol-admin.png)

## Texnik kontekst

- **Platforma:** veb (desktop), ekran o'lchami `1920 × 1080`
- **Til:** interfeys o'zbek tilida (Lotin yozuvi)
- **Ko'p tillilik:** topbarda til tanlash mavjud (O'zbekcha — standart)
- **Ma'lumotlar:** o'quvchi/o'qituvchi/xodim kartalari, telefon raqamlari, baholar (5 ballik tizim), davomat

---

➡️ Keyingi: [02 — Dizayn tizimi](02-Dizayn-tizimi.md)
