import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
// import { saveState } from './app/browser-storage';

// const debounce = require("debounce");
// store.subscribe(
//   debounce(() => {
//     saveState(store.getState());
//   }, 800)
// );

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
