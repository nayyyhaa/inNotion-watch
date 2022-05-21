import { BsPenFill, BsTrashFill } from "react-icons/bs";
import { useState } from "react";
import { useVideo } from "contexts";

export const Note = ({ id, noteEl }) => {
  const { note, noteId } = noteEl;
  const [noteIp, setNoteIp] = useState(note);
  const [editModeOn, setEditModeOn] = useState(false);
  const { dispatchVideos } = useVideo();

  const editModeHandler = () => {
    if (editModeOn) {
      dispatchVideos({
        type: "EDIT_NOTE",
        payload: { id, noteId, notes: noteIp },
      });
    }
    setEditModeOn((prev) => !prev);
  };

  const deleteNoteHandler = () => {
    dispatchVideos({
      type: "DELETE_NOTE",
      payload: { id, noteId },
    });
  };

  return (
    <div className="note blue-content p-2 w-90p">
      {editModeOn ? (
        <input type="text" className="m-v-1 m-b-3" value={noteIp} onChange={(e) => setNoteIp(e.target.value)} />
      ) : (
        <p className="m-v-1 m-b-3">{note}</p>
      )}
      <div className="note-footer row-flex">
        <small className="inherit-color">3:32 PM 20 May</small>
        <div className="note-actions w-5rm row-flex">
          <BsPenFill className="m-r-1" onClick={editModeHandler} />
          <BsTrashFill onClick={deleteNoteHandler} />
        </div>
      </div>
    </div>
  );
};
