import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import Login from '../pages/Login';
import Wallet from '../pages/Wallet';

class Content extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={ () => <Login /> } />
          <Route exact path="/carteira" render={ () => <Wallet /> } />
        </Switch>
      </div>
    );
  }
}

export default Content;
