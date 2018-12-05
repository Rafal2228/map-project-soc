// @flow
import { START_GAME } from '../actions/home.actions';
import { createReducer } from '../../shared/utils';
import {
  NEXT_QUESTION,
  ANSWER_QUESTION,
  SKIP_QUESTION,
  OPEN_MENU,
  CLOSE_MENU,
  END_GAME,
} from '../actions/game.actions';

const GAME_INITIAL_STATE = {
  started: false,
  answeredQuestions: [],
  skippedQuestions: [],
  currentQuestion: null,
  menuOpened: false,
};

export const gameReducer = createReducer(GAME_INITIAL_STATE, {
  [START_GAME]: state => ({
    ...state,
    started: true,
  }),
  [NEXT_QUESTION]: (state, { payload }) => ({
    ...state,
    currentQuestion: payload.question && payload.question.id,
  }),
  [ANSWER_QUESTION]: state => ({
    ...state,
    answeredQuestions: [...state.answeredQuestions, state.currentQuestion],
    currentQuestion: null,
  }),
  [SKIP_QUESTION]: state => ({
    ...state,
    skippedQuestions: [...state.skippedQuestions, state.currentQuestion],
    currentQuestion: null,
  }),
  [OPEN_MENU]: state => ({
    ...state,
    menuOpened: true,
  }),
  [CLOSE_MENU]: state => ({
    ...state,
    menuOpened: false,
  }),
  [END_GAME]: state => ({
    ...state,
    ...GAME_INITIAL_STATE,
  }),
});
