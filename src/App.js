import React from "react";

import { Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Catalog from "./pages/Catalog";
import Details from "./pages/Details/Details";
import Home from "./pages/Home";

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
        <Route path="/:category" exact >
          <Catalog />
        </Route>
      </main>
    </div>
  );
}

export default App;
