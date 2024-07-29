import { Box, Modal } from "@mui/material";
import EditUserForm from "./EditUserForm";
import { User } from "../../dtos/User.dto";

type Props = {
  open: boolean;
  handleClose: () => void;
  user: User;
};

const EditUserModal = ({ open, handleClose, user }: Props) => {
  return (
    <Modal open={open} onClose={handleClose}>
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
        <EditUserForm
          onSubmit={() => {
            handleClose();
          }}
          user={user}
        />
      </Box>
    </Modal>
  );
};

export default EditUserModal;
