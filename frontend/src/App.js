import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SharedLogin from "./shared/SharedLogin";
import RoleApp from "./shared/RoleApp";

// Top-level router:
//   /login  -> birlashtirilgan login
//   /*      -> aktiv rolning paneli (RoleApp ichida root'da mount bo'ladi)
function App() {
  return (
    <div className="p-0 m-auto">
      <Routes>
        <Route path="/login" element={<SharedLogin />} />
        <Route path="/*" element={<RoleApp />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
