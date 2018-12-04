// @flow
import { START_GAME, NEXT_QUESTION, ANSWER_QUESTION, SKIP_QUESTION } from '../actions/home.actions';
import { createReducer } from '../../shared/utils';

const GAME_INITIAL_STATE = {
  started: false,
  answeredQuestions: [],
  skippedQuestions: [],
  currentQuestion: null,
};

export const gameReducer = createReducer(GAME_INITIAL_STATE, {
  [START_GAME]: state => ({
    ...state,
    started: true,
  }),
  [NEXT_QUESTION]: (state, { payload }) => ({
    ...state,
    currentQuestion: payload.question,
  }),
  [ANSWER_QUESTION]: (state, { payload }) => ({
    ...state,
    answeredQuestions: [...state.answeredQuestions, state.currentQuestion],
    currentQuestion: null,
  }),
  [SKIP_QUESTION]: (state, { payload }) => ({
    ...state,
    skippedQuestions: [...state.skippedQuestions, state.currentQuestion],
    currentQuestion: null,
  }),
});
