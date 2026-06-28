# 02 — Dizayn tizimi

Ushbu bo'lim tizimning vizual tilini — ranglar, shriftlar, oraliqlar va qayta ishlatiluvchi komponentlarni belgilaydi.

---

## 1. Rang palitrasi

### Asosiy ranglar

| Rang | HEX | Qo'llanilishi |
|------|-----|---------------|
| 🟦 Navy (asosiy) | `#34414F` | Yon panel, sarlavhalar, asosiy (qora) tugma, matn |
| 🟩 Brend yashil | `#41C981` | Logotip, brend belgisi |
| 🔵 Primary ko'k | `#125DAC` | Tugmalar, havolalar ("Batafsil"), faol holatlar, formalar |
| ⚫ To'q matn | `#263039` | Asosiy matn (qora-navy) |

### Fon va neytral ranglar

| Rang | HEX | Qo'llanilishi |
|------|-----|---------------|
| Asosiy fon | `#F4F7F9` | Sahifa foni |
| Kartochka/yuza | `#FFFFFF` | Oq kartochkalar, jadval qatorlari |
| Yengil yuza | `#ECF1F4` | Input maydonlari, ikkilamchi tugma foni |
| Faol menyu foni | `#FFFFFF` (navy ustida och) | Sidebardagi faol element |

### Status ranglari

| Rang | HEX | Qo'llanilishi |
|------|-----|---------------|
| 🔴 Qizil | `#C70909` | "Tizimdan chiqish", "Parolni unutdingmi?", "O'chirish" |
| 🔵 Och ko'k (faol tab) | `#C3D6EA` | Faol "chorak" tab foni |

### Modul aksent ranglari (kartochka ikonkalari)

Asosiy sahifadagi har bir modul kartochkasi o'ziga xos rangli dumaloq ikonkaga ega:

| Modul | Rang | HEX |
|-------|------|-----|
| Dars jadvali | Teal | `#088395` |
| Sinflar ro'yhati | Marjon (coral) | `#E88D67` |
| O'qituvchilar | Ko'k | `#2A629A` |
| O'quvchilar | Dengiz-yashil | `#58A399` |
| Fanlar | Siyohrang (purple) | `#81689D` |
| Shaxsiy ma'lumotlar | Tilla (tan) | `#BCA37F` |
| Baholar reytingi | Marjon | `#E88D67` |
| Davomat | Ko'k | `#2A629A` |

> **Eslatma:** O'quvchi panelidagi kartochkalar ham shu palitradan foydalanadi (Dars jadvali — teal, Baholar — marjon, Davomat — ko'k, Shaxsiy — dengiz-yashil).

---

## 2. Tipografika

- **Shrift oilasi:** zamonaviy sans-serif (Inter / Poppins uslubi)
- **Yo'nalish:** tiniqlik va o'qilishi qulaylik

| Daraja | Vazn | Taxminiy o'lcham | Misol |
|--------|------|------------------|-------|
| Sahifa sarlavhasi (H1) | Bold | ~24px | "Dars jadvali", "O'qituvchilar" |
| Bo'lim sarlavhasi (H2) | Semibold, ko'k `#125DAC` | ~16px | "SHAXSIY MA'LUMOTLAR" |
| Kartochka sarlavhasi | Bold, ko'k | ~16px | "1-A SINF" |
| Jadval sarlavhasi | Medium, kulrang | ~14px | "Telefon raqam" |
| Asosiy matn | Regular | ~14px | Ismlar, qiymatlar |
| Yordamchi matn | Regular, kulrang | ~13px | "32 ta o'quvchi", rol nomi |

---

## 3. Tugmalar (Buttons)

| Turi | Ko'rinishi | Qo'llanilishi |
|------|-----------|---------------|
| **Asosiy (navy)** | To'q navy fon `#34414F`, oq matn, yumaloq burchak | "Tizimga kirish" |
| **Asosiy (ko'k)** | Ko'k fon `#125DAC`, oq matn | "Sinf yaratish", "O'qituvchi qo'shish", "Saqlash", "Tahrirlash" |
| **Havola (link)** | Ko'k matn `#125DAC` + `>` belgisi | "Batafsil >" |
| **Ikkilamchi** | Och kulrang fon `#ECF1F4`, ikonka + matn | "Tahrirlash" (profil kartasi) |
| **Xavf (danger)** | Oq fon, qizil matn `#C70909` + ikonka | "Tizimdan chiqish" |
| **Tab** | Faol — ko'k; nofaol — och kulrang | "1-chorak ... 4-chorak" |

![Asosiy (navy) tugma — Login](rasmlar/login.png)

---

## 4. Komponentlar

### Kartochka (Card)
- Oq fon, yumshoq yumaloq burchaklar (~12px radius), yengil soya
- Modul kartochkasi: yuqorida rangli dumaloq ikonka + ostida nom
- Sinf kartochkasi: tepada ko'k chiziq, sarlavha + o'quvchilar soni

### Jadval (Table)
- Sarlavha qatori: kulrang matn, ajratuvchi chiziq
- Qatorlar: oq fon, yupqa chegara
- Har qatorda: avatar (dumaloq), matn ustunlari, o'ng tomonda "Batafsil >" va `⋮` (kebab) menyu

### Qidiruv maydoni (Search)
- Och kulrang fon, chap tomonda 🔍 ikonka
- Placeholder: "O'quvchi bo'ylab izlash", "O'qituvchi bo'ylab izlash" va h.k.

### Dropdown (filtr)
- Och kulrang fon, o'ng tomonda `▾` belgisi
- Misol: "Fanni tanlang", "Sinfni tanlang", "Ustozni tanlang"

### Sahifalash (Pagination)
- `‹ 1 2 3 ... 39 40 41 ›` — faol sahifa ko'k ramkada

### Modal oyna
- Markazda, oq fon, sarlavha + `✕` yopish tugmasi, formalar, "Saqlash" tugmasi
- Batafsil → [23-Modal-oynalar.md](23-Modal-oynalar.md)

### Til tanlash (Language switcher)
- Topbarda: O'zbekiston bayrog'i + "O'zbekcha" + `▾`

### Avatar
- Dumaloq, foydalanuvchi rasmi; yonida ism va rol

---

## 5. Oraliqlar va tartib (Layout)

- **Yon panel kengligi:** ~300px (navy)
- **Topbar balandligi:** ~80px (oq, yengil soya)
- **Asosiy maydon:** qolgan joy, `#F4F7F9` fon, ichki padding ~24px
- **Kartochkalar:** gorizontal qatorda, teng oraliq bilan
- **Burchak radiusi:** kartochka/tugma/input uchun ~10–12px

---

## 6. Umumiy uslub tamoyillari

1. **Minimalizm** — ortiqcha bezaksiz, toza oq maydonlar
2. **Kontrast** — to'q navy yon panel + yorug' asosiy maydon
3. **Izchillik** — barcha modullarda bir xil jadval/kartochka/tugma andozasi
4. **Ranglar bilan ajratish** — har modulga o'z aksent rangi
5. **Yumshoqlik** — yumaloq burchaklar va yengil soyalar

---

⬅️ Oldingi: [01 — Loyiha haqida](01-Loyiha-haqida.md) · ➡️ Keyingi: [03 — Design Tokens](03-Design-Tokens.md)
