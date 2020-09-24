import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import { HOST } from '../../utilities/Const';
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'profil-id']);

  const connect = (e)=>{
    e.preventDefault();
    if(password.length > 1 && email.length > 1){
      removeCookie('token');
      removeCookie('profil-id');
      fetch( HOST +"/auth/local", {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        })
      })
      .then(response => response.json())
      .then(data => {
        if(data.jwt !== undefined){
          setCookie('token', data.jwt, {path: '/'})
          setCookie('profil-id', data.user.profil.id, {path: '/'})
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
  
  return (
    <>
      { cookies.token !== undefined ?
          <Redirect to='/' />
        :
          <div className='login'>
            <h2>Connection</h2>
            <form className='login-form' onSubmit={connect}>
              <input onChange={e => setEmail(e.target.value)} type="mail" name="mail" required placeholder='votre email'></input>
              <input onChange={e => setPassword(e.target.value)} type="password" name="password" required></input>
              <input type="submit" value="Connection" />
            </form>
            <a>Mot de passe oublié ?</a>
          </div>
      }
    </>
  )
}

export default Login