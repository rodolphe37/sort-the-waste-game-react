import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { PRODUCTS, CATEGORIES } from './custom/data';
import { shuffle, getTimeLeft, move, GAME_STATE } from './custom/utils';

import Modal from './components/Modal';
import Header from './components/Header';
import Dropzone from './components/Dropzone';
import Footer from './components/Footer';

const GAME_DURATION = 1000 * 90; // 90 seconds

const initialState = {
  // we initialize the state by populating the bench with a shuffled collection of PRODUCTS
  bench: shuffle(PRODUCTS),
  [CATEGORIES.EWASTE]: [],
  [CATEGORIES.PLASTIC]: [],
  [CATEGORIES.METAL]: [],
  [CATEGORIES.PAPER]: [],
  [CATEGORIES.ORGANIC]: [],
  gameState: GAME_STATE.READY,
  timeLeft: 0,
};

class App extends React.Component {
  state = initialState;

  startGame = () => {
    this.currentDeadline = Date.now() + GAME_DURATION;

    this.setState(
      {
        gameState: GAME_STATE.PLAYING,
        timeLeft: getTimeLeft(this.currentDeadline),
      },
      this.gameLoop
    );
  };

  gameLoop = () => {
    this.timer = setInterval(() => {
      const timeLeft = getTimeLeft(this.currentDeadline);
      const isTimeout = timeLeft <= 0;
      if (isTimeout && this.timer) {
        clearInterval(this.timer);
      }

      this.setState({
        timeLeft: isTimeout ? 0 : timeLeft,
        ...(isTimeout ? { gameState: GAME_STATE.DONE } : {}),
      });
    }, 1000);
  };

  endGame = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.setState({
      gameState: GAME_STATE.DONE,
    });
  };

  resetGame = () => {
    this.setState(initialState);
  };

  onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    this.setState(state => {
      return move(state, source, destination);
    });
  };

  render() {
    const { gameState, timeLeft, bench, ...groups } = this.state;
    const isDropDisabled = gameState === GAME_STATE.DONE;

    return (
      <>
        <Header gameState={gameState} timeLeft={timeLeft} endGame={this.endGame} />
        {this.state.gameState !== GAME_STATE.PLAYING && (
          <Modal
            startGame={this.startGame}
            resetGame={this.resetGame}
            timeLeft={timeLeft}
            gameState={gameState}
            groups={groups}
          />
        )}
        {(this.state.gameState === GAME_STATE.PLAYING ||
          this.state.gameState === GAME_STATE.DONE) && (
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="container">
              <div className="columns">
              <Dropzone id="bench" PRODUCTS={bench} isDropDisabled={isDropDisabled} />
              <Dropzone className='red'
                  id={CATEGORIES.EWASTE}
                  PRODUCTS={this.state[CATEGORIES.EWASTE]}
                  isDropDisabled={isDropDisabled}
                />
                <Dropzone
                  id={CATEGORIES.PLASTIC}
                  PRODUCTS={this.state[CATEGORIES.PLASTIC]}
                  isDropDisabled={isDropDisabled}
                />
                <Dropzone
                  id={CATEGORIES.METAL}
                  PRODUCTS={this.state[CATEGORIES.METAL]}
                  isDropDisabled={isDropDisabled}
                />
                <Dropzone
                id={CATEGORIES.PAPER}
                PRODUCTS={this.state[CATEGORIES.PAPER]}
                isDropDisabled={isDropDisabled}
              />
              <Dropzone
                id={CATEGORIES.ORGANIC}
                PRODUCTS={this.state[CATEGORIES.ORGANIC]}
                isDropDisabled={isDropDisabled}
              />
              </div>
            </div>
          </DragDropContext>
        )}
        <Footer />
      </>
    );
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}

export default App;
