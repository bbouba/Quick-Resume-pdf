import React from 'react';
import Register from './register'
import Login from './Login'
import Success from './Success'
import Profile from './profile'
import Home from './Home'
import Model from './Model'
import Model1 from './Model1'
import Model2 from './Model2'
import Model3 from './Model3'

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

function Main() {
  
  return (

    <div className="container bg-light" style={{"width": "100vw", "fontFamily": "Garamond", "background": "rgba(177, 207, 148)"}}>
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                <Route path='/success' component={Success} />
                <Route path='/profile' exact component={Profile} />
                <Route path='/model' exact component={Model} />
                <Route path='/model1' exact component={Model1} />
                <Route path='/model2' exact component={Model2} />
                <Route path='/model3' exact component={Model3} />
            </Switch>
        </Router>
    </div>
  );
}

export default Main;
