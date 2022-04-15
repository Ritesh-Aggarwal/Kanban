import React, { useState } from "react";
import { Task } from "./types/task";

const Modal = React.lazy(() => import("./common/Modal"));

function ListTask({ item, grid }: { item: Task; grid: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="px-4 py-2 rounded-md h-16 bg-slate-200 hover:cursor-pointer"
      onClick={() => {
        setOpen(true);
      }}
    >
      {grid ? <div>task grid component</div> : <div>task list component</div>}
      <Modal open={open} closeCB={() => setOpen(false)}>
        <div>
          <div>{item.name}</div>
          <button
            id={item.name}
            className="border  bg-red-200"
            onClick={() => {
              setOpen(false);
            }}
          >
            close
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ListTask;
