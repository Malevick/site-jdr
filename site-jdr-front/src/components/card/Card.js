import React, { useEffect, useState } from 'react';
import './Card.scss';
import {getRandom, HOST} from '../../utilities/Const';

/**
 * @param {Object} props - article
 * @param {number} props.id - id de l'article
 * @param {string} props.name - nom/titre de l'article
 * @param {string} props.other - information secondaire
 * @param {stryle} props.img - image a afficher 
 */
function Card(props) {
    
  const article = props.article;
  const randomSize = getRandom(3,5);

  const [style, setStyle] = useState({
      animation : 'gradient'+ getRandom(1,3) + ' '+ getRandom(20,30) + 's linear alternate infinite',
      backgroundSize: randomSize * 100 +'% '+ randomSize * 100 +'%'
    })

  useEffect(() => {
    if(article.img !== undefined && article.img !== null ){
      setStyle({
        backgroundImage : 'url(' + HOST + article.img.url +')'
      })
    }
  }, [])

  const enter = (event)=>{

    let transform = getRandom(1,5);

    const opacity = ()=>{
      let result = 0.5;
      switch (transform) {
        case 1:
          result = 0.9;
          break;
        case 2:
          result = 0.8;
          break;
        case 3:
          result = 0.7;
          break;
        case 4:
          result = 0.6;
          break;
        case 5:
          result = 0.5;
          break;
        default:
          result = 0.5;
          break;
      }
      return result;
    }

    event.currentTarget.style.transform = "rotate("+ transform +"deg) scale(1.0"+ (transform === 5 ? 99 : transform * 2) +")";
    event.currentTarget.style.boxShadow = transform * 5 + "px "+ transform * 5 + "px 2px rgba(20, 22, 22, "+ opacity() +")" ;
    event.currentTarget.style.zIndex = '100'
  }
  const leave = (event)=>{
    event.currentTarget.style.transform = "rotate(0deg) scale(1)";
    event.currentTarget.style.boxShadow = "none";
    event.currentTarget.style.zIndex = 'auto'
  }

  return (
    <>
      { article.id !== undefined ?
        <div onMouseOver={enter} onMouseOut={leave} className="card" id={article.id} 
          style={style}>
            <h4>{article.name}</h4>
            { article.other !== undefined && <h5>{article.other}</h5>}
        </div>
        :
        <p>Aucun article à afficher</p>
      }
    </>
  )
}

export default Card
