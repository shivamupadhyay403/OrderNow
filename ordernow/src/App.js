import React, { useEffect } from "react";
import { Suspense } from "react";
import Spinner from "./_assets/Spinner/Spinner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Logout } from "./_assets/_helperfunctions/Logout";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { verifyToken } from "./store/verifyTokenSlice";
const App = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("order_now");
  useEffect(() => {
    if (token) {
      dispatch(verifyToken(token));
    } else {
      Logout();
    }
  }, [token,dispatch]);
  return <Suspense fallback={<Spinner />}>

    
  </Suspense>;
};

export default App;
