import React, { useEffect, useState } from "react";
import { getGreeting, today } from "./utils/date";
import TaskCountCard from "./TaskCountCard";
import ListTask from "./ListTask";
import { Stage, Task } from "./types/task";
import ViewChoice from "./common/ViewChoice";
import { AuthConsumer as useAuth } from "./Auth/AuthContext";
import { getBoards, getTasks } from "./utils/apiUtils";
import { fetchStages, fetchTasks } from "./Board/Board";
import Modal from "./common/Modal";
import CreateTask from "./Task/CreateTask";

const fetchTaskCount = async (
  setVal: (
    value: {
      count: number;
      status: string;
    }[]
  ) => void,
  setStagesCB: (val: Stage[]) => void,
  setTasksCB: (val: Task[]) => void
) => {
  try {
    const d = await getBoards();
    if (d.ok && d.result.results[0]) {
      const data = await getTasks(d.result.results[0].id);
      fetchStages(d.result.results[0].id, setStagesCB);
      fetchTasks(d.result.results[0].id, setTasksCB);
      const nComp = data.result.results.filter((i: Task) => i.completed).length;
      const val = [
        { count: nComp, status: "Completed" },
        { count: data.result.count - nComp, status: "Incomplete" },
        { count: data.result.count, status: "Total" },
      ];
      setVal(val);
    } else window.location.replace("/boards");
  } catch (error) {
    console.log(error);
  }
};

const Home = () => {
  const { user } = useAuth();
  const [grid, setGrid] = useState(false);
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [activeTab, setActiveTab] = useState<Stage>();
  const [Taskcount, setTaskCount] = useState<
    {
      count: number;
      status: string;
    }[]
  >([]);

  useEffect(() => {
    fetchTaskCount(setTaskCount, setStages, setTasks);
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
          {stages.map((item, idx) => {
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
                    activeTab?.title === item.title
                      ? "text-white-600"
                      : "text-slate-300"
                  }`}
                >
                  {item.title}
                </div>
                <div
                  className={`rounded h-1 ${
                    activeTab?.title === item.title ? "bg-white" : ""
                  }`}
                ></div>
              </button>
            );
          })}
        </div>
        <ViewChoice grid={grid} setViewCB={setGrid} />
      </div>
      {activeTab && (
        <div className="flex justify-between mt-4">
          <button
            className="p-1 border rounded-md"
            onClick={() => setOpen(true)}
          >
            New task
          </button>
          <Modal closeCB={() => setOpen(false)} open={open}>
            <CreateTask
              addTaskCB={(s: number, t: Task) => {
                setTasks((p) => [t, ...p]);
              }}
              closeCB={() => setOpen(false)}
              stage_pk={activeTab.id}
              board_pk={activeTab.board}
            />
          </Modal>
        </div>
      )}
      <div
        className={`mt-4 gap-2 ${grid ? "grid grid-cols-3" : "flex flex-col"} `}
      >
        {tasks
          ?.filter((i) => i.status_object.id === activeTab?.id)
          .map((item, idx) => {
            return (
              <div key={idx}>
                <ListTask
                  item={item}
                  removeTaskCB={(t: Task) => {
                    setTasks((p) => p?.filter((i) => i.id !== t.id));
                  }}
                  setTaskCB={(t: Task) => {
                    setTasks((p) =>
                      p?.map((i) => {
                        if (t.id === i.id) {
                          return t;
                        } else return i;
                      })
                    );
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
