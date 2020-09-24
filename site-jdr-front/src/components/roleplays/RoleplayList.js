import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HOST } from '../../utilities/Const';
import Card from '../card/Card';
import Loading from '../loading/Loading';
import './RoleplayList.css';

export default function RoleplayList() {

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
        setRoleplays(json);
      })
      .finally(()=>{
        setRoleplaysAreLoading(false);
      });
      
  }, [])

  return (
    roleplaysAreLoading ? 
      <Loading/>
    : 
      <section className='roleplay-list'>
        <h1 className='list-title'>Jeux de Rôle</h1>
        <div className='roleplay-list-content list'>
          {roleplays.map((roleplay) =>
            <Link to={'/jeux-de-roles/' + roleplay.id} key={roleplay.id} params={{id : roleplay.id}}>
              <Card article={{id : roleplay.id, name : roleplay.name, img : roleplay.image}}/>
            </Link>
          )}
          </div>
        </section>
  )
}
