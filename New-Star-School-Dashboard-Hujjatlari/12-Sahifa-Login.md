# 12 — Sahifa tahlili: Kirish (Login)

![Login ekrani](rasmlar/login.png)

## Maqsad
Foydalanuvchini tizimga autentifikatsiya qilish. Bu — tizimga yagona kirish nuqtasi; barcha rollar shu ekrandan o'tadi.

## Kim ko'radi
Barcha autentifikatsiyalanmagan foydalanuvchilar (Admin, Direktor, Zavuch, O'qituvchi, O'quvchi).

---

## Layout tahlili

Ekran vertikal markazlashtirilgan, ikki kartochkadan iborat:

```
        ┌─────────────────────────┐
        │   [LOGO: NEW STAR]       │  ← brend kartasi (tepada ko'k chiziq)
        └─────────────────────────┘
        ┌─────────────────────────┐
        │ Shaxsiy akkauntga kirish │  ← sarlavha
        │ Kirish uchun ...kiriting  │  ← yordamchi matn
        │ [👤 Login            ]   │  ← input
        │ [🔒 Parol         👁 ]   │  ← input + ko'rsatish
        │ ☐ Eslab qolish  Parolni? │  ← checkbox + havola
        │ [    Tizimga kirish    ]  │  ← asosiy tugma
        └─────────────────────────┘
```

- **Fon:** ochiq kulrang `#F4F7F9`, yuqori yarmida oq band
- **Kartochka kengligi:** ~460px, markazda
- **Brend kartasi:** logotip, tepasida navy chiziq

---

## Komponentlar

| Komponent | Tafsilot |
|-----------|----------|
| Logo karta | NEW STAR logotipi, oq fonda |
| Sarlavha | "Shaxsiy akkauntga kirish" (bold) |
| Yordamchi matn | "Kirish uchun shaxsiy ma'lumotlarini kiriting" (kulrang) |
| Login input | 👤 ikonka + placeholder "Login" |
| Parol input | 🔒 ikonka + placeholder "Parol" + 👁 (ko'rsatish) |
| Checkbox | "Eslab qolish" (Remember me) |
| Havola | "Parolni unutdingmi?" (qizil `#C70909`) |
| Asosiy tugma | "Tizimga kirish" (navy `#34414F`, to'liq kenglik) |

---

## Interaksiyalar

1. **Login/Parol kiritish** — fokusda chegara ko'kga aylanadi
2. **👁 bosish** — parol ko'rinadi/yashirinadi
3. **"Eslab qolish"** — sessiya/token muddatini uzaytiradi
4. **"Parolni unutdingmi?"** — parolni tiklash oqimi (kelajak)
5. **"Tizimga kirish"** — autentifikatsiya → rolga mos Asosiy sahifaga yo'naltiradi
6. **Xato holati** — noto'g'ri login/parolda input qizil + xabar

---

## UX qaydlar

- ✅ Sodda, diqqatni chalg'itmaydigan dizayn — faqat zarur maydonlar
- ✅ "Eslab qolish" va "Parolni unutdingmi?" bir qatorda — qulay
- ✅ Asosiy tugma to'liq kenglikda, aniq ko'rinadi
- ⚠️ **Tavsiya:** xato xabari uchun aniq joy ajratish (layout sakramasligi uchun)
- ⚠️ **Tavsiya:** "Tizimga kirish" bosilganda loading holati (spinner)
- ⚠️ **Tavsiya:** Caps Lock yoqilgani haqida ogohlantirish

---

## Accessibility qaydlar

- Har input uchun `<label>` (vizual yashirin bo'lsa ham, `aria-label`)
- Parol ko'rsatish tugmasi: `aria-label="Parolni ko'rsatish"` + `aria-pressed`
- Xato xabari `aria-live="polite"` bilan
- Tugma `type="submit"`, forma `Enter` bilan yuboriladi
- Fokus tartibi: Login → Parol → Eslab qolish → Tizimga kirish
- Rang kontrasti: qizil havola fonda ≥ 4.5:1 tekshirilsin

---

## Texnik eslatma
- Frontendda forma validatsiyasi (bo'sh maydon, minimal uzunlik)
- Backendda autentifikatsiya → JWT token qaytariladi (→ [36-Backend-security-jwt.md](36-Backend-security-jwt.md))
- Token `localStorage`/`httpOnly cookie` da saqlanadi, rolga qarab yo'naltirish

---

⬅️ [11 — Ikonkalar](11-Ikonkalar.md) · ➡️ [13 — Asosiy sahifa](13-Sahifa-Asosiy.md)
