import { MdPlaylistPlay, MdWatchLater } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setModalData, setShowModal } from "redux/reducers/modalSlice";
import { createWatchLater, deleteWatchLater } from "redux/reducers/watchLaterSlice";

export const VideoOption = ({ setOptionOpen, video }) => {
  const { watchList } = useSelector((store) => store.watchLaterReducer);
  const { auth } = useSelector((store) => store.authReducer);
  const index = watchList?.findIndex((el) => el._id === video._id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="video-option box-shd" onClick={() => setOptionOpen(false)}>
      <p
        onClick={() => {
          if (!auth.isAuth) {
            toast.error("Log in/ Sign up to begin");
            navigate("/login");
          }
          else {
            dispatch(setShowModal(true));
            dispatch(setModalData(video));
          }
        }}
      >
        <MdPlaylistPlay />
        <span className="p-l-1">Add to playlist</span>
      </p>
      <p
        onClick={() => {
          if (!auth.isAuth) navigate("/login");
          if (index > -1) dispatch(deleteWatchLater(video._id));
          else dispatch(createWatchLater(video));
        }}
      >
        <MdWatchLater />
        <span className="p-l-1">{index > -1 && "Remove "} Watch later</span>
      </p>
    </div>
  );
};
