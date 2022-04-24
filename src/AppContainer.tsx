import React, { useEffect, useState } from "react";
import Logo from "./common/Logo";
import Header from "./Header";
import { RequireAuth } from "./Auth/RequireAuth";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

function Dashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");
  useEffect(() => {
    if (window.location.pathname === "/") setActive("Home");
    else if (window.location.pathname === "/to-do") setActive("To-do");
    else setActive("Boards");
  }, []);
  const DashboardLinks = [
    {
      page: "Home",
      onClick: () => {
        navigate("/");
        setActive("Home");
      },
    },
    {
      page: "Boards",
      onClick: () => {
        navigate("/boards");
        setActive("Boards");
      },
    },
    // { page: "To-do", onClick: () => {} },
  ];
  return (
    <div className="w-1/6 h-screen border-r border-slate-900 flex flex-col bg-slate-900">
      <div className="flex flex-col gap-2 mt-2">
        {DashboardLinks.map((item, idx) => {
          return (
            <button
              onClick={item.onClick}
              className={`py-1  text-white text-center placeholder ${
                active === item.page ? "bg-slate-700" : "bg-slate-900"
              }`}
              key={idx}
            >
              {item.page}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AppContainer(props: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex items-center bg-slate-900 text-white">
        <div className="w-1/6">
          <Logo />
        </div>
        <div className="w-5/6">
          <Header />
        </div>
      </div>
      <div className="h-full flex flex-row">
        <Dashboard />
        <div className="w-5/6 h-full overflow-y-auto bg-slate-800 text-white">
          <div className="mx-6 mb-8 h-full ">
            <RequireAuth>
              <React.Suspense fallback={<div>Loading..</div>}>
                {props.children}
              </React.Suspense>
            </RequireAuth>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppContainer;
