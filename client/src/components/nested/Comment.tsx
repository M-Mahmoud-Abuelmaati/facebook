import { useEffect, useState } from "react";
import { useRef } from "react";
import "../../styles/Comment.css";
import { useDispatch, useSelector } from "react-redux";
import Reply from "./Reply";
import { RootState } from "../../app/store";
import { addReply } from "../../features/postSlice";
import { fetchReplys } from "../../features/replySlice";
import { addCommentReact } from "../../features/commentSlice";
import { likeColor, switchReacts } from "../../utils/React";
import { FacebookSelector } from "@charkour/react-reactions";
import { useNavigate } from "react-router-dom";
import { findUserById } from "../../features/userSlice";

interface CommentType {
  pId: string;
  id: string;
  text: string;
  like: string;
  commentCreatedByName: string;
  commentCreatedById: string;
  comment: any;
}
const Comment = ({
  pId,
  id,
  text,
  like,
  comment,
  commentCreatedByName,
  commentCreatedById,
}: CommentType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [replyText, setReplyText] = useState("");

  //Used for reacts
  const [react, setReaction] = useState(like);
  const [isLiked, setIsLiked] = useState(false);
  //Used for display React
  const [displayReacts, setDisplayReacts] = useState({ display: "none" });
  //Used for checking if reaction displayed or not
  const [isShown, setIsShown] = useState(false);

  //Handle facebook reaction buttons
  const handleLikeBtn = () => {
    setIsLiked(!isLiked);
    if (!isLiked || like === "none") {
      if (switchReacts(react) === "") {
        setReaction("like");
        dispatch(addCommentReact({ c_id: id, id: pId, like: "like" }));
      } else {
        setReaction("none");
        dispatch(addCommentReact({ c_id: id, id: pId, like: "none" }));
      }
    } else {
      setReaction("none");
      dispatch(addCommentReact({ c_id: id, id: pId, like: "none" }));
    }
  };
  //Handle click for like
  const handleLike = (e: string) => {
    setDisplayReacts({ display: "none" });
    dispatch(addCommentReact({ c_id: id, id: pId, like: e }));
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

  //Used for focus reply
  const [displayComment, setdisplayComment] = useState({ display: "none" });
  const replyInput: any = useRef(null);
  const focusReply = () => {
    setdisplayComment({ display: "flex" });
    setTimeout(() => {
      replyInput.current.focus();
    }, 100);
  };

  //Used for fetching // Getting status of replys
  const user = useSelector((state: RootState) => state.users.user);
  const userId: any = localStorage.getItem("u1");
  const userName: any = localStorage.getItem("u2");
  const replyStatus = useSelector((state: RootState) => state.replys.status);

  //Fetching replys
  useEffect(() => {
    if (replyStatus === "idle") {
      dispatch(fetchReplys());
    }
  }, [replyStatus, dispatch]);

  const handleFindUser = async () => {
    await dispatch(findUserById(commentCreatedById)).then((data: any) => {
      if(data.payload.checkUser.nickname === user.nickname){
        return navigate(`/profile`);  
      }
      navigate(`/profile/${data.payload.checkUser.nickname}`);
    });
  };

  let content;
  if (replyStatus === "succeeded") {
    content = comment.replies.map((reply: any) => {
      return (
        <Reply
          key={reply._id}
          text={reply.text}
          _id={reply._id}
          focusComment={focusReply}
          like={reply.like}
          pId={pId}
          cId={id}
          replyCreatedByName={reply.replyCreatedByName}
          replyCreatedById={reply.replyCreatedById}
        />
      );
    });
  }

  return (
    <div>
      <div className="card-post-comments-reply">
        <div className="top-post-img">
          <img
            onClick={handleFindUser}
            src={`http://localhost:5000/public/post/${commentCreatedById}`}
            alt=""
          />
          <span className="img-online"></span>
        </div>
        <div id="card-input-3">
          <div className="commment-text">
            <h2 onClick={handleFindUser}>{commentCreatedByName}</h2>
            <p onClick={handleFindUser}>{text}</p>
          </div>
          <div className="commments-button">
            <div
              className="comments-button-1"
              onMouseOver={showReact}
              onMouseLeave={waitforReact}
            >
              <button
                className="comment-button"
                onClick={handleLikeBtn}
                style={likeColor(react)}
              >
                Like
              </button>
              <label
                htmlFor=""
                className={switchReacts(react) === "" ? "none" : "reactLabel"}
              >
                {switchReacts(react)}
              </label>
              <div style={displayReacts} className="showReacts">
                <FacebookSelector iconSize={30} onSelect={handleLike} />
              </div>
              <button className="comment-button" onClick={focusReply}>
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
      {content}
      <div className="reply-comments" style={displayComment}>
        <div className="top-post-img">
          <img
            src={
              user.img !== "" ? `http://localhost:5000/public/${user.img}` : ""
            }
            alt=""
          />
          <span className="img-online"></span>
        </div>
        <input
          ref={replyInput}
          value={replyText}
          onChange={(e) => {
            setReplyText(e.target.value);
          }}
          type="text"
          id="card-input-4"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              if (!replyText) return;
              dispatch(
                addReply({
                  pId,
                  text: replyText,
                  cId: id,
                  replyCreatedByName: userName,
                  replyCreatedById: userId,
                })
              );
              setReplyText("");
            }
          }}
          placeholder="write a reply..."
        />
      </div>
    </div>
  );
};

export default Comment;
