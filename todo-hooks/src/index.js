import React, {useState} from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";

const App = props => {
  const [count, setCount] = useState(props.count);

  //   const increment = () => {
  //     return setCount(count + 1);
  //   };
  return (
    <div>
      <p>The currecnt count is: {count}</p>
      {/* <button onClick={increment}>+1</button> */}

      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(props.count)}>Reset</button>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
};

App.defaultProps = {
  count: 0
};

ReactDOM.render(<App count={22} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
