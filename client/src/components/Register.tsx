import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { GrClose } from "react-icons/gr";
import { BiErrorAlt } from "react-icons/bi";
import "../styles/Register.css";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser, removeLoginStatus } from "../features/userSlice";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";

const Register = ({ handleClose, open }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userStatus = useSelector((state: RootState) => state.users.registerStatus);
  const userStatusError: { name: string; email: string; password: string } =
    useSelector((state: RootState) => state.users.registerError);

  const onCheckUser = useCallback(() => {
    if (userStatus === "succeeded") {
      dispatch(removeLoginStatus(""));
      setName("");
      setEmail("");
      setPassword("");
      navigate(0);
      handleClose();
    }
  }, [userStatus, navigate, dispatch, handleClose]);

  useEffect(() => {
    onCheckUser();
  }, [onCheckUser]);

  const handleSubmit = () => {
    dispatch(
      addNewUser({
        name,
        email,
        password,
      })
    );
    
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: 1,
    boxShadow: 25,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div id="transition-modal-title" className="modal-header">
            <h1>Sign Up</h1>
            <button onClick={handleClose}>
              <GrClose size={20} color={"black"} />
            </button>
          </div>
          <div className="title-description">
            <h3>It's quick and easy</h3>
            <hr />
          </div>
          <div className="register-info">
            <div className="register-text">
              {userStatusError !== null && userStatusError.name !== "" && (
                <span className="error">
                  <BiErrorAlt size={12} color="red" />
                  {userStatusError.name}
                </span>
              )}
              <input
                name="username"
                className="inputText"
                type="text"
                title="What's your name?"
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="register-text">
              {userStatusError !== null && userStatusError.email !== "" && (
                <span className="error">
                  <BiErrorAlt size={12} color="red" />
                  {userStatusError.email}
                </span>
              )}
              <input
                name="email"
                className="inputText"
                type="text"
                title="What's your email address?"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </div>
            <div className="register-text">
              {userStatusError !== null && userStatusError.password !== "" && (
                <span className="error">
                  <BiErrorAlt size={12} color="red" />
                  {userStatusError.password}
                </span>
              )}
              <input
                name="password"
                className="inputText"
                type="password"
                title="Enter new password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
          </div>
          <div className="registerBtnContainer">
            <button className="registerBtn" onClick={handleSubmit}>
              Sign Up
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Register;
