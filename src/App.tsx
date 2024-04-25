import { Suspense } from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

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
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SnackbarProvider>
    </Suspense>
  );
}

export default App;
