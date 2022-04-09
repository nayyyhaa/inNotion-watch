export const Video = ({ video }) => {
  const {
    thumbnail,
    shortTitle,
    description,
    creator,
    category,
    views,
    creatorThumbnail,
    publishDate,
    subscriber,
    trending,
  } = video;
  return (
    <div className="video m-2">
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
      </div>
    </div>
  );
};
