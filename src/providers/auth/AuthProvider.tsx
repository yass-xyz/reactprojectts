import { useState, createContext, useContext, useMemo } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-empty-pattern
const StoreContext = createContext([{} as any, ({}) => {}]);

type User = {
  userName: string | undefined;
  mail: string | undefined;
  name: string | undefined;
  firstName: string | undefined;
  (): User;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AuthProvider(props: any) {
  const [user, setUser] = useState({} as User);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any = useMemo(() => [user, setUser], [user]);

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
  if (!context)
    throw new Error("useAuthStore must be used within a StoreProvider");
  const [user, setUser] = context;

  const update = (user: User) => setUser(user);

  const isAuthenticated = () => {
    if (user.userName) {
      return true;
    }
    return false;
  };

  return {
    user,
    update,
    isAuthenticated,
  };
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuthStore };
