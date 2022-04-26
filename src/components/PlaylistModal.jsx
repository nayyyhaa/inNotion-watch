import { useModal, usePlaylist } from "contexts";
import { useState } from "react";
import { MdClose, MdPlaylistAdd } from "react-icons/md";
import { toast } from "react-toastify";

export const PlaylistModal = () => {
  const { showModal, setShowModal, modalData } = useModal();
  const [playlistIp, setPlaylistIp] = useState("");
  const { playlist, dispatchPlaylist } = usePlaylist();
  const playListNames = Object.keys(playlist);
  return (
    <div className={`modal-wrapper modal-wrapper-example grid-ctr ${showModal ? "show-modal" : ""}`}>
      <div className="modal grid-ctr p-t-5">
        <button
          type="button"
          className="card-icon-btn icon-btn rd-bdr close-btn modal-close-btn example-modal-close-btn"
        >
          <MdClose onClick={() => setShowModal(false)} />
        </button>
        <ul className="no-bullet col-flex flex-start no-wrap p-h-2 m-b-3 p-t-2">
          <li className="filter-list p-l-2 m-v-1">PLAYLIST</li>
          {playListNames?.map((label) => {
            return (
              <li key={label} className="filter-item p-l-2 m-v-05">
                <label className="categories sub-heading">
                  <input
                    type="checkbox"
                    className="checkbox-input m-r-1"
                    checked={playlist[label].includes(modalData)}
                    onChange={(e) => {
                      if (playlist[label].includes(modalData)) toast.info("Removed from Playlist");
                      else toast.success("Added to Playlist");
                      dispatchPlaylist({
                        type: "SET_TO_PLAYLIST",
                        payload: {
                          title: label,
                          _id: modalData._id,
                          video: modalData,
                        },
                      });
                    }}
                  />
                  {label}
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
                playlistIp &&
                  dispatchPlaylist({
                    type: "ADD_NEW_PLAYLIST",
                    payload: { title: playlistIp, video: modalData },
                  });
                playlistIp && toast.success("Added to Playlist");
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
