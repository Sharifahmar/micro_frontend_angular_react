import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { App } from "./App";


export default function Root(props) {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Route exact path="/react/app" component={App} />
            </BrowserRouter>
        </React.StrictMode>
    );
}