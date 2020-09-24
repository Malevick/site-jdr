import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Roleplay from './components/roleplays/Roleplay';
import RoleplayList from './components/roleplays/RoleplayList';
import Login from './components/login/Login';
import MainCharactersList from './components/mainCharacters/MainCharactersList';
import MainCharacter from './components/mainCharacters/MainCharacter';
import NotFoundPage from './components/notFoundPage/NotFoundPage';
import SecondaryCharacterList from './components/secondaryCharacter/SecondaryCharacterList';
import SecondaryCharacter from './components/secondaryCharacter/SecondaryCharacter';

function App() {

  return (
    <>
      <Router>
        <Header />
        <main>
          <Switch>
            <Route path='/' exact component={Home}></Route>
            <Route path={'/jeux-de-roles/:id'} component={Roleplay}></Route>
            <Route path={'/jeux-de-roles'} component={RoleplayList}></Route>
            <Route path={'/personnages-principaux/:id'} component={MainCharacter}></Route>
            <Route path={'/personnages-principaux'} component={MainCharactersList}></Route>
            <Route path={'/personnages-secondaires/:id'} component={SecondaryCharacter}></Route>
            <Route path={'/personnages-secondaires'} component={SecondaryCharacterList}></Route>
            <Route path={'/connexion'} component={Login}></Route>
            <Route path='*' component={NotFoundPage} />
          </Switch>
        </main>
      </Router>
    </>
  );

}

export default App;
