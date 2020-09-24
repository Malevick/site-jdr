import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ERRORS, HOST, STATUS } from '../../utilities/Const';
import Loading from '../loading/Loading';
import './Roleplay.css';

function Roleplay() {

  const param = useParams();

  const [roleplay, setRoleplay] = useState({});
  const [roleplayIsLoading, setRoleplayIsLoading] = useState(true);
  const [gameMaster, setGameMaster] = useState({});
  const [gameMasterIsLoading, setGameMasterIsLoading] = useState(true);
  const [mainCharacters, setMainCharacters] = useState([]);
  const [mainCharactersAreLoading, setMainCharactersAreLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [sessionsAreLoading, setSessionsAreLoading] = useState(true);
  const [annexes, setAnnexes] = useState([]);
  const [annexesAreLoading, setAnnexesAreLoading] = useState(true);
  const [secondaryCharacters, setSecondaryCharacters] = useState([]);
  const [secondaryCharactersAreLoading, setSecondaryCharactersAreLoading] = useState(true);


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
        return fetch(HOST +"/sessions?roleplay.id=" + param.id, {
          method: "GET",
          headers: {
            'Content-Type' : 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => {
          setSessions(data);
          return fetch(HOST +"/annexes?roleplay.id=" + param.id, {
            method: "GET",
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => {
            setAnnexes(data);
            return fetch(HOST +"/secondary-characters?roleplay.id=" + param.id, {
              method: "GET",
              headers: {
                'Content-Type' : 'application/json'
              }
            })
            .then(response => response.json())
            .then(data => {
              setSecondaryCharacters(data);
            })
          })
        })
      })
    })
    .catch(()=>{
      setError(ERRORS.wrongId);
    })
    .finally(()=>{
      setRoleplayIsLoading(false);
      setGameMasterIsLoading(false);
      setMainCharactersAreLoading(false);
      setSessionsAreLoading(false);
      setAnnexesAreLoading(false)
      setSecondaryCharactersAreLoading(false)
    });

  }, [])

    return (
      error.length > 0 ? 
        <p>{error}</p> 
      : 
        (secondaryCharactersAreLoading && annexesAreLoading && roleplayIsLoading && gameMasterIsLoading && mainCharactersAreLoading && sessionsAreLoading) ? 
          <Loading/>
        : 
          <section className='jeu-de-role'>
                <div className='jeu-de-role-main'>
                  <article className='jeu-de-role-header'>
                    {roleplay.image != null && 
                      <a href={HOST + roleplay.image.url} target='_blank'>
                        <div className='img' style={{backgroundImage : "url("+ HOST + roleplay.image.url+")"}}></div>
                      </a>
                    }
                    <div>
                      <h1>{roleplay.name}</h1>
                      <h5 className='mj'>
                        Maître du jeu - <Link to={'/profils/' + gameMaster.id} params={{id : gameMaster.id}}>
                          <div className='thumbnail' style={{backgroundImage : "url("+ HOST + gameMaster.avatar.url+")"}}></div> {gameMaster.pseudo}
                          </Link>
                      </h5>
                        {roleplay.starting_date && <h5>A débuté le - {roleplay.starting_date}</h5> }
                      <h5>
                        Status - {STATUS[roleplay.status]}
                      </h5>
                    </div>
                  </article>
                  <article className='jeu-de-role-content'
                    dangerouslySetInnerHTML={{
                      __html: roleplay.description
                    }}> 
                  </article>
                </div>
                <aside className='jeu-de-role-aside'>
                  <div>
                    <h4>Personnages principaux</h4>
                    {mainCharacters.length > 0 ?
                      <ul>
                        {mainCharacters.map((mainCharacter) =>
                          <li key={mainCharacter.id}>
                            <Link to={'/personnages-principaux/' + mainCharacter.id}  params={{id : mainCharacter.id}}>
                              {mainCharacter.name}
                            </Link>
                          </li>
                          )
                        }
                      </ul>
                      :
                      <p>Aucun personnage principal</p>
                    }
                  </div>
                  <div>
                    <h4>Personnages secondaires</h4>
                    {secondaryCharacters.length > 0 ?
                      <ul>
                        {secondaryCharacters.map((secondaryCharacter) =>
                          <li key={secondaryCharacter.id}>
                            <Link to={'/personnages-secondaires/' + secondaryCharacter.id}  params={{id : secondaryCharacter.id}}>
                              {secondaryCharacter.name}
                            </Link>
                          </li>
                          )
                        }
                      </ul>
                      :
                      <p>Aucun personnage secondaire</p>
                    }
                  </div>
                  <div>
                    <h4>Séances</h4>
                    {sessions.length > 0 ?
                    <ul>
                      {sessions.map((session) =>
                        <li key={session.id}>
                          <Link to={'/seances/' + session.id}  params={{id : session.id}}>
                            {session.name}
                          </Link>
                        </li>
                        )
                      }
                    </ul>
                    :
                    <p>Aucune séance</p>
                    }
                  </div>
                  <div>
                    <h4>Annexes</h4>
                    {annexes.length > 0 ?
                    <ul>
                      {annexes.map((annexe) =>
                        <li key={annexe.id}>
                          <Link to={'/annexes/' + annexe.id}  params={{id : annexe.id}}>
                            {annexe.name}
                          </Link>
                        </li>
                        )
                      }
                    </ul>
                    :
                    <p>Aucune annexe</p>
                    }
                  </div>
                </aside>
              </section>
    )
}

export default Roleplay
