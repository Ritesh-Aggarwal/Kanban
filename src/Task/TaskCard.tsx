import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { Task } from "../types/task";
import { deleteTask, updateTask } from "../utils/apiUtils";
import UpdateTask from "./UpdateTask";

const updateComplete = async (updatedTask: Task) => {
  try {
    updateTask(
      updatedTask.board_object.id,
      updatedTask.status_object.id,
      updatedTask
    );
  } catch (error) {
    console.log(error);
  }
};

export const TaskCard = ({
  task,
  moveToLastCB,
  setTaskCB,
  removeTaskCB,
}: {
  task: Task;
  moveToLastCB: (task: Task) => void;
  setTaskCB: (t: Task) => void;
  removeTaskCB: (t: Task) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(task.completed);
  const toggleComplete = () => {
    updateComplete({ ...task, completed: !completed });
    if (!completed) {
      moveToLastCB({ ...task, completed: !completed });
    } else setTaskCB({ ...task, completed: !completed });
    setCompleted((p) => !p);
  };

  useEffect(() => {
    setCompleted(task.completed);
  }, [task]);

  return (
    <div className="text-white bg-slate-700 p-2 rounded-md flex gap-2 items-center">
      <div className="h-5 w-5">
        <button
          className="rounded-full border w-5 h-full min-w-full text-center"
          onClick={toggleComplete}
        >
          {completed && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=""
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
      <div
        onClick={() => setOpen(true)}
        className={`${
          completed ? "line-through" : ""
        } text-lg hover:cursor-pointer`}
      >
        {task.title.substring(0, 80)}
      </div>
      <Modal open={open} closeCB={() => setOpen(false)}>
        <TaskModal
          removeTaskCB={removeTaskCB}
          task={task}
          setTaskCB={setTaskCB}
        />
      </Modal>
    </div>
  );
};

const TaskModal = ({
  task,
  setTaskCB,
  removeTaskCB,
}: {
  task: Task;
  setTaskCB: (task: Task) => void;
  removeTaskCB: (task: Task) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-white">
      <div className="flex gap-1 justify-between mb-4">
        <div className="text-xl font-medium">{task.title}</div>
        <button className="" onClick={() => setOpen(true)}>
          <Edit />
        </button>
      </div>
      <div className="border p-2 rounded-md mb-4">{task.description}</div>
      <button
        onClick={() => {
          deleteTask(task);
          removeTaskCB(task);
        }}
        className="p-2 rounded-md bg-slate-500 hover:bg-slate-600 flex items-center gap-2"
      >
        <Archive />
        <div className="">Archive</div>
      </button>
      <Modal closeCB={() => setOpen(false)} open={open}>
        <UpdateTask
          task={task}
          closeCB={(title: string, desc: string) => {
            setTaskCB({ ...task, title: title, description: desc });
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

function Edit() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 hover:text-slate-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
}

function Archive() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
      <path
        fillRule="evenodd"
        d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}
