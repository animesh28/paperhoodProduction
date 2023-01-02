import { useReducer, createContext, useEffect } from "react";
import { getData } from "../server_utils/fetchData";
import reducers from "./Reducers";
import { error } from "../components/Notify";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    cart: [],
    modal: [],
    orders: [],
    users: [],
    categories: [],
    tickets: [],
    coupons: [],
    products: [],
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, auth } = state;

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");
        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
    }
    getData("categories").then((res) => {
      if (res.err) return error(res.err);

      dispatch({
        type: "ADD_CATEGORIES",
        payload: res.categories,
      });
    });
  }, []);

  useEffect(() => {
    const paperhood__cart = JSON.parse(localStorage.getItem("paperhood__cart"));

    if (paperhood__cart)
      dispatch({ type: "ADD_CART", payload: paperhood__cart });
  }, []);

  useEffect(() => {
    localStorage.setItem("paperhood__cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (auth.token) {
      getData("order", auth.token).then((res) => {
        if (res.err) return error(res.err);

        dispatch({ type: "ADD_ORDERS", payload: res.orders });
      });

      if (auth.user.role != "user") {
        getData("help", auth.token).then((res) => {
          if (res.err) return error(res.err);

          dispatch({ type: "ADD_TICKET", payload: res.tickets });
        });
      }

      getData("product/all").then((res) => {
        if (res.err) return error(res.err);

        dispatch({ type: "ADD_PRODUCT", payload: res.products });
      });

      if (
        (auth.user.role === "admin" && auth.user.root === true) ||
        auth.user.role === "op"
      ) {
        getData("user", auth.token).then((res) => {
          if (res.err) return error(res.err);

          dispatch({ type: "ADD_USERS", payload: res.users });
        });
      }

      getData("coupons", auth.token).then((res) => {
        if (res.err) return error(res.err);

        dispatch({ type: "ADD_COUPON", payload: res.coupons });
      });
    } else {
      dispatch({ type: "ADD_ORDERS", payload: [] });
      dispatch({ type: "ADD_USERS", payload: [] });
    }
  }, [auth.token]);

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  );
};
