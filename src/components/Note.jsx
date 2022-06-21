import { BsPenFill, BsTrashFill } from "react-icons/bs";
import { useState } from "react";
import { formatDate } from "toolkit/utils";
import { deleteNote, editNote } from "redux/reducers/videoSlice";
import { useDispatch } from "react-redux";

export const Note = ({ id, noteEl }) => {
  const { note, noteId, date } = noteEl;
  const [noteIp, setNoteIp] = useState(note);
  const [editModeOn, setEditModeOn] = useState(false);
  const dispatch = useDispatch();

  const editModeHandler = () => {
    if (editModeOn) {
      dispatch(editNote({ id, noteId, notes: noteIp }));
    }
    setEditModeOn((prev) => !prev);
  };

  const deleteNoteHandler = () => {
    dispatch(deleteNote({ id, noteId }));
  };

  return (
    <div className="note blue-content p-2 w-90p">
      {editModeOn ? (
        <input type="text" className="m-v-1 m-b-3" value={noteIp} onChange={(e) => setNoteIp(e.target.value)} />
      ) : (
        <p className="m-v-1 m-b-3">{note}</p>
      )}
      <div className="note-footer row-flex">
        <small className="inherit-color">{formatDate(date)}</small>
        <div className="note-actions w-5rm row-flex">
          <BsPenFill className="m-r-1" onClick={editModeHandler} />
          <BsTrashFill onClick={deleteNoteHandler} />
        </div>
      </div>
    </div>
  );
};
