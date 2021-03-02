import React, { useState } from "react";
import Header from '../CardDetails/CardDetails';
import Footer from '../Footer/Footer';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import CardDetails from "../CardDetails/CardDetails";
import CardTask from "../CardTask/CardTask";


function Home(props){
    return (
      <>
      <Switch >
        <Route exact path="/">
            <CardDetails/>
        </Route>
        <Route exact path="/details/:cardid">
            <CardTask/>
        </Route>
      </Switch>
      
      </>
    );
}
export default Home;
