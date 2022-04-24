import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "../common/Modal";
import { Board, Stage, Task } from "../types/task";
import { getBoard, getStages, getTasks } from "../utils/apiUtils";
import { DragApp } from "./DragApp";
import CreateStage from "../Stage/CreateStage";
import { LoadingDots } from "../common/Loader";
type Props = {};

const fetchBoard = async (
  board_pk: number,
  setBoardCB: (value: Board) => void
) => {
  try {
    const board = await getBoard(board_pk);
    if (board.ok) {
      setBoardCB(board.result);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchStages = async (
  board_pk: number,
  setStagesCB: (value: Stage[]) => void
) => {
  try {
    const stages = await getStages(board_pk);
    if (stages.ok) {
      setStagesCB(stages.result.results);
    }
  } catch (error) {
    console.log(error);
  }
};
export const fetchTasks = async (
  board_pk: number,
  setTasksCB: (value: Task[]) => void
) => {
  try {
    const tasks = await getTasks(board_pk);
    if (tasks.ok) {
      setTasksCB(tasks.result.results);
    }
  } catch (error) {
    console.log(error);
  }
};

function BoardView(props: Props) {
  let params = useParams();
  const [board, setBoard] = useState<Board>();
  const [tasks, setTasks] = useState<Task[]>();
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBoard(Number(params.pk), setBoard);
    fetchStages(Number(params.pk), setStages);
    fetchTasks(Number(params.pk), setTasks);
  }, [params.pk]);

  useEffect(() => {
    if (stages && tasks) {
      setLoading(false);
    }
  }, [stages, tasks]);

  const addStage = (newStage: Stage) => {
    setStages((p) => [...p, newStage]);
  };

  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <div className="font-medium text-3xl">
        {board ? board.title : "Loading..."}
      </div>
      <div className="flex justify-between items-center">
        <div>
          {/* <button
          onClick={() => {
            setOpen(true);
          }}
          className="border border-black rounded-md px-2 py-1 flex justify-evenly items-center"
          >
          <span>Filter</span>
        </button> */}
        </div>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="border rounded-md px-2 py-1 flex justify-evenly items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>New Stage</span>
        </button>
      </div>

      {!loading ? (
        stages &&
        tasks && (
          <div className="h-full mb-4 overflow-x-auto no-scrollbar">
            <DragApp stages={stages} tasks={tasks} />
          </div>
        )
      ) : (
        <LoadingDots />
      )}
      <Modal
        open={open}
        closeCB={() => {
          setOpen(false);
        }}
      >
        <CreateStage
          closeCB={() => {
            setOpen(false);
          }}
          addStageCB={addStage}
          board_pk={Number(params.pk)}
        />
      </Modal>
    </div>
  );
}

export default BoardView;
