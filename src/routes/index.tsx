import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router";
import { lazyImport } from "@/utils/lazyImport";
import AuthGuard from "./AuthGuard";
import GuestGuard from "./GuestGuard";

const { NotFound } = lazyImport(() => import("@/pages/notFound"), "NotFound");
const { LandingPage } = lazyImport(
  () => import("@/pages/landingPage"),
  "LandingPage"
);
const { Login } = lazyImport(() => import("@/pages/auth"), "Login");
const { Register } = lazyImport(() => import("@/pages/auth"), "Register");
const { DashBoard } = lazyImport(
  () => import("@/pages/dashboard/DashBoard"),
  "DashBoard"
);

export const AppRoutes = () => {
  const commonRoutes = [
    { path: "/", element: <LandingPage /> },
    {
      path: "*",
      element: <NotFound />,
    },
  ];
  const routes: RouteObject[] = [
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: "dashBoard",
      element: (
        <AuthGuard>
          <DashBoard />
        </AuthGuard>
      ),
    },
  ];

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
