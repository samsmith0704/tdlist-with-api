import React from "react";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  /**
   * fetch is making a call to the /api route, which sends a
   * GET request to the express server, which returns a response
   * with the JSON data that we created in index.js
   */
  React.useEffect(() => {
    fetch("/api")
      .then((response) => response.json()) // .then((res) => res.json())

      .then((data) => {
        setData(data);
        console.log(typeof data);
      });
    // .then((data) => console.log(data));
  }, []);

  return (
    <div className="App">
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}

export default App;
