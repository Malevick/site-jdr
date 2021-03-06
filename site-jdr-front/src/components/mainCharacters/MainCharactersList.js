import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HOST } from '../../utilities/Const';
import Card from '../card/Card';
import Loading from '../loading/Loading';
import './MainCharactersList.css'

function MainCharactersList() {

  const [roleplays, setRoleplays] = useState([]);
  const [roleplaysAreLoading, setRoleplaysAreLoading] = useState(true);

  useEffect(() => {

    fetch( HOST +"/roleplays?_sort=id:DESC", {
      method: "GET",
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(datas => {

      setRoleplays(datas);
    })
    .finally(()=>{
      setRoleplaysAreLoading(false);
    });
    
}, [])

  return (
    roleplaysAreLoading ? 
        <Loading/>
      : 
      <section className='main-characters-list'>
        <h1 className='list-title'>Personnages Pricipaux</h1>
        <div className='main-characters-list-content'>
        {roleplays.map((roleplay) =>
            roleplay.main_characters.length > 0 &&
            <div key={roleplay.id}>
              <h2  className='list-second-title'>{roleplay.name}</h2>
              <div className='list'>
              {
                roleplay.main_characters.map((mainCharacter) =>
                <Link to={'/personnages-principaux/' + mainCharacter.id} key={mainCharacter.id} params={{id : mainCharacter.id}}>
                  <Card article={{id : mainCharacter.id, name : mainCharacter.name, img : mainCharacter.img}}/>
                </Link>
                )
              }
              </div>
            </div>
          )}
          </div>
        </section>
  )
}

export default MainCharactersList
