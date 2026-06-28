import { Provider } from "react-redux";
import { store } from "./store/store";
import StudentApp from "./App";

// O'quvchi paneli kirish nuqtasi (o'z Redux store'i bilan).
export default function StudentEntry() {
  return (
    <Provider store={store}>
      <StudentApp />
    </Provider>
  );
}
