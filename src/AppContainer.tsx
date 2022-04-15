import React from "react";
import { RequireAuth } from "./RequireAuth";

interface Props {
  children: React.ReactNode;
}

const DashboardLinks = [
  { page: "Home" },
  { page: "Boards" },
  { page: "To-do" },
];

function Dashboard() {
  return (
    <div className="w-1/6 h-screen border-r flex flex-col">
      <div className="flex flex-col mt-4">
        {DashboardLinks.map((item, idx) => {
          return (
            <div
              className="py-1 my-1 rounded-md bg-gray-200 border text-center "
              key={idx}
            >
              {item.page}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AppContainer(props: Props) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="border-b flex">
        <div className="border-r w-1/6 text-3xl">LOGO</div>
        <div className="w-5/6">Search</div>
      </div>
      <div className="flex flex-row">
        <Dashboard />
        <div className="w-5/6 h-full overflow-y-auto">
          <div className="mx-6 mb-6">
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
