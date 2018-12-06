// @flow
import React, { Component } from 'react';
import './Game.scss';
import { Map } from '../components/Map';
import { connect } from 'react-redux';
import { Wheel } from '../components/Wheel';
import { WHEEL_SPIN_DURATION, MAP_ISLANDS, MAP_VIEWBOX } from '../constants';
import { QuestionWithCategory } from '../models';
import { easeQuadOut } from 'd3-ease';
import { MenuModal } from '../components/MenuModal';
import { QuestionModal } from '../components/QuestionModal';
import {
  CLOSE_MENU,
  OPEN_MENU,
  ANSWER_QUESTION,
  SKIP_QUESTION,
  NEXT_QUESTION,
  END_GAME,
} from '../actions/game.actions';
import {
  getCurrentQuestion,
  getGameState,
  getLeftQuestions,
  getCategoriesNames,
  getAnsweredQuestions,
} from '../selectors/game.selectors';
import { changeQuestions } from '../thunks/questions.thunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

function mapStateToProps(state) {
  const { menuOpened, targetAnswersNumber } = getGameState(state);

  return {
    currentQuestion: getCurrentQuestion(state),
    leftQuestions: getLeftQuestions(state),
    answeredQuestions: getAnsweredQuestions(state),
    categoriesNames: getCategoriesNames(state),
    menuOpened,
    targetAnswersNumber,
  };
}

const mapDispatchToProps = {
  closeMenu() {
    return function(dispatch) {
      dispatch({ type: CLOSE_MENU });
    };
  },
  openMenu() {
    return function(dispatch) {
      dispatch({ type: OPEN_MENU });
    };
  },
  nextQuestion(payload) {
    return function(dispatch) {
      dispatch({ type: NEXT_QUESTION, payload });
    };
  },
  answerQuestion() {
    return function(dispatch) {
      dispatch({ type: ANSWER_QUESTION });
    };
  },
  skipQuestion() {
    return function(dispatch) {
      dispatch({ type: SKIP_QUESTION });
    };
  },
  endGame() {
    return function(dispatch) {
      dispatch({ type: END_GAME });
    };
  },
  changeQuestions,
};

interface GameProps {
  menuOpened: boolean;
  currentQuestion: QuestionWithCategory;
  leftQuestions: QuestionWithCategory[];
  answeredQuestions: QuestionWithCategory[];
  targetAnswersNumber: number;

  closeMenu: () => void;
  openMenu: () => void;
  nextQuestion: (payload: { question: QuestionWithCategory }) => void;
  answerQuestion: () => void;
  skipQuestion: () => void;
  endGame: () => void;
  changeQuestions: (files: File[]) => void;
}

class Game extends Component<GameProps, any> {
  audioRef = React.createRef();
  state = {
    selectedColorIndex: 0,
    colors: ['#FCFFFC', '#2BA84A'],
    spinDuration: WHEEL_SPIN_DURATION,
    nextQuestionId: '',
  };

  handleSpin = () => {
    const { current: audio } = this.audioRef;

    if (!audio) {
      return;
    }

    this.setState(state => {
      const { leftQuestions } = this.props;
      const nextQuestion = leftQuestions[Math.ceil(Math.random() * (leftQuestions.length - 1)) - 1];
      audio.play();

      setTimeout(() => {
        this.props.nextQuestion({ question: nextQuestion });
      }, state.spinDuration);

      return {
        selectedColorIndex: Math.floor(Math.random() * state.colors.length),
        nextQuestionId: nextQuestion.id,
      };
    });
  };

  render() {
    const { props, state } = this;

    return (
      <div className="game__wrapper">
        <audio src="/assets/lucky-spin-sound.mp3" hidden ref={this.audioRef} />

        <Map
          currentSegments={props.answeredQuestions.length}
          totalSegments={props.targetAnswersNumber}
          islands={MAP_ISLANDS}
          viewBox={MAP_VIEWBOX}
        />

        <div className="game__wheel">
          <Wheel
            onSpin={this.handleSpin}
            angle={20}
            numberOfSpins={this.audioRef.current ? 3 : 0}
            selectedColorIndex={state.selectedColorIndex}
            colors={state.colors}
            nextQuestionId={state.nextQuestionId}
            config={{
              duration: state.spinDuration,
              easing: easeQuadOut,
            }}
          />
        </div>

        <div className="game__menu-button-wrapper">
          <button className="game__menu-button" onClick={props.openMenu}>
            <FontAwesomeIcon icon={faCog} size="2x" />
          </button>
        </div>

        <MenuModal
          open={props.menuOpened}
          onChangeQuestions={props.changeQuestions}
          onClose={props.closeMenu}
          onEndGame={props.endGame}
        />

        <QuestionModal
          open={!!props.currentQuestion}
          question={props.currentQuestion}
          onAnswer={props.answerQuestion}
          onSkip={props.skipQuestion}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
