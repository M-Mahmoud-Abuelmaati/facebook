import { FcGallery } from "react-icons/fc";
import { BsFillEmojiLaughingFill } from "react-icons/bs";
import { AiFillVideoCamera } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { useState, useEffect } from "react";
import "../../styles/Posts.css";
import Post from "./Post";
import { addNewPost, fetchPosts } from "../../features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";

const img2 = require("../../imgs/img2.jpg");
const img3 = require("../../imgs/img3.jpg");
const img4 = require("../../imgs/img4.jpg");
const img = require("../../imgs/pic2.jpg");
const img5 = require("../../imgs/img5.jpg");

const Posts = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.users.user);
  const posts = useSelector((state: RootState) => state.posts.value);
  const postsStatus = useSelector((state: RootState) => state.posts.status);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }

  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "succeeded") {
    content = posts.map((post) => {
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
    });
  }

  return (
    <div className="card">
      <div className="card-pictures">
        <div className="top-card">
          <img src={user.img !== "" ? `http://localhost:5000/public/${user.img}` : ""} alt="default1" />
          <button id="addStory">+</button>
          <label id="addStoryText" htmlFor="addStory">
            Create Story
          </label>
        </div>
        <div className="top-card">
          <div className="top-card-in">
            <img className="img2" src={img2} alt="default1" />
            <img className="img2-small" src={img2} alt="default1" />
            <h2>Mahmoud</h2>
          </div>
        </div>
        <div className="top-card">
          <div className="top-card-in">
            <img className="img2" src={img3} alt="default1" />
            <img className="img2-small" src={img3} alt="default1" />
            <h2>Samar</h2>
          </div>
        </div>
        <div className="top-card">
          <div className="top-card-in">
            <img className="img2" src={img4} alt="default1" />
            <img className="img2-small" src={img4} alt="default1" />
            <h2>Menna</h2>
          </div>
        </div>
        <div className="top-card">
          <div className="top-card-in">
            <img className="img2" src={img5} alt="default1" />
            <img className="img2-small" src={img5} alt="default1" />
            <h2>Amera</h2>
          </div>
        </div>
      </div>
      <div className="card-post-top">
        <div className="card-post-text">
          <img src={user.img !== "" ? `http://localhost:5000/public/${user.img}` : ""} alt="" />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (!text) return;
                dispatch(addNewPost({ text, createdByName: user.name, createdById: user._id }));
                setText("");
              }
            }}
            placeholder="What's in your mind, Mohamed?"
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
      <div className="card-online">
        <button className="card-Btn">
          <AiFillVideoCamera className="svg sm" size={23} /> Create Room
        </button>
        <div className="room-img">
          <img src={img} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" />
          <img src={img4} alt="" />
          <img src={img5} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" />
          <img src={img4} alt="" />
          <img src={img5} alt="" />
        </div>
      </div>
      {content}
    </div>
  );
};

export default Posts;
