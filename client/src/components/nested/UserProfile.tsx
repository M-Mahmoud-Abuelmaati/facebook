import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { fetchPosts } from "../../features/postSlice";
import "../../styles/profilePosts.css";
import Post from "./Post";
import { AiOutlineArrowDown } from "react-icons/ai";

import {
  changeUserLocation,
  changeUserProfileLocation,
  findUser,
  findUserByIdAndAddFriend,
  findUserByIdAndAddFriendRequest,
} from "../../features/userSlice";
import "../../styles/profile.css";
import Navbar from "../nested/Navbar";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const posts = useSelector((state: RootState) => state.posts.value);
  const postsStatus = useSelector((state: RootState) => state.posts.status);
  const userFinded = useSelector((state: RootState) => state.users.findedUser);

  const user = useSelector((state: RootState) => state.users.user);
  const findedUserState = useSelector(
    (state: RootState) => state.users.findedUserState
  );

  let content;
  if (postsStatus === "succeeded") {
    if (findedUserState === "failed") {
      navigate("/");
    }
    content = posts.map((post) => {
      if (post.postCreatedById === userFinded._id) {
        return (
          <Post
            key={post._id}
            id={post._id}
            text={post.text}
            reacts={post.reacts}
            comment={post.comments}
            postCreatedById={post.postCreatedById}
            postCreatedByName={post.postCreatedByName}
          />
        );
      }
      return "";
    });
  }
  const userProfileLocation = useSelector(
    (state: RootState) => state.users.userProfileLocation
  );
  const [activePage, setActivePage] = useState(userProfileLocation);

  //State
  const [checkFriendRequest, setCheckFriendRequest] = useState<number>(0);

  //State
  const [checkFriendNotification, setCheckFriendNotification] =
    useState<number>(0);

  const [showFriendBtn, setShowFriendBtn] = useState<number>(0);

  //0 Add Friend
  //1 Pending
  useEffect(() => {
    const test = userFinded.friendRequests?.findIndex(
      (i) => i.friendId === user._id
    );
    if (test !== undefined && test === -1) {
      setCheckFriendRequest(0);
    } else {
      setCheckFriendRequest(1);
    }
    const broNotifi = user.notifications?.findIndex(
      (i) => i.userId === userFinded._id
    );
    if (broNotifi !== undefined && broNotifi === -1) {
      setCheckFriendNotification(0);
    } else {
      setCheckFriendNotification(1);
    }
    const areWeFriends = userFinded.friends?.findIndex(
      (i) => i.friendId === user._id
    );
    if (areWeFriends !== undefined && areWeFriends === -1) {
      setShowFriendBtn(0);
    } else {
      setShowFriendBtn(1);
    }
  }, [user, userFinded]);

  const onHandleRequest = async () => {
    await dispatch(
      findUserByIdAndAddFriendRequest({ id: user._id, uId: userFinded._id })
    ).then(() => {
      if (checkFriendRequest === 1) {
        setCheckFriendRequest(0);
        return;
      } else {
        setCheckFriendRequest(1);
        return;
      }
    });
  };
  const onHandleAcceptFriend = async () => {
    await dispatch(
      findUserByIdAndAddFriend({ id: userFinded._id, uId: user._id })
    );
    setShowFriendBtn(1);
  };

  const onHandleDeclineFriend = async () => {
    await dispatch(
      findUserByIdAndAddFriendRequest({ id: userFinded._id, uId: user._id })
    );
    if (checkFriendNotification === 0) setCheckFriendNotification(1);
    if (checkFriendNotification === 1) setCheckFriendNotification(0);
  };

  useEffect(() => {
    dispatch(findUser(id));
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch, id]);

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
              userFinded.img !== ""
                ? `http://localhost:5000/public/${userFinded.coverImg}`
                : ""
            }
            alt="mycover"
          />
        </div>
        <div className="img-profile-container">
          <img
            className="img-profile"
            src={
              userFinded.img !== ""
                ? `http://localhost:5000/public/${userFinded.img}`
                : ""
            }
            alt="myprofile"
          />
          <div className="img-profile-content-container">
            <h1 className="img-profile-name">{userFinded.name}</h1>
            <h5 className="img-profile-friends">
              {userFinded.friends?.length}
            </h5>
            <div className="img-profile-friends-img-container">
              <>
                {userFinded.friends?.map((i, index) => {
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
            {checkFriendNotification === 1 ? (
              <>
                <button
                  className="img-profile-content-btn3"
                  onClick={onHandleAcceptFriend}
                >
                  Accept
                </button>
                <button
                  className="img-profile-content-btn4"
                  onClick={onHandleDeclineFriend}
                >
                  Decline
                </button>
              </>
            ) : (
              <>
                {showFriendBtn === 1 ? (
                  <button className="img-profile-content-btn1">Friends</button>
                ) : (
                  <button
                    className={
                      checkFriendRequest === 1
                        ? "img-profile-content-btn2"
                        : "img-profile-content-btn1"
                    }
                    onClick={onHandleRequest}
                  >
                    {checkFriendRequest === 1 ? "Pending" : "Add Friend"}
                  </button>
                )}
              </>
            )}
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
        </div>
        <div className="profilePosts-container">
          <div className="intro-container">
            <h1 className="intro-h1">Intro</h1>
            <div className="intro-container-text">
              <p className="intro-p">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore, accusantium.
              </p>
            </div>
          </div>
          <div className="profile-posts-container">
            <div className="profilePosts-postTitle">Posts</div>
            <>{content}</>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
