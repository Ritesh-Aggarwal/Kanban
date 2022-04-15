import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppContainer from "./AppContainer";
const Home = React.lazy(() => import("./Home"));
const Login = React.lazy(() => import("./Login"));

function App() {
  return (
    <BrowserRouter>
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
          path="/login"
          element={
            <React.Suspense fallback={<div>Loading..</div>}>
              <Login />
            </React.Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
