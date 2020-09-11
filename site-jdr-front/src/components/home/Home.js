import React, {useState, useEffect} from 'react'
import './Home.css';
import {HOST} from '../../utilities/Const';
import Card from '../card/Card';
import { Link } from 'react-router-dom';

function Home() {

  const [roleplays, setRoleplays] = useState([])
  const [roleplaysAreLoaded, setRoleplaysAreLoaded] = useState(false);
  const [card, setCard] = useState({});
  //Le [] final permet de ne lancer qu'une requete
  useEffect(()=>{
    fetch( HOST +"/roleplays", {
      method: "GET",
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      setRoleplays(json);
    })
    .finally(()=>{
      setRoleplaysAreLoaded(true);
    });
  }, [])

  const roleplayCard = roleplays.map((roleplay) => 
      <Link to='/jeux-de-role' key={roleplay.id}>
        <Card article = {{id: roleplay.id, name: roleplay.name, img: ""}}/>
      </Link>
    )

  return (
    <main className="main">
      <section>
        <article>
          <p>Bienvenue sur le site :)</p>
        </article>
      </section>
      <section>
        {(!roleplaysAreLoaded) ? <h1>waiting...</h1> : roleplayCard}
      </section>
    </main>
  )
}

export default Home
