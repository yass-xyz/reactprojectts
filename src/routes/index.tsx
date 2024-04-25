import { useRoutes } from "react-router-dom";
import { lazyImport } from "@/utils/lazyImport";
// import { Landing } from '@/features/misc';
// import { useAuth } from '@/lib/auth';

// import { protectedRoutes } from './protected';
import publicRoutes from "./public";
const { NotFound } = lazyImport(() => import("@/pages/notFound"), "NotFound");

export const AppRoutes = () => {
  //   const auth = useAuth();

  const commonRoutes = [
    { path: "/", element: <a href="/auth/login">Landing page</a> },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  //const routes = auth.user ? protectedRoutes : publicRoutes;
  const element = useRoutes([...publicRoutes, ...commonRoutes]);

  return <>{element}</>;
};
