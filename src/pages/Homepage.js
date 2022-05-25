import { getCategories, getFilteredVideos, getSearchedVideos } from "toolkit/utils";
import { useSearch, useVideo } from "contexts";
import { Chip, Video } from "components";
import { useState } from "react";
import noVideo from "toolkit/assets/search.svg";
import { useSelector } from "react-redux";

export const Homepage = () => {
  const { videos } = useVideo();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = getCategories(videos);
  // const { searchIp } = useSearch();
  const { searchIp } = useSelector((store) => store.searchReducer);
  const searchedVideos = getSearchedVideos(videos, searchIp);
  const filteredVideos = getFilteredVideos(searchedVideos, selectedCategory);

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
      {searchIp && (
        <p className="centered-text m-t-3">
          Searched video: "<span className="colored-text">{searchIp}</span>" in category: "
          <span className="colored-text">{selectedCategory}</span>"
        </p>
      )}
      <div
        className={`${
          filteredVideos.length > 0 ? "grid-3-col" : ""
        } full-wd m-auto row-flex align-start p-v-2 p-h-5 m-t-3`}
      >
        {filteredVideos.length > 0 ? (
          filteredVideos?.map((video) => <Video key={video._id} video={video} />)
        ) : (
          <div className="grid-ctr m-v-5">
            <img className="w-60p no-video" src={noVideo} alt="no playlist" />
            <p className="m-t-3">No videos found!</p>
          </div>
        )}
      </div>
    </>
  );
};
