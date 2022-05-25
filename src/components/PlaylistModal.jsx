import { useState } from "react";
import { MdClose, MdPlaylistAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setShowModal } from "redux/reducers/modalSlice";
import { createPlaylist, createPlaylistData, deletePlaylistData } from "redux/reducers/playlistSlice";

export const PlaylistModal = () => {
  const { auth } = useSelector((store) => store.authReducer);
  const { showModal, modalData } = useSelector((store) => store.modalReducer);
  const dispatch = useDispatch();
  const [playlistIp, setPlaylistIp] = useState("");
  const { playlist } = useSelector((store) => store.playlistReducer);
  const navigate = useNavigate();

  return (
    <div className={`modal-wrapper modal-wrapper-example grid-ctr ${showModal ? "show-modal" : ""}`}>
      <div className="modal grid-ctr p-t-5">
        <button
          type="button"
          className="card-icon-btn icon-btn rd-bdr close-btn modal-close-btn example-modal-close-btn"
        >
          <MdClose onClick={() => dispatch(setShowModal(false))} />
        </button>
        <ul className="no-bullet col-flex flex-start no-wrap p-h-2 m-b-3 p-t-2">
          <li className="filter-list p-l-2 m-v-1">PLAYLIST</li>
          {playlist?.map((list) => {
            return (
              <li key={list?._id} className="filter-item p-l-2 m-v-05">
                <label className="categories sub-heading">
                  <input
                    type="checkbox"
                    className="checkbox-input m-r-1"
                    checked={list?.videos?.some((el) => el._id === modalData._id)}
                    onChange={(e) => {
                      if (!auth.isAuth) navigate("/login");
                      if (list?.videos?.some((el) => el._id === modalData._id))
                        dispatch(deletePlaylistData({ id: list?._id, videoId: modalData._id }));
                      else dispatch(createPlaylistData({ id: list?._id, playlist: modalData }));
                    }}
                  />
                  {list.title}
                </label>
              </li>
            );
          })}
          <li className="filter-item add-tag row-flex m-v-05">
            <label htmlFor="tag-selector" className="note-tagfield w-60p p-05">
              <span className="cursor p-05">
                <MdPlaylistAdd className="tag-icon" />
              </span>
              <input
                type="text"
                className="tag-selector w-90p p-05"
                value={playlistIp}
                onChange={(e) => setPlaylistIp(e.target.value)}
              />
            </label>
            <button
              className="btn primary-btn"
              onClick={() => {
                playlistIp && dispatch(createPlaylist({ title: playlistIp }));
                setPlaylistIp("");
              }}
            >
              add
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
