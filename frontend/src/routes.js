import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Newincident from './pages/Newincident';
//o browser router é ncessário pra falar q será exibido no browser, o switch pra garantir que apenas uma rota sera chamada por momento, e o Route é pra criar a rota

export default function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Logon} />
        <Route path="/register" component={Register} />
        <Route path="/profile" component={Profile} />
        <Route path="/incidents/new" component={Newincident} />
      </Switch>
    </BrowserRouter>
  )
}