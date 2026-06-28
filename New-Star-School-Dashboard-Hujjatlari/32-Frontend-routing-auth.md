# 32 — Frontend: Routing va Auth

Marshrutlash (React Router v6), himoyalangan route'lar va React Query sozlamasi.

---

## 1. `app/queryClient.js`

```jsx
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60_000,          // 1 daqiqa kesh
    },
  },
});
```

---

## 2. `app/ProtectedRoute.jsx`

Foydalanuvchi tizimga kirganini va roli ruxsat etilganini tekshiradi.

```jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allow }) {
  const { user } = useAuth();
  const location = useLocation();

  // Tizimga kirmagan
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Rol ruxsat etilmagan
  if (allow && !allow.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
```

---

## 3. `App.jsx` — marshrutlar

```jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROLES } from './utils/constants';
import ProtectedRoute from './app/ProtectedRoute';
import AppShell from './components/layout/AppShell';

import LoginPage from './features/auth/LoginPage';
import DashboardPage from './features/dashboard/DashboardPage';
import SchedulePage from './features/schedule/SchedulePage';
import ClassesPage from './features/classes/ClassesPage';
import ClassDetailPage from './features/classes/ClassDetailPage';
import TeachersPage from './features/teachers/TeachersPage';
import TeacherDetailPage from './features/teachers/TeacherDetailPage';
import StudentsPage from './features/students/StudentsPage';
import StudentDetailPage from './features/students/StudentDetailPage';
import SubjectsPage from './features/subjects/SubjectsPage';
import StaffPage from './features/staff/StaffPage';
import StaffDetailPage from './features/staff/StaffDetailPage';
import AttendancePage from './features/attendance/AttendancePage';
import GradesPage from './features/grades/GradesPage';
import RatingPage from './features/rating/RatingPage';
import ProfilePage from './features/profile/ProfilePage';

const { ADMIN, DIRECTOR, ZAVUCH, TEACHER, STUDENT } = ROLES;

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute><AppShell /></ProtectedRoute>}>
        {/* Hammaga ochiq (kirgan foydalanuvchilar) */}
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />

        {/* Dars jadvali — Admin, Zavuch, O'quvchi */}
        <Route path="schedule" element={
          <ProtectedRoute allow={[ADMIN, ZAVUCH, STUDENT]}><SchedulePage /></ProtectedRoute>} />

        {/* Sinflar — Admin, Zavuch, O'qituvchi */}
        <Route path="classes" element={
          <ProtectedRoute allow={[ADMIN, ZAVUCH, TEACHER]}><ClassesPage /></ProtectedRoute>} />
        <Route path="classes/:id" element={
          <ProtectedRoute allow={[ADMIN, ZAVUCH, TEACHER]}><ClassDetailPage /></ProtectedRoute>} />

        {/* O'qituvchilar — Admin, Direktor, Zavuch */}
        <Route path="teachers" element={
          <ProtectedRoute allow={[ADMIN, DIRECTOR, ZAVUCH]}><TeachersPage /></ProtectedRoute>} />
        <Route path="teachers/:id" element={
          <ProtectedRoute allow={[ADMIN, DIRECTOR, ZAVUCH]}><TeacherDetailPage /></ProtectedRoute>} />

        {/* O'quvchilar — Admin, Direktor, Zavuch */}
        <Route path="students" element={
          <ProtectedRoute allow={[ADMIN, DIRECTOR, ZAVUCH]}><StudentsPage /></ProtectedRoute>} />
        <Route path="students/:id" element={
          <ProtectedRoute allow={[ADMIN, DIRECTOR, ZAVUCH]}><StudentDetailPage /></ProtectedRoute>} />

        {/* Fanlar — faqat Admin */}
        <Route path="subjects" element={
          <ProtectedRoute allow={[ADMIN]}><SubjectsPage /></ProtectedRoute>} />

        {/* Xodimlar — faqat Direktor */}
        <Route path="staff" element={
          <ProtectedRoute allow={[DIRECTOR]}><StaffPage /></ProtectedRoute>} />
        <Route path="staff/:id" element={
          <ProtectedRoute allow={[DIRECTOR]}><StaffDetailPage /></ProtectedRoute>} />

        {/* Reyting — faqat Direktor */}
        <Route path="rating" element={
          <ProtectedRoute allow={[DIRECTOR]}><RatingPage /></ProtectedRoute>} />

        {/* Davomat, Baholar — faqat O'quvchi */}
        <Route path="attendance" element={
          <ProtectedRoute allow={[STUDENT]}><AttendancePage /></ProtectedRoute>} />
        <Route path="grades" element={
          <ProtectedRoute allow={[STUDENT]}><GradesPage /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
```

---

## 4. Logout oqimi

`ProfilePage.jsx` ichida:

```jsx
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const onLogout = () => {
    if (window.confirm('Tizimdan chiqishni tasdiqlaysizmi?')) {
      logout();
      navigate('/login', { replace: true });
    }
  };
  return (
    <Button variant="danger" icon={LogOut} fullWidth onClick={onLogout}>
      Tizimdan chiqish
    </Button>
  );
}
```

---

## 5. Auth API — `api/auth.api.js`

```jsx
import api from './axios';

export const loginRequest = (credentials) =>
  api.post('/api/auth/login', credentials).then((r) => r.data);
// Javob: { token: "...", user: { id, fullName, role, photo, ... } }

export const me = () => api.get('/api/auth/me').then((r) => r.data);
```

---

## 6. Marshrutlar jadvali (xulosa)

| Path | Komponent | Ruxsat |
|------|-----------|--------|
| `/login` | LoginPage | hammaga |
| `/` | DashboardPage | kirgan |
| `/schedule` | SchedulePage | Admin, Zavuch, O'quvchi |
| `/classes`, `/classes/:id` | Classes | Admin, Zavuch, O'qituvchi |
| `/teachers`, `/teachers/:id` | Teachers | Admin, Direktor, Zavuch |
| `/students`, `/students/:id` | Students | Admin, Direktor, Zavuch |
| `/subjects` | Subjects | Admin |
| `/staff`, `/staff/:id` | Staff | Direktor |
| `/rating` | Rating | Direktor |
| `/attendance` | Attendance | O'quvchi |
| `/grades` | Grades | O'quvchi |
| `/profile` | Profile | kirgan |

> ⚠️ Frontend route himoyasi — faqat qulaylik uchun. Asl xavfsizlik **backend** da (har endpoint rolga tekshiriladi) — [35](35-Backend-rest-api.md), [36](36-Backend-security-jwt.md).

---

⬅️ [31 — Sahifa komponentlar](31-Frontend-sahifa-komponentlar.md) · ➡️ [33 — Backend: Arxitektura](33-Backend-arxitektura.md)
