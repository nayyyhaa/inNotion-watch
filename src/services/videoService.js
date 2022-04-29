import axios from "axios";

export const getVideoService = async (id) => {
  try {
    const response = await axios.get(`/api/video/${id}`);
    if (response.status === 200) {
      return response.data.video;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("getVideo : Error in fetching video", e);
  }
};
