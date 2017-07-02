import React from "react";
import { render } from 'react-dom';
import { Route, IndexRoute, Router, browserHistory } from "react-router";
import Main from "../components/Main";
import Home from "../components/home/Home";
import Profile from "./../components/profile/Profile";
import Shelter from "./../components/shelter/Shelter";
import Donate from "./../components/donate/Donate";

const routes = (
  <Router history={browserHistory} onUpdate={hashLinkScroll}>
    <Route path="/" component={Main}>
      <Route path="home" component={Home} />
      <Route path="shelter" component={Shelter} />
      <Route path="profile" component={Profile} />
      <Route path="donate" component={Donate} />
      <IndexRoute component={Home} />
    </Route>
  </Router>
);

function hashLinkScroll() {
  const { hash } = window.location;
  if (hash !== '') {
    setTimeout(() => {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) element.scrollIntoView();
    }, 0);
  }
}

export default routes;
