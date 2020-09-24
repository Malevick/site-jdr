import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ERRORS, HOST } from '../../utilities/Const';
import Loading from '../loading/Loading';
import PlayerSystem from '../system/PlayerSystem';
import './SecondaryCharacter.css';

function SecondaryCharacter() {

  const param = useParams();
  const [error, setError] = useState('');
  const [secondaryCharacter, setSecondaryCharacter] = useState({});
  const [secondaryCharacterIsLoading, setSecondaryCharacterIsLoading] = useState(true)

  useEffect(() => {
    fetch( HOST +"/secondary-characters?id=" + param.id, {
        method: "GET",
        headers: {
          'Content-Type' : 'application/json'
        }
      })
    .then(response => response.json())
    .then(data => {
      let result = data[0];
      setSecondaryCharacter(result);
    })
    .catch(()=>{
      setError(ERRORS.wrongId);
    })
    .finally(()=>{
      setSecondaryCharacterIsLoading(false)
    });
  }, [])

  return (
    error.length > 0 ?  
      <p>{error}</p> 
    :
      secondaryCharacterIsLoading ?
        <Loading />
      : 
        <section className='personnage-secondaire'>
          <div className='personnage-secondaire-main'>
            <div className='personnage-secondaire-header'>
              {secondaryCharacter.img != null &&
                <a href={HOST + secondaryCharacter.img.url} target='_blank'>
                  <div className='img' style={{backgroundImage : "url("+ HOST + secondaryCharacter.img.url+")"}}></div>
                </a>
              }
              <div>
                <h1>{secondaryCharacter.name}</h1>
                <h5 className='jdr'>
                  Jeu de rôle - 
                  <Link to={'/jeux-de-roles/' + secondaryCharacter.roleplay.id} params={{id : secondaryCharacter.roleplay.id}}>
                    {secondaryCharacter.roleplay.name}
                  </Link>
                </h5>
                <h5 className='joueur'>
                  Joueur - 
                  <Link to={'/profils/' + secondaryCharacter.author.id} params={{id : secondaryCharacter.author.id}}>
                    <div className='thumbnail' style={{backgroundImage : "url("+ HOST + secondaryCharacter.author.avatar.url+")"}}></div> {secondaryCharacter.author.pseudo}
                  </Link>
                </h5>
              </div>
            </div>
            <div className='personnage-secondaire-content'
            dangerouslySetInnerHTML={{
              __html: secondaryCharacter.description
            }}> 
            </div>
          </div>
          {secondaryCharacter.characteristic != null &&
            <aside className='personnage-secondaire-aside'>
              <div>
                <PlayerSystem system={{ system : secondaryCharacter.roleplay.system, chara : secondaryCharacter.characteristic}} />
              </div>
            </aside>
          }
        </section>
  )
}

export default SecondaryCharacter
