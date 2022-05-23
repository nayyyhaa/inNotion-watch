export const getFilteredVideos = (videos, selectedCategory) =>
  selectedCategory !== "All" ? videos.filter((video) => video.category === selectedCategory) : videos;

export const getSearchedVideos = (videos, searchIp) =>
  searchIp ? videos.filter((video) => video.shortTitle.toLowerCase().includes(searchIp.toLowerCase())) : videos;
