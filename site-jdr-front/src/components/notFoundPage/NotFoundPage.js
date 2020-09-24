import React from 'react';
import {ReactComponent as NotFoundPageLogo} from './NotFoundPage.svg';
import './NotFoundPage.css';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className='not-found-page'>
      <Link to='/'>
        <NotFoundPageLogo />
      </Link>
      Vous seriez-vous perdus ?

    </section>
  )
}

export default NotFoundPage
