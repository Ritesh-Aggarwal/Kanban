import React from "react";
import { Errors, FormField, LoginUser, RegisterUser } from "../types/user";
import LabelledInput from "../common/LabelledInput";
import Logo from "../common/Logo";

type Props = {
  handleSubmitCB: (e: React.FormEvent<HTMLFormElement>) => void;
  fields: FormField[];
  errors: Errors<RegisterUser | LoginUser>;
  formFor: string;
  loading: boolean;
};

function LoginForm({
  errors,
  fields,
  handleSubmitCB,
  formFor,
  loading,
}: Props) {
  return (
    <div className="w-1/3">
      <div className="w-full">
        <Logo />
      </div>
      <div className="font-bold text-2xl mb-4">{formFor}</div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmitCB}>
        {fields.map((field, idx) => {
          const e = errors && (errors as any)[field.name];
          return (
            <div key={idx}>
              <LabelledInput errors={errors ? e : []} field={field} />
            </div>
          );
        })}
        <ul className="list-disc">
          {errors &&
            errors.non_field_errors?.map((e, idx) => {
              return (
                <li key={idx} className="text-red-500">
                  {e}
                </li>
              );
            })}
        </ul>
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-400 py-2 rounded-md hover:bg-slate-700 text-white"
        >
          {formFor}
        </button>
      </form>
      {formFor === "Login" ? (
        <div className="">
          New user?{" "}
          <a className="text-blue-500 hover:cursor-pointer" href="/signup">
            Signup
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default LoginForm;
