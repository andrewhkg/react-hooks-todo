import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

const NoteApp = () => {
  const notesData = JSON.parse(localStorage.getItem("note-saver"));
  const [notes, setNotes] = useState(notesData || []);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState([]);

  const addNote = e => {
    e.preventDefault();
    setNotes([...notes, {title, body}]);
    setTitle("");
    setBody("");
  };

  const removeNote = title => {
    setNotes(notes.filter(note => note.title !== title));
  };

  useEffect(() => {
    localStorage.setItem("note-saver", JSON.stringify(notes));
  });
  return (
    <div>
      <p>My Notes</p>
      {/* <p>Add note</p> */}
      <form onSubmit={addNote}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <br />
        <br />
        <textarea value={body} onChange={e => setBody(e.target.value)} />
        <button style={{margin: "10px"}}>add note</button>
      </form>
      {notes.map(note => (
        <div key={note.title}>
          <ul>
            <li>
              <h3> {note.title}</h3>
              <p>{note.body}</p>
              <button onClick={() => removeNote(note.title)}>x</button>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

// const App = props => {
//   const [count, setCount] = useState(props.count);
//   const [text, setText] = useState("");
//   //   const increment = () => {
//   //     return setCount(count + 1);
//   //   };

//   useEffect(() => {
//     console.log("useEffect run");
//     document.title = count;
//   });

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
