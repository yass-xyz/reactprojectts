import { useState, useEffect, createContext, useContext, useMemo } from "react";
import { AuthUser } from "@/api/auth/types";
import { useLoginUser } from "@/api/auth";
import { useNavigate } from "react-router-dom";
import storage from "@/utils/storage";
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-empty-pattern
const StoreContext = createContext([{} as any, ({}) => {}]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AuthProvider(props: any) {
  const [user, setUser] = useState({} as AuthUser);
  const loginMutation = useLoginUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any = useMemo(
    () => [user, setUser, loginMutation],
    [user, loginMutation]
  );

  // useEffect(async () => {
  // Add Logic on app Mount
  // exp : on app mount if token still active call userInfo Api
  //   await Api.getCurrentUser().then((response) => {
  //     setStore(({ config, data }) => ({
  //       config: {
  //         ...config,
  //       },
  //       data: [{
  //         ...data[0],
  //       }, {
  //         ...response,
  //       }],
  //     }));
  //   });

  // }, []);

  return <StoreContext.Provider value={value} {...props} />;
}

function useAuthStore() {
  const context = useContext(StoreContext);
  const navigate = useNavigate();
  if (!context)
    throw new Error("useAuthStore must be used within a StoreProvider");
  const [user, setUser, loginMutation] = context;

  useEffect(() => {
    const { isSuccess, data } = loginMutation;
    if (isSuccess) {
      console.log("loginMutation", data);
      storage.setToken(data.jwt);
      setUser(data.user);
      navigate("/dashBoard");
    }
  }, [navigate, loginMutation, setUser]);

  const update = (user: AuthUser) => setUser(user);

  const isAuthenticated = () => {
    if (user.userName) {
      return true;
    }
    return false;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginUser = (data: any) => {
    loginMutation.mutate(data);
  };

  return {
    user,
    update,
    isAuthenticated,
    loginUser,
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuthStore };
