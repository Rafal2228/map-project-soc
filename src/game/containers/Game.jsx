// @flow
import React, { Component } from 'react';
import './Game.scss';
import { Map } from '../components/Map';
import { connect } from 'react-redux';
import { Wheel } from '../components/Wheel';
import {
  WHEEL_SPIN_DURATION,
  MAP_ISLANDS,
  MAP_VIEWBOX,
  MAP_PATH_START,
  MAP_PATH_END,
  MAP_PATH_CENTER
} from '../constants';
import { Question, QuestionWithCategory } from '../models';
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
  FINSH_GAME,
  ANSWER_BONUS_QUESTION
} from '../actions/game.actions';
import {
  getCurrentQuestion,
  getGameState,
  getLeftQuestions,
  getCategoriesNames,
  getAnsweredQuestions,
  getBonusQuestion,
  getBonusQuestionAnswered
} from '../selectors/game.selectors';
import { changeQuestions } from '../thunks/questions.thunks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FinishModal } from '../components/FinishModal';
import { NoQuestionsModal } from '../components/NoQuestionsModal';

function mapStateToProps(state) {
  const { menuOpened, targetAnswersNumber } = getGameState(state);

  return {
    currentQuestion: getCurrentQuestion(state),
    leftQuestions: getLeftQuestions(state),
    answeredQuestions: getAnsweredQuestions(state),
    categoriesNames: getCategoriesNames(state),
    bonusQuestion: getBonusQuestion(state),
    bonusQuestionAnswered: getBonusQuestionAnswered(state),
    menuOpened,
    targetAnswersNumber
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
  answerBonusQuestion() {
    return function(dispatch) {
      dispatch({ type: ANSWER_BONUS_QUESTION });
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
  finishGame() {
    return function(dispatch) {
      dispatch({ type: FINSH_GAME });
    };
  },
  changeQuestions
};

interface GameProps {
  menuOpened: boolean;
  bonusQuestion: Question | null;
  bonusQuestionAnswered: boolean;
  currentQuestion: QuestionWithCategory;
  leftQuestions: QuestionWithCategory[];
  answeredQuestions: QuestionWithCategory[];
  targetAnswersNumber: number;

  closeMenu: () => void;
  openMenu: () => void;
  nextQuestion: (payload: { question: QuestionWithCategory }) => void;
  answerQuestion: () => void;
  answerBonusQuestion: () => void;
  skipQuestion: () => void;
  endGame: () => void;
  changeQuestions: (files: File[]) => void;
  finishGame: () => void;
}

class Game extends Component<GameProps, any> {
  audioRef = React.createRef();
  state = {
    selectedColorIndex: 0,
    colors: ['#FCFFFC', '#2BA84A'],
    spinDuration: WHEEL_SPIN_DURATION,
    nextQuestionId: '',
    showBonusQuestion: false
  };

  handleSpin = () => {
    const { current: audio } = this.audioRef;

    if (!audio) {
      return;
    }

    this.setState(state => {
      const { leftQuestions } = this.props;
      const nextQuestion = leftQuestions[Math.ceil(Math.random() * (leftQuestions.length - 1))];
      audio.play();

      setTimeout(() => {
        this.props.nextQuestion({ question: nextQuestion });
      }, state.spinDuration);

      return {
        selectedColorIndex: Math.floor(Math.random() * state.colors.length),
        nextQuestionId: nextQuestion.id
      };
    });
  };

  handleOpenBonusQuestion = () => {
    this.setState({ showBonusQuestion: true });
  };

  render() {
    const { props, state } = this;

    return (
      <div className="game__wrapper">
        <audio src={`${process.env.PUBLIC_URL}/assets/lucky-spin-sound.mp3`} hidden ref={this.audioRef} />

        <Map
          currentSegments={props.answeredQuestions.length}
          totalSegments={props.targetAnswersNumber}
          islands={MAP_ISLANDS}
          viewBox={MAP_VIEWBOX}
          start={MAP_PATH_START}
          end={MAP_PATH_END}
          center={MAP_PATH_CENTER}
          onCrossClick={this.handleOpenBonusQuestion}
        />

        {props.answeredQuestions.length < props.targetAnswersNumber && (
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
                easing: easeQuadOut
              }}
            />
          </div>
        )}

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

        <QuestionModal
          open={
            props.answeredQuestions.length >= props.targetAnswersNumber &&
            !!props.bonusQuestion &&
            !props.bonusQuestionAnswered &&
            state.showBonusQuestion
          }
          question={props.bonusQuestion}
          onAnswer={props.answerBonusQuestion}
          onSkip={props.answerBonusQuestion}
        />

        <FinishModal
          open={
            props.answeredQuestions.length >= props.targetAnswersNumber &&
            (!props.bonusQuestion || props.bonusQuestionAnswered)
          }
          onClose={props.finishGame}
        />

        <NoQuestionsModal open={props.leftQuestions.length === 0 && !props.currentQuestion} onClose={props.endGame} />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
