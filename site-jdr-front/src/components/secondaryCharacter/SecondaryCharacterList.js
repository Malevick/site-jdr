import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HOST } from '../../utilities/Const';
import Card from '../card/Card';
import Loading from '../loading/Loading';
import './SecondaryCharacterList.css';

function SecondaryCharacterList() {

  const [secondaryCharacters, setSecondaryCharacters] = useState([]);
  const [secondaryCharactersAreLoading, setSecondaryCharactersAreLoading] = useState(true);

  useEffect(() => {

    fetch( HOST +"/secondary-characters", {
      method: "GET",
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      setSecondaryCharacters(json);
    })
    .finally(()=>{
      setSecondaryCharactersAreLoading(false);
    });
    
}, [])

  return (
    secondaryCharactersAreLoading ? 
      <Loading />
    : 
      <section className='secondary-characters-list'>
        <h1 className='list-title'>Personnages Secondaires</h1>
        <div className='secondary-characters-list-content list'>
          {secondaryCharacters.map((secondaryCharacter) =>
            <Link to={'/personnages-secondaires/' + secondaryCharacter.id} key={secondaryCharacter.id} params={{id : secondaryCharacter.id}}>
              <Card article={{id : secondaryCharacter.id, name : secondaryCharacter.name, img : secondaryCharacter.img}}/>
            </Link>
          )}
        </div>
      </section>
  )
}

export default SecondaryCharacterList
