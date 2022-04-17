import React, { useState } from "react";
import { Errors, LoginUser } from "../types/user";
import { login as loginUser } from "../utils/apiUtils";
import LoginForm from "./LoginForm";
import Loader from "../common/Loader";
import { AuthConsumer as useAuth } from "./AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors<LoginUser>>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading((p) => true);
    try {
      const data = await loginUser(username, password);
      if (data.ok) {
        localStorage.setItem("token", data.result.key);
        setLoading((p) => false);
        login();
        window.location.replace("/");
      } else {
        setErrors(data.result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const LoginFields = [
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
      title: "Password",
      name: "password1",
      kind: "password",
      value: password,
      onChange: (e: { target: { value: string } }) => {
        setPassword((p) => e.target.value);
        setErrors(null);
      },
    },
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-around">
      <Loader loading={loading} />
      <LoginForm
        errors={errors}
        fields={LoginFields}
        handleSubmitCB={handleSubmit}
        formFor={"Login"}
        loading={loading}
      />
    </div>
  );
}

export default Login;
