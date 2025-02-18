import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./page/App";
import "./assets/main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
