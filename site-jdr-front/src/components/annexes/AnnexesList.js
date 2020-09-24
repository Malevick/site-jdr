import React, { useEffect, useState } from 'react'
import { HOST } from '../../utilities/Const';
import Card from '../card/Card';
import Loading from '../loading/Loading';
import './AnnexesList.css'

function AnnexesList() {
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
    .then(json => {
      console.log(json)
      setRoleplays(json);
    })
    .finally(()=>{
      setRoleplaysAreLoading(false);
    });
  }, [])

  return (
    roleplaysAreLoading ? 
      <Loading />
    : 
      <section className='roleplays-list'>
        <h1 className='list-title'>Annexes</h1>
        <div className='roleplays-list-content'>
          {roleplays.map((roleplay) =>
            roleplay.annexes.length > 0 &&
            <div key={roleplay.id}>
              <h2 className='list-second-title'>{roleplay.name}</h2>
              <div className='list'>
              {
                roleplay.annexes.map((annexe) =>
                <a key={annexe.id} href={HOST + annexe.file.url} target='_blank'>
                  <Card article={{id : annexe.id, name : annexe.name, img : annexe.file, other: "par " + annexe.author.pseudo }}/>
                </a>
                )
              }
              </div>
            </div>
          )}
        </div>
      </section>
  )
}

export default AnnexesList
