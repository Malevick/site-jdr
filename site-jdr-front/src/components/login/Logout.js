import React from 'react'
import { useCookies } from 'react-cookie';
import { IoMdLogOut } from 'react-icons/io';
import './Logout.css';

function Logout(props) {
  
  const displayPhone = props.displayPhone;
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'profil-id']);

  const logout = () =>{
    removeCookie('token');
    removeCookie('profil-id');
  }
  
  return (
    <div onClick={logout} className='logout'>
      <IoMdLogOut /> {!displayPhone && <>Déconnexion</>}
    </div>
  )
}

export default Logout
