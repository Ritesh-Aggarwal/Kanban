import React from "react";
import { FormField } from "../types/user";
interface Props {
  field: FormField;
  errors: string[];
}

function LabelledInput({ errors, field }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="username" className="font-semibold">
        {field.title}
      </label>

      {field.kind !== "textarea" ? (
        <input
          id={field.title}
          type={field.kind}
          placeholder={field.placeholder}
          className="text-white bg-slate-700 rounded-md px-2 flex-1 text-lg"
          value={field.value}
          onChange={(e) => {
            field.onChange(e);
          }}
        />
      ) : (
        <textarea
          id={field.title}
          placeholder={field.placeholder}
          className="text-white bg-slate-700 rounded-md px-2 flex-1 text-lg"
          value={field.value}
          onChange={(e) => {
            field.onChange(e);
          }}
        />
      )}
      <ul className="list-disc">
        {errors?.map((e, idx) => {
          return (
            <li key={idx} className="text-red-500">
              {e}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LabelledInput;
