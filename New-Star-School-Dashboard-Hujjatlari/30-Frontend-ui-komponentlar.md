# 30 — Frontend: UI komponentlar (JSX)

Qayta ishlatiluvchi "presentational" komponentlar. Hammasi `.jsx`, props orqali boshqariladi.

---

## 1. `Button.jsx`

```jsx
import styles from './Button.module.css';
import Spinner from './Spinner';

export default function Button({
  children, variant = 'primary', icon: Icon, loading = false,
  fullWidth = false, type = 'button', ...rest
}) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${fullWidth ? styles.full : ''}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? <Spinner size={16} /> : Icon && <Icon size={18} aria-hidden="true" />}
      <span>{children}</span>
    </button>
  );
}
```

```css
/* Button.module.css */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--s2);
       height: 44px; padding: 0 20px; border-radius: var(--r-md);
       font-size: var(--fs-base); font-weight: 600;
       transition: background var(--dur-fast) var(--ease), transform var(--dur-fast) var(--ease); }
.btn:active { transform: scale(.98); }
.btn:disabled { opacity: .5; cursor: not-allowed; }
.full { width: 100%; }

.primary   { background: var(--primary); color: #fff; }
.primary:hover:not(:disabled)   { background: var(--primary-hover); }
.dark      { background: var(--navy-500); color: #fff; }
.dark:hover:not(:disabled)      { background: var(--navy-900); }
.secondary { background: var(--bg-muted); color: var(--navy-500); }
.danger    { background: transparent; color: var(--danger); }
.danger:hover:not(:disabled)    { background: var(--red-500); color:#fff; }
.ghost     { background: transparent; color: var(--link); padding: 0 8px; height: auto; }
```

---

## 2. `Input.jsx`

```jsx
import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(function Input(
  { icon: Icon, rightSlot, error, ...rest }, ref
) {
  return (
    <div className={styles.wrap}>
      <div className={`${styles.field} ${error ? styles.err : ''}`}>
        {Icon && <Icon size={18} className={styles.icon} aria-hidden="true" />}
        <input ref={ref} className={styles.input} {...rest} />
        {rightSlot && <div className={styles.right}>{rightSlot}</div>}
      </div>
      {error && <span className={styles.msg} role="alert">{error}</span>}
    </div>
  );
});
export default Input;
```

```css
/* Input.module.css */
.wrap  { display: flex; flex-direction: column; gap: 4px; width: 100%; }
.field { display: flex; align-items: center; gap: var(--s2); height: 48px;
         padding: 0 var(--s4); background: var(--bg-muted); border: 1px solid transparent;
         border-radius: var(--r-md); transition: border var(--dur-fast) var(--ease); }
.field:focus-within { border-color: var(--primary); }
.err   { border-color: var(--danger); }
.icon  { color: var(--text-secondary); }
.input { flex: 1; border: none; background: none; outline: none; color: var(--text-primary); }
.input::placeholder { color: var(--navy-100); }
.msg   { font-size: var(--fs-sm); color: var(--danger); }
```

---

## 3. `Select.jsx`

```jsx
import { ChevronDown } from 'lucide-react';
import styles from './Select.module.css';

export default function Select({ value, onChange, options, placeholder, ...rest }) {
  return (
    <div className={styles.wrap}>
      <select className={styles.select} value={value ?? ''} onChange={onChange} {...rest}>
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown size={16} className={styles.chevron} aria-hidden="true" />
    </div>
  );
}
```

```css
/* Select.module.css */
.wrap   { position: relative; display: inline-block; min-width: 200px; }
.select { width: 100%; height: 44px; padding: 0 36px 0 var(--s4);
          background: var(--bg-muted); border: 1px solid transparent;
          border-radius: var(--r-md); appearance: none; color: var(--text-primary); }
.select:focus { border-color: var(--primary); outline: none; }
.chevron { position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
           color: var(--text-secondary); pointer-events: none; }
```

---

## 4. `SearchField.jsx`

```jsx
import { Search } from 'lucide-react';
import Input from './Input';

export default function SearchField({ placeholder = 'Izlash', ...rest }) {
  return <Input icon={Search} placeholder={placeholder} aria-label={placeholder} {...rest} />;
}
```

---

## 5. `ModuleCard.jsx` (Asosiy sahifa kartochkasi)

```jsx
import { Link } from 'react-router-dom';
import styles from './ModuleCard.module.css';

export default function ModuleCard({ to, label, icon: Icon, color }) {
  return (
    <Link to={to} className={styles.card}>
      <span className={styles.iconWrap} style={{ background: color }}>
        <Icon size={26} color="#fff" aria-hidden="true" />
      </span>
      <span className={styles.label}>{label}</span>
    </Link>
  );
}
```

```css
/* ModuleCard.module.css */
.card { display: flex; flex-direction: column; align-items: center; gap: var(--s3);
        background: var(--bg-surface); padding: var(--s6) var(--s4);
        border-radius: var(--r-lg); box-shadow: var(--sh-card);
        transition: transform var(--dur-base) var(--ease), box-shadow var(--dur-base) var(--ease);
        text-decoration: none; color: var(--text-primary); }
.card:hover { transform: translateY(-3px); box-shadow: var(--sh-md); text-decoration: none; }
.iconWrap { width: 56px; height: 56px; border-radius: var(--r-full);
            display: grid; place-items: center; }
.label { font-weight: 700; text-align: center; }
```

---

## 6. `ClassCard.jsx`

```jsx
import { Link } from 'react-router-dom';
import { Users, MoreVertical } from 'lucide-react';
import styles from './ClassCard.module.css';

export default function ClassCard({ id, name, studentCount, onMenu }) {
  return (
    <div className={styles.card}>
      <Link to={`/classes/${id}`} className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.count}><Users size={16} /> {studentCount} ta o'quvchi</p>
      </Link>
      {onMenu && (
        <button className={styles.menu} onClick={onMenu} aria-label="Amallar">
          <MoreVertical size={18} />
        </button>
      )}
    </div>
  );
}
```

```css
/* ClassCard.module.css */
.card { position: relative; background: var(--bg-surface); border-top: 3px solid var(--primary);
        border-radius: var(--r-lg); box-shadow: var(--sh-card); padding: var(--s5); }
.name { color: var(--primary); font-weight: 700; margin-bottom: 6px; }
.count{ display: flex; align-items: center; gap: 6px; color: var(--text-secondary);
        font-size: var(--fs-sm); }
.menu { position: absolute; top: 12px; right: 12px; color: var(--text-secondary); }
```

---

## 7. `Table.jsx` (umumiy, ustun konfiguratsiyasi bilan)

```jsx
import styles from './Table.module.css';

export default function Table({ columns, rows, rowKey = 'id', empty = 'Ma\'lumot topilmadi' }) {
  if (!rows?.length) return <div className={styles.empty}>{empty}</div>;
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>{columns.map((c) => <th key={c.key} style={{ textAlign: c.align }}>{c.title}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[rowKey]}>
              {columns.map((c) => (
                <td key={c.key} data-label={c.title} style={{ textAlign: c.align }}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

```css
/* Table.module.css */
.wrap  { background: var(--bg-surface); border-radius: var(--r-lg);
         box-shadow: var(--sh-card); overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; min-width: 720px; }
.table th { text-align: left; padding: var(--s4); color: var(--text-secondary);
            font-weight: 500; font-size: var(--fs-base); border-bottom: 1px solid var(--border); }
.table td { padding: var(--s4); border-bottom: 1px solid var(--grey-50); }
.table tr:hover td { background: #F9FBFC; }
.empty { padding: var(--s8); text-align: center; color: var(--text-secondary);
         background: var(--bg-surface); border-radius: var(--r-lg); }

/* Mobil — qatorlarni kartaga aylantirish */
@media (max-width: 767px) {
  .table { min-width: 0; }
  .table thead { display: none; }
  .table tr { display: block; margin: var(--s3); padding: var(--s4);
              background: var(--bg-surface); border-radius: var(--r-lg); box-shadow: var(--sh-card); }
  .table td { display: flex; justify-content: space-between; border: none; padding: 4px 0; }
  .table td::before { content: attr(data-label); color: var(--text-secondary); font-weight: 500; }
}
```

---

## 8. `Pagination.jsx`

```jsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = buildRange(page, totalPages);
  return (
    <nav className={styles.nav} aria-label="Sahifalar">
      <button onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="Oldingi">
        <ChevronLeft size={16} />
      </button>
      {pages.map((p, i) =>
        p === '…'
          ? <span key={`g${i}`} className={styles.gap}>…</span>
          : <button key={p} onClick={() => onChange(p)}
              className={p === page ? styles.active : ''}
              aria-current={p === page ? 'page' : undefined}>{p}</button>
      )}
      <button onClick={() => onChange(page + 1)} disabled={page === totalPages} aria-label="Keyingi">
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

function buildRange(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (cur <= 3) return [1, 2, 3, '…', total - 1, total];
  if (cur >= total - 2) return [1, 2, '…', total - 2, total - 1, total];
  return [1, '…', cur, '…', total];
}
```

```css
/* Pagination.module.css */
.nav { display: flex; gap: 6px; justify-content: center; margin-top: var(--s6); }
.nav button { width: 38px; height: 38px; border-radius: var(--r-md);
              background: var(--bg-surface); color: var(--navy-500); box-shadow: var(--sh-card); }
.nav button:disabled { opacity: .4; }
.active { border: 1px solid var(--primary); color: var(--primary); }
.gap { display: grid; place-items: center; width: 38px; color: var(--text-secondary); }
```

---

## 9. `Modal.jsx`

```jsx
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

export default function Modal({ open, title, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    ref.current?.querySelector('input,select,button')?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div ref={ref} className={styles.modal} role="dialog" aria-modal="true"
           aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className={styles.head}>
          <h3>{title}</h3>
          <button onClick={onClose} aria-label="Yopish"><X size={20} /></button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
}
```

```css
/* Modal.module.css */
.overlay { position: fixed; inset: 0; background: rgba(38,48,57,.45);
           display: grid; place-items: center; z-index: var(--z-modal);
           animation: fade var(--dur-base) var(--ease); padding: var(--s4); }
.modal { width: 480px; max-width: 100%; background: var(--bg-surface);
         border-radius: var(--r-lg); box-shadow: var(--sh-modal);
         animation: pop var(--dur-base) var(--ease); }
.head  { display: flex; align-items: center; justify-content: space-between;
         padding: var(--s5); border-bottom: 1px solid var(--border); }
.head h3 { font-size: var(--fs-md); font-weight: 700; }
.body  { padding: var(--s5); display: flex; flex-direction: column; gap: var(--s4); }
@keyframes fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes pop  { from { opacity: 0; transform: translateY(8px) scale(.97) }
                  to   { opacity: 1; transform: none } }
```

---

## 10. `ContextMenu.jsx`, `Avatar.jsx`, `Spinner.jsx`, `Badge.jsx`

```jsx
// ContextMenu.jsx
import { Pencil, Trash2 } from 'lucide-react';
import styles from './ContextMenu.module.css';

export default function ContextMenu({ onEdit, onDelete }) {
  return (
    <div className={styles.menu} role="menu">
      <button role="menuitem" onClick={onEdit} className={styles.edit}>
        <Pencil size={16} /> Tahrirlash
      </button>
      <div className={styles.divider} />
      <button role="menuitem" onClick={onDelete} className={styles.delete}>
        <Trash2 size={16} /> O'chirish
      </button>
    </div>
  );
}
```

```jsx
// Avatar.jsx
export default function Avatar({ src, name = '', size = 40 }) {
  const initials = name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  const style = { width: size, height: size, borderRadius: '50%' };
  return src
    ? <img src={src} alt={name || 'Foydalanuvchi'} style={{ ...style, objectFit: 'cover' }} />
    : <span style={{ ...style, background: 'var(--blue-100)', color: 'var(--blue-700)',
        display: 'grid', placeItems: 'center', fontWeight: 600, fontSize: size * 0.4 }}>{initials}</span>;
}
```

```jsx
// Spinner.jsx
export default function Spinner({ size = 20 }) {
  return <span style={{
    width: size, height: size, display: 'inline-block',
    border: '2px solid rgba(255,255,255,.4)', borderTopColor: '#fff',
    borderRadius: '50%', animation: 'spin .7s linear infinite'
  }} />;
}
/* global.css ga: @keyframes spin { to { transform: rotate(360deg) } } */
```

```jsx
// Badge.jsx — Davomat "Ha/Yo'q", baho pill
import styles from './Badge.module.css';
export default function Badge({ tone = 'neutral', children }) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}
/* tone: success | danger | warning | info | neutral */
```

---

⬅️ [29 — Layout komponentlar](29-Frontend-layout-komponentlar.md) · ➡️ [31 — Sahifa komponentlar](31-Frontend-sahifa-komponentlar.md)
