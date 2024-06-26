import type { RouteObject } from "react-router";
import { lazyImport } from "@/utils/lazyImport";

// *  AUTHENTICATION PAGES
const { Login } = lazyImport(() => import("@/pages/auth"), "Login");
const { Register } = lazyImport(() => import("@/pages/auth"), "Register");

const routes: RouteObject[] = [
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default routes;
