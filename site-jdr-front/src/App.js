import React from 'react';
import './App.css';
import { CONST } from './utilities/Const';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';

function App() {
  
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={Home}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
