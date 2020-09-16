import React, {useState, useEffect} from 'react'
import './Home.css';
import {HOST} from '../../utilities/Const';
import Card from '../card/Card';
import { Link } from 'react-router-dom';

function Home() {

  const [roleplay, setRoleplay] = useState({});
  const [roleplayIsLoading, setRoleplayIsLoading] = useState(true);
  const [annexe, setAnnexe] = useState({});
  const [annexeIsLoading, setAnnexeIsLoading] = useState(true);

  //Le [] final permet de ne lancer qu'une requete
  useEffect(()=>{

    //Roleplay
    fetch( HOST +"/roleplays?_sort=created_at:desc&_limit=1", {
      method: "GET",
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      if(json.length > 0 )
        setRoleplay(json[0]);
    })
    .finally(()=>{
      setRoleplayIsLoading(false);
    });
    
    //Annexe
    fetch( HOST +"/annexes?_sort=created_at:desc&_limit=1", {
      method: "GET",
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      if(json.length > 0 )
        setAnnexe(json[0]);
    })
    .finally(()=>{
      setAnnexeIsLoading(false);
    });
  }, [])

  return (
    <main className="main">
      <section>
        {roleplayIsLoading ? <p>loading...</p> :   
            <Link to={'/jeux-de-role/' + roleplay.id} key={roleplay.id} params={{id : roleplay.id}}>
              <Card article = {{id: roleplay.id, name: roleplay.name, img: ""}}/>
            </Link>
        }
        {annexeIsLoading ? <p>loading...</p> :  
          <Link to='/annexe' key={annexe.id}>
            <Card article = {{id: annexe.id, name: annexe.name, img: ""}}/>
          </Link>
        }
      </section>
    </main>
  )
}

export default Home
