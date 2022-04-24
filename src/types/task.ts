export type Task = {
  id: number;
  title: string;
  description: string;
  priority: number;
  completed: boolean;
  status_object: Stage;
  board_object: Board;
};

export type Board = {
  id: number;
  title: string;
  description: string;
};

export type Stage = {
  id: number;
  board: number;
  title: string;
  description: string;
};
