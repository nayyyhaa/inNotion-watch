import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllVideos } from "redux/reducers/videoSlice";

export const useAsync = ({ url, actionType, payloadType }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios(url);
        dispatch(getAllVideos(data[payloadType]));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
};
