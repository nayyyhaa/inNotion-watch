import axios from "axios";

export const getHistoryService = async (authToken) => {
  try {
    const response = await axios.get("/api/user/history", {
      headers: { authorization: authToken },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("getCart : Error in fetching history details", e);
  }
};

export const createHistoryService = async (authToken, video) => {
  try {
    const response = await axios.post(
      "/api/user/history",
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
    console.error("createHistory : Error in creating history", e);
  }
};

export const deleteHistoryService = async (authToken, id) => {
  try {
    const response = await axios.delete(`/api/user/history/${id}`, {
      headers: { authorization: authToken },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("deleteHistory : Error in deleting history", e);
  }
};

export const deleteAllHistoryService = async (authToken) => {
  try {
    const response = await axios.delete(`/api/user/history/all`, {
      headers: { authorization: authToken },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("deleteHistory : Error in deleting history", e);
  }
};
