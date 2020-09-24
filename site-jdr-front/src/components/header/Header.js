import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { GiDiceTwentyFacesTwenty, GiHamburgerMenu } from 'react-icons/gi';
import Logout from '../login/Logout';
import { useCookies } from 'react-cookie';
import { HOST } from '../../utilities/Const';
import { IoIosClose, IoMdClose, IoMdLogIn } from 'react-icons/io';

function Header() {

  const [cookies, setCookie, removeCookie] = useCookies(['token', 'profil-id']);
  const displayPhone = window.innerWidth <= 480 ? true : false;
  const displayTablet = window.innerWidth <= 768 ? true : false;

  const [menuOpened, isMenuOpened] = useState(!displayPhone);
  const [profil, setProfil] = useState({});

  const handleScroll = (e)=>{
    isMenuOpened(window.scrollY === 0 ? true : false)
  }

  useEffect(() => {
    !displayPhone && window.addEventListener('scroll', handleScroll);
  }, [])

  useEffect(()=>{
    if((profil.id === undefined && cookies['profil-id'] !== undefined) || (cookies['profil-id'] !== undefined && cookies['profil-id'] !== profil.id)){
      fetch( HOST +"/profils?id=" + cookies['profil-id'], {
        method: "GET",
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        let result = data[0];
        setProfil(result)
      })
    }
  })

  return (
    <header onMouseOver={()=>{!displayPhone && isMenuOpened(true)}}>
      <div className={!menuOpened ? 'header-top' : 'header-top open'}>
        <Link to='/' className='logo'>
          < GiDiceTwentyFacesTwenty />
          Le Repaire
        </Link>
        {displayPhone || displayTablet ?
              (profil.id !== undefined && cookies['profil-id'] !== undefined)?
              <nav>
                <Link to={'/profil/' + profil.id} params={{id : profil.id}}>
                  <div className='thumbnail' style={{backgroundImage : 'url('+ HOST + profil.avatar.url +')'}}></div>
                </Link>
                < Logout displayPhone={true} />
                {menuOpened ?
                  <IoMdClose onClick={()=>isMenuOpened(false)} className='hamburger opened'/>
                :
                  <GiHamburgerMenu onClick={()=>isMenuOpened(true)} className='hamburger'/>
                }
              </nav>
            :
              <nav>
                <Link to='/connexion'>
                  <IoMdLogIn />
                </Link>
                {menuOpened ?
                  <IoMdClose onClick={()=>isMenuOpened(false)} className='hamburger opened'/>
                :
                  <GiHamburgerMenu onClick={()=>isMenuOpened(true)} className='hamburger'/>
                }
              </nav>
        :
        (profil.id !== undefined && cookies['profil-id'] !== undefined)?
          <nav>
            <Link to={'/profil/' + profil.id} params={{id : profil.id}}>
              <div className='thumbnail' style={{backgroundImage : 'url('+ HOST + profil.avatar.url +')'}}></div> Bienvenue {profil.pseudo}
            </Link>
            < Logout displayPhone={false}  />
          </nav>
        :
          <nav>
            <Link to='/connexion'>
              Connection
            </Link>
          </nav>
        }
      </div>
      <ul className={!menuOpened ? 'header-menu' : 'header-menu open'} >
        <Link to='/jeux-de-roles' onClick={()=> (displayPhone || displayTablet) && isMenuOpened(false)}>
          Jeux de rôle
        </Link>
        <Link to='/personnages-principaux' onClick={()=>(displayPhone || displayTablet) && isMenuOpened(false)}>
          Personnages principaux
        </Link>
        <Link to='/personnages-secondaires' onClick={()=>(displayPhone || displayTablet) && isMenuOpened(false)}>
          Personnages secondaires
        </Link>
        <Link to='/seances' onClick={()=>(displayPhone || displayTablet) && isMenuOpened(false)}>
          Séances
        </Link>
        <Link to='/annexes' onClick={()=>(displayPhone || displayTablet) && isMenuOpened(false)}>
          Annexes
        </Link>
      </ul>
    </header>
  )
}

export default Header
