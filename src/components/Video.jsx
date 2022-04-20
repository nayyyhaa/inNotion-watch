import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import { VideoOption } from "./VideoOption.jsx";
import { Link } from "react-router-dom";

export const Video = ({ video }) => {
  const { _id, thumbnail, shortTitle, creator, views, creatorThumbnail } = video;
  const [isOptionOpen, setOptionOpen] = useState(false);

  return (
    <Link to={`/watch/${_id}`} className="video m-2">
      <img className="video-img" src={thumbnail} alt={shortTitle} />
      <div className="video-info row-flex no-wrap p-l-1">
        <img className="avatar creater-thumbnail" src={creatorThumbnail} alt={creator} />
        <div className="video-description m-h-1 m-b-1">
          <p>
            <strong>{shortTitle}</strong>
          </p>
          <small className="sub-heading">
            {creator} • {views}
          </small>
        </div>
        <div className="video-options-container card-icons" onClick={(e) => e.preventDefault()}>
          <button className="card-icon-btn icon-btn rd-bdr" onClick={() => setOptionOpen((prev) => !prev)}>
            <BsThreeDotsVertical className="video-icon" />
          </button>
          {isOptionOpen && <VideoOption setOptionOpen={setOptionOpen} video={video} />}
        </div>
      </div>
    </Link>
  );
};
