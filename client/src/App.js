import React from "react";
import "./App.css";
import TdList from "./Components/TdList";

function App() {
  const [data, setData] = React.useState(null);

  /**
   * fetch is making a call to the /api route, which sends a
   * GET request to the express server, which returns a response
   * with the JSON data that we created in index.js
   */

  return (
    <div className="App">
      <TdList />
    </div>
  );
}

export default App;
