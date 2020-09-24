import React, {useState, useEffect} from 'react'
import './Home.css';
import {HOST} from '../../utilities/Const';
import Card from '../card/Card';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Loading from '../loading/Loading';

function Home() {

  const [roleplay, setRoleplay] = useState({});
  const [roleplayIsLoading, setRoleplayIsLoading] = useState(true);
  const [annexe, setAnnexe] = useState({});
  const [annexeIsLoading, setAnnexeIsLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'profil-id']);


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
    (roleplayIsLoading && annexeIsLoading) ? 
        <Loading/> 
      :       
        <section className="home">
          {cookies['profil-id'] === undefined &&
            <Link to='/connexion'>
              Connecte-toi pour profiter de toutes les fonctionnalitées du site !
            </Link>
          }
          <div className='list'>
            <Link to={'/jeux-de-roles/' + roleplay.id} params={{id : roleplay.id}}>
              <Card article = {{id: roleplay.id, name: roleplay.name, img: roleplay.img}}/>
            </Link>
            <Link to={'/annexes/' + annexe.id} params={{id : annexe.id}}>
              <Card article = {{id: annexe.id, name: annexe.name, img: annexe.img}}/>
            </Link>
          </div>
        </section>
  )
}

export default Home
