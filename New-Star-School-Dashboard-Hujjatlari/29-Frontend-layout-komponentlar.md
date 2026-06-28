# 29 — Frontend: Layout komponentlar

Umumiy karkas komponentlari: `AppShell`, `Sidebar`, `Topbar`, `PageHeader`.

---

## 1. Navigatsiya konfiguratsiyasi — `config/navigation.js`

Rolga mos menyu shu yerda markazlashtirilgan:

```jsx
import {
  Home, Calendar, School, Users, GraduationCap,
  Microscope, IdCard, ClipboardList, Star, User
} from 'lucide-react';
import { ROLES } from '../utils/constants';

const ITEMS = {
  dashboard: { to: '/',           label: 'Asosiy sahifa',      icon: Home },
  schedule:  { to: '/schedule',   label: 'Dars jadvali',       icon: Calendar },
  classes:   { to: '/classes',    label: "Sinflar ro'yhati",   icon: School },
  teachers:  { to: '/teachers',   label: "O'qituvchilar",      icon: Users },
  students:  { to: '/students',   label: "O'quvchilar",        icon: GraduationCap },
  subjects:  { to: '/subjects',   label: 'Fanlar',             icon: Microscope },
  staff:     { to: '/staff',      label: 'Xodimlar',           icon: IdCard },
  rating:    { to: '/rating',     label: 'Reyting',            icon: Star },
  attendance:{ to: '/attendance', label: 'Davomat',            icon: ClipboardList },
  grades:    { to: '/grades',     label: 'Baxolar reytingi',   icon: Star },
  profile:   { to: '/profile',    label: "Shaxsiy ma'lumotlar",icon: User },
};

export const NAV_BY_ROLE = {
  [ROLES.ADMIN]:    ['dashboard','schedule','classes','teachers','students','subjects','profile'],
  [ROLES.DIRECTOR]: ['dashboard','rating','teachers','students','staff','profile'],
  [ROLES.ZAVUCH]:   ['dashboard','schedule','classes','teachers','students','profile'],
  [ROLES.TEACHER]:  ['dashboard','classes','profile'],
  [ROLES.STUDENT]:  ['dashboard','schedule','grades','attendance','profile'],
};

export const getNavForRole = (role) =>
  (NAV_BY_ROLE[role] || []).map((key) => ({ key, ...ITEMS[key] }));
```

---

## 2. `AppShell.jsx`

```jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styles from './AppShell.module.css';

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.shell} data-collapsed={collapsed}>
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className={styles.main}>
        <Topbar
          onToggleSidebar={() => setCollapsed((c) => !c)}
          onOpenMobile={() => setMobileOpen(true)}
        />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

```css
/* AppShell.module.css */
.shell   { display: grid; grid-template-columns: 300px 1fr; min-height: 100vh; }
.shell[data-collapsed="true"] { grid-template-columns: 72px 1fr; }
.main    { display: grid; grid-template-rows: 80px 1fr; min-width: 0; }
.content { background: var(--bg-app); padding: var(--s6); overflow-y: auto; }

@media (max-width: 1023px) {
  .shell, .shell[data-collapsed="true"] { grid-template-columns: 1fr; }
}
```

---

## 3. `Sidebar.jsx`

```jsx
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getNavForRole } from '../../config/navigation';
import logo from '../../assets/logo.svg';
import styles from './Sidebar.module.css';

export default function Sidebar({ collapsed, mobileOpen, onCloseMobile }) {
  const { user } = useAuth();
  const items = getNavForRole(user?.role);

  return (
    <>
      {mobileOpen && <div className={styles.overlay} onClick={onCloseMobile} />}
      <aside className={styles.sidebar} data-open={mobileOpen} aria-label="Asosiy navigatsiya">
        <div className={styles.brand}>
          <img src={logo} alt="New Star School" />
          {!collapsed && <span>NEW STAR<small>school</small></span>}
        </div>
        <nav className={styles.nav}>
          {items.map(({ key, to, label, icon: Icon }) => (
            <NavLink
              key={key}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.item} ${isActive ? styles.active : ''}`}
              onClick={onCloseMobile}
            >
              <Icon size={22} aria-hidden="true" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
```

```css
/* Sidebar.module.css */
.sidebar { background: var(--bg-sidebar); color: var(--text-on-dark);
           padding: var(--s6) var(--s4); display: flex; flex-direction: column; gap: var(--s4); }
.brand   { display: flex; align-items: center; gap: var(--s3); padding-bottom: var(--s4);
           border-bottom: 1px solid rgba(255,255,255,.12); font-weight: 700; }
.brand small { display: block; font-size: 10px; font-weight: 400; opacity: .8; }
.nav     { display: flex; flex-direction: column; gap: 4px; }
.item    { display: flex; align-items: center; gap: var(--s3);
           padding: 12px var(--s3); border-radius: var(--r-md);
           color: rgba(255,255,255,.85); font-weight: 500;
           transition: background var(--dur-fast) var(--ease); }
.item:hover  { background: rgba(255,255,255,.08); text-decoration: none; }
.active      { background: rgba(255,255,255,.14); color: #fff; font-weight: 700; }
.overlay { position: fixed; inset: 0; background: rgba(38,48,57,.45); z-index: var(--z-overlay); }

@media (max-width: 1023px) {
  .sidebar { position: fixed; left: 0; top: 0; height: 100vh; width: 280px;
             transform: translateX(-100%); transition: transform var(--dur-base) var(--ease);
             z-index: calc(var(--z-overlay) + 1); }
  .sidebar[data-open="true"] { transform: translateX(0); }
}
```

---

## 4. `Topbar.jsx`

```jsx
import { useLocation } from 'react-router-dom';
import { Menu, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import styles from './Topbar.module.css';

const TITLES = {
  '/': 'Asosiy sahifa', '/schedule': 'Dars jadvali', '/classes': "Sinflar ro'yhati",
  '/teachers': "O'qituvchilar", '/students': "O'quvchilar", '/subjects': 'Fanlar',
  '/staff': 'Xodimlar', '/attendance': 'Davomat', '/grades': 'Baxolar reytingi',
  '/profile': "Shaxsiy ma'lumotlar", '/rating': 'Reyting',
};

export default function Topbar({ onToggleSidebar, onOpenMobile }) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const title = TITLES[pathname] || '';

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button className={styles.toggle} onClick={onToggleSidebar} aria-label="Menyuni yig'ish">
          <Menu size={20} />
        </button>
        <button className={styles.mobileToggle} onClick={onOpenMobile} aria-label="Menyuni ochish">
          <Menu size={20} />
        </button>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.right}>
        <button className={styles.lang} aria-label="Tilni tanlash">
          🇺🇿 O'zbekcha <ChevronDown size={16} />
        </button>
        <button className={styles.bell} aria-label="Bildirishnomalar">
          <Bell size={20} />
          <span className={styles.badge} aria-hidden="true" />
        </button>
        <div className={styles.user}>
          <Avatar src={user?.photo} name={user?.fullName} size={36} />
          <div className={styles.userMeta}>
            <strong>{user?.fullName}</strong>
            <small>{user?.roleLabel}</small>
          </div>
        </div>
      </div>
    </header>
  );
}
```

```css
/* Topbar.module.css */
.topbar { background: var(--bg-surface); box-shadow: var(--sh-card);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 var(--s6); position: sticky; top: 0; z-index: var(--z-sticky); }
.left, .right { display: flex; align-items: center; gap: var(--s4); }
.title { font-size: var(--fs-xl); font-weight: 700; }
.toggle, .bell { color: var(--navy-500); padding: 8px; border-radius: var(--r-md); }
.mobileToggle { display: none; }
.lang  { display: flex; align-items: center; gap: 6px; background: var(--bg-muted);
         padding: 8px 12px; border-radius: var(--r-full); font-weight: 500; }
.bell  { position: relative; }
.badge { position: absolute; top: 6px; right: 6px; width: 8px; height: 8px;
         background: var(--red-500); border-radius: 50%; }
.user  { display: flex; align-items: center; gap: var(--s2); }
.userMeta strong { display: block; font-size: var(--fs-base); }
.userMeta small  { color: var(--text-secondary); font-size: var(--fs-sm); }

@media (max-width: 1023px) {
  .toggle { display: none; }
  .mobileToggle { display: inline-flex; }
  .userMeta, .lang span { display: none; }
}
```

---

## 5. `PageHeader.jsx`

```jsx
import styles from './PageHeader.module.css';

export default function PageHeader({ title, actions, children }) {
  return (
    <div className={styles.header}>
      <div className={styles.row}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      {children && <div className={styles.toolbar}>{children}</div>}
    </div>
  );
}
```

```css
/* PageHeader.module.css */
.header  { margin-bottom: var(--s6); }
.row     { display: flex; align-items: center; justify-content: space-between; gap: var(--s4); }
.toolbar { display: flex; gap: var(--s3); margin-top: var(--s4); flex-wrap: wrap;
           background: var(--bg-surface); padding: var(--s3); border-radius: var(--r-lg);
           box-shadow: var(--sh-card); }
```

---

⬅️ [28 — Tokenlar & CSS](28-Frontend-tokens-css.md) · ➡️ [30 — UI komponentlar](30-Frontend-ui-komponentlar.md)
