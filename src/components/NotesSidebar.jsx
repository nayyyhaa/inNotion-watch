import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotes } from "redux/reducers/videoSlice";
import { formatDate } from "toolkit/utils";
import { v4 as uuid } from "uuid";
import { Note } from "./Note";

export const NotesSidebar = ({ notes, id }) => {
  const [noteIp, setNoteIp] = useState("");
  const { auth } = useSelector((store) => store.authReducer);
  const { user } = useSelector((store) => store.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const commentHandler = () => {
    if (auth.isAuth)
      dispatch(setNotes({ id, notes: { noteId: uuid(), email: user?.email, note: noteIp, date: formatDate(new Date()) } }));
    setNoteIp("");
  };

  return (
    <div className="notes-container w-30p m-2">
      <h2 className="title m-v-1 centered-text">Notes</h2>
      <div className="note-field">
        <textarea
          type="text"
          className="note-input p-v-1"
          placeholder="Type notes here..."
          value={noteIp}
          onChange={(e) => setNoteIp(e.target.value)}
        />
        <button
          className="btn primary-btn m-h-1"
          onClick={() => {
            if (!auth.isAuth) navigate("/login");
            commentHandler();
          }}
        >
          Add
        </button>
      </div>
      <div className="line-decoration"></div>
      {notes?.length > 0 ? (
        notes?.map((noteEl) => noteEl?.email === user?.email && <Note key={noteEl?.noteId} id={id} noteEl={noteEl} />)
      ) : (
        <p className="m-v-2 centered-text">No notes!</p>
      )}
    </div>
  );
};
