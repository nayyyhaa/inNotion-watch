import { getCategories, getFilteredVideos } from "toolkit/utils";
import { useVideo } from "contexts";
import { Chip, Video } from "components";
import { useState } from "react";

export const Homepage = () => {
  const { videos } = useVideo();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = getCategories(videos);
  const filteredVideos = getFilteredVideos(videos, selectedCategory);
  return (
    <>
      <div className="categories-container row-flex p-h-5">
        {categories.map((category) => (
          <Chip
            key={category}
            category={category}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </div>
      <div className="grid-3-col full-wd m-auto row-flex align-start p-v-2 p-h-5 m-t-3">
        {filteredVideos?.map((video) => (
          <Video key={video._id} video={video} />
        ))}
      </div>
    </>
  );
};
