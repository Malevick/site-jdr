import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { GiDiceTwentyFacesTwenty } from 'react-icons/gi';
import { IoMdLogIn, IoMdLogOut, IoMdClose } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgClose } from 'react-icons/cg'


function Header() {

  const [loged, isLoged] = useState(false)
  const [menuOpened, isMenuOpened] = useState(false)

  return (
    <header>
      <div className={!menuOpened ? 'header-top' : 'header-top open'}>
        <Link to='/' className='logo'>
          < GiDiceTwentyFacesTwenty />
          Le Repère
        </Link>
        <nav>
          {loged &&
            <Link to='/profil'>
              <FaUserCircle /> Bienvenue user
            </Link>
          }
          {!loged ?
            <Link to='/login' onClick={()=>isLoged(true)}>
              <IoMdLogIn /> Connexion
            </Link>
            :
            <Link to='/logout' onClick={()=>isLoged(false)}>
              <IoMdLogOut /> Déconnexion
            </Link>
          }
          <Link onClick={()=>isMenuOpened(!menuOpened)}>
            {!menuOpened ?
            <span>Catégories</span>
            : <span>Catégories</span>}
          </Link>
        </nav>
      </div>
      <ul className={!menuOpened ? 'header-menu' : 'header-menu open'} >
        <Link to='/jeux-de-role'>
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
