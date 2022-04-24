import React, { useState } from "react";
import LabelledInput from "../common/LabelledInput";
import { LoadingDots } from "../common/Loader";
import { Board, Stage } from "../types/task";
import { Errors } from "../types/user";
import { createStage } from "../utils/apiUtils";

type Props = {
  closeCB: () => void;
  addStageCB: (newStage: Stage) => void;
  board_pk: number;
};

function CreateStage({ closeCB, addStageCB, board_pk }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [errors, setErrors] = useState<Errors<Board>>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createStage(board_pk, title, description);
      if (data.ok) {
        addStageCB(data.result);
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
        <div className="text-white">
          <div className="text-xl font-medium border-b">Create new stage</div>
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

export default CreateStage;
