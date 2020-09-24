import React, { useEffect, useState } from 'react';
import { ImArrowDownRight, ImArrowLeft, ImArrowRight } from 'react-icons/im';
import { Link, useParams } from 'react-router-dom';
import { ERRORS, HOST } from '../../utilities/Const';
import Loading from '../loading/Loading';
import './Session.css';

function Session() {
  
  const param = useParams();
  const [error, setError] = useState('');

  const [session, setSession] = useState({});
  const [sessionIsLoading, setSessionIsLoading] = useState(true)

  const [previousSession, setPreviousSession] = useState({});
  const [previousSessionIsLoading, setPreviousSessionIsLoading] = useState(true);

  const [nextSession, setNextSession] = useState({});
  const [nextSessionIsLoading, setNextSessionIsLoading] = useState(true);

  const scrollToTop = ()=>{
    window.scrollTo(0, 0); 
  }

  useEffect(() => {
    setNextSession({});
    setPreviousSession({});
    fetch( HOST +"/sessions?id=" + param.id, {
        method: "GET",
        headers: {
          'Content-Type' : 'application/json'
        }
      })
    .then(response => response.json())
    .then(data => {
      let result = data[0];
      setSession(result);
    })
    .catch((e)=>{
      console.log(e)
      setError(ERRORS.wrongId);
    })
    .finally(()=>{
      setSessionIsLoading(false);
    });
  }, [param])


  useEffect(()=>{
    if(session.id !== undefined)
      fetch( HOST + "/sessions?roleplay.id=" + session.roleplay.id + "&number_gt=" + session.number +"&_sort=number:ASC", {
        method: "GET",
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.length > 0){
          let result = data[0];
          setNextSession(result);
        }
      })
      .catch((e)=>{
        console.log(e)
      })
      .finally(()=>{
        setNextSessionIsLoading(false)
      });
  }, [session])


  useEffect(()=>{
    if(session.id !== undefined)
      fetch( HOST +"/sessions?roleplay.id=" + session.roleplay.id  + "&number_lt=" + session.number +"&_sort=number:DESC", {
        method: "GET",
        headers: {
          'Content-Type' : 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.length > 0){
          let result = data[0];
          setPreviousSession(result);
        }
      })
      .catch((e)=>{
        console.log(e)
      })
      .finally(()=>{
        setPreviousSessionIsLoading(false);
      });

  }, [session])

  return (
    error.length > 0 ?  
      <p>{error}</p> 
    :
      (sessionIsLoading || previousSessionIsLoading || nextSessionIsLoading) ?
        <Loading />
      : 
        <section className='session'>
          <div className='session-main'>
            <div className='session-header'>
              <div>
                <h1>{session.name}</h1> 
                <h2>Séance n°{session.number}</h2>
              </div>
            </div>
            <div className='session-content'
            dangerouslySetInnerHTML={{
              __html: session.content
            }}> 
            </div>
            <div className='session-nav'>
              {(previousSession.id !== undefined) ?
                <>
                  <Link to={'/seances/'+ previousSession.id} params={{id: previousSession.id}} onClick={()=>scrollToTop()}>
                    <ImArrowLeft/><span>{previousSession.name}</span>
                  </Link>
                </>
                :
                <div></div>
              }
              {(nextSession.id !== undefined) ?
                <>
                  <Link to={'/seances/'+ nextSession.id} params={{id: nextSession.id}} onClick={()=>scrollToTop()}>
                    <span>{nextSession.name}</span><ImArrowRight/>
                  </Link>
                </>
                :
                <div></div>
              }
              
            </div>
          </div>
          <aside className='session-aside'>
            <div>
              <h4 className='jdr'>
                Jeu de rôle 
              </h4>
              <Link to={'/jeux-de-roles/' + session.roleplay.id} params={{id : session.roleplay.id}}>
                {session.roleplay.name}
              </Link>
            </div>
            <div>
              <h4 className='joueur'>
                Maître-du-jeu
              </h4>
              <Link to={'/profils/' + session.author.id} params={{id : session.author.id}}>
                <div className='thumbnail' style={{backgroundImage : "url("+ HOST + session.author.avatar.url+")"}}></div> {session.author.pseudo}
              </Link>
            </div>
            <div>
              {(nextSession.id !== undefined)&&
                <>
                  <h4>Séance suivante </h4>
                  <Link to={'/seances/'+ nextSession.id} params={{id: nextSession.id}}>
                    {nextSession.name}
                  </Link>
                </>
              }
              {(previousSession.id !== undefined)&&
                <>
                  <h4>Séance précédente </h4>
                  <Link to={'/seances/'+ previousSession.id} params={{id: previousSession.id}}>
                    {previousSession.name}
                  </Link>
                </>
              }
            </div>
          </aside>
        </section>
  )
}

export default Session
