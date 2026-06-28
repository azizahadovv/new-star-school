import { Provider } from "react-redux";
import { store } from "./store/store";
import AdminApp from "./App";

// Admin panelining kirish nuqtasi: o'zining Redux store'i bilan o'raladi.
// BrowserRouter va ToastContainer top-level (src/index.js, src/App.js) da bir
// marta beriladi, shuning uchun bu yerda takrorlanmaydi.
export default function AdminEntry() {
  return (
    <Provider store={store}>
      <AdminApp />
    </Provider>
  );
}
