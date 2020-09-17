import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HOST } from '../../utilities/Const';
import Card from '../card/Card';
import './RoleplayList.css';

export default function RoleplayList() {

  const [roleplays, setRoleplays] = useState([]);
  const [roleplaysAreLoading, setRoleplaysAreLoading] = useState(true);

  useEffect(() => {

      fetch( HOST +"/roleplays", {
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
    <main className="roleplay-list">
      <div className="roleplay-list-title-box">
        <div className="roleplay-list-title-line"></div>
        <h1 className="roleplay-list-title">Jeux de Rôle</h1>
      </div>
      <section>
        {roleplaysAreLoading ? 
          <>Chargement...</> 
          : 
          roleplays.map((roleplay) =>
            <Link to={'/jeux-de-role/' + roleplay.id} key={roleplay.id} params={{id : roleplay.id}}>
              <Card article={{id : roleplay.id, name : roleplay.name}}/>
            </Link>
          )
        }
      </section>
    </main>
  )
}
