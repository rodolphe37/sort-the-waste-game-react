import React from 'react';
import './Modal.css'

import { GAME_STATE, getTotalScore } from '../custom/utils';


const imageClick = () => {
  console.log('Click!!!!');
}

const Modal = ({ gameState, groups, startGame, timeLeft, resetGame }) => (
  <div className="modal modal-sm active">
    <div className="modal-overlay" />
    <div className="modal-container">
      <div className="modal-header">
        <div className="modal-title h4">Triez les Déchets</div>
      </div>
      <div className="modal-body">
        <div className="content h6">
          {' '}
          {gameState === GAME_STATE.READY
            ? `
            Le temps est compté sur notre belle planète, de plus en plus de dechets recouvrent la surface de la Terre!!! Alors... Que faire??? TRIER. Faites glisser et déposez les déchets dans la bonne liste. Attention: il y a plusieurs listes: rouge, orange, jaune, bleue et grise, et vous n'avez que 90 secondes (1 minutes 30). Triez les par ordre alphabetique et rapidement pour un meilleur score...`
            : `Votre Score : ${getTotalScore(groups, timeLeft)}` }
        </div>
      </div>
      <div className="modal-footer">
      <img src={require('../assets/poubelles.png')} onClick={imageClick} alt="" />
        <button
          className="btn btn-primary"
          onClick={gameState === GAME_STATE.READY ? startGame : resetGame}
        >
          {gameState === GAME_STATE.READY ? 'Commencer le Jeu' : 'Recommencer le Jeu'}
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
