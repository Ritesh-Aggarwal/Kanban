import React, { useState } from "react";
import LabelledInput from "../common/LabelledInput";
import { LoadingDots } from "../common/Loader";
import { Board, Task } from "../types/task";
import { Errors } from "../types/user";
import { updateTask } from "../utils/apiUtils";

type Props = {
  task: Task;
  closeCB: (title: string, desc: string) => void;
};

function UpdateTask({ task, closeCB }: Props) {
  const [title, setTitle] = useState(task.title);
  const [description, setDesc] = useState(task.description);
  const [errors, setErrors] = useState<Errors<Board>>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await updateTask(
        task.board_object.id,
        task.status_object.id,
        { ...task, title: title, description: description }
      );
      if (data.ok) {
        setLoading(false);
        closeCB(title, description);
        setDesc("");
        setTitle("");
      } else {
        setErrors(data.result);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateFields = [
    {
      title: "Title",
      name: "title",
      kind: "text",
      value: title,
      onChange: (e: { target: { value: string } }) => {
        setTitle((p) => e.target.value);
        setErrors(null);
      },
    },
    {
      title: "Description",
      name: "description",
      kind: "textarea",
      value: description,
      onChange: (e: { target: { value: string } }) => {
        setDesc((p) => e.target.value);
        setErrors(null);
      },
    },
  ];

  return (
    <>
      {!loading ? (
        <div className="text-white">
          <div className="text-xl font-medium border-b">Update task</div>
          <form onSubmit={handleSubmit} className="mt-4 flex-col flex gap-2">
            {UpdateFields.map((field, idx) => {
              const e = errors && (errors as any)[field.name];
              return (
                <div key={idx}>
                  <LabelledInput field={field} errors={e ? e : []} />
                </div>
              );
            })}
            <button
              className="bg-slate-400 py-2 rounded-md hover:bg-slate-700 text-white"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full flex justify-around">
          <LoadingDots />
        </div>
      )}
    </>
  );
}

export default UpdateTask;
