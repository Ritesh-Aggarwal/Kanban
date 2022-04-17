import React, { useState } from "react";
import LabelledInput from "../common/LabelledInput";
import { LoadingDots } from "../common/Loader";
import { Board } from "../types/task";
import { Errors } from "../types/user";
import { createBoard } from "../utils/apiUtils";

type Props = {
  closeCB: () => void;
  addBoardCB: (newBoard: {
    id: number;
    title: string;
    description: string;
  }) => void;
};

function CreateBoard({ closeCB, addBoardCB }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [errors, setErrors] = useState<Errors<Board>>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createBoard(title, description);
      if (data.ok) {
        addBoardCB({
          id: data.result.id,
          title: title,
          description: description,
        });
        setLoading(false);
        closeCB();
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

  const CreateFields = [
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
        <div className="">
          <div className="text-xl font-medium border-b">Create new board</div>
          <form onSubmit={handleSubmit} className="mt-4 flex-col flex gap-2">
            {CreateFields.map((field, idx) => {
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
              Create
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

export default CreateBoard;
