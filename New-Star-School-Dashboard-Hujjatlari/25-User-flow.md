# 25 — User Flow diagramlari

Quyida tizimning asosiy foydalanuvchi oqimlari **Mermaid** diagrammalarida berilgan. (GitHub, Obsidian, VS Code va boshqa ko'plab muharrirlar Mermaid'ni avtomatik render qiladi.)

---

## 1. Umumiy autentifikatsiya oqimi

```mermaid
flowchart TD
    A([Boshlash]) --> B[Login sahifasi]
    B --> C{Login va parol\nto'g'rimi?}
    C -- Yo'q --> D[Xato xabari] --> B
    C -- Ha --> E[JWT token olinadi]
    E --> F{Rol qanday?}
    F -- Admin --> G[Admin: Asosiy sahifa]
    F -- Direktor --> H[Direktor: Asosiy sahifa]
    F -- Zavuch --> I[Zavuch: Asosiy sahifa]
    F -- O'qituvchi --> J[O'qituvchi: Asosiy sahifa]
    F -- O'quvchi --> K[O'quvchi: Asosiy sahifa]
```

---

## 2. Umumiy navigatsiya oqimi

```mermaid
flowchart LR
    AS[Asosiy sahifa] --> M{Modul tanlash}
    M --> L[Ro'yxat / Jadval]
    L --> D[Batafsil / Detal]
    L --> CR[Yaratish modali]
    L --> ED[Tahrirlash modali]
    L --> DEL[O'chirish tasdig'i]
    D --> L
    CR --> L
    ED --> L
    AS --> P[Shaxsiy ma'lumotlar]
    P --> OUT([Tizimdan chiqish]) --> LOGIN[Login]
```

---

## 3. O'quvchi oqimi (Student journey)

```mermaid
flowchart TD
    S([O'quvchi kiradi]) --> SA[Asosiy sahifa]
    SA --> SD[Dars jadvali]
    SA --> SB[Baxolar reytingi]
    SA --> SV[Davomat]
    SA --> SP[Shaxsiy ma'lumotlar]
    SD --> SD1[Chorak tanlash]
    SD --> SD2[Hafta almashtirish]
    SB --> SB1[Fan bo'yicha filtr]
    SV --> SV1[Fan / Ustoz filtri]
    SP --> SP1[Profil tahrirlash]
    SP --> SP2([Chiqish])
```

---

## 4. Admin: O'quvchi qo'shish oqimi

```mermaid
flowchart TD
    A([Admin]) --> B[O'quvchilar moduli]
    B --> C[/"+ O'quvchi qo'shish" bosadi/]
    C --> D[Forma / Modal ochiladi]
    D --> E[Ma'lumot kiritadi:\nF.I.Sh, sinf, guruh,\ntelefon, ota-ona...]
    E --> F{Validatsiya\nto'g'rimi?}
    F -- Yo'q --> G[Xato ko'rsatiladi] --> E
    F -- Ha --> H[Saqlash bosadi]
    H --> I[(Backend: POST /api/students)]
    I --> J[Ma'lumotlar bazasiga yoziladi]
    J --> K[Muvaffaqiyat xabari]
    K --> L[Ro'yxat yangilanadi]
```

---

## 5. Admin: Sinf yaratish va fan biriktirish

```mermaid
flowchart TD
    A([Admin/Zavuch]) --> B[Sinflar ro'yhati]
    B --> C[/"+ Sinf yaratish"/]
    C --> D[Modal: sinf raqami + guruh]
    D --> E[Saqlash]
    E --> F[Sinf yaratildi]
    F --> G[Sinfga kirish]
    G --> H[/"Yaratish": fan + o'qituvchi/]
    H --> I[Fan va o'qituvchi tanlash]
    I --> J[Saqlash]
    J --> K[Sinf-fan-o'qituvchi bog'landi]
    K --> L[Dars jadvaliga qo'shish mumkin]
```

---

## 6. O'qituvchi oqimi

```mermaid
flowchart TD
    T([O'qituvchi]) --> TA[Asosiy sahifa]
    TA --> TS[Sinflar]
    TA --> TP[Shaxsiy ma'lumotlar]
    TS --> TS1[Sinf tanlash]
    TS1 --> TS2[O'quvchilar ro'yxati]
    TS2 -.kelajak.-> TS3[Baho qo'yish]
    TS2 -.kelajak.-> TS4[Davomat belgilash]
```

---

## 7. Ma'lumot o'chirish oqimi (xavfsiz)

```mermaid
flowchart LR
    A[Qatordagi ⋮] --> B[Kontekst menyu]
    B --> C[/"O'chirish"/]
    C --> D{Tasdiq modali:\n"Rostdan o'chirilsinmi?"}
    D -- Yo'q --> E[Bekor qilindi]
    D -- Ha --> F[(DELETE /api/.../id)]
    F --> G[Yozuv o'chirildi]
    G --> H[Ro'yxat yangilanadi + toast]
```

---

## 8. Sahifa holatlari (state machine — ro'yxat sahifasi)

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> Loaded: ma'lumot keldi
    Loading --> Error: xato
    Loaded --> Empty: ro'yxat bo'sh
    Error --> Loading: qayta urinish
    Loaded --> Filtering: qidiruv/filtr
    Filtering --> Loaded: natija
    Filtering --> Empty: natija yo'q
```

---

## 9. Tizimning yuqori darajadagi oqimi (sitemap)

```mermaid
flowchart TD
    LOGIN[Login] --> DASH[Asosiy sahifa]
    DASH --> DJ[Dars jadvali]
    DASH --> SIN[Sinflar]
    DASH --> OQT[O'qituvchilar]
    DASH --> OQV[O'quvchilar]
    DASH --> FAN[Fanlar]
    DASH --> XOD[Xodimlar]
    DASH --> REY[Reyting]
    DASH --> DAV[Davomat]
    DASH --> BAH[Baxolar reytingi]
    DASH --> PROF[Shaxsiy ma'lumotlar]
    OQT --> OQTD[O'qituvchi profili]
    OQV --> OQVD[O'quvchi profili]
    XOD --> XODD[Xodim profili]
    PROF --> LOGIN
```

---

⬅️ [24 — Foydalanuvchi rollari](24-Foydalanuvchi-rollari.md) · ➡️ [26 — Admin workflow](26-Admin-workflow.md)
