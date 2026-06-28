import { Provider } from "react-redux";
import { store } from "./store/store";
import DeputyApp from "./App";

// Direktor o'rinbosari (zavuch) paneli kirish nuqtasi (o'z Redux store'i bilan).
export default function DeputyEntry() {
  return (
    <Provider store={store}>
      <DeputyApp />
    </Provider>
  );
}
