import { FacebookSelector } from "@charkour/react-reactions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../app/store";
import { addReplyReact } from "../../features/replySlice";
import { findUserById } from "../../features/userSlice";
import "../../styles/Reply.css";
import { likeColor, switchReacts } from "../../utils/React";

interface replyType {
  _id: string;
  text: string;
  like: string;
  replyCreatedByName: string;
  replyCreatedById: string;
  focusComment: any;
  pId: string;
  cId: string;
}

const Reply = ({
  _id,
  text,
  like,
  replyCreatedByName,
  replyCreatedById,
  pId,
  cId,
  focusComment,
}: replyType) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Used for reacts
  const [react, setReaction] = useState(like);
  const [isLiked, setIsLiked] = useState(false);
  //Used for display React
  const [displayReacts, setDisplayReacts] = useState({ display: "none" });
  //Used for checking if reaction displayed or not
  const [isShown, setIsShown] = useState(false);
  
  const user = useSelector((state: RootState) => state.users.user);

  //Handle facebook reaction buttons
  const handleLikeBtn = () => {
    setIsLiked(!isLiked);
    if (!isLiked || like === "none") {
      if (switchReacts(react) === "") {
        setReaction("like");
        dispatch(
          addReplyReact({ c_id: cId, r_id: _id, id: pId, like: "like" })
        );
      } else {
        setReaction("none");
        dispatch(
          addReplyReact({ c_id: cId, r_id: _id, id: pId, like: "none" })
        );
      }
    } else {
      setReaction("none");
      dispatch(addReplyReact({ c_id: cId, r_id: _id, id: pId, like: "none" }));
    }
  };
  //Handle click for like
  const handleLike = (e: string) => {
    setDisplayReacts({ display: "none" });
    dispatch(addReplyReact({ c_id: cId, r_id: _id, id: pId, like: e }));
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
  const onHandleFindUser = async () => {
    await dispatch(findUserById(replyCreatedById)).then((data: any) => {
      if(data.payload.checkUser.nickname === user.nickname){
        return navigate(`/profile`);  
      }
      navigate(`/profile/${data.payload.checkUser.nickname}`);
    });
  };
  return (
    <div className="replySection" key={_id}>
      <div className="reply-section">
        <div className="top-comment-img">
          <img
            onClick={onHandleFindUser}
            src={`http://localhost:5000/public/post/${replyCreatedById}`}
            alt=""
          />
          <span className="img-online"></span>
        </div>
        <div className="reply-text">
          <h2 onClick={onHandleFindUser}>{replyCreatedByName}</h2>
          <p>{text}</p>
        </div>
      </div>
      <div className="like-reply">
        <div className="comments-button-0">
          <div
            className="boredButton"
            onMouseOver={showReact}
            onMouseLeave={waitforReact}
          >
            <div className="pt">
              <button
                className="comment-button"
                onClick={handleLikeBtn}
                style={likeColor(react)}
              >
                Like
              </button>
              <div style={displayReacts} className="showReacts">
                <FacebookSelector iconSize={30} onSelect={handleLike} />
              </div>
            </div>

            <label
              htmlFor=""
              className={switchReacts(react) === "" ? "none" : "reactLabel"}
            >
              {switchReacts(react)}
            </label>
            <button className="comment-button" onClick={focusComment}>
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
