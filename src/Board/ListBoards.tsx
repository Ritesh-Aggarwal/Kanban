import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "../common/Dropdown";
import Modal from "../common/Modal";
import { Board } from "../types/task";
import { deleteBoard, getBoards } from "../utils/apiUtils";
import CreateBoard from "./CreateBoard";

// const Modal = React.lazy(()=>import("../common/Modal"))
// const CreateBoard = React.lazy(()=>import("./CreateBoard"))

const fetchBoards = async (
  setBoardsCB: (value: Board[]) => void,
  setLoadingCB: (value: boolean) => void
) => {
  setLoadingCB(true);
  try {
    const data = await getBoards();
    if (data.ok) {
      setBoardsCB(data.result.results);
      setLoadingCB(false);
    } else window.location.replace("/");
  } catch (err) {
    console.log(err);
  }
};

function ListBoards() {
  const [open, setOpen] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBoards(setBoards, setLoading);
  }, []);

  const addBoard = (newBoard: {
    id: number;
    title: string;
    description: string;
  }) => {
    setBoards((p) => [...p, newBoard]);
  };

  const removeBoard = (id: number) => {
    setBoards((p) => p.filter((b) => b.id !== id));
  };

  return (
    <div className="p-4">
      <div className="font-medium text-3xl mb-4">My Boards</div>
      <div className="mb-4 flex justify-between items-center">
        <div></div>
        {/* <button
          onClick={() => {
            setOpen(true);
          }}
          className="border border-black rounded-md px-2 py-1 flex justify-evenly items-center"
        >
          <span>Filter</span>
        </button> */}
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
          <span>New Board</span>
        </button>
      </div>
      {!loading ? (
        <div className="grid grid-cols-3 gap-2">
          {boards?.map((item, idx) => {
            return (
              <div className=" h-36 max-w-xs" key={idx}>
                <BoardCard item={item} removeBoardsCB={removeBoard} />
              </div>
            );
          })}
        </div>
      ) : (
        <CardPulse count={3} />
      )}
      <Modal
        open={open}
        closeCB={() => {
          setOpen(false);
        }}
      >
        <CreateBoard
          closeCB={() => {
            setOpen(false);
          }}
          addBoardCB={addBoard}
        />
      </Modal>
    </div>
  );
}

export default ListBoards;

function CardPulse(props: { count: number }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from(Array(props.count).keys()).map((i) => {
        return (
          <div className="h-40 max-w-xs" key={i}>
            <div className="min-h-full rounded-md bg-slate-900 p-4 ">
              <div className="animate-pulse flex flex-col gap-2">
                <div className="text-xl font-medium">
                  <div className=" rounded bg-slate-600 h-2 w-24"></div>
                </div>
                <div className="text-ellipsis h-24 overflow-hidden">
                  <div className=" rounded bg-slate-500 h-2 w-full"></div>
                  <div className="grid grid-cols-3 gap-4 my-2">
                    <div className="h-2 bg-slate-500 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-500 rounded col-span-1"></div>
                  </div>
                  <div className=" rounded bg-slate-500 h-2 w-full"></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const BoardCard = ({
  item,
  removeBoardsCB,
}: {
  item: Board;
  removeBoardsCB: (id: number) => void;
}) => {
  const navigate = useNavigate();
  const removeBoard = (pk: number) => {
    try {
      deleteBoard(pk);
      removeBoardsCB(pk);
    } catch (err) {
      console.log(err);
    }
  };

  const menu = [
    {
      label: "View",
      onClick: () => {
        navigate(`/boards/${item.id}`);
      },
    },
    {
      label: "Delete",
      onClick: () => {
        removeBoard(item.id);
      },
    },
  ];
  return (
    <div className="min-h-full rounded-md bg-slate-900 p-4 flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <div className="text-xl font-medium">{item.title}</div>
        <div className="">
          <Dropdown
            menuButton={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            }
            menu={menu}
          />
        </div>
      </div>
      <div className="flex-1 ">
        <div className="max-h-full overflow-hidden text-ellipsis">
          {item.description.length > 80
            ? item.description.slice(0, 80) + "..."
            : item.description}
        </div>
      </div>
    </div>
  );
};
