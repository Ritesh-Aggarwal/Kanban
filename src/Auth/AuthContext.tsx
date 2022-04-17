import * as React from "react";
import { User } from "../types/user";
import { me } from "../utils/apiUtils";
const authContext = React.createContext({
  authed: true,
  login: () => {},
  logout: () => {},
  user: { username: "" },
});

const fetchUser = async (
  setAuthCB: (value: boolean) => void,
  setUserCB: (value: User) => void
) => {
  try {
    const data = await me();
    if (data.ok) {
      setAuthCB(true);
      setUserCB(data.result);
    } else {
      setAuthCB(false);
    }
  } catch (err) {
    console.log(err);
  }
};

function useAuth() {
  const [authed, setAuthed] = React.useState(true);
  const [user, setUser] = React.useState<User>({ username: "" });

  React.useEffect(() => {
    fetchUser(setAuthed, setUser);
  }, [authed]);

  return {
    authed,
    login() {
      setAuthed((p) => true);
    },
    logout() {
      setAuthed((p) => false);
      setUser({ username: "" });
    },
    user,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function AuthConsumer() {
  return React.useContext(authContext);
}
