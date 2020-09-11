import React from 'react';
import './Card.css';
import {HOST} from '../../utilities/Const';

/**
 * 
 * @param {*} article 
 */
function Card(props) {
    
    const article = props.article;

    return (
        <article className="card" id={article.id} style={{backgroundImage : "url(" + HOST + article.img + ")"}}>
            <h1>{article.name}</h1>
        </article>
    )
}

export default Card
