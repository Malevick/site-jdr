import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Roleplay from './components/roleplays/Roleplay';
import RoleplayList from './components/roleplays/RoleplayList';

function App() {
  
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path={'/jeux-de-role/:id'} component={Roleplay}></Route>
          <Route path={'/jeux-de-roles'} component={RoleplayList}></Route>
          <Route path='/' exact component={Home}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
