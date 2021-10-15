import React, { useEffect, useState } from "react";

import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Detail from "./pages/Detail/Detail";

import { Switch, Route } from "react-router-dom";

function App() {
  const [movieId, setMovieId] = useState(
    JSON.parse(localStorage.getItem("movieId")) || []
  );

  const getId = (id, category) => {
    setMovieId([id, category]);

    localStorage.setItem("movieId", JSON.stringify([id, category]));
  };

  return (
    <>
      <Header />
      <main className="main">
        <Switch>
          <Route path="/" exact>
            <Home getId={getId} />
          </Route>
          <Route path="/detail/:id">
            <Detail movieId={movieId} getId={getId} />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
