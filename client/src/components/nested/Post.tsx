import { GiWorld } from "react-icons/gi";
import { BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { FacebookSelector } from "@charkour/react-reactions";
import "../../styles/Post.css";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../features/commentSlice";
import { addComment, addReact, deletePosts } from "../../features/postSlice";
import { RootState } from "../../app/store";
import { likeColor, switchNames, switchReacts } from "../../utils/React";
import { useNavigate } from "react-router-dom";
import { findUserById } from "../../features/userSlice";

interface PostType {
  id: string;
  text: string;
  postCreatedByName: string;
  postCreatedById: string;
  reacts: {
    _id: string;
    type: string;
    createdByUserId: string;
    createdByUserName: string;
  }[];
  comment: [
    {
      _id: string;
      text: string;
      like: string;
      commentCreatedByName: string;
      commentCreatedById: string;
      replies: [
        {
          _id: string;
          text: string;
          like: string;
          replyCreatedByName: string;
          replyCreatedById: string;
        }
      ];
    }
  ];
}

const Post = ({
  id,
  text,
  reacts,
  comment,
  postCreatedById,
  postCreatedByName,
}: PostType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likeStatus = useSelector((state: RootState) => state.posts.likeStatus);
  const likeTypeState: any = useSelector(
    (state: RootState) => state.posts.likeType
  );

  const user = useSelector((state: RootState) => state.users.user);
  const userId: any = localStorage.getItem("u1");
  const userName: any = localStorage.getItem("u2");

  //To fetch React button of the user by ID
  let likeType: string = "";

  let countReacts = 0;
  let totalReacts = 0;

  let like: Object[] = [];
  let love: Object[] = [];
  let haha: Object[] = [];
  let sad: Object[] = [];
  let angry: Object[] = [];
  let wow: Object[] = [];

  if (likeStatus === "succeeded") {
    likeTypeState.reacts.map((i: any) => {
      if (id === likeTypeState._id) {
        if (i.createdByUserId === userId) {
          likeType = i.type;
        }
        if (i.type === "like") {
          like.push({ type: i.type, createdByUserName: i.createdByUserName });
          countReacts++;
        } else if (i.type === "haha") {
          haha.push({ type: i.type, createdByUserName: i.createdByUserName });
          countReacts++;
        } else if (i.type === "love") {
          love.push({ type: i.type, createdByUserName: i.createdByUserName });
          countReacts++;
        } else if (i.type === "sad") {
          sad.push({ type: i.type, createdByUserName: i.createdByUserName });
          countReacts++;
        } else if (i.type === "wow") {
          wow.push({ type: i.type, createdByUserName: i.createdByUserName });
          countReacts++;
        } else if (i.type === "angry") {
          angry.push({
            type: i.type,
            createdByUserName: i.createdByUserName,
          });
          countReacts++;
        }
        totalReacts =
          like.length +
          love.length +
          haha.length +
          angry.length +
          sad.length +
          wow.length;
      }
      return i;
    });
    reacts.map((i: any) => {
      if (id !== likeTypeState._id) {
        if (i.createdByUserId === userId) {
          likeType = i.type;
        }
        if (i.type === "like") {
          like.push({
            type: i.type,
            createdByUserName: i.createdByUserName,
          });
          countReacts++;
        } else if (i.type === "haha") {
          haha.push({
            type: i.type,
            createdByUserName: i.createdByUserName,
          });
          countReacts++;
        } else if (i.type === "love") {
          love.push({
            type: i.type,
            createdByUserName: i.createdByUserName,
          });
          countReacts++;
        } else if (i.type === "sad") {
          sad.push({
            type: i.type,
            createdByUserName: i.createdByUserName,
          });
          countReacts++;
        } else if (i.type === "wow") {
          wow.push({
            type: i.type,
            createdByUserName: i.createdByUserName,
          });
          countReacts++;
        } else if (i.type === "angry") {
          angry.push({
            type: i.type,
            createdByUserName: i.createdByUserName,
          });
          countReacts++;
        }
        totalReacts =
          like.length +
          love.length +
          haha.length +
          angry.length +
          sad.length +
          wow.length;
      }
      return i;
    });
  } else {
    reacts.map((i: any) => {
      if (i.createdByUserId === userId) {
        likeType = i.type;
      }
      if (i.type === "like") {
        like.push({ type: i.type, createdByUserName: i.createdByUserName });
        countReacts++;
      } else if (i.type === "haha") {
        haha.push({ type: i.type, createdByUserName: i.createdByUserName });
        countReacts++;
      } else if (i.type === "love") {
        love.push({ type: i.type, createdByUserName: i.createdByUserName });
        countReacts++;
      } else if (i.type === "sad") {
        sad.push({ type: i.type, createdByUserName: i.createdByUserName });
        countReacts++;
      } else if (i.type === "wow") {
        wow.push({ type: i.type, createdByUserName: i.createdByUserName });
        countReacts++;
      } else if (i.type === "angry") {
        angry.push({ type: i.type, createdByUserName: i.createdByUserName });
        countReacts++;
      }
      totalReacts =
        like.length +
        love.length +
        haha.length +
        angry.length +
        sad.length +
        wow.length;
      return i;
    });
  }

  //CommentText
  const [commentText, setCommentText] = useState("");

  //Getting status / used for fetching comments
  const comStatus = useSelector((state: RootState) => state.comments.status);

  const [react, setReaction] = useState(likeType);

  //Focus CommentBtn
  const input: any = useRef(null);
  function focusComment() {
    input.current.focus();
  }

  const [isLiked, setIsLiked] = useState(false);
  //Used for display React
  const [displayReacts, setDisplayReacts] = useState({ display: "none" });
  //Used for checking if reaction displayed or not
  const [isShown, setIsShown] = useState(false);

  //Handle facebook reaction buttons
  const handleLikeBtn = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      //likes === "none"
      setReaction("like");
      dispatch(
        addReact({
          id,
          likeType: "like",
          createdByUserName: userName,
          createdByUserId: userId,
        })
      );
    } else {
      setReaction("none");
      dispatch(
        addReact({
          id,
          likeType: "none",
          createdByUserName: userName,
          createdByUserId: userId,
        })
      );
    }
  };
  //Fetching Comments
  useEffect(() => {
    if (comStatus === "idle") {
      dispatch(fetchComments());
    }
  }, [
    comStatus,
    dispatch,
    likeStatus,
    reacts,
    react,
    likeTypeState,
    totalReacts,
  ]);

  //Handle click for like
  const handleLike = (e: string) => {
    setDisplayReacts({ display: "none" });
    dispatch(
      addReact({
        id,
        likeType: e,
        createdByUserName: userName,
        createdByUserId: userId,
      })
    );
    setReaction(e);
  };
  //Time display for facebook reactions
  const waitforReact = () => {
    if (isShown) {
      setTimeout(() => {
        setDisplayReacts({ display: "none" });
        setIsShown(false);
      }, 1000);
    }
  };
  //Show reacts
  const showReact = () => {
    if (!isShown) {
      setDisplayReacts({ display: "flex" });
      setIsShown(true);
    }
  };
  //Handle delete post btn
  const handleClick = () => {
    if (postCreatedById === userId) {
      dispatch(deletePosts({ id }));
    } else {
      alert("You're not the author of the post");
    }
  };

  const [displayUsers, setDisplayUsers] = useState(false);
  const showUsers = () => {
    if (totalReacts === 0) return;
    else return setDisplayUsers(true);
  };
  const removeShowUsers = () => {
    setTimeout(() => setDisplayUsers(false), 1000);
  };
  const checkCountReacts = () => {
    if (countReacts === 1) {
      return "50px";
    } else if (countReacts === 2) {
      return "90px";
    } else if (countReacts === 3) {
      return "110px";
    }
  };
  const handleFindUser = async () => {
    await dispatch(findUserById(postCreatedById)).then((data: any) => {
      if (data.payload.checkUser.nickname === user.nickname) {
        return navigate(`/profile`);
      } else {
        navigate(`/profile/${data.payload.checkUser.nickname}`);
      }
    });
  };
  const styling: any = {
    position: "absolute",
    backgroundColor: "#ffffffcc",
    marginTop: "40px",
    marginLeft: checkCountReacts(),
    width: "max-content",
    maxWidth: "120px",
    height: "100px",
    padding: "10px",
    borderRadius: "5px",
    color: "#000000c4",
    fontSize: "12px",
  };

  let content;
  if (comStatus === "succeeded") {
    content = comment.map((comment) => {
      return (
        <Comment
          pId={id}
          key={comment._id}
          id={comment._id}
          text={comment.text}
          like={comment.like}
          commentCreatedByName={comment.commentCreatedByName}
          commentCreatedById={comment.commentCreatedById}
          comment={comment}
        />
      );
    });
  }
  return (
    <div className="post-container">
      <div className="top-post">
        <div className="top-post-img">
          <img
            onClick={handleFindUser}
            src={`http://localhost:5000/public/post/${postCreatedById}`}
            alt=""
          />
          <span className="img-online"></span>
        </div>
        <div className="top-post-text">
          <div className="top-post-text-in">
            <h1 onClick={handleFindUser}>{postCreatedByName}</h1>
            <BsThreeDots className="sm clickable" onClick={handleClick} />
          </div>
          <h5>
            Now .<GiWorld className="xsm" />
          </h5>
        </div>
      </div>
      <div className="description-post">
        <p>{text}</p>
      </div>
      <div className="type-post">
        <hr className="hrWide" />
        <div className="likeLabelThing">
          <label
            htmlFor="likeLabel"
            style={displayUsers === true ? styling : { display: "none" }}
          >
            {displayUsers && likeTypeState.length === 0
              ? reacts.map((i: any) => {
                  if (i.type !== "none") {
                    return (
                      <div key={i._id}>
                        {i.createdByUserName}
                        <br />
                      </div>
                    );
                  }
                  return "";
                })
              : likeTypeState.reacts?.map((i: any) => {
                  if (i.type !== "none") {
                    return (
                      <div key={i._id}>
                        {i.createdByUserName}
                        <br />
                      </div>
                    );
                  }
                  return "";
                })}
          </label>
        </div>
        <label
          htmlFor=""
          className="likeLabel"
          onMouseEnter={showUsers}
          onMouseLeave={removeShowUsers}
        >
          {like.length > 0 ? (
            <img alt="like" src="http://i.imgur.com/LwCYmcM.gif" />
          ) : (
            ""
          )}
          {haha.length > 0 ? (
            <img alt="haha" src="http://i.imgur.com/f93vCxM.gif" />
          ) : (
            ""
          )}
          {love.length > 0 ? (
            <img alt="love" src="http://i.imgur.com/k5jMsaH.gif" />
          ) : (
            ""
          )}
          {wow.length > 0 ? (
            <img alt="wow" src="http://i.imgur.com/9xTkN93.gif"></img>
          ) : (
            ""
          )}
          {sad.length > 0 ? (
            <img alt="sad" src="http://i.imgur.com/tFOrN5d.gif"></img>
          ) : (
            ""
          )}
          {angry.length > 0 ? (
            <img alt="angry" src="http://i.imgur.com/1MgcQg0.gif"></img>
          ) : (
            ""
          )}
          <div className="nestedReacts">
            {totalReacts > 0 ? <p>{totalReacts}</p> : ""}
          </div>
        </label>
        <div style={displayReacts} className="showReacts">
          <FacebookSelector iconSize={30} onSelect={handleLike} />
        </div>
        <div className="card-post-buttons">
          <button
            id="likeBtn"
            onMouseOver={showReact}
            onMouseLeave={waitforReact}
            className="onActive"
            onClick={handleLikeBtn}
            style={likeColor(react)}
          >
            {switchReacts(react)} {switchNames(react)}
          </button>
          <button className="onActive" onClick={focusComment}>
            Comment
          </button>
          <button className="onActive">Share</button>
        </div>
        <div className="card-post-comments">
          <div className="top-post-img">
            <img
              src={
                user.img !== ""
                  ? `http://localhost:5000/public/${user.img}`
                  : ""
              }
              alt=""
            />
            <span className="img-online"></span>
          </div>
          <input
            ref={input}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (!commentText) return;
                dispatch(
                  addComment({
                    id,
                    text: commentText,
                    commentCreatedByName: userName,
                    commentCreatedById: userId,
                  })
                );
                setCommentText("");
              }
            }}
            placeholder="Write a comment..."
            id="card-input-2"
            type="text"
          />
        </div>
      </div>
      {content}
    </div>
  );
};

export default Post;
