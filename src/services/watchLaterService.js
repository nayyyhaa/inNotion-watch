import axios from "axios";

export const getWatchLaterService = async (authToken) => {
  try {
    const response = await axios.get("/api/user/watchlater", {
      headers: { authorization: authToken },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("getCart : Error in fetching watchlater details", e);
  }
};

export const createWatchLaterService = async (authToken, video) => {
  try {
    const response = await axios.post(
      "/api/user/watchlater",
      { video },
      {
        headers: { authorization: authToken },
      }
    );
    if (response.status === 201) {
      console.log(response.data, "check");
      return response.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("createWatchLater : Error in creating watchlater", e);
  }
};

export const deleteWatchLaterService = async (authToken, id) => {
  try {
    const response = await axios.delete(`/api/user/watchlater/${id}`, {
      headers: { authorization: authToken },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("deleteWatchLater : Error in deleting watchlater", e);
  }
};
