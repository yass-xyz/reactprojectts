import type { FC, ReactNode } from "react";
import { useState } from "react";
import { lazyImport } from "@/utils/lazyImport";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuthStore } from "@/providers/auth/AuthProvider";

const { Login } = lazyImport(() => import("@/pages/auth"), "Login");

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>();

  if (!isAuthenticated()) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }

    return <Login />;
  }

  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
