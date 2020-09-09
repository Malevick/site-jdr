import React, {useState, useEffect} from 'react'
import './Home.css';
import {HOST} from '../../utilities/Const';

function Home() {

  const [user, setUser] = useState([])
  const [userIsLoaded, setUserIsLoaded] = useState(false);

  //Le [] final permet de ne lancer qu'une requete
  useEffect(()=>{
    fetch("http://"+ HOST +"/profils/1", {
      method: "GET",
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      setUser(json)
    })
    .finally(()=>{
      setUserIsLoaded(true)
    });
  }, [])


  return (
    <main>
      {(!userIsLoaded) ? <h1>waiting...</h1> : <p>{user.biography}</p>}
      {(!userIsLoaded) ? <h1>waiting...</h1> : <p>{user.biography}</p>}
      {(!userIsLoaded) ? <h1>waiting...</h1> : <p>{user.biography}</p>}
      {(!userIsLoaded) ? <h1>waiting...</h1> : <p>{user.biography}</p>}
    </main>
  )
}

export default Home
