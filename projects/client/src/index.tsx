import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppComponent from "./components/App/App";
import store from "./redux/store";

const root = document.getElementById("root");
ReactDOM.render(
    <Provider store={store}>
        <AppComponent />
    </Provider>,
    root
);
