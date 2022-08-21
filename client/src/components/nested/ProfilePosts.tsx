import React, { useEffect, useState } from "react";
import { BsCameraVideo, BsFillEmojiLaughingFill } from "react-icons/bs";
import { FcGallery } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { addNewPost, fetchPosts } from "../../features/postSlice";
import "../../styles/profilePosts.css";
import Post from "./Post";

const ProfilePosts = () => {
  const posts = useSelector((state: RootState) => state.posts.value);
  const postsStatus = useSelector((state: RootState) => state.posts.status);
  const user = useSelector((state: RootState) => state.users.user);
  const userId: any = localStorage.getItem("u1");
  const userName: any = localStorage.getItem("u2");

  const [text, setText] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "succeeded") {
    content = posts.map((post) => {
      if (post.postCreatedById === user._id) {
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
  return (
    <div className="profilePosts-container">
      <div className="intro-container">
        <h1 className="intro-h1">Intro</h1>
        <div className="intro-container-text">
          <p className="intro-p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore,
            accusantium.
          </p>
          <button className="secondaryBtn">Edit Bio</button>
        </div>
      </div>
      <div className="profile-posts-container">
        <div className="card-posts-top">
          <div className="card-post-text">
            <img
              src={
                user.img !== ""
                  ? `http://localhost:5000/public/${user.img}`
                  : ""
              }
              alt=""
            />
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!text) return;
                  dispatch(
                    addNewPost({
                      text,
                      createdByName: userName,
                      createdById: userId,
                    })
                  );
                  setText("");
                }
              }}
              placeholder="What's on your mind"
              id="card-input"
              type="text"
            />
          </div>
          <div className="card-post-button">
            <button>
              <BsCameraVideo className="svg" color={"red"} size={24} />
              Live video
            </button>
            <button>
              <FcGallery className="svg" size={24} />
              Photo/video
            </button>
            <button>
              <BsFillEmojiLaughingFill
                className="svg"
                color={"yellow"}
                size={24}
              />{" "}
              Feeling/activity
            </button>
          </div>
        </div>
        <div className="profilePosts-postTitle">Posts</div>
        <>{content}</>
      </div>
    </div>
  );
};

export default ProfilePosts;
