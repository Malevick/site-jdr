import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { GiDiceTwentyFacesTwenty, GiHamburgerMenu } from 'react-icons/gi';
import { IoMdLogOut } from 'react-icons/io';

function Header() {

  const [loged, isLoged] = useState(false);
  const [displayPhone, isDisplayPhone] = useState(window.innerWidth <= 480 ? true : false)
  const [menuOpened, isMenuOpened] = useState(!displayPhone);


  const handleScroll = (e)=>{
    isMenuOpened(window.scrollY === 0 ? true : false)
  }

  useEffect(() => {
    !displayPhone && window.addEventListener('scroll', handleScroll);
  }, [])

  return (
    <header onMouseOver={()=>{!displayPhone && isMenuOpened(true)}}>
      <div className={!menuOpened ? 'header-top' : 'header-top open'}>
        <Link to='/' className='logo'>
          < GiDiceTwentyFacesTwenty />
          Le Repaire
        </Link>
        {displayPhone ?
          <nav>
            <Link to='/profil'>
              <div className='thumbnail' style={{backgroundImage : 'url(http://localhost:1337/uploads/chtullu_e2601520f7.jpg)'}}></div>
            </Link>
            <Link to='/logout' onClick={()=>isLoged(false)}>
              <IoMdLogOut />
            </Link>
            <Link>
              <GiHamburgerMenu onClick={()=>isMenuOpened(!menuOpened)}/>
            </Link>
          </nav>
        :
          <nav>
            <Link to='/profil'>
              <div className='thumbnail' style={{backgroundImage : 'url(http://localhost:1337/uploads/chtullu_e2601520f7.jpg)'}}></div> Bienvenue Rascasse
            </Link>
            <Link to='/logout' onClick={()=>isLoged(false)}>
              <IoMdLogOut /> Déconnexion
            </Link>
          </nav>
        }
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
