import * as React from "react";
const authContext = React.createContext({
  authed: false,
  login: () => {},
  logout: () => {},
});

function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  return {
    authed,
    login() {
      setAuthed(true);
      //   return new Promise((res) => {
      //     setAuthed(true);
      //     res();
      //   });
    },
    logout() {
      setAuthed(false);
      //   return new Promise((res) => {
      //     setAuthed(false);
      //     res();
      //   });
    },
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function AuthConsumer() {
  return React.useContext(authContext);
}
