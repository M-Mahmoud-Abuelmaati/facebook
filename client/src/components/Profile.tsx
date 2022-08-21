import { useEffect, useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdAddAPhoto } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import {
  addCoverImg,
  addProfileImg,
  changeUserLocation,
  changeUserProfileLocation,
  getCoverImg,
  getProfileImg,
  logOutUser,
} from "../features/userSlice";
import "../styles/profile.css";
import Navbar from "./nested/Navbar";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onHandleLogOut = async () => {
    await dispatch(logOutUser());
    navigate(0);
  };

  const userProfileLocation = localStorage.getItem("l2");

  const [activePage, setActivePage] = useState(userProfileLocation);

  const userId: any = localStorage.getItem("u1");
  const userName: any = localStorage.getItem("u2");
  const user = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    if (user.coverImg !== "") {
      dispatch(getCoverImg(user.coverImg));
    }
    if (user.img !== "") {
      dispatch(getProfileImg(user.img));
    }
  }, [dispatch, user.img, user, user.coverImg]);

  const uploadCoverPhoto = (e: any) => {
    const file = e.target.files[0];
    if (userId !== "") {
      dispatch(addCoverImg({ file, userId }));
    }
  };

  const uploadProfilePhoto = (e: any) => {
    const file = e.target.files[0];
    if (userId !== "") {
      dispatch(addProfileImg({ file, userId }));
    }
  };

  return (
    <div className="container">
      <div className="main-navbar">
        <Navbar />
      </div>
      <div className="profile-container">
        <div className="coverimg-profile-container">
          <img
            className="coverimg-profile"
            src={
              user.img !== ""
                ? `http://localhost:5000/public/${user.coverImg}`
                : ""
            }
            alt="mycover"
          />
          <form className="coverimg-profile-btn" encType="multipart/form-data">
            <input
              name="file"
              type="file"
              id="img1"
              className="uploadProfileCover"
              accept="image/png, image/gif, image/jpeg"
              onChange={uploadCoverPhoto}
            />
            <MdAddAPhoto size={20} />
            <label htmlFor="img1">Edit cover photo</label>
          </form>
        </div>
        <div className="img-profile-container">
          <img
            className="img-profile"
            src={
              user.img !== "" ? `http://localhost:5000/public/${user.img}` : ""
            }
            alt="myprofile"
          />

          <form className="img-profile-edit" encType="multipart/form-data">
            <input
              type="file"
              name="file"
              id="img2"
              className="uploadProfileCover"
              accept="image/png, image/gif, image/jpeg"
              onChange={uploadProfilePhoto}
            />
            <label htmlFor="img2">
              {" "}
              <MdAddAPhoto size={25} />
            </label>
          </form>

          <div className="img-profile-content-container">
            <h1 className="img-profile-name">{userName}</h1>
            <h5 className="img-profile-friends">{user.friends?.length}</h5>
            <div className="img-profile-friends-img-container">
              <>
                {user.friends?.map((i, index) => {
                  return (
                    <Link to={i.to} key={index}>
                      <img
                        className="img-profile-friends-img"
                        src={`http://localhost:5000/public/post/${i.friendId}`}
                        alt="myimages"
                      ></img>
                    </Link>
                  );
                })}
              </>
            </div>
          </div>
          <div className="img-profile-content-btn">
            <button className="img-profile-content-btn1">Add to story</button>
            <button className="img-profile-content-btn2">Edit profile</button>
          </div>
        </div>
        <hr className="hrLine" />
        <div className="primaryBtn-container">
          <div className="primaryBtn-container-inner">
            <Link
              to={"/profile"}
              className={
                activePage === "Posts"
                  ? "activeProfile primaryBtn"
                  : "primaryBtn"
              }
              title="Posts"
              onClick={() => {
                setActivePage("Posts");
                dispatch(changeUserProfileLocation("Posts"));
                dispatch(changeUserLocation("Profile"));
              }}
            >
              Posts
            </Link>
            <Link
              to={"/profile/about"}
              className={
                activePage === "About"
                  ? "activeProfile primaryBtn"
                  : "primaryBtn"
              }
              title="About"
              onClick={() => {
                setActivePage("About");
                dispatch(changeUserProfileLocation("About"));
                dispatch(changeUserLocation("Profile"));
              }}
            >
              About
            </Link>
            <Link
              to={"/profile/friends"}
              className={
                activePage === "Friends"
                  ? "activeProfile primaryBtn"
                  : "primaryBtn"
              }
              title="Friends"
              onClick={() => {
                setActivePage("Friends");
                dispatch(changeUserProfileLocation("Friends"));
                dispatch(changeUserLocation("Profile"));
              }}
            >
              Friends
            </Link>
            <Link to={"/profile"} className="primaryBtn">
              Videos
            </Link>
            <Link to={"/profile"} className="primaryBtn">
              Check-ins
            </Link>
            <Link to={"/profile"} className="primaryBtn">
              More <AiOutlineArrowDown />
            </Link>
          </div>
          <div className="primaryBtn-container-inner2">
            <Link
              to={"/profile"}
              className="threeDots"
              onClick={onHandleLogOut}
            >
              <BsThreeDots />
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
