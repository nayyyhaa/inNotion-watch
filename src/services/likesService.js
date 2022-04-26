import axios from "axios";

export const getLikesService = async (authToken) => {
  try {
    const response = await axios.get("/api/user/likes", {
      headers: { authorization: authToken },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("getCart : Error in fetching likes details", e);
  }
};

export const createLikesService = async (authToken, video) => {
  try {
    const response = await axios.post(
      "/api/user/likes",
      { video },
      {
        headers: { authorization: authToken },
      }
    );
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("createLikes : Error in creating likes", e);
  }
};

export const deleteLikesService = async (authToken, id) => {
  try {
    const response = await axios.delete(`/api/user/likes/${id}`, {
      headers: { authorization: authToken },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("deleteLikes : Error in deleting likes", e);
  }
};
