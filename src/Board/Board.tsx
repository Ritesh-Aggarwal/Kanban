import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stage } from "../types/task";
import { getStages, getTasks } from "../utils/apiUtils";
type Props = {};

const fetchData = async (
  board_pk: number,
  setStagesCB: (value: Stage[]) => void,
  setLoadingCB: (value: boolean) => void
) => {
  try {
    const tasks = await getTasks(board_pk);
    const stages = await getStages(board_pk);
    if (stages.ok) {
      setStagesCB(stages.result.results);
      setLoadingCB(false);
    }
    console.log(tasks, stages);
  } catch (error) {
    console.log(error);
  }
};

function BoardView(props: Props) {
  let params = useParams();
  //   const [board, setBoard] = useState<Board>();
  //   const [tasks, setTasks] = useState<Task[]>();
  const [stages, setStages] = useState<Stage[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(Number(params.pk), setStages, setLoading);
  }, [params.pk]);

  return (
    <div className="p-4">
      <div className="font-medium text-3xl mb-4">Board {params.pk}</div>
      {!loading &&
        stages?.map((stage, idx) => {
          return <div key={idx}>{stage.title}</div>;
        })}
    </div>
  );
}

export default BoardView;
