import {
  Alert,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import useAxios from "axios-hooks";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { TextFieldError } from "./TextFieldError";
import { Task } from "../dtos/User.dto";

const editTaskSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
});

type EditTaskModalProps = {
  open: boolean;
  onClose: () => void;
  task: Task;
  onTaskUpdated: () => void;
};

const EditTaskModal = ({
  open,
  onClose,
  task,
  onTaskUpdated,
}: EditTaskModalProps) => {
  const [{ error }, executePut] = useAxios(
    {
      method: "PUT",
    },
    { manual: true },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editTaskSchema),
    defaultValues: { description: task.description },
  });

  const onFormSubmit = async (data: FieldValues) => {
    try {
      const updatedTask = { ...task, description: data.description };
      await executePut({
        url: `${process.env.REACT_APP_SERVER_BASE_URL}/tasks/${task.id}`,
        data: updatedTask,
      });
      toast.success("Task updated successfully!");
      onTaskUpdated();
      onClose();
    } catch (err) {
      console.error("error:", err);
      toast.error("Failed to update task.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Edit Task
        </Typography>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {error && (
              <Alert severity="error">
                Sorry - there was an error updating the task
              </Alert>
            )}
            <TextField
              label="Description"
              variant="outlined"
              {...register("description")}
            />
            <TextFieldError error={errors.description?.message} />
            <Button variant="contained" type="submit">
              Update Task
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditTaskModal;
