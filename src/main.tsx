import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const rootElement = document.getElementById("root");
if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools client={queryClient} />
      </QueryClientProvider>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
