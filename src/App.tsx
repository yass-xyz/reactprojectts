import { Suspense } from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./providers/auth/AuthProvider";

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
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </SnackbarProvider>
    </Suspense>
  );
}

export default App;
