import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

// Rol panellari lazy yuklanadi: rolning kodi (va service modullari) faqat
// login'dan keyin, rol mount bo'lganda yuklanadi. Bu ikki muammoni hal qiladi:
//  1) stale-token: service'lar tokenni modul yuklanishida o'qiydi -> endi token
//     mavjud bo'lganda yuklanadi (Bearer null muammosi yo'qoladi)
//  2) initial bundle kichrayadi (har rol alohida chunk)
const AdminEntry = lazy(() => import("../roles/admin/AdminEntry"));
const DirectorEntry = lazy(() => import("../roles/director/DirectorEntry"));
const DeputyEntry = lazy(() => import("../roles/deputy/DeputyEntry"));
const TeacherEntry = lazy(() => import("../roles/teacher/TeacherEntry"));
const StudentEntry = lazy(() => import("../roles/student/StudentEntry"));

// Aktiv rolga qarab tegishli panel daraxtini root'da render qiladi.
// Bir vaqtda faqat BITTA rol mount qilinadi -> har rolning mavjud router'i va
// absolute link'lari ("/teachers", "/class-schedule") o'zgarmaydi, to'qnashuv yo'q.
function RoleApp() {
  const token = localStorage.getItem("jwtToken");
  const role = localStorage.getItem("role");

  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  let Entry;
  switch (role) {
    case "ADMIN":
      Entry = AdminEntry;
      break;
    case "DIRECTOR":
      Entry = DirectorEntry;
      break;
    case "DEPUTY_DIRECTOR":
      Entry = DeputyEntry;
      break;
    case "TEACHER":
      Entry = TeacherEntry;
      break;
    case "STUDENT":
      Entry = StudentEntry;
      break;
    default:
      return <Navigate to="/login" replace />;
  }

  return (
    <Suspense fallback={null}>
      <Entry />
    </Suspense>
  );
}

export default RoleApp;
