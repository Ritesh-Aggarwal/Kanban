import React from "react";

type Props = {
  count: number;
  status: string;
};

function TaskCountCard({ count, status }: Props) {
  return (
    <div className="border rounded-md p-4 flex flex-col justify-between h-32">
      <div className="font-semibold">{status} Tasks</div>
      <div className="">
        <div className="text-2xl font-bold">{count}</div>
        <div className="">Task Count</div>
      </div>
    </div>
  );
}

export default TaskCountCard;
