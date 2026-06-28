# 13 — Sahifa tahlili: Asosiy sahifa (Dashboard)

![Asosiy sahifa — Admin](rasmlar/rol-admin.png)

## Maqsad
Tizimga kirgandan keyingi boshlang'ich ekran. Foydalanuvchiga roliga mos modullarga tezkor kirish kartochkalarini ko'rsatadi.

## Kim ko'radi
Barcha rollar — lekin kartochkalar to'plami rolga qarab farq qiladi.

---

## Layout tahlili

```
┌──────────┬──────────────────────────────────────────────┐
│ SIDEBAR  │ Asosiy sahifa            [Til][🔔][👤 Admin]  │
│          ├──────────────────────────────────────────────┤
│ • Asosiy │ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐    │
│   Dars   │ │ ●  │ │ ●  │ │ ●  │ │ ●  │ │ ●  │ │ ●  │    │
│   Sinflar│ │Dars│ │Sinf│ │O'qit│ │O'quv│ │Fan│ │Shax│   │
│   ...    │ └────┘ └────┘ └────┘ └────┘ └────┘ └────┘    │
└──────────┴──────────────────────────────────────────────┘
```

- **Sarlavha:** "Asosiy sahifa"
- **Kontent:** modul kartochkalari gorizontal grid (auto-fill)
- Har kartochka: yuqorida rangli dumaloq ikonka + ostida modul nomi

---

## Komponentlar

| Komponent | Tafsilot |
|-----------|----------|
| Module card | rangli ikonka (56px) + nom, oq fon, `radius-lg`, `shadow-card` |
| Topbar | sahifa nomi, til, bildirishnoma, user chip |
| Sidebar | rolga mos menyu |

### Kartochka ranglari
| Kartochka | Aksent rang |
|-----------|-------------|
| Dars jadvali | teal `#088395` |
| Sinflar ro'yhati | marjon `#E88D67` |
| O'qituvchilar | ko'k `#2A629A` |
| O'quvchilar | dengiz-yashil `#58A399` |
| Fanlar | siyohrang `#81689D` |
| Shaxsiy ma'lumotlar | tilla `#BCA37F` |

---

## Rolga qarab kartochkalar

| Rol | Kartochkalar |
|-----|--------------|
| **Admin** | Dars jadvali · Sinflar ro'yhati · O'qituvchilar · O'quvchilar · Fanlar · Shaxsiy ma'lumotlar (6) |
| **Direktor** | Reyting · O'qituvchilar · O'quvchilar · Xodimlar · Shaxsiy ma'lumotlar (5) |
| **Zavuch** | Dars jadvali · Sinflar ro'yhati · O'qituvchilar · O'quvchilar · Shaxsiy ma'lumotlar (5) |
| **O'qituvchi** | Sinflar · Shaxsiy ma'lumotlar (2) |
| **O'quvchi** | Dars jadvali · Baxolar reytingi · Davomat · Shaxsiy ma'lumotlar (4) |

![Asosiy sahifa — O'quvchi (4 kartochka)](rasmlar/rol-oquvchi.png)

---

## Interaksiyalar

1. **Kartochka bosish** — tegishli modulga o'tadi
2. **Kartochka hover** — yengil ko'tarilish (`translateY(-3px)`) + soya
3. **Sidebar menyu** — kartochkalar bilan bir xil yo'nalish (dublikat kirish)

---

## UX qaydlar

- ✅ Tezkor kirish — eng muhim modullar bir ekranda
- ✅ Rang-kodlash — har modul vizual ajraladi, eslab qolish oson
- ✅ Rolga moslik — foydalanuvchi faqat keragini ko'radi (ortiqcha yuk yo'q)
- ⚠️ **Tavsiya:** kartochkalarga qisqa statistika qo'shish (masalan, "1,240 o'quvchi", "42 o'qituvchi") — dashboard'ni informativroq qiladi
- ⚠️ **Tavsiya:** so'nggi faollik yoki bildirishnomalar widgeti

---

## Accessibility qaydlar

- Kartochkalar `<a>` yoki `role="link"` + klaviatura bilan kirish mumkin
- Ikonkalar dekorativ → `aria-hidden`; nom matn sifatida o'qiladi
- Fokus halqasi aniq ko'rinadi
- Grid tartibi mantiqiy (chapdan o'ngga, yuqoridan pastga)

---

⬅️ [12 — Login](12-Sahifa-Login.md) · ➡️ [14 — Dars jadvali](14-Sahifa-Dars-jadvali.md)
