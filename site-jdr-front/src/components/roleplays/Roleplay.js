import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ERRORS, HOST } from '../../utilities/Const';
import './Roleplay.css';

function Roleplay() {

  const [param, setParam] = useState(useParams());
  const [roleplay, setRoleplay] = useState({});
  const [roleplayIsLoading, setRoleplayIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    
    fetch( HOST +"/roleplays/" + param.id, {
      method: "GET",
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
        setRoleplay(json);
    })
    .catch(function(error) {
      setError(ERRORS.wrongId);
    })
    .finally(()=>{
      setRoleplayIsLoading(false);
    });

  }, [])

    return (
        <div>
          {error.length > 0 ? <p>{error}</p> : 
              roleplayIsLoading ? <p>Chargement...</p> : <p>{roleplay.name}</p>
          }
        </div>
    )
}

export default Roleplay
