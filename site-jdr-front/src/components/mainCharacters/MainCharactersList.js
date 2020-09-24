import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HOST } from '../../utilities/Const';
import Card from '../card/Card';
import Loading from '../loading/Loading';
import './MainCharactersList.css'

function MainCharactersList() {

  const [mainCharacters, setMainCharacters] = useState([]);
  const [mainCharactersAreLoading, setMainCharactersAreLoading] = useState(true);

  useEffect(() => {

    fetch( HOST +"/main-characters", {
      method: "GET",
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      setMainCharacters(json);
    })
    .finally(()=>{
      setMainCharactersAreLoading(false);
    });
    
}, [])

  return (
    mainCharactersAreLoading ? 
        <Loading/>
      : 
      <section className='main-characters-list'>
        <h1 className='list-title'>Personnages Pricipaux</h1>
        <div className='main-characters-list-content list'>
          {mainCharacters.map((mainCharacter) =>
            <Link to={'/personnages-principaux/' + mainCharacter.id} key={mainCharacter.id} params={{id : mainCharacter.id}}>
              <Card article={{id : mainCharacter.id, name : mainCharacter.name, img : mainCharacter.img}}/>
            </Link>
          )}
          </div>
        </section>
  )
}

export default MainCharactersList
