import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import Notification from "./components/Notification";
// import axios from "axios";
import noteService from "./services/notes";

const App = ({ arrNotes }) => {
  const [notes, setNotes] = useState(arrNotes);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState({ message: "", type: "" });

  //   useEffect(() => {
  //     console.log("effect");
  //     axios.get("http://localhost:3001/notes").then((response) => {
  //       console.log("promise fulfilled");
  //       setNotes(response.data);
  //     });
  //   }, []);

  const hook = () => {
    noteService.getAll().then((response) => {
      setNotes(response);
    });
  };

  useEffect(hook, []);
  //   console.log("render", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      //   id: notes.length + 1,
    };

    // axios.post("http://localhost:3001/notes", noteObject).then((response) => {
    //   setNotes(notes.concat(response.data));
    //   setNewNote("");
    // });
    noteService.create(noteObject).then((response) => {
      setNotes(notes.concat(response));
      setMessage({
        ...message,
        message: `Note added successfully`,
        type: "success",
      });
      setTimeout(() => {
        setMessage({ ...message, message: "", type: "" });
      }, 3000);
      setNewNote("");
    });
  };

  const toggleImportanceOf = (id) => {
    // const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    // axios.put(url, changedNote).then((response) => {
    //   console.log(response.data);
    //   setNotes(notes.map((note) => (note.id !== id ? note : response.data)));
    // });
    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((note) => (note.id !== id ? note : response)));
        setMessage({
          ...message,
          message: `Note '${note.content}' update successfully`,
          type: "updated",
        });
        setTimeout(() => {
          setMessage({ ...message, message: "", type: "" });
        }, 3000);
      })
      .catch((error) => {
        setMessage({
          ...message,
          message: `Note '${note.content}' was already removed from server`,
          type: "error",
        });
        setTimeout(() => {
          setMessage({ ...message, message: "", type: "" });
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleNoteChange = (event) => {
    // console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const Footer = () => {
    const footerStyle = {
      color: "green",
      fontStyle: "italic",
      fontSize: 16,
    };
    return (
      <div style={footerStyle}>
        <br />
        <em>
          Note app, Department of Computer Science, University of Helsinki 2020
        </em>
      </div>
    );
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification objMessage={message} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
