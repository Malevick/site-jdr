import React, {useState, useEffect} from 'react'
import {HOST} from './Const';

function Exemple() {

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
    <>
      {(!userIsLoaded) ? <h1>waiting...</h1> : <h2>{user.pseudo}</h2>}
    </>
  )
}


export default Exemple
