import { Box, Button, CircularProgress } from "@mui/material";
import useAxios from "axios-hooks";
import { useEffect, useState } from "react";
import MessageContainer from "../../components/MessageContainer";
import EditUserModal from "../../components/EditUserModal";
import { useNavigate, useParams } from "react-router-dom";
import UserDetailsTable from "../../components/UserDetailsTable";
import toast from "react-hot-toast";
import { useUsers } from "../../hooks/useUsers";
import TasksList from "../../components/TasksList";
import { EmptyList } from "../../components/EmptyList";

const UserDetails = () => {
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { setUserId, getSingleUser, getUsersList } = useUsers();

  useEffect(() => {
    setUserId(id ?? null);
  }, [id]);

  const [{ loading: deleteLoading, error: deleteError }, deleteUser] = useAxios(
    {
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/users/${id}`,
      method: "DELETE",
    },
    { manual: true },
  );

  const handleDelete = async () => {
    try {
      await deleteUser();
      toast.success("Successfully deleted");
      getUsersList.refetch();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  if (getSingleUser.isLoading) {
    return (
      <MessageContainer>
        <CircularProgress />
      </MessageContainer>
    );
  }

  if (getSingleUser.error) {
    return (
      <MessageContainer>
        <Box>Error loading user</Box>
        <Button variant="contained" onClick={() => getSingleUser.refetch()}>
          Retry
        </Button>
      </MessageContainer>
    );
  }

  if (!getSingleUser.user) {
    return <EmptyList text="User not found :(" />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          gap: 1,
          marginBottom: 3,
        }}
      >
        <Button variant="contained" onClick={() => setIsEditUserOpen(true)}>
          Edit user
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={deleteLoading}
        >
          {deleteLoading ? <CircularProgress /> : "Delete user"}
        </Button>
      </Box>
      <UserDetailsTable user={getSingleUser.user} />
      <TasksList />

      <EditUserModal
        open={isEditUserOpen}
        handleClose={() => {
          setIsEditUserOpen(!isEditUserOpen);
        }}
        user={getSingleUser.user}
      />

      {deleteError && (
        <MessageContainer>
          <Box>Error deleting user</Box>
          <Button variant="contained" onClick={handleDelete}>
            Retry
          </Button>
        </MessageContainer>
      )}
    </>
  );
};

export default UserDetails;
