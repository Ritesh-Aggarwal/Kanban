import React, { useEffect, useState } from "react";
import { getGreeting, today } from "./utils/date";
import TaskCountCard from "./TaskCountCard";
import ListTask from "./ListTask";
import { Task } from "./types/task";
import ViewChoice from "./common/ViewChoice";
import { AuthConsumer as useAuth } from "./Auth/AuthContext";

const getTaskCount = () => {
  return [
    { count: 50, status: "Completed" },
    { count: 60, status: "Incomplete" },
    { count: 80, status: "Total" },
  ];
};

type TabList = {
  label: string;
  list: Task[];
};
const categories: TabList[] = [
  // {
  //   label: "To Do",
  //   list: [{ id: 1, name: "one" }],
  // },
  // {
  //   label: "On Progress",
  //   list: [
  //     { id: 2, name: "asdasdwe" },
  //     { id: 3, name: "asde" },
  //   ],
  // },
  // {
  //   label: "Done",
  //   list: [
  //     { id: 4, name: "lorem" },
  //     { id: 5, name: "ipsum" },
  //   ],
  // },
];

const Home = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabList>({
    label: "To Do",
    list: [],
  });
  const [Taskcount, setTaskCount] = useState<
    {
      count: number;
      status: string;
    }[]
  >([]);

  const [grid, setGrid] = useState(false);

  useEffect(() => {
    //API call to get all task status and setActive list as to-do
    setTaskCount(getTaskCount());
    setActiveTab(categories[0]);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg">{today()}</h2>
      <h1 className="text-2xl font-semibold">{getGreeting(user.username)}</h1>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {Taskcount.map((item, idx) => {
          return (
            <div key={idx}>
              <TaskCountCard count={item.count} status={item.status} />
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-xl font-semibold">My Tasks</div>
      <div className="mt-2 text-lg border-b flex justify-between">
        <div className="flex gap-2">
          {categories.map((item, idx) => {
            return (
              <button
                className="hover:cursor-pointer"
                onClick={() => {
                  setActiveTab(item);
                }}
                key={idx}
              >
                <div
                  className={`p-1 font-medium ${
                    activeTab.label === item.label
                      ? "text-slate-600"
                      : "text-slate-400"
                  }`}
                >
                  {item.label}
                </div>
                <div
                  className={`rounded h-1 ${
                    activeTab.label === item.label ? "bg-slate-600" : ""
                  }`}
                ></div>
              </button>
            );
          })}
        </div>
        <ViewChoice grid={grid} setViewCB={setGrid} />
      </div>
      <div
        className={`mt-4 gap-2 ${grid ? "grid grid-cols-3" : "flex flex-col"} `}
      >
        {activeTab?.list.map((item, idx) => {
          return (
            <div key={idx}>
              <ListTask grid={grid} item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
