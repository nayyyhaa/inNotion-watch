import axios from "axios";

export const getPlaylistService = async (authToken) => {
  try {
    const response = await axios.get("/api/user/playlists", {
      headers: { authorization: authToken },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("getCart : Error in fetching playlist details", e);
  }
};

export const createPlaylistService = async (authToken, playlist) => {
  try {
    const response = await axios.post(
      "/api/user/playlists",
      { playlist },
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
    console.error("createPlaylist : Error in creating playlist", e);
  }
};

export const deletePlaylistService = async (authToken, id) => {
  try {
    const response = await axios.delete(`/api/user/playlists/${id}`, {
      headers: { authorization: authToken },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("deletePlaylist : Error in deleting playlist", e);
  }
};

export const getPlaylistDataService = async (authToken, id) => {
  try {
    const response = await axios.get(`/api/user/playlist/${id}`, {
      headers: { authorization: authToken },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("getCart : Error in fetching playlist details", e);
  }
};

export const createPlaylistDataService = async (authToken, id, video) => {
  try {
    const response = await axios.post(
      `/api/user/playlists/${id}`,
      { video },
      {
        playlist: { authorization: authToken },
      }
    );
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("createPlaylist : Error in creating playlist", e);
  }
};

export const deletePlaylistDataService = async (authToken, id, videoId) => {
  try {
    const response = await axios.delete(`/api/user/playlists/${id}/${videoId}`, {
      headers: { authorization: authToken },
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (e) {
    console.error("deletePlaylist : Error in deleting playlist", e);
  }
};
