# 31 — Frontend: Sahifa komponentlar (JSX)

Asosiy sahifalar implementatsiyasi: Login, Dashboard, ro'yxat va detal sahifalar.

---

## 1. API qatlami — `api/axios.js`

```jsx
import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

// Token qo'shish
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nss_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 — login sahifasiga
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('nss_token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);
export default api;
```

```jsx
// api/students.api.js
import api from './axios';
export const getStudents = (params) => api.get('/api/students', { params }).then((r) => r.data);
export const getStudent  = (id)     => api.get(`/api/students/${id}`).then((r) => r.data);
export const createStudent = (dto)  => api.post('/api/students', dto).then((r) => r.data);
export const updateStudent = (id, dto) => api.put(`/api/students/${id}`, dto).then((r) => r.data);
export const deleteStudent = (id)   => api.delete(`/api/students/${id}`);
```

---

## 2. `AuthContext.jsx`

```jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const ROLE_LABELS = {
  ROLE_ADMIN: 'Admin', ROLE_DIRECTOR: 'Direktor', ROLE_ZAVUCH: 'Zavuch',
  ROLE_TEACHER: "O'qituvchi", ROLE_STUDENT: "O'quvchi",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('nss_user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = (data) => {
    localStorage.setItem('nss_token', data.token);
    const u = { ...data.user, roleLabel: ROLE_LABELS[data.user.role] };
    localStorage.setItem('nss_user', JSON.stringify(u));
    setUser(u);
  };
  const logout = () => {
    localStorage.removeItem('nss_token');
    localStorage.removeItem('nss_user');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
```

---

## 3. `LoginPage.jsx`

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { loginRequest } from '../../api/auth.api';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import logo from '../../assets/logo-color.svg';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const [form, setForm] = useState({ login: '', password: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const data = await loginRequest(form);
      login(data);
      navigate('/');
    } catch {
      setError("Login yoki parol noto'g'ri");
    } finally { setLoading(false); }
  };

  return (
    <div className={styles.page}>
      <div className={styles.brandCard}><img src={logo} alt="New Star School" /></div>
      <form className={styles.card} onSubmit={onSubmit}>
        <h1 className={styles.title}>Shaxsiy akkauntga kirish</h1>
        <p className={styles.sub}>Kirish uchun shaxsiy ma'lumotlarini kiriting</p>

        <Input name="login" icon={User} placeholder="Login"
               value={form.login} onChange={onChange} autoComplete="username" />
        <Input name="password" icon={Lock} placeholder="Parol"
               type={show ? 'text' : 'password'} value={form.password} onChange={onChange}
               autoComplete="current-password" error={error}
               rightSlot={
                 <button type="button" onClick={() => setShow((s) => !s)}
                         aria-label="Parolni ko'rsatish" aria-pressed={show}>
                   {show ? <EyeOff size={18} /> : <Eye size={18} />}
                 </button>} />

        <div className={styles.row}>
          <label className={styles.remember}>
            <input type="checkbox" /> Eslab qolish
          </label>
          <a href="/forgot" className={styles.forgot}>Parolni unutdingmi?</a>
        </div>

        <Button type="submit" variant="dark" fullWidth loading={loading}>Tizimga kirish</Button>
      </form>
    </div>
  );
}
```

```css
/* LoginPage.module.css */
.page { min-height: 100vh; display: flex; flex-direction: column; align-items: center;
        justify-content: center; gap: var(--s4); background: var(--bg-app); padding: var(--s4); }
.brandCard, .card { width: 460px; max-width: 100%; background: var(--bg-surface);
        border-radius: var(--r-lg); box-shadow: var(--sh-card); }
.brandCard { padding: var(--s6); display: grid; place-items: center; border-top: 4px solid var(--navy-500); }
.card  { padding: var(--s6); display: flex; flex-direction: column; gap: var(--s4); }
.title { font-size: var(--fs-lg); font-weight: 700; }
.sub   { color: var(--text-secondary); margin-top: -8px; }
.row   { display: flex; align-items: center; justify-content: space-between; }
.remember { display: flex; align-items: center; gap: 8px; font-size: var(--fs-base); }
.forgot { color: var(--danger); font-size: var(--fs-base); }
```

---

## 4. `DashboardPage.jsx`

```jsx
import { useAuth } from '../../context/AuthContext';
import { getNavForRole } from '../../config/navigation';
import { ACCENT } from '../../utils/constants';
import ModuleCard from '../../components/ui/ModuleCard';
import PageHeader from '../../components/layout/PageHeader';
import grid from './Dashboard.module.css';

const COLOR_BY_KEY = {
  schedule: ACCENT.schedule, classes: ACCENT.classes, teachers: ACCENT.teachers,
  students: ACCENT.students, subjects: ACCENT.subjects, profile: ACCENT.profile,
  staff: ACCENT.teachers, rating: ACCENT.classes, attendance: ACCENT.teachers,
  grades: ACCENT.classes,
};

export default function DashboardPage() {
  const { user } = useAuth();
  const items = getNavForRole(user?.role).filter((i) => i.key !== 'dashboard');

  return (
    <>
      <PageHeader title="Asosiy sahifa" />
      <div className={grid.cards}>
        {items.map((i) => (
          <ModuleCard key={i.key} to={i.to} label={i.label} icon={i.icon}
                      color={COLOR_BY_KEY[i.key] || 'var(--primary)'} />
        ))}
      </div>
    </>
  );
}
```

```css
/* Dashboard.module.css */
.cards { display: grid; gap: var(--s4);
         grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
@media (max-width: 767px) { .cards { grid-template-columns: repeat(2, 1fr); } }
```

---

## 5. `StudentsPage.jsx` (ro'yxat — qidiruv, filtr, jadval, pagination)

```jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ChevronRight, MoreVertical } from 'lucide-react';
import { getStudents } from '../../api/students.api';
import { useDebounce } from '../../hooks/useDebounce';
import { formatPhone } from '../../utils/formatPhone';
import PageHeader from '../../components/layout/PageHeader';
import SearchField from '../../components/ui/SearchField';
import Select from '../../components/ui/Select';
import Table from '../../components/ui/Table';
import Pagination from '../../components/ui/Pagination';
import Avatar from '../../components/ui/Avatar';

export default function StudentsPage() {
  const [q, setQ] = useState('');
  const [grade, setGrade] = useState('');
  const [page, setPage] = useState(1);
  const search = useDebounce(q, 300);

  const { data, isLoading } = useQuery({
    queryKey: ['students', search, grade, page],
    queryFn: () => getStudents({ search, grade, page, size: 10 }),
    keepPreviousData: true,
  });

  const columns = [
    { key: 'index', title: '№', render: (_, i) => i + 1 },
    { key: 'fullName', title: "O'quvchi", render: (r) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar src={r.photo} name={r.fullName} /> {r.fullName}
        </span>) },
    { key: 'grade', title: 'Sinf' },
    { key: 'group', title: 'Guruh' },
    { key: 'phone', title: 'Telefon raqam', render: (r) => formatPhone(r.phone) },
    { key: 'parentPhone', title: "Ota-onasining telefon raqami", render: (r) => formatPhone(r.parentPhone) },
    { key: 'actions', title: '', align: 'right', render: (r) => (
        <span style={{ display: 'inline-flex', gap: 16, alignItems: 'center' }}>
          <Link to={`/students/${r.id}`} style={{ color: 'var(--link)' }}>
            Batafsil <ChevronRight size={14} />
          </Link>
          <button aria-label="Amallar"><MoreVertical size={18} /></button>
        </span>) },
  ];

  return (
    <>
      <PageHeader title="O'quvchilar">
        <SearchField placeholder="O'quvchi bo'ylab izlash"
                     value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
        <Select placeholder="Sinfni tanlang" value={grade}
                onChange={(e) => setGrade(e.target.value)}
                options={[1,2,3,4,5,6,7,8,9,10,11].map((g) => ({ value: g, label: `${g}-sinf` }))} />
      </PageHeader>

      {isLoading
        ? <TableSkeleton />
        : <>
            <Table columns={columns.map((c, ci) => ({
              ...c,
              render: c.key === 'index'
                ? (r) => (page - 1) * 10 + data.content.indexOf(r) + 1
                : c.render,
            }))} rows={data.content} />
            <Pagination page={page} totalPages={data.totalPages} onChange={setPage} />
          </>}
    </>
  );
}

function TableSkeleton() {
  return <div className="skeleton" style={{ height: 400 }} />;
}
```

---

## 6. `StudentDetailPage.jsx` (profil — breadcrumb + detal jadval)

```jsx
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getStudent } from '../../api/students.api';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import { formatPhone } from '../../utils/formatPhone';
import { formatDate } from '../../utils/formatDate';
import styles from './Detail.module.css';

export default function StudentDetailPage() {
  const { id } = useParams();
  const { data: s, isLoading } = useQuery({
    queryKey: ['student', id], queryFn: () => getStudent(id),
  });
  if (isLoading || !s) return <div className="skeleton" style={{ height: 500 }} />;

  const rows = [
    ['Ismi', s.firstName], ['Familiya', s.lastName], ['Otasining ismi', s.middleName],
    ["Tug'ilgan sana", formatDate(s.birthDate)], ['Jins', s.gender], ['Millat', s.nationality],
    ['Davlat', s.country], ['Viloyat', s.region], ['Tuman', s.district],
    ['Uy manzili', s.address], ['Sinf', `${s.grade}-sinf`],
    ['Telefon raqam', formatPhone(s.phone)], ['Login', s.login],
    // Parol KO'RSATILMAYDI — xavfsizlik
  ];

  return (
    <>
      <Breadcrumb items={[{ to: '/students', label: "O'quvchilar" }, { label: s.fullName }]} />
      <div className={styles.layout}>
        <aside className={styles.side}>
          <img className={styles.photo} src={s.photo} alt={s.fullName} />
          <Button variant="secondary" fullWidth>Tahrirlash</Button>
        </aside>
        <section className={styles.info}>
          <h2 className={styles.h}>SHAXSIY MA'LUMOTLAR</h2>
          <dl className={styles.table}>
            {rows.map(([k, v]) => (
              <div key={k} className={styles.tr}><dt>{k}:</dt><dd>{v}</dd></div>
            ))}
          </dl>
          <Button variant="primary">Tahrirlash</Button>
        </section>
      </div>
    </>
  );
}
```

```css
/* Detail.module.css */
.layout { display: grid; grid-template-columns: 300px 1fr; gap: var(--s6); align-items: start; }
.side   { background: var(--bg-surface); padding: var(--s4); border-radius: var(--r-lg);
          box-shadow: var(--sh-card); display: flex; flex-direction: column; gap: var(--s3); }
.photo  { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: var(--r-md); }
.info   { background: var(--bg-surface); padding: var(--s6); border-radius: var(--r-lg);
          box-shadow: var(--sh-card); }
.h      { color: var(--primary); font-size: var(--fs-md); font-weight: 700;
          text-transform: uppercase; margin-bottom: var(--s4); }
.table  { display: flex; flex-direction: column; margin-bottom: var(--s5); }
.tr     { display: grid; grid-template-columns: 1fr 1fr; padding: 12px var(--s4); }
.tr:nth-child(odd) { background: var(--bg-app); border-radius: var(--r-sm); }
.tr dt  { color: var(--text-primary); }
.tr dd  { color: var(--text-primary); }
@media (max-width: 767px) { .layout { grid-template-columns: 1fr; } }
```

> Boshqa ro'yxat sahifalari (**Teachers, Staff, Subjects**) xuddi shu andozada — faqat ustunlar va API farq qiladi. **Detail** sahifalar ham bir xil `Detail.module.css` dan foydalanadi.

---

## 7. `useDebounce.js`

```jsx
import { useEffect, useState } from 'react';
export function useDebounce(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => { const t = setTimeout(() => setV(value), delay); return () => clearTimeout(t); },
    [value, delay]);
  return v;
}
```

---

⬅️ [30 — UI komponentlar](30-Frontend-ui-komponentlar.md) · ➡️ [32 — Routing & Auth](32-Frontend-routing-auth.md)
