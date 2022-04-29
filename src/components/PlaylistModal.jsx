import { useModal, usePlaylist } from "contexts";
import { useState } from "react";
import { MdClose, MdPlaylistAdd } from "react-icons/md";

export const PlaylistModal = () => {
  const { showModal, setShowModal, modalData } = useModal();
  const [playlistIp, setPlaylistIp] = useState("");
  const { playlist, createPlaylist, deletePlaylistData, createPlaylistData } = usePlaylist();
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
          {playlist?.map((list) => {
            return (
              <li key={list?._id} className="filter-item p-l-2 m-v-05">
                <label className="categories sub-heading">
                  <input
                    type="checkbox"
                    className="checkbox-input m-r-1"
                    checked={list?.videos?.some((el) => el._id === modalData._id)}
                    onChange={(e) => {
                      if (list?.videos?.some((el) => el._id === modalData._id))
                        deletePlaylistData(list?._id, modalData._id);
                      else createPlaylistData(list?._id, modalData);
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
                playlistIp && createPlaylist({ title: playlistIp });
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
