import { Chip, Video } from "components";
import videoData from "toolkit/data/videoData";
import { getCategories } from "toolkit/utils";

export const AllVideosFeed = () => {
  const categories = getCategories(videoData);
  return (
    <>
      <div className="categories-container row-flex p-h-5">
        {categories.map((category) => (
          <Chip category={category} />
        ))}
      </div>
      <div className="grid-3-col full-wd m-auto row-flex align-start p-v-2 p-h-5 m-t-3">
        {videoData?.map((video) => (
          <Video key={video._id} video={video} />
        ))}
      </div>
    </>
  );
};
