import React, {useState, useEffect, useReducer} from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

const notesReducer = (state, action) => {
  switch (action.type) {
    case "POPULATE_NOTES":
      return action.notes;
    case "ADD_NOTE":
      return [...state, {title: action.title, body: action.body}];
    case "REMOVE_NOTE":
      return state.filter(note => note.title !== action.title);
    default:
      return state;
  }
};

const NoteApp = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNote = e => {
    e.preventDefault();
    dispatch({
      type: "ADD_NOTE",
      title,
      body
    });
    setTitle("");
    setBody("");
  };

  const removeNote = title => {
    dispatch({
      type: "REMOVE_NOTE",
      title
    });
  };

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("note-saver"));

    if (notes) {
      dispatch({type: "POPULATE_NOTES", notes});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("note-saver", JSON.stringify(notes));
  }, [notes]);

  return (
    <div>
      <p>My Notes</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <br />
        <br />
        <textarea value={body} onChange={e => setBody(e.target.value)} />
        <button style={{margin: "10px"}}>add note</button>
      </form>
      {notes.map(
        note =>
          console.log(note) || (
            <Note key={note.title} note={note} removeNote={removeNote} />
          )
      )}
    </div>
  );
};

const Note = ({note, removeNote}) => {
  //Similar to componentUnmount
  useEffect(() => {
    console.log("Setting up effect");
    return () => {
      console.log("Cleaning up effect");
    };
  }, []);
  return (
    <div>
      <h3> {note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  );
};

// const App = props => {
//   const [count, setCount] = useState(props.count);
//   const [text, setText] = useState("");

//   const increment = () => {
//     return setCount(count + 1);
//   };

// The complete mirrow component Did Mount
//   useEffect(() => {
//     console.log("This should only run once");
//   }, []);

//   useEffect(() => {
//     console.log("useEffect run");
//     document.title = ` ${count} `;
//   }, [count]);

//   return (
//     <div>
//       <p>
//         The currecnt {text || "count"} is: {count}
//       </p>
//       {/* <button onClick={increment}>+1</button> */}

//       <button onClick={() => setCount(count - 1)}>-1</button>
//       <button onClick={() => setCount(props.count)}>Reset</button>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <input value={text} onChange={e => setText(e.target.value)} />
//     </div>
//   );
// };

// App.defaultProps = {
//   count: 0
// };

// ReactDOM.render(<App count={2} />, document.getElementById("root"));
ReactDOM.render(<NoteApp />, document.getElementById("root"));

serviceWorker.unregister();
