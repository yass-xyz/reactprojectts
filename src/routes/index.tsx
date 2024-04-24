import { useRoutes } from "react-router-dom";

// import { Landing } from '@/features/misc';
// import { useAuth } from '@/lib/auth';

// import { protectedRoutes } from './protected';
import publicRoutes from "./public";

export const AppRoutes = () => {
  //   const auth = useAuth();

  const commonRoutes = [
    { path: "/", element: <a href="/auth/login">Landing page</a> },
  ];

  //const routes = auth.user ? protectedRoutes : publicRoutes;
  const element = useRoutes([...publicRoutes, ...commonRoutes]);

  return <>{element}</>;
};
