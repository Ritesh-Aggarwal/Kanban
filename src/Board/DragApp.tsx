import React, { useEffect, useState } from "react";
import { DragDropContext } from "@react-forked/dnd";
import { Column } from "../Stage/Column";
import { Stage, Task } from "../types/task";
import {
  deleteStage,
  updateTask as updateTaskPriority,
} from "../utils/apiUtils";

type Col = {
  stage: Stage;
  tasks: Task[];
};

const updateTask = async (updatedTask: Task, updatedStatus: number) => {
  try {
    const data = await updateTaskPriority(
      updatedTask.board_object.id,
      updatedStatus,
      updatedTask
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export function DragApp(props: { stages: Stage[]; tasks: Task[] }) {
  const [columns, setColumns] = useState<Col[]>([]);

  useEffect(() => {
    setColumns(
      props.stages.map((stage) => {
        return {
          stage: stage,
          tasks: props.tasks.filter((i) => i.status_object.id === stage.id),
        };
      })
    );
  }, [props]);

  const addTaskAction = (stage_pk: number, newTask: Task) => {
    setColumns((p) =>
      p.map((col) => {
        if (col.stage.id === stage_pk) {
          return { ...col, tasks: [newTask, ...col.tasks] };
        } else return col;
      })
    );
  };

  const removeStage = async (stage_pk: number) => {
    try {
      deleteStage(stage_pk);
      setColumns((p) => p.filter((i) => i.stage.id !== stage_pk));
    } catch (error) {
      console.log(error);
    }
  };

  const moveToLast = (task: Task) => {
    setColumns((p) =>
      p.map((col) => {
        if (col.stage.id === task.status_object.id) {
          return {
            ...col,
            tasks: [...col.tasks.filter((i) => i.id !== task.id), task],
          };
        } else return col;
      })
    );
  };

  const removeTask = (task: Task) => {
    setColumns((p) =>
      p.map((col) => {
        if (col.stage.id === task.status_object.id) {
          return {
            ...col,
            tasks: col.tasks.filter((i) => i.id !== task.id),
          };
        } else return col;
      })
    );
  };

  const editTask = (task: Task) => {
    setColumns((p) =>
      p.map((col) => {
        if (col.stage.id === task.status_object.id) {
          return {
            ...col,
            tasks: col.tasks.map((i) => {
              if (i.id === task.id) {
                return task;
              } else return i;
            }),
          };
        } else return col;
      })
    );
  };

  return (
    <DragDropContext
      onDragEnd={({ destination, source, draggableId, type }) => {
        //if dropped out of dragdropcontext
        if (!destination) {
          return;
        }
        //if source location same as destination
        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }

        //check task starting column
        const startingcol = columns.filter(
          (col) => String(col.stage.id) === source.droppableId
        )[0];

        const draggedTask = startingcol.tasks.filter(
          (t) => String(t.id) === draggableId
        )[0];
        //check destination column of task
        const endingcol = columns.filter(
          (col) => String(col.stage.id) === destination.droppableId
        )[0];
        //if start and end column are same
        if (startingcol === endingcol) {
          //copy original task order in the col
          const tasks = Array.from(startingcol.tasks);
          updateTask(
            {
              ...draggedTask,
              priority: destination.index,
            },
            draggedTask.status_object.id
          );
          //remove task from its prev location
          tasks.splice(source.index, 1);
          //add the task to destination
          tasks.splice(destination.index, 0, draggedTask);

          //update state by overwritting the column
          setColumns((p) => {
            return p.map((col) => {
              if (startingcol.stage.id === col.stage.id) {
                return { ...col, tasks: tasks };
              } else return col;
            });
          });

          return;
        } else {
          //if moving between cols
          //get stating task order
          const startTasks = Array.from(startingcol.tasks);
          //remove task from inital location
          startTasks.splice(source.index, 1);
          //get the destination col task order
          const endTasks = Array.from(endingcol.tasks);
          //add the task to dest. col
          endTasks.splice(destination.index, 0, draggedTask);
          updateTask(
            {
              ...draggedTask,
              priority: destination.index,
            },
            Number(destination.droppableId)
          );
          //update state
          setColumns((p) => {
            return p.map((col) => {
              if (startingcol.stage.id === col.stage.id) {
                return { ...col, tasks: startTasks };
              } else if (endingcol.stage.id === col.stage.id) {
                return { ...col, tasks: endTasks };
              } else return col;
            });
          });
        }
      }}
    >
      <div className="flex gap-2 h-full w-max">
        {columns.map((column, i) => {
          return (
            <Column
              key={column.stage.id}
              index={i}
              column={column.stage}
              tasks={column.tasks}
              addTaskCB={addTaskAction}
              removeStageCB={removeStage}
              moveToLastCB={moveToLast}
              setTaskCB={editTask}
              removeTaskCB={removeTask}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}
