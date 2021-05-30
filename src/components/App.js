
import  React from "react";
import { useState} from "react";
import { BrowserRouter, Route,Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import CrearEscenario from "./CrearEscenario";
import "../App.css";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>

        <Route exact path="/">
          <Redirect to="/Login" />
        </Route>

        <Route exact path="/Login" >
         <Login/>
        </Route>

        <Route exact path="/Home" >
         <Home/>
        </Route>

        <Route exact path="/CrearEscenario" >
         <CrearEscenario/>
        </Route>

      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
