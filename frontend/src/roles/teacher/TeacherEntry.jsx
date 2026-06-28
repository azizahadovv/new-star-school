import { Provider } from "react-redux";
import { store } from "./store/store";
import TeacherApp from "./App";

// O'qituvchi paneli kirish nuqtasi (o'z Redux store'i bilan).
export default function TeacherEntry() {
  return (
    <Provider store={store}>
      <TeacherApp />
    </Provider>
  );
}
