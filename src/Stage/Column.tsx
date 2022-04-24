import * as React from "react";
import { Droppable } from "@react-forked/dnd";
import { TaskElem } from "../Task/TaskComp";
import { Stage, Task } from "../types/task";
import Modal from "../common/Modal";
import CreateTask from "../Task/CreateTask";
import Dropdown from "../common/Dropdown";

export interface ColumnProps {
  tasks: Task[];
  column: Stage;
  index: number;
  addTaskCB: (stage_pk: number, newTask: Task) => void;
  removeStageCB: (stage_pk: number) => void;
  moveToLastCB: (task: Task) => void;
  setTaskCB: (t: Task) => void;
  removeTaskCB: (t: Task) => void;
}

export const Column = ({
  column,
  tasks,
  index,
  addTaskCB,
  setTaskCB,
  removeStageCB,
  moveToLastCB,
  removeTaskCB,
}: ColumnProps) => {
  const [open, setOpen] = React.useState(false);
  const menu = [
    {
      label: "Delete",
      onClick: () => {
        removeStageCB(column.id);
      },
    },
  ];

  return (
    <div className="flex flex-col w-80 rounded-md  bg-slate-900">
      <div className="flex justify-between items-center px-2">
        <div className="p-2 text-xl font-medium text-white">{column.title}</div>
        <div className="flex gap-1">
          {index === 0 ? (
            <>
              <button
                className="text-white hover:text-gray-300"
                onClick={() => setOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <Modal open={open} closeCB={() => setOpen(false)}>
                <CreateTask
                  closeCB={() => setOpen(false)}
                  addTaskCB={addTaskCB}
                  stage_pk={column.id}
                  board_pk={column.board}
                />
              </Modal>
            </>
          ) : null}
          <div className="">
            <Dropdown
              menuButton={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              }
              menu={menu}
            />
          </div>
        </div>
      </div>
      <div className="rounded h-1 bg-white"></div>
      <Droppable droppableId={String(column.id)} type="task">
        {(provided, snapshot) => (
          <div
            className={`p-2 flex-1 ${
              snapshot.isDraggingOver ? "bg-slate-600" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((t, i) => (
              <TaskElem
                removeTaskCB={removeTaskCB}
                setTaskCB={setTaskCB}
                moveToLastCB={moveToLastCB}
                key={t.id}
                task={t}
                index={i}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
