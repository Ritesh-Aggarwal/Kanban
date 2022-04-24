import * as React from "react";
import { Draggable } from "@react-forked/dnd";
import { Task } from "../types/task";
import { TaskCard } from "./TaskCard";

interface TaskProps {
  task: Task;
  index: number;
  moveToLastCB: (task: Task) => void;
  setTaskCB: (t: Task) => void;
  removeTaskCB: (t: Task) => void;
}
export const TaskElem = ({
  task,
  index,
  moveToLastCB,
  setTaskCB,
  removeTaskCB,
}: TaskProps) => {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided, snapshot) => (
        <div
          className={`rounded-md mb-2
          `}
          // ${snapshot.isDragging ? "bg-slate-400" : ""}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <TaskCard
            removeTaskCB={removeTaskCB}
            setTaskCB={setTaskCB}
            moveToLastCB={moveToLastCB}
            task={task}
          />
        </div>
      )}
    </Draggable>
  );
};
