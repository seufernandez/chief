import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { useUsers } from "../hooks/useUsers";
import useAxios from "axios-hooks";
import { Task } from "../dtos/User.dto";
import { EmptyList } from "./EmptyList";
import { useState } from "react";
import CreateTaskModal from "./CreatTaskModal";
import TaskRow from "./TaskRow";

const TableHeaderCell = (props: Record<any, any>) => (
  <TableCell
    sx={{
      fontWeight: "bold",
    }}
    {...props}
  />
);

const TasksList = () => {
  const { userId } = useUsers();
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  const [{ data, error: hasErrorInGetTasks }, refetchTasks] = useAxios(
    userId
      ? `${process.env.REACT_APP_SERVER_BASE_URL}/users/${userId}/tasks`
      : "",
    { useCache: false },
  );

  return (
    <Box sx={{ width: "85%", marginX: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          gap: 1,
          marginBottom: 1,
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsCreateTaskOpen(true)}
        >
          New Task
        </Button>
      </Box>

      {(data?.tasks.length <= 0 ||
        !data?.tasks ||
        hasErrorInGetTasks?.code === "404") && (
        <EmptyList text="There are no tasks to show, feel free to create a new task by clicking on the button above" taskList />
      )}

      {data?.tasks.length > 0 && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "secondary.light" }}>
              <TableRow>
                <TableHeaderCell align="left">Tasks:</TableHeaderCell>
                <TableHeaderCell align="left"></TableHeaderCell>
                <TableHeaderCell align="right"></TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.tasks.map((task: Task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  refetchTasks={refetchTasks}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CreateTaskModal
        open={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
        onTaskCreated={refetchTasks}
      />
    </Box>
  );
};

export default TasksList;
