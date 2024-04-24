import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

import "./App.css";

function App() {
  return (
    <>
      <SnackbarProvider maxSnack={3} dense hideIconVariant>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SnackbarProvider>
    </>
  );
}

export default App;
