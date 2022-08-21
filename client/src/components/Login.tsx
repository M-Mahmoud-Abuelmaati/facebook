import React, { useState, useCallback, useEffect } from "react";
import "../styles/Login.css";
import Register from "./Register";
import { removeLoginStatus, logInUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { BiErrorAlt } from "react-icons/bi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPasswordError, setloginPasswordError] = useState("");
  const [loginEmailError, setloginEmailError] = useState("");

  const userLoginStatus = useSelector(
    (state: RootState) => state.users.loginStatus
  );
  const userStatusError : { name: string; email: string; password: string } = useSelector(
    (state: RootState) => state.users.loginError
  );

  const onCheckUser = useCallback(() => {
    if (userLoginStatus === "succeeded") {
      dispatch(removeLoginStatus(""));
      setloginEmailError("");
      setloginPasswordError("");
      setLoginEmail("");
      setLoginPassword("");
      navigate(0);
    }
  }, [userLoginStatus, navigate, dispatch]);

  useEffect(() => {
    onCheckUser();
  }, [onCheckUser]);

  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (loginEmail === "" && loginPassword === "") {
      setloginPasswordError("Please fill the empty fields");
      setloginEmailError("Please fill the empty fields");
      return;
    } else if (loginEmail === "" && loginPassword !== "") {
      setloginEmailError("Please fill the empty fields");
      setloginPasswordError("");
      return;
    } else if (loginPassword === "" && loginEmail !== "") {
      setloginPasswordError("Please fill the empty fields");
      setloginEmailError("");
      return;
    }
    dispatch(
      logInUser({
        loginEmail,
        loginPassword,
      })
    );
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (e: any) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <div className="register">
      <div className="register-container">
        <div className="facebook-text">
          <h1>facebook</h1>
          <h2>
            Facebook helps you connect and share with the people in your life.
          </h2>
        </div>
        <div className="register-card">
          <form action="" className="register-card-inner">
            <div className="login-text-error">
              {userStatusError !== null && userStatusError.email !== "" && (
                <span className="login-error">
                  <BiErrorAlt size={12} color="red" />
                  {userStatusError.email}
                </span>
              )}
              {loginEmailError !== "" && userStatusError === null && (
                <span className="login-error">
                  <BiErrorAlt size={12} color="red" />
                  {loginEmailError}
                </span>
              )}
              <input
                type="text"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="login-text-error">
              {userStatusError !== null && userStatusError.password !== "" && (
                <span className="login-error">
                  <BiErrorAlt size={12} color="red" />
                  {userStatusError.password}
                </span>
              )}
              {loginPasswordError !== "" && userStatusError === null && (
                <span className="login-error">
                  <BiErrorAlt size={12} color="red" />
                  {loginPasswordError}
                </span>
              )}
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button className="loginBtn" onClick={handleSubmit}>
              Login
            </button>
            <a href="forget" className="Link">
              Forgotten password?
            </a>
            <hr className="line" />
            <button onClick={handleOpen} className="registerBtn">
              Create New Account
            </button>
          </form>
        </div>
      </div>
      <Register open={open} handleClose={handleClose} />
    </div>
  );
};

export default Login;
