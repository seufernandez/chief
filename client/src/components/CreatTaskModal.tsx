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
import { useUsers } from "../hooks/useUsers";
import { TextFieldError } from "./TextFieldError";

const createTaskSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
});

type CreateTaskModalProps = {
  open: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
};

const CreateTaskModal = ({
  open,
  onClose,
  onTaskCreated,
}: CreateTaskModalProps) => {
  const { userId } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createTaskSchema),
  });

  const [{ loading, error }, executePost] = useAxios(
    {
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/tasks`,
      method: "POST",
    },
    { manual: true },
  );

  const onFormSubmit = async (data: FieldValues) => {
    try {
      await executePost({
        data: { description: data.description, user_id: Number(userId) },
      });
      toast.success("Task created successfully!");
      reset();
      onTaskCreated();
      onClose();
    } catch (err) {
      console.error("error:", err);
      toast.error("Failed to create task.");
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
          Create New Task
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
                Sorry - there was an error creating the task
              </Alert>
            )}
            <TextField
              label="Description"
              variant="outlined"
              {...register("description")}
            />
            <TextFieldError error={errors.description?.message} />
            <Button variant="contained" type="submit" disabled={loading}>
              Create Task
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateTaskModal;
