import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { GiDiceTwentyFacesTwenty } from 'react-icons/gi';
import { IoMdLogIn, IoMdLogOut, IoMdClose } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgClose } from 'react-icons/cg'


function Header() {

  const [loged, isLoged] = useState(false);
  const [menuOpened, isMenuOpened] = useState(true);

  return (
    <header onMouseOver={()=>isMenuOpened(true)} onMouseLeave={()=>isMenuOpened(false)}>
      <div className={!menuOpened ? 'header-top' : 'header-top open'}>
        <Link to='/' className='logo'>
          < GiDiceTwentyFacesTwenty />
          Le Repère
        </Link>
        <nav>
          <Link to='/profil'>
            <FaUserCircle /> Bienvenue user
          </Link>
          <Link to='/logout' onClick={()=>isLoged(false)}>
            <IoMdLogOut /> Déconnexion
          </Link>
        </nav>
      </div>
      <ul className={!menuOpened ? 'header-menu' : 'header-menu open'} >
        <Link to='/jeux-de-roles'>
          Jeux de rôle
        </Link>
        <Link to='/personnages-principaux'>
          Personnages joueurs
        </Link>
        <Link to='/personnages-secondaires'>
          Personnages secondaires
        </Link>
        <Link to='/seances'>
          Séances
        </Link>
        <Link to='/annexes'>
          Annexes
        </Link>
      </ul>
    </header>
  )
}

export default Header
