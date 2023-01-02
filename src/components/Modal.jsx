import { useContext, useRef, useState } from "react";
import { DataContext } from "../store/GlobalState";
import { deleteItem } from "../store/Actions";
import { deleteData } from "../server_utils/fetchData";
import { useRouter } from "next/router";
import { Modal, Button } from "@mui/material";
import { error, success } from "./Notify";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Popup() {
  const rootRef = useRef(null);
  const [state, dispatch] = useContext(DataContext);
  const { modal, auth } = state;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const router = useRouter();

  const deleteCoupon = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type));

    deleteData(`coupons/${item.id}`, auth.token).then((res) => {
      if (res.err) return error(res.err);
      return success(res.msg);
    });
  };

  const deleteUser = (item) => {
    dispatch(deleteItem(item.data, item.id, item.type));

    deleteData(`user/${item.id}`, auth.token).then((res) => {
      if (res.err) return error(res.err);
      return success(res.msg);
    });
  };

  const deleteCategories = (item) => {
    deleteData(`categories/${item.id}`, auth.token).then((res) => {
      if (res.err) return error(res.err);

      dispatch(deleteItem(item.data, item.id, item.type));
      return success(res.msg);
    });
  };

  const deleteProduct = (item) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    deleteData(`product/${item.id}`, auth.token).then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }
      dispatch({ type: "NOTIFY", payload: { loading: false } });
      success(res.msg);
    });
  };

  const handleSubmit = () => {
    if (modal.length !== 0) {
      setOpen(false);
      for (const item of modal) {
        if (item.type === "ADD_CART") {
          dispatch(deleteItem(item.data, item.id, item.type));
        }

        if (item.type === "ADD_USERS") deleteUser(item);

        if (item.type === "ADD_CATEGORIES") deleteCategories(item);

        if (item.type === "DELETE_PRODUCT") deleteProduct(item);

        if (item.type === "DELETE_COUPON") deleteCoupon(item);

        dispatch({ type: "ADD_MODAL", payload: [] });
      }
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        id="open-modal"
        style={{ opacity: 0, display: "none" }}
      >
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modal.length !== 0 && modal[0].title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to remove this item?
          </Typography>
          <div className="mt-10 d-flex">
            <Button sx={{ marginLeft: "auto" }} onClick={handleSubmit}>
              Yes
            </Button>
            <Button onClick={() => setOpen(false)}>No</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
