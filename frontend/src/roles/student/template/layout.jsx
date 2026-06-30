import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NAVBAR, SIDEBAR } from ".";
import { closeSidebar } from "../slice/sidebar";

// Ikki-ustunli shell — Figma dizayni (rol-admin.png):
//  • chap: doimiy navy sidebar (desktop) / mobil drawer
//  • o'ng: topbar + kontent (#F4F7F9)
function Layout() {
  const dispatch = useDispatch();
  const open = useSelector((s) => s.sidebarReduser.open);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-[#F4F7F9]">
      {/* Desktop sidebar */}
      <div className="hidden tablet:block">
        <SIDEBAR />
      </div>

      {/* Mobil drawer */}
      {open && (
        <div className="tablet:hidden fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => dispatch(closeSidebar())}
          />
          <div className="absolute left-0 top-0 h-full">
            <SIDEBAR />
          </div>
        </div>
      )}

      {/* O'ng tomon */}
      <div className="flex-1 flex flex-col min-w-0">
        <NAVBAR />
        <main className="flex-1 overflow-y-auto">
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
