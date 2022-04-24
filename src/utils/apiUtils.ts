import { Task } from "../types/task";
import { RegisterUser } from "../types/user";

// const API_BASE_URL = "http://localhost:8000/api/";
const API_BASE_URL = "https://kanban-api-django.herokuapp.com/api/";

type ReqMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const request = async (
  endpoint: string,
  method: ReqMethod = "GET",
  data: any = {},
  options: { auth: boolean } = { auth: true }
) => {
  let url, payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }
  //basic auth
  //   const auth = "Basic " + window.btoa("super:super");

  //token auth
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + token : "";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: options.auth ? auth : "",
    },
    body: payload ? payload : null,
  });
  if (response.ok) {
    const json = await response.json();
    return { ok: true, result: json };
  } else {
    const errorJson = await response.json();
    return { ok: false, result: errorJson };
    // throw Error(errorJson);
  }
};

export const register = (body: RegisterUser) => {
  return request("auth/registration/", "POST", body, { auth: false });
};

export const login = (username: string, password: string) => {
  return request(
    "auth/login/",
    "POST",
    {
      username: username,
      password: password,
    },
    { auth: false }
  );
};

export const logout = async () => {
  try {
    const data = await request("auth/logout/", "POST", {});
    if (data.ok) {
      localStorage.removeItem("token");
    }
  } catch (err) {
    console.log(err);
  }
};

export const me = () => {
  return request("auth/user/", "GET");
};

export const getBoards = () => {
  return request("boards/", "GET");
};

export const getBoard = (board_pk: number) => {
  return request("boards/" + board_pk + "/", "GET");
};

export const createBoard = (title: string, description: string) => {
  return request("boards/", "POST", { title: title, description: description });
};

export const deleteBoard = (pk: number) => {
  return request("boards/" + pk + "/", "DELETE");
};

export const getTasks = (board_pk: number) => {
  return request("boards/" + board_pk + "/tasks/", "GET");
};

export const createTask = (
  board_pk: number,
  stage_pk: number,
  title: string,
  description: string
) => {
  return request("boards/" + board_pk + "/tasks/", "POST", {
    title: title,
    description: description,
    priority: 0,
    status: stage_pk,
  });
};

export const getStages = (board_pk: number) => {
  return request("boards/" + board_pk + "/status/", "GET");
};

export const updateTask = (
  board_pk: number,
  status_pk: number,
  updatedTask: Task
) => {
  return request(
    "boards/" + board_pk + "/tasks/" + updatedTask.id + "/",
    "PUT",
    { ...updatedTask, status: status_pk }
  );
};

export const createStage = (
  board_pk: number,
  title: string,
  description: string
) => {
  return request("boards/" + board_pk + "/status/", "POST", {
    title: title,
    description: description,
  });
};

export const deleteStage = (stage_pk: number) => {
  return request("status/" + stage_pk + "/", "DELETE");
};
