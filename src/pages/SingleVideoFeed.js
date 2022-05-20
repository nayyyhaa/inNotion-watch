import { useModal, useWatchLater, useVideo, useLikes, useHistory } from "contexts";
import { MdPlaylistPlay, MdWatchLater } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CommentBox } from "components";

export const SingleVideoFeed = () => {
  const { id } = useParams();
  const { videos, getVideo } = useVideo();
  let video = videos.find((el) => el._id === id) ?? getVideo(id);
  const { _id, shortTitle, description, creator, views, creatorThumbnail, publishDate, subscribers, comments } = video;
  const { setShowModal, setModalData } = useModal();
  const { watchList, deleteWatchLater, createWatchLater } = useWatchLater();
  const { likes, deleteLikes, createLikes } = useLikes();
  const { createHistory } = useHistory();
  const watchLaterIndex = watchList.findIndex((el) => el._id === video._id);
  const likesIndex = likes.findIndex((el) => el._id === video._id);

  useEffect(() => {
    (async () => {
      video = await getVideo(id);
      createHistory(video);
    })();
  }, [video]);

  return (
    <div className="single-video-page w-70p m-2">
      <div className="video-embedded m-b-2">
        <iframe
          src={`https://www.youtube.com/embed/${_id}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
      <h3 className="h3 p-l-1 m-v-1">{shortTitle}</h3>
      <div className="video-info-title row-flex no-wrap p-l-1">
        <small className="sub-heading">
          {views} • {publishDate}
        </small>
        <div className="video-actions row-flex">
          <p
            className="row-flex cursor"
            onClick={() => {
              if (likesIndex > -1) deleteLikes(video._id);
              else createLikes(video);
            }}
          >
            <AiFillLike className={`${likesIndex > -1 ? "colored-text" : ""}`} />
            <span className="sidebar-title p-l-1">LIKE</span>
          </p>
          <p
            className="row-flex cursor"
            onClick={() => {
              setShowModal(true);
              setModalData(video);
            }}
          >
            <MdPlaylistPlay />
            <span className="sidebar-title p-l-1">SAVE</span>
          </p>
          <p
            className="row-flex cursor"
            onClick={() => {
              if (watchLaterIndex > -1) deleteWatchLater(video._id);
              else createWatchLater(video);
            }}
          >
            <MdWatchLater className={`${watchLaterIndex > -1 ? "colored-text" : ""}`} />
            <span className="sidebar-title p-l-1">WATCH LATER</span>
          </p>
        </div>
      </div>
      <div className="line-decoration"></div>
      <div className="video-info row-flex no-wrap p-l-1">
        <img className="avatar creater-thumbnail" src={creatorThumbnail} alt={creator} />
        <div className="video-description m-h-1 m-b-1">
          <p>
            <strong>{creator}</strong>
          </p>
          <small className="sub-heading">{subscribers}</small>
        </div>
      </div>
      <p className="p-l-1">{description}</p>
      <div className="line-decoration"></div>
      <CommentBox comments={comments} id={id} />
    </div>
  );
};
