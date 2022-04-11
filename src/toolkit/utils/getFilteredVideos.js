export const getFilteredVideos = (videos, selectedCategory) =>
  selectedCategory !== "All" ? videos.filter((video) => video.category === selectedCategory) : videos;
