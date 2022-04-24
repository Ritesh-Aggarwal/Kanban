import React from "react";
import { TaskCard } from "./Task/TaskCard";
import { Task } from "./types/task";

function ListTask({
  item,
  removeTaskCB,
  setTaskCB,
}: {
  item: Task;
  removeTaskCB: (t: Task) => void;
  setTaskCB: (t: Task) => void;
}) {
  return (
    <div className="">
      <TaskCard
        task={item}
        moveToLastCB={setTaskCB}
        removeTaskCB={removeTaskCB}
        setTaskCB={setTaskCB}
      />
    </div>
  );
}

export default ListTask;
