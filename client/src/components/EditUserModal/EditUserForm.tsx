import { Alert, Box, Button, TextField } from "@mui/material";
import useAxios from "axios-hooks";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { User } from "../../dtos/User.dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextFieldError } from "../TextFieldError";
import toast from "react-hot-toast";
import { useUsers } from "../../hooks/useUsers";

const editUserFormSchema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  role: z.string().min(1, { message: "Role is required" }),
});

type Props = {
  onSubmit: () => void;
  user: User;
};

const EditUserForm = ({ onSubmit, user }: Props) => {
  const {
    getSingleUser: { refetch },
  } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    },
  });

  const [{ loading, error }, executePut] = useAxios(
    {
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/users/${user.id}`,
      method: "PUT",
    },
    { manual: true },
  );

  const onFormSubmit = async (data: FieldValues) => {
    try {
      await executePut({ data });
      toast.success("Successfully updated!");
      refetch();
      onSubmit();
    } catch (err) {
      console.error("error:", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {error && (
            <Alert severity="error">
              Sorry - there was an error updating user
            </Alert>
          )}
          <TextField
            label="First Name"
            variant="outlined"
            {...register("first_name")}
          />
          <TextFieldError error={errors.first_name?.message} />
          <TextField
            label="Last Name"
            variant="outlined"
            {...register("last_name")}
          />
          <TextFieldError error={errors.last_name?.message} />

          <TextField label="Email" variant="outlined" {...register("email")} />
          <TextFieldError error={errors.email?.message} />

          <TextField label="Role" variant="outlined" {...register("role")} />
          <TextFieldError error={errors.role?.message} />

          <Button variant="contained" type="submit" disabled={loading}>
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EditUserForm;
