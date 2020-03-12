import React from 'react';
// import Animation from './Animation'

import { GAME_STATE, getSeconds } from '../custom/utils';

const Header = ({ timeLeft, gameState, endGame }) => (
  <header className="navbar">
    {/*{gameState === GAME_STATE.PLAYING && (*/}
      <>
        <div className="head">
          <img className="App-logo" src={require('../logo.svg')} alt=""/>
          {/*<Animation />*/}
          <section className="title">
            <h1>Sort the Waste Game</h1>
            <p>By Rodolphe Augusto</p>
          </section>
        </div>
        {gameState === GAME_STATE.PLAYING && (
          <>
          <section className="navbar-center text-error">{getSeconds(timeLeft)} Secondes restantes</section>
        <section className="navbar-center">
          <button className="btn btn-default" onClick={endGame}>
            Terminer la partie
          </button>
        </section>
        </>
        )}
      </>
  </header>
);

export default Header;
