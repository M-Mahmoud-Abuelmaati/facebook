import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Outlet, Navigate } from "react-router-dom";
// import { RootState } from "../app/store";
import { checkAuth } from "../features/userSlice";

const ProtectedRoutes = (props: any) => {
  const dispatch = useDispatch();
  
  const onCheckAuth = useCallback(() => dispatch(checkAuth()), [dispatch]);
  // const user = useSelector((state: RootState) => state.users.user);


  useEffect(() => {
    onCheckAuth();
  }, [onCheckAuth]);
  
  const auth = localStorage.getItem("jwt");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
