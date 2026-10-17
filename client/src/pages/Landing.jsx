import React from 'react'
import { styled } from 'styled-components';
import Wrapper from './../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg'
import logo from '../assets/images/logo.svg'
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Job <span>Tracking</span> App</h1>
          <p>Your job search, organized and under control.
          Track applications, manage interview progress, and stay on top of every opportunity.
          </p>
          <Link to='/register' className='btn register-link'>
          Register
          </Link>
          <Link to='/login' className='btn'>
          Login / Demo User
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  )
}

export default Landing
