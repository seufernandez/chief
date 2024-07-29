import { Paper, TableContainer } from "@mui/material";

export function EmptyList({
  text,
  taskList,
}: {
  text: string;
  taskList?: boolean;
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: taskList ? "secondary.light" : null,
      }}
    >
      <p>{text}</p>
    </TableContainer>
  );
}
