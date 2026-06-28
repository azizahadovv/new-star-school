# 03 — Design Tokens (Dizayn tokenlari)

Design token — bu dizayn qarorlarini (rang, oraliq, shrift, soya va h.k.) kod va dizayn o'rtasida bir manbada saqlash usuli. Quyida New Star School tizimi uchun to'liq token to'plami: avval **primitive** (xom) tokenlar, so'ng **semantic** (ma'noviy) tokenlar.

---

## 1. Token darajalari

```
Primitive tokens   →   Semantic tokens   →   Component tokens
(color.navy.500)       (color.bg.surface)     (button.primary.bg)
```

- **Primitive** — sof qiymatlar (`#34414F`, `16px`).
- **Semantic** — vazifaga bog'langan (`--color-text-primary`).
- **Component** — aniq komponentga tegishli (`--btn-primary-bg`).

---

## 2. Rang tokenlari (primitive)

### Navy (asosiy)
| Token | HEX | Izoh |
|-------|-----|------|
| `color.navy.900` | `#263039` | Eng to'q — asosiy matn |
| `color.navy.700` | `#2C3A48` | Sidebar gradient pastki |
| `color.navy.500` | `#34414F` | **Asosiy navy** — sidebar, tugma |
| `color.navy.300` | `#475667` | Faol tab matni, ikkilamchi |
| `color.navy.100` | `#81909F` | Nofaol matn, placeholder |

### Brend yashil
| Token | HEX |
|-------|-----|
| `color.green.500` | `#41C981` |
| `color.green.600` | `#34B870` |
| `color.green.100` | `#E7F8EF` |

### Primary ko'k
| Token | HEX |
|-------|-----|
| `color.blue.700` | `#0E4C8F` |
| `color.blue.500` | `#125DAC` (**asosiy harakat**) |
| `color.blue.300` | `#3D7CC0` |
| `color.blue.100` | `#C3D6EA` (faol tab foni) |
| `color.blue.50`  | `#ECF2F8` |

### Neytral (grey)
| Token | HEX |
|-------|-----|
| `color.grey.0`   | `#FFFFFF` |
| `color.grey.50`  | `#F4F7F9` (sahifa foni) |
| `color.grey.100` | `#ECF1F4` (input fon) |
| `color.grey.200` | `#E1E7EC` (chegara) |
| `color.grey.400` | `#9AA7B2` (yordamchi matn) |
| `color.grey.600` | `#5B6B79` |

### Status
| Token | HEX |
|-------|-----|
| `color.red.500` | `#C70909` (xatolik / chiqish) |
| `color.red.50`  | `#FBE9E9` |
| `color.amber.500` | `#E8A23C` (ogohlantirish) |
| `color.success.500` | `#41C981` |

### Modul aksent ranglari
| Token | HEX | Modul |
|-------|-----|-------|
| `color.accent.teal`   | `#088395` | Dars jadvali |
| `color.accent.coral`  | `#E88D67` | Sinflar / Baholar |
| `color.accent.blue`   | `#2A629A` | O'qituvchilar / Davomat |
| `color.accent.sea`    | `#58A399` | O'quvchilar |
| `color.accent.purple` | `#81689D` | Fanlar |
| `color.accent.gold`   | `#BCA37F` | Shaxsiy ma'lumotlar |

---

## 3. Semantic tokenlar

| Token | Qiymat (primitive) | Qo'llanilishi |
|-------|--------------------|---------------|
| `--color-bg-app` | `grey.50` | Sahifa foni |
| `--color-bg-surface` | `grey.0` | Kartochka, jadval |
| `--color-bg-muted` | `grey.100` | Input, ikkilamchi tugma |
| `--color-bg-sidebar` | `navy.500` | Yon panel |
| `--color-text-primary` | `navy.900` | Asosiy matn |
| `--color-text-secondary` | `grey.400` | Yordamchi matn |
| `--color-text-on-dark` | `grey.0` | Sidebar matni |
| `--color-text-link` | `blue.500` | Havolalar |
| `--color-border` | `grey.200` | Chegaralar |
| `--color-primary` | `blue.500` | Asosiy harakat |
| `--color-primary-hover` | `blue.700` | Hover holati |
| `--color-danger` | `red.500` | Xavfli amal |
| `--color-focus-ring` | `blue.300` | Fokus halqasi |

---

## 4. Oraliq (spacing) tokenlari

4px bazaviy birlik (4-point grid):

| Token | px | rem |
|-------|----|----|
| `space.0` | 0 | 0 |
| `space.1` | 4 | 0.25 |
| `space.2` | 8 | 0.5 |
| `space.3` | 12 | 0.75 |
| `space.4` | 16 | 1 |
| `space.5` | 20 | 1.25 |
| `space.6` | 24 | 1.5 |
| `space.8` | 32 | 2 |
| `space.10` | 40 | 2.5 |
| `space.12` | 48 | 3 |
| `space.16` | 64 | 4 |

---

## 5. Burchak radiusi (radius)

| Token | px | Qo'llanilishi |
|-------|----|----|
| `radius.sm` | 6 | Tugma ichidagi ikonka |
| `radius.md` | 10 | Input, tugma |
| `radius.lg` | 12 | Kartochka, modal |
| `radius.xl` | 16 | Katta kartochka |
| `radius.full` | 9999 | Avatar, dumaloq ikonka |

---

## 6. Soya (shadow) tokenlari

| Token | Qiymat |
|-------|--------|
| `shadow.sm` | `0 1px 2px rgba(38,48,57,0.06)` |
| `shadow.md` | `0 4px 12px rgba(38,48,57,0.08)` |
| `shadow.lg` | `0 8px 24px rgba(38,48,57,0.10)` |
| `shadow.card` | `0 2px 8px rgba(38,48,57,0.06)` |
| `shadow.modal` | `0 16px 48px rgba(38,48,57,0.18)` |

---

## 7. Tipografika tokenlari

| Token | Qiymat |
|-------|--------|
| `font.family.base` | `'Inter', 'Poppins', system-ui, sans-serif` |
| `font.size.xs` | `12px` |
| `font.size.sm` | `13px` |
| `font.size.base` | `14px` |
| `font.size.md` | `16px` |
| `font.size.lg` | `20px` |
| `font.size.xl` | `24px` |
| `font.weight.regular` | `400` |
| `font.weight.medium` | `500` |
| `font.weight.semibold` | `600` |
| `font.weight.bold` | `700` |
| `line.height.tight` | `1.25` |
| `line.height.base` | `1.5` |

Batafsil → [04-Typography.md](04-Typography.md)

---

## 8. Animatsiya tokenlari

| Token | Qiymat |
|-------|--------|
| `motion.duration.fast` | `150ms` |
| `motion.duration.base` | `220ms` |
| `motion.duration.slow` | `350ms` |
| `motion.easing.standard` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `motion.easing.in` | `cubic-bezier(0.4, 0, 1, 1)` |
| `motion.easing.out` | `cubic-bezier(0, 0, 0.2, 1)` |

Batafsil → [08-Animatsiyalar.md](08-Animatsiyalar.md)

---

## 9. Z-index tokenlari

| Token | Qiymat | Qatlam |
|-------|--------|--------|
| `z.base` | 0 | Asosiy kontent |
| `z.sticky` | 100 | Topbar |
| `z.dropdown` | 200 | Dropdown menyu |
| `z.overlay` | 900 | Modal foni |
| `z.modal` | 1000 | Modal oyna |
| `z.toast` | 1100 | Bildirishnoma |

---

## 10. CSS o'zgaruvchilari (to'liq) — `tokens.css`

```css
:root {
  /* === Ranglar — primitive === */
  --navy-900:#263039; --navy-700:#2C3A48; --navy-500:#34414F;
  --navy-300:#475667; --navy-100:#81909F;
  --green-500:#41C981; --green-600:#34B870; --green-100:#E7F8EF;
  --blue-700:#0E4C8F; --blue-500:#125DAC; --blue-300:#3D7CC0;
  --blue-100:#C3D6EA; --blue-50:#ECF2F8;
  --grey-0:#FFFFFF; --grey-50:#F4F7F9; --grey-100:#ECF1F4;
  --grey-200:#E1E7EC; --grey-400:#9AA7B2; --grey-600:#5B6B79;
  --red-500:#C70909; --red-50:#FBE9E9; --amber-500:#E8A23C;

  --accent-teal:#088395; --accent-coral:#E88D67; --accent-blue:#2A629A;
  --accent-sea:#58A399; --accent-purple:#81689D; --accent-gold:#BCA37F;

  /* === Semantic === */
  --color-bg-app:var(--grey-50);
  --color-bg-surface:var(--grey-0);
  --color-bg-muted:var(--grey-100);
  --color-bg-sidebar:var(--navy-500);
  --color-text-primary:var(--navy-900);
  --color-text-secondary:var(--grey-400);
  --color-text-on-dark:var(--grey-0);
  --color-text-link:var(--blue-500);
  --color-border:var(--grey-200);
  --color-primary:var(--blue-500);
  --color-primary-hover:var(--blue-700);
  --color-danger:var(--red-500);
  --color-focus-ring:var(--blue-300);

  /* === Spacing === */
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-5:20px; --space-6:24px; --space-8:32px; --space-10:40px;
  --space-12:48px; --space-16:64px;

  /* === Radius === */
  --radius-sm:6px; --radius-md:10px; --radius-lg:12px;
  --radius-xl:16px; --radius-full:9999px;

  /* === Shadow === */
  --shadow-sm:0 1px 2px rgba(38,48,57,.06);
  --shadow-card:0 2px 8px rgba(38,48,57,.06);
  --shadow-md:0 4px 12px rgba(38,48,57,.08);
  --shadow-lg:0 8px 24px rgba(38,48,57,.10);
  --shadow-modal:0 16px 48px rgba(38,48,57,.18);

  /* === Typography === */
  --font-base:'Inter','Poppins',system-ui,sans-serif;
  --fs-xs:12px; --fs-sm:13px; --fs-base:14px;
  --fs-md:16px; --fs-lg:20px; --fs-xl:24px;
  --fw-regular:400; --fw-medium:500; --fw-semibold:600; --fw-bold:700;
  --lh-tight:1.25; --lh-base:1.5;

  /* === Motion === */
  --dur-fast:150ms; --dur-base:220ms; --dur-slow:350ms;
  --ease-standard:cubic-bezier(.4,0,.2,1);
  --ease-out:cubic-bezier(0,0,.2,1);

  /* === Z-index === */
  --z-sticky:100; --z-dropdown:200; --z-overlay:900;
  --z-modal:1000; --z-toast:1100;
}
```

---

## 11. JSON token (dizayn vositalari uchun) — `tokens.json`

```json
{
  "color": {
    "primary":   { "value": "#125DAC" },
    "navy":      { "value": "#34414F" },
    "green":     { "value": "#41C981" },
    "danger":    { "value": "#C70909" },
    "bg": {
      "app":     { "value": "#F4F7F9" },
      "surface": { "value": "#FFFFFF" },
      "muted":   { "value": "#ECF1F4" }
    },
    "accent": {
      "teal":   { "value": "#088395" },
      "coral":  { "value": "#E88D67" },
      "blue":   { "value": "#2A629A" },
      "sea":    { "value": "#58A399" },
      "purple": { "value": "#81689D" },
      "gold":   { "value": "#BCA37F" }
    }
  },
  "space": { "1": "4px", "2": "8px", "4": "16px", "6": "24px" },
  "radius": { "md": "10px", "lg": "12px", "full": "9999px" },
  "font": {
    "family": "Inter, Poppins, sans-serif",
    "size": { "base": "14px", "md": "16px", "xl": "24px" }
  }
}
```

---

⬅️ [02 — Dizayn tizimi](02-Dizayn-tizimi.md) · ➡️ [04 — Typography](04-Typography.md)
