import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [cats, setCats] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch(
  //       "https://api.thecatapi.com/v1/images/search"
  //     );
  //     const cats = await response.json();
  //     setCats(cats);
  //   }
  //   fetchData();
  // }, []);

  useEffect(() => {
    console.log("useEffect");
    setLoading(true);
    setError(false);
    fetch("https://api.thecatapi.com/v1/images/search")
      .then((response) => response.json())
      .then((cats) => {
        setCats(cats);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => setCount(count + 1)}>Counter: {count}</button>
        {!isLoading ? (
          cats.map((cat) => (
            <img
              src={cat.url}
              height={cat.height}
              width={cat.width}
              alt="cat"
              key={cat.id}
            />
          ))
        ) : (
          <h2>Loading...</h2>
        )}
        {isError&&<h2>Si è verificato un errore</h2>}
      </header>
    </div>
  );
}

export default App;
