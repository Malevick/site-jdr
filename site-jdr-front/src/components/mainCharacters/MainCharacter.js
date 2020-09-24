import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { ERRORS, HOST } from '../../utilities/Const';
import Loading from '../loading/Loading';
import PlayerSystem from '../system/PlayerSystem';
import './MainCharacter.css'

function MainCharacter() {
  
  const param = useParams();
  const [error, setError] = useState('');
  const [mainCharacter, setMainCharacter] = useState({});
  const [mainCharacterIsLoading, setMainCharacterIsLoading] = useState(true)

  useEffect(() => {
    fetch( HOST +"/main-characters?id=" + param.id, {
        method: "GET",
        headers: {
          'Content-Type' : 'application/json'
        }
      })
    .then(response => response.json())
    .then(data => {
      let result = data[0];
      setMainCharacter(result);
    })
    .catch(()=>{
      setError(ERRORS.wrongId);
    })
    .finally(()=>{
      setMainCharacterIsLoading(false)
    });
  }, [])

  return (
      error.length > 0 ?  
        <p>{error}</p> 
      :
        mainCharacterIsLoading ?
          <Loading/>
        : 
          <section className='personnage-principal'>
              <div className='personnage-principal-main'>
                <div className='personnage-principal-header'>
                  {mainCharacter.img != null &&
                      <a href={HOST + mainCharacter.img.url} target='_blank'>
                        <div className='img' style={{backgroundImage : "url("+ HOST + mainCharacter.img.url+")"}}></div>
                      </a>
                  }
                  <div>
                    <h1>{mainCharacter.name}</h1>
                    <h5 className='jdr'>
                      Jeu de rôle - 
                      <Link to={'/jeux-de-roles/' + mainCharacter.roleplay.id} params={{id : mainCharacter.roleplay.id}}>
                        {mainCharacter.roleplay.name}
                      </Link>
                    </h5>
                    <h5 className='joueur'>
                      Joueur - <Link to={'/profils/' + mainCharacter.author.id} params={{id : mainCharacter.author.id}}>
                        <div className='thumbnail' style={{backgroundImage : "url("+ HOST + mainCharacter.author.avatar.url+")"}}></div> {mainCharacter.author.pseudo}
                        </Link>
                    </h5>
                  </div>
                </div>
                <div className='personnage-principal-content'
                dangerouslySetInnerHTML={{
                  __html: mainCharacter.description
                }}> 
                </div>
              </div>
              {mainCharacter.final_card !== null | mainCharacter.characteristic != null &&
                <aside className='personnage-principal-aside'>
                  {mainCharacter.final_card !== null &&
                    <div className='fiche'>
                      <h4>Fiche</h4>
                      <a href={HOST + mainCharacter.final_card.url} target='_blank'>
                        <div className='img' style={{backgroundImage : "url("+ HOST + mainCharacter.final_card.url +")"}}></div>
                      </a>
                    </div>
                  }
                  {mainCharacter.characteristic != null &&
                    <div>
                      <PlayerSystem system={{ system : mainCharacter.roleplay.system, chara : mainCharacter.characteristic}} />
                    </div>
                  }
                </aside>
              }
            </section>
  )
}

export default MainCharacter
