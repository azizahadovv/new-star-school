# 28 — Frontend: Tokenlar va Global CSS

Dizayn tokenlari CSS o'zgaruvchilari ko'rinishida — bitta manba, butun ilovada ishlatiladi.

---

## 1. `assets/styles/tokens.css`

To'liq token to'plami [03-Design-Tokens.md](03-Design-Tokens.md) da. Qisqacha:

```css
:root {
  /* Ranglar */
  --navy-900:#263039; --navy-500:#34414F; --navy-300:#475667; --navy-100:#81909F;
  --green-500:#41C981;
  --blue-700:#0E4C8F; --blue-500:#125DAC; --blue-100:#C3D6EA;
  --grey-0:#FFFFFF; --grey-50:#F4F7F9; --grey-100:#ECF1F4; --grey-200:#E1E7EC;
  --grey-400:#9AA7B2; --grey-600:#5B6B79;
  --red-500:#C70909;
  --accent-teal:#088395; --accent-coral:#E88D67; --accent-blue:#2A629A;
  --accent-sea:#58A399; --accent-purple:#81689D; --accent-gold:#BCA37F;

  /* Semantic */
  --bg-app:var(--grey-50); --bg-surface:var(--grey-0); --bg-muted:var(--grey-100);
  --bg-sidebar:var(--navy-500);
  --text-primary:var(--navy-900); --text-secondary:var(--grey-400);
  --text-on-dark:var(--grey-0); --link:var(--blue-500);
  --border:var(--grey-200); --primary:var(--blue-500); --primary-hover:var(--blue-700);
  --danger:var(--red-500); --focus:var(--blue-100);

  /* Spacing */
  --s1:4px; --s2:8px; --s3:12px; --s4:16px; --s5:20px; --s6:24px; --s8:32px;

  /* Radius / Shadow */
  --r-sm:6px; --r-md:10px; --r-lg:12px; --r-full:9999px;
  --sh-card:0 2px 8px rgba(38,48,57,.06);
  --sh-md:0 4px 12px rgba(38,48,57,.08);
  --sh-modal:0 16px 48px rgba(38,48,57,.18);

  /* Type */
  --font:'Inter','Poppins',system-ui,sans-serif;
  --fs-xs:12px; --fs-sm:13px; --fs-base:14px; --fs-md:16px; --fs-lg:20px; --fs-xl:24px;

  /* Motion */
  --dur-fast:150ms; --dur-base:220ms; --ease:cubic-bezier(.4,0,.2,1);

  /* z-index */
  --z-sticky:100; --z-dropdown:200; --z-overlay:900; --z-modal:1000;
}
```

---

## 2. `assets/styles/global.css`

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html, body, #root { height: 100%; }

body {
  font-family: var(--font);
  font-size: var(--fs-base);
  line-height: 1.5;
  color: var(--text-primary);
  background: var(--bg-app);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

a { color: var(--link); text-decoration: none; }
a:hover { text-decoration: underline; }

button { font-family: inherit; cursor: pointer; border: none; background: none; }

input, select { font-family: inherit; font-size: inherit; }

ul { list-style: none; }

img { max-width: 100%; display: block; }

/* Fokus — barcha interaktiv elementlar uchun */
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--focus);
  border-radius: var(--r-sm);
}

/* Raqamlarni tekislash */
.tabular { font-variant-numeric: tabular-nums; }

/* Skeleton */
@keyframes shimmer { 0%{background-position:-200px 0} 100%{background-position:200px 0} }
.skeleton {
  background: linear-gradient(90deg,#ECF1F4 25%,#F4F7F9 37%,#ECF1F4 63%);
  background-size: 400px 100%;
  animation: shimmer 1.4s infinite linear;
  border-radius: var(--r-md);
}

/* prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration:.01ms!important; transition-duration:.01ms!important; }
}
```

---

## 3. Yordamchi util'lar

### `utils/formatPhone.js`
```jsx
export function formatPhone(raw) {
  // 998909101215 -> +998 90 910 12 15
  const d = String(raw).replace(/\D/g, '');
  if (d.length !== 12) return raw;
  return `+${d.slice(0,3)} ${d.slice(3,5)} ${d.slice(5,8)} ${d.slice(8,10)} ${d.slice(10,12)}`;
}
```

### `utils/formatDate.js`
```jsx
export function formatDate(iso) {
  if (!iso) return '';
  const dt = new Date(iso);
  const p = (n) => String(n).padStart(2, '0');
  return `${p(dt.getDate())}.${p(dt.getMonth()+1)}.${dt.getFullYear()}`;
}
```

### `utils/constants.js`
```jsx
export const ROLES = {
  ADMIN: 'ROLE_ADMIN',
  DIRECTOR: 'ROLE_DIRECTOR',
  ZAVUCH: 'ROLE_ZAVUCH',
  TEACHER: 'ROLE_TEACHER',
  STUDENT: 'ROLE_STUDENT',
};

export const ACCENT = {
  schedule: 'var(--accent-teal)',
  classes:  'var(--accent-coral)',
  teachers: 'var(--accent-blue)',
  students: 'var(--accent-sea)',
  subjects: 'var(--accent-purple)',
  profile:  'var(--accent-gold)',
};
```

---

⬅️ [27 — Arxitektura](27-Frontend-arxitektura.md) · ➡️ [29 — Layout komponentlar](29-Frontend-layout-komponentlar.md)
