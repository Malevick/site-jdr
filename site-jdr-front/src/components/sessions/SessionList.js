import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HOST } from '../../utilities/Const';
import Card from '../card/Card';
import Loading from '../loading/Loading';
import './SessionList.css';

function SessionList() {

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
      <section className='sessions-list'>
        <h1 className='list-title'>Séances</h1>
        <div className='sessions-list-content'>
        {roleplays.map((roleplay) =>
            roleplay.sessions.length > 0 &&
            <div key={roleplay.id}>
              <h2 className='list-second-title'>{roleplay.name}</h2>
              <div className='list'>
              {
                roleplay.sessions.map((session) =>
                <Link to={'/seances/' + session.id} key={session.id} params={{id : session.id}}>
                  <Card article={{id : session.id, name : session.name, img : session.img}}/>
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

export default SessionList
