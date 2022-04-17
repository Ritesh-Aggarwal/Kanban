import React, { useState } from "react";
import { Errors, RegisterUser } from "../types/user";
import { login as loginUserAPI, register } from "../utils/apiUtils";
import LoginForm from "./LoginForm";
import Loader from "../common/Loader";
import { AuthConsumer as useAuth } from "./AuthContext";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<Errors<RegisterUser>>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const loginUser = async () => {
    try {
      const data = await loginUserAPI(username, password1);
      if (data.ok) {
        localStorage.setItem("token", data.result.key);
        login();
        window.location.replace("/");
      } else throw Error("something went wrong");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading((p) => true);
    const form: RegisterUser = {
      username: username,
      email: email,
      password1: password1,
      password2: password2,
    };
    try {
      const data = await register(form);
      if (data.ok) {
        alert(data.result.detail);
        loginUser();
      } else {
        setErrors(data.result);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading((p) => false);
    }
  };

  const SignupFields = [
    {
      title: "Username",
      name: "username",
      kind: "text",
      placeholder: "Your name",
      value: username,
      onChange: (e: { target: { value: string } }) => {
        setUsername((p) => e.target.value);
        setErrors(null);
      },
    },
    {
      title: "Email",
      name: "email",
      kind: "email",
      placeholder: "john.doe@gmail.com",
      value: email,
      onChange: (e: { target: { value: string } }) => {
        setEmail((p) => e.target.value);
        setErrors(null);
      },
    },
    {
      title: "Password",
      name: "password1",
      kind: "password",
      value: password1,
      onChange: (e: { target: { value: string } }) => {
        setPassword1((p) => e.target.value);
        setErrors(null);
      },
    },
    {
      title: "Confirm Password",
      name: "password2",
      kind: "password",
      value: password2,
      onChange: (e: { target: { value: string } }) => {
        setPassword2((p) => e.target.value);
        setErrors(null);
      },
    },
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-around">
      <Loader loading={loading} />
      <LoginForm
        errors={errors}
        fields={SignupFields}
        handleSubmitCB={handleSubmit}
        formFor={"Sign Up"}
        loading={loading}
      />
    </div>
  );
}

export default SignUp;
