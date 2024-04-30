import { Suspense } from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./providers/auth/AuthProvider";
import { queryClient } from "./api/react-query";

import "./App.css";

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          Suspense Loading ....
        </div>
      }
    >
      <SnackbarProvider maxSnack={3} dense hideIconVariant>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AuthProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </Suspense>
  );
}

export default App;
