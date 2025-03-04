import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { StrictMode } from "react";

const rootElement = document.getElementById("root");
if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
