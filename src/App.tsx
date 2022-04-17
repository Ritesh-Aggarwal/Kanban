import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppContainer from "./AppContainer";
import { AuthProvider } from "./Auth/AuthContext";

const Home = React.lazy(() => import("./Home"));
const Login = React.lazy(() => import("./Auth/Login"));
const SignUp = React.lazy(() => import("./Auth/SignUp"));
const BoardView = React.lazy(() => import("./Board/Board"));
const ListBoards = React.lazy(() => import("./Board/ListBoards"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <AppContainer>
                <Home />
              </AppContainer>
            }
          />
          <Route
            path="/boards"
            element={
              <AppContainer>
                <ListBoards />
              </AppContainer>
            }
          />
          <Route
            path="/boards/:pk"
            element={
              <AppContainer>
                <BoardView />
              </AppContainer>
            }
          />
          <Route
            path="/login"
            element={
              <React.Suspense fallback={<div>Loading..</div>}>
                <Login />
              </React.Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <React.Suspense fallback={<div>Loading..</div>}>
                <SignUp />
              </React.Suspense>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
