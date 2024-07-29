import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import CreateUserModal from "../../components/CreateUserModal";
import UsersTable from "../../components/UsersTable";
import { useUsers } from "../../hooks/useUsers";
import withLoadingHOC from "../../components/isLoadingHOC";

const HomeContent = ({ getUsersList, ...props }: any) => {
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  return (
    <>  
    <Typography variant="h1" component="h2" sx={{fontSize: 24}}>
      Task Manager App
    </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          gap: 1,
          marginBottom: 3,
        }}
      >      

        <Button
          variant="outlined"
          color="primary"
          onClick={() => getUsersList.refetch()}
        >
          Refresh
        </Button>
        <Button variant="contained" onClick={() => setIsCreateUserOpen(true)}>
          Create User
        </Button>
      </Box>
      <UsersTable users={getUsersList?.users} />
      <CreateUserModal
        open={isCreateUserOpen}
        handleClose={() => {
          setIsCreateUserOpen(!isCreateUserOpen);
        }}
      />
    </>
  );
};

const HomeWithLoading = withLoadingHOC(HomeContent);

const Home = () => {
  const { getUsersList } = useUsers();
  return <HomeWithLoading isLoading={getUsersList.isLoading} error={getUsersList.error} getUsersList={getUsersList} />;
};

export default Home;
