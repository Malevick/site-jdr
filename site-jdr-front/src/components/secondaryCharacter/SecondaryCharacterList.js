import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HOST } from '../../utilities/Const';
import Card from '../card/Card';
import Loading from '../loading/Loading';
import './SecondaryCharacterList.css';

function SecondaryCharacterList() {

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
      <Loading />
    : 
      <section className='secondary-characters-list'>
        <h1 className='list-title'>Personnages Secondaires</h1>
        <div className='secondary-characters-list-content'>
          {roleplays.map((roleplay) =>
            roleplay.secondary_characters.length > 0 &&
            <div key={roleplay.id}>
              <h2 className='list-second-title'>{roleplay.name}</h2>
              <div className='list'>
              {
                roleplay.secondary_characters.map((secondaryCharacter) =>
                <Link to={'/personnages-secondaires/' + secondaryCharacter.id} key={secondaryCharacter.id} params={{id : secondaryCharacter.id}}>
                <Card article={{id : secondaryCharacter.id, name : secondaryCharacter.name, img : secondaryCharacter.img}}/>
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

export default SecondaryCharacterList
