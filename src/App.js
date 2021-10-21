import React from "react";

import { Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Details from "./pages/Details/Details";
import Catalog from "./pages/Catalog/Catalog";
import Credits from "./pages/Genres/Genres";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:category/:id">
          <Details />
        </Route>
        <Route path="/:category" exact>
          <Catalog />
        </Route>
        <Route path="/genres/:category/:genre" exact>
          <Credits />
        </Route>
      </main>
    </div>
  );
}

export default App;
