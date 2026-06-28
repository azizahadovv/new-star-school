import { Provider } from "react-redux";
import { store } from "./store/store";
import DirectorApp from "./App";

// Direktor paneli kirish nuqtasi (o'z Redux store'i bilan).
export default function DirectorEntry() {
  return (
    <Provider store={store}>
      <DirectorApp />
    </Provider>
  );
}
