import {
  TableCell,
  TableRow,
  Checkbox,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Task } from "../dtos/User.dto";
import { useState } from "react";
import useAxios from "axios-hooks";
import toast from "react-hot-toast";
import EditTaskModal from "./EditTaskModal";

type TaskRowProps = {
  task: Task;
  refetchTasks: () => void;
};

const TaskRow = ({ task, refetchTasks }: TaskRowProps) => {
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);

  const [{}, executePut] = useAxios(
    {
      method: "PUT",
    },
    { manual: true },
  );

  const [{}, executeDelete] = useAxios(
    {
      method: "DELETE",
    },
    { manual: true },
  );

  const handleTaskCheck = async () => {
    try {
      const updatedTask = { ...task, is_done: task.is_done == true ? 0 : 1 };
      await executePut({
        url: `${process.env.REACT_APP_SERVER_BASE_URL}/tasks/${task.id}`,
        data: updatedTask,
      });
      toast.success("Task updated successfully!");
      refetchTasks();
    } catch (err) {
      console.error("error:", err);
      toast.error("Failed to update task.");
    }
  };

  const handleDeleteTask = async () => {
    try {
      await executeDelete({
        url: `${process.env.REACT_APP_SERVER_BASE_URL}/tasks/${task.id}`,
      });
      toast.success("Task deleted successfully!");
      refetchTasks();
    } catch (err) {
      console.error("error:", err);
      toast.error("Failed to delete task.");
    }
  };

  return (
    <>
      <TableRow key={task.id}>
        <TableCell align="center" padding="checkbox">
          <Checkbox
            color="primary"
            checked={task.is_done == true}
            onChange={handleTaskCheck}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        <TableCell align="left">
          <Typography
            sx={{ textDecoration: task.is_done ? "line-through" : "none" }}
          >
            {task.description}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={() => setIsEditTaskOpen(true)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDeleteTask}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <EditTaskModal
        open={isEditTaskOpen}
        onClose={() => setIsEditTaskOpen(false)}
        task={task}
        onTaskUpdated={refetchTasks}
      />
    </>
  );
};

export default TaskRow;
