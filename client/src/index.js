import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./assets/styles/index.scss";

import App from "./App";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

/*------------------------------*/
/*------Created by KeKeZ 🤡----*/
/*-----------------------------*/
