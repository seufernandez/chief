import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../utils";
import { EmptyList } from "./EmptyList";

const TableHeaderCell = (props: Record<any, any>) => (
  <TableCell
    sx={{
      fontWeight: "bold",
    }}
    {...props}
  />
);

type Props = {
  users: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  }[];
};

const UsersTable = ({ users }: Props) => {
  const navigate = useNavigate();

  if (users.length === 0) {
    return <EmptyList text="No users found :(" />;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead sx={{ backgroundColor: "primary.light" }}>
          <TableRow>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell align="center">Role</TableHeaderCell>
            <TableHeaderCell align="right">Email</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => navigate(`/users/${user.id}`)}
            >
              <TableCell sx={{ fontSize: "1rem" }}>
                <Avatar
                  {...stringAvatar(user?.first_name + " " + user?.last_name)}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {`${user.first_name} ${user.last_name}`}
              </TableCell>
              <TableCell align="center">{user.role ?? "-"}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
