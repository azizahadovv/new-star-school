# 06 — Komponentlar (Component Library)

Har bir qayta ishlatiluvchi UI komponenti: tuzilishi, holatlari (states), variantlari va spetsifikatsiyasi.

---

## 1. Button (Tugma)

### Variantlar
| Variant | Fon | Matn | Misol |
|---------|-----|------|-------|
| `primary` | `#125DAC` | oq | "Saqlash", "Qo'shish" |
| `dark` | `#34414F` | oq | "Tizimga kirish" |
| `secondary` | `#ECF1F4` | navy | "Tahrirlash" (kichik) |
| `danger` | shaffof | `#C70909` | "Tizimdan chiqish" |
| `ghost/link` | yo'q | `#125DAC` | "Batafsil >" |

### Holatlar (states)
- **Default** — asosiy ko'rinish
- **Hover** — fon `primary-hover` (`#0E4C8F`), `transition 150ms`
- **Active/Pressed** — biroz to'qroq + `scale(.98)`
- **Focus** — `box-shadow: 0 0 0 3px var(--color-focus-ring)`
- **Disabled** — `opacity .5`, `cursor not-allowed`
- **Loading** — spinner + matn yashirilgan

### Spetsifikatsiya
```
balandlik: 40–44px
padding: 0 20px (ikonka bilan 0 16px)
radius: 10px
font: 14px / 600
ikonka–matn oraliq: 8px
```

---

## 2. Input (Matn maydoni)

### Tuzilish
```
[🔓 ikonka]  [placeholder / qiymat]            [👁 amal]
```
- Chap ikonka (ixtiyoriy): user, lock, search
- O'ng amal (ixtiyoriy): parol ko'rsatish (👁)

### Holatlar
- Default: fon `#ECF1F4`, chegara yo'q
- Focus: chegara `#125DAC` + `focus-ring`
- Error: chegara `#C70909` + ostida xato matni
- Disabled: `opacity .6`

### Spetsifikatsiya
```
balandlik: 48px
padding: 0 16px (ikonka bilan 0 16px 0 44px)
radius: 10px
placeholder rang: #9AA7B2
```

---

## 3. Search field (Qidiruv)

Input'ning maxsus turi:
- Chapda 🔍 ikonka
- Placeholder: kontentga mos ("O'quvchi bo'ylab izlash")
- Kenglik: konteynerda moslashuvchan
- Debounce: 300ms (frontend)

---

## 4. Dropdown / Select (Filtr)

```
[ Tanlangan qiymat / placeholder        ▾ ]
```
- Fon `#ECF1F4`, o'ngda `▾`
- Bosilganda ostida ro'yxat ochiladi (`z-dropdown`)
- Misollar: "Fanni tanlang", "Sinfni tanlang", "Ustozni tanlang", "9 sinf", "A guruh"

### Ochilgan holat
- Oq panel, `shadow-md`, `radius-md`
- Har element hoverda `#F4F7F9` fon
- Tanlangan element — `#125DAC` matn

---

## 5. Card (Kartochka)

3 ta turi:

| Tur | Tarkib | Qo'llanilishi |
|-----|--------|---------------|
| **Module card** | rangli ikonka + nom | Asosiy sahifa |
| **Class card** | ko'k chiziq + nom + son | Sinflar |
| **Profile card** | rasm + tugmalar | Shaxsiy ma'lumotlar |

Umumiy: oq fon, `radius-lg`, `shadow-card`, hoverda yengil ko'tarilish (`translateY(-2px)`).

---

## 6. Table (Jadval)

### Anatomiya
```
┌─ Sarlavha qatori (kulrang label) ─────────────────────┐
│ №   O'qituvchi      Fan       Tug'ilgan   Telefon   ⋮ │
├───────────────────────────────────────────────────────┤
│ 1   [avatar] Ism    Ingliz    05.05.1997  +998...  Batafsil ⋮│
│ 2   ...                                                │
└───────────────────────────────────────────────────────┘
```

### Element xususiyatlari
- **Avatar:** 40px dumaloq, ism oldida
- **"Batafsil >"** havola: o'ngda, ko'k
- **Kebab `⋮`:** kontekst menyu (Tahrirlash / O'chirish)
- **Qator hover:** fon `#F9FBFC`
- **Zebra (ixtiyoriy):** juft qatorlar yengil och fonda (profil jadvalida ko'rinadi)

### Holatlar
- Empty state: "Ma'lumot topilmadi" + ikonka
- Loading: skeleton qatorlar
- Error: qayta urinish tugmasi

---

## 7. Pagination (Sahifalash)

```
‹  1  2  3  …  39  40  41  ›
```
- Faol sahifa: ko'k ramka / fon
- `‹ ›` strelkalar: oldingi/keyingi
- `…` — yashirilgan oraliq

---

## 8. Modal (Modal oyna)

```
┌──────────────────────────────── ✕ ┐
│  Sinf yaratish                      │
│ ─────────────────────────────────  │
│  [ 9 sinf  ▾ ]   [ A guruh  ▾ ]     │
│                                     │
│  [   Saqlash   ]                    │
└─────────────────────────────────────┘
```
- Markazda, oq, `radius-lg`, `shadow-modal`
- Fon overlay: `rgba(38,48,57,.45)`
- Sarlavha + `✕`
- Pastda asosiy tugma
- Batafsil → [23-Modal-oynalar.md](23-Modal-oynalar.md)

---

## 9. Context menu (Kebab menyu)

```
┌────────────────┐
│ ✏  Tahrirlash  │ ←─ ko'k ikonka
│ ─────────────  │
│ 🗑  O'chirish   │ ←─ qizil ikonka
└────────────────┘
```
- `⋮` bosilganda paydo bo'ladi
- Oq, `shadow-md`, `radius-md`

---

## 10. Sidebar nav item (Menyu elementi)

```
[ikonka]  Dars jadvali
```
- Holatlar: default (oq matn), **active** (och fon plashka + bold), hover (yengil och fon)
- Ikonka: chiziqli (nofaol) / to'ldirilgan (faol) — [11-Ikonkalar.md](11-Ikonkalar.md)

---

## 11. Topbar elementlari

- **Collapse tugma** (☰/⇤) — sidebarni yig'adi
- **Page title** — joriy sahifa nomi
- **Language switcher** — bayroq + "O'zbekcha" + ▾
- **Notification bell** (🔔) — badge bilan
- **User chip** — avatar + ism + rol

---

## 12. Badge / Status pill

- Davomat "Sababli" ustunida: `Ha` / `Yo'q`
- Baho: raqam (3/4/5) — kelajakda rangli pill (3=qizil, 4=sariq, 5=yashil) tavsiya etiladi

---

## 13. Avatar

- Dumaloq, `radius-full`
- O'lchamlar: jadvalda `40px`, topbarda `36px`, profilda `~280px` (kvadrat-yumaloq)
- Fallback: bosh harflari + rangli fon

---

## 14. Breadcrumb (Non ushuvchi)

```
O'qituvchilar  ›  Tohir Usenov Kamoliddin o'g'li
```
- Detal sahifalarda yuqorida
- Oxirgi element — ko'k (joriy)

---

## 15. Tabs (Choraklar)

```
[1-chorak] [2-chorak] [3-chorak] [4-chorak]
```
- Faol: ko'k fon/matn
- Nofaol: och kulrang
- Dars jadvali va Davomatda ishlatiladi

---

## Komponentlar inventari (xulosa)

| Komponent | Fayl manbasi (rasm) |
|-----------|----------------------|
| Button, Input | `login.png` |
| Sidebar | `sidebar-oquvchi.png` |
| Topbar | `topbar.png` |
| Ikonkalar | `ikonkalar-1.png`…`ikonkalar-6.png` |
| Module card | `rol-admin.png` |
| Class card | `sinflar.png` |
| Table | `oqituvchilar.png` |
| Context menu | `modal.png` |
| Create modal | `modal-4.png`, `modal-5.png` |
| Detail card | `kartochka-shaxsiy.png`, `kartochka-manzil.png` |

---

⬅️ [05 — Layout](05-Layout-Grid-Spacing.md) · ➡️ [07 — Responsive](07-Responsive.md)
