import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 CSS를 import

const root = document.getElementById("root");

const rootElement = (
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

createRoot(root).render(rootElement);
