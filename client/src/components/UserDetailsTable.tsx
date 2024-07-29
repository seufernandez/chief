import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { User } from "../dtos/User.dto";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../utils";

const TableHeaderCell = (props: Record<any, any>) => (
  <TableCell
    sx={{
      fontWeight: "bold",
    }}
    {...props}
  />
);

type Props = {
  user: User;
};

const UserDetailsTable = ({ user }: Props) => (
  <TableContainer component={Paper} sx={{ marginBottom: "3rem" }}>
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
        <TableRow
          key={user.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell>
            <Avatar
              {...stringAvatar(user?.first_name + " " + user?.last_name)}
            />
          </TableCell>
          <TableCell component="th" scope="row">
            {`${user.first_name} ${user.last_name}`}
          </TableCell>
          <TableCell align="center">{user.role}</TableCell>
          <TableCell align="right">{user.email}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);

export default UserDetailsTable;
