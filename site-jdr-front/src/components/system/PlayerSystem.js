import React, { useEffect, useState } from 'react'
import { getRandom } from '../../utilities/Const';
import './PlayerSystem.css'

/**
 * @param {Object} props - systeme
 * @param {Object} props.chara - characteristiques du personnage
 * @param {number} props.system - systeme de jeu
 */
function PlayerSystem(props) {

  const datas = props.system;
  const system = datas.system;
  const characteristiquesBrutes = datas.chara
  const [characteristiques, setCharacteristique] = useState(<></>)

  useEffect(()=>{
    setCharacteristique(
    <>
      {characteristiquesBrutes.map((firstLevel)=>
        !Array.isArray(firstLevel) ? 
          <h5 key={getRandom(0,1000)}>{firstLevel}</h5>
        :
        <ul key={getRandom(0,1000)}>
          {firstLevel.map((secondLevel)=>
            !Array.isArray(secondLevel) ? <li key={getRandom(0,1000)}>{secondLevel}</li> : <li key={getRandom(0,1000)}>{secondLevel[0]} : {secondLevel[1]}</li>
          )}
        </ul>  
      )}
    </>
    )
        
  }, [])

  return (
    <div className='system'>
      <h4>Charactéristiques</h4>
      {characteristiques}
    </div>
  )
}

export default PlayerSystem
