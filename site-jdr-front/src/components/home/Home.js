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
      return fetch( HOST +"/annexes?_sort=created_at:desc&_limit=1", {
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
    })
    .finally(()=>{
      setRoleplayIsLoading(false);
      setAnnexeIsLoading(false);

    });
    
  }, [])

  return (
    <section className="home">
      {(roleplayIsLoading && annexeIsLoading) ? <p>Chargement</p> :   
        <div className='list'>
          <Link to={'/jeux-de-role/' + roleplay.id} params={{id : roleplay.id}}>
            <Card article = {{id: roleplay.id, name: roleplay.name, img: roleplay.img}}/>
          </Link>
          <Link to='/annexe'>
            <Card article = {{id: annexe.id, name: annexe.name, img: annexe.img}}/>
          </Link>
        </div>
      }
    </section>
  )
}

export default Home
