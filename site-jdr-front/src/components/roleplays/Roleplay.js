import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';
import { ERRORS, HOST, STATUS } from '../../utilities/Const';
import './Roleplay.css';

function Roleplay() {

  const [param, setParam] = useState(useParams());

  const [roleplay, setRoleplay] = useState({});
  const [roleplayIsLoading, setRoleplayIsLoading] = useState(true);
  const [gameMaster, setGameMaster] = useState({});
  const [gameMasterIsLoading, setGameMasterIsLoading] = useState(true);
  const [mainCharacters, setMainCharacters] = useState([]);
  const [mainCharactersAreLoading, setMainCharactersAreLoading] = useState(true);

  const [error, setError] = useState('');

  useEffect(() => {

    fetch(HOST +"/roleplay-game-masters?roleplay_id=" + param.id, {
        method: "GET",
        headers: {
          'Content-Type' : 'application/json'
        }
      })
    .then(response => response.json())
    .then(data => {
      let result = data[0];
      setGameMaster(result.game_master);
      setRoleplay(result.roleplay)
      return fetch(HOST +"/main-characters?roleplay.id=" + param.id, {
        method: "GET",
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        setMainCharacters(data);
      })
    })
    .catch(function(error) {
      setError(ERRORS.wrongId);
    })
    .finally(()=>{
      setRoleplayIsLoading(false);
      setGameMasterIsLoading(false);
      setMainCharactersAreLoading(false);
    });

  }, [])

    return (
        <>
          {error.length > 0 ? <p>{error}</p> : 
              (roleplayIsLoading && gameMasterIsLoading && mainCharactersAreLoading) ? <p>Chargement...</p> : 
              <section className='jeu-de-role'>
                <div className='jeu-de-role-main'>
                  <article className='jeu-de-role-header'>
                    {roleplay.image != null && 
                      <div className='img' style={{backgroundImage : "url("+ HOST + roleplay.image.url+")"}}></div>
                    }
                    <div>
                      <h1>{roleplay.name}</h1>
                      <h4 className='mj'>
                        Maître du jeu - <Link to={'/profil/' + gameMaster.id} params={{id : gameMaster.id}}>
                          <div className='thumbnail' style={{backgroundImage : "url("+ HOST + gameMaster.avatar.url+")"}}></div> {gameMaster.pseudo}
                          </Link>
                      </h4>
                        {roleplay.starting_date && <h4>A débuté le {roleplay.starting_date}</h4> }
                      <h4>
                        Status : {STATUS[roleplay.status]}
                      </h4>
                    </div>
                  </article>
                  <article className='jeu-de-role-content'>
                    {roleplay.description}
                  </article>
                </div>
                <aside className='jeu-de-role-aside'>
                  <h3>Personnages principaux</h3>
                  {mainCharacters.length > 0 ?
                    <ul>
                      {mainCharacters.map((mainCharacter) =>
                        <li key={mainCharacter.id}>
                          <Link to={'/personnage-principal/' + mainCharacter.id}  params={{id : mainCharacter.id}}>
                            {mainCharacter.name}
                          </Link>
                        </li>
                        )
                      }
                    </ul>
                    :
                    <p>Aucun personnage</p>
                  }
                  <Link to={'/annexes'} params={{id : roleplay.id}}>
                    <h3>Annexes</h3>
                  </Link>
                </aside>
              </section>
          }
        </>
    )
}

export default Roleplay
