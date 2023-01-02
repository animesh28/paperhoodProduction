import { useEffect, useState, useContext } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { DataContext } from "../../store/GlobalState";
import { decrease, increase } from "../../store/Actions";
import { getData, postData } from "../../server_utils/fetchData";
import Link from "next/link";
import { useRouter } from "next/router";
import { error } from "../Notify";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function CartDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [callback, setCallback] = useState(false);
  const [state, dispatch] = useContext(DataContext);
  const { cart, auth } = state;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [total, setTotal] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(res);
    };

    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("paperhood__cart"));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`);
          const { _id, title, images, price, sold } = res.product;

          newArr.push({
            _id,
            title,
            images,
            price,
            sold,
            quantity: item.quantity,
          });
        }

        dispatch({ type: "ADD_CART", payload: newArr });
      };

      updateCart();
    }
  }, [callback]);

  const makePayment = async () => {
    router.push("/checkout");
  };

  return auth && auth.user ? (
    <Box>
      <CssBaseline />
      <div className="cart cursor-pointer mr-10">
        <ShoppingCartIcon aria-label="open drawer" onClick={handleDrawerOpen} />
        <span className="cart-total">{cart.length}</span>
      </div>
      <Drawer
        variant="persistent"
        anchor="right"
        open={open}
        className="cart_container"
      >
        <DrawerHeader className="justify-content-between align-items-center">
          <h5 className="ml-10">Cart</h5>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {cart &&
            cart.length > 0 &&
            cart.map((item, index) => (
              <ListItem
                key={item._id + "li_cart-item-selected"}
                className="li_cart-item-selected justify-content-around"
                disablePadding
                sx={{ padding: "10px 15px", borderBottom: "2px solid grey" }}
              >
                <ListItemIcon>
                  <img
                    src={item.images[0].url}
                    style={{ width: "70px", height: "90px" }}
                  />
                </ListItemIcon>
                <div className="d-flex flex-column">
                  <ListItemText primary={item.title} />
                  <div className="d-flex align-items-center justify-content-between">
                    <span style={{ fontSize: "14px" }} className="my-1">
                      Quantity: {item.quantity}
                    </span>

                    <i
                      className="fas fa-trash cursor-pointer ml-10"
                      style={{ fontSize: "12px", color: "#8b0000" }}
                      onClick={() => {
                        dispatch({
                          type: "ADD_MODAL",
                          payload: [
                            {
                              data: cart,
                              id: item._id,
                              title: item.title,
                              type: "ADD_CART",
                            },
                          ],
                        });

                        document.querySelector("#open-modal").click();
                      }}
                    ></i>
                  </div>
                  <div className="d-flex">
                    <IconButton
                      onClick={() => dispatch(increase(cart, item._id))}
                    >
                      <AddCircleIcon sx={{ margin: 0 }} />
                    </IconButton>
                    <IconButton
                      disabled={item.quantity === 1 ? true : false}
                      onClick={() => dispatch(decrease(cart, item._id))}
                    >
                      <RemoveCircleIcon sx={{ margin: 0 }} />
                    </IconButton>
                  </div>
                </div>
              </ListItem>
            ))}
        </List>
        <br />
        <div className="px-3 mb-20">Total: ₹ {total}</div>

        {cart.length > 0 && (
          <div className="px-3 d-flex justify-content-center">
            <Button onClick={makePayment} variant="contained">
              Checkout
            </Button>
          </div>
        )}
      </Drawer>
    </Box>
  ) : null;
}
