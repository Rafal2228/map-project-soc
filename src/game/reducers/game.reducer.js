// @flow
import { START_GAME } from '../actions/home.actions';
import { createReducer } from '../../shared/utils';

const GAME_INITIAL_STATE = {
  started: true,
  answeredQuestions: [],
  skippedQuestions: [],
};

export const gameReducer = createReducer(GAME_INITIAL_STATE, {
  [START_GAME]: state => ({
    ...state,
    started: true,
  }),
});
