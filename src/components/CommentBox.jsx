import { useVideo } from "contexts";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userPic from "toolkit/assets/self-love.png";

export const CommentBox = ({ comments, id }) => {
  const [commentIp, setCommentIp] = useState("");
  const { user } = useSelector((store) => store.userReducer);
  const { auth } = useSelector((store) => store.authReducer);
  const { dispatchVideos } = useVideo();
  const navigate = useNavigate();

  const commentHandler = () => {
    if (auth.isAuth)
      dispatchVideos({
        type: "SET_COMMENT",
        payload: { id, comments: { firstName: user?.firstName, lastName: user?.lastName, comment: commentIp } },
      });
    setCommentIp("");
  };

  return (
    <div className="m-v-2">
      <h3 className="h3 p-l-1 m-v-1">Comments</h3>
      <div className="note-field">
        <input
          type="text"
          className="note-input p-v-1"
          placeholder="Insert your comment here..."
          value={commentIp}
          onChange={(e) => setCommentIp(e.target.value)}
        />
        <button
          className="btn primary-btn m-h-1"
          onClick={() => {
            if (!auth.isAuth) navigate("/login");
            commentHandler();
          }}
        >
          Add
        </button>
      </div>
      {comments?.map(({ firstName, comment }) => (
        <div key={comment} className="video-info row-flex no-wrap p-l-1 m-v-2">
          <img className="avatar creater-thumbnail" src={userPic} alt="user" />
          <div className="video-description m-h-1 m-b-1">
            <h5>{firstName}</h5>
            <p className="sub-heading">{comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
