export const getCategories = (videos) => ["All",...new Set(videos.map((video) => video.category))];
