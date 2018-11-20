// @flow
import { LOAD_QUESTIONS, LOAD_QUESTIONS_SUCCESS, LOAD_QUESTIONS_FAILURE } from '../actions/questions.actions';
import { createReducer } from '../utils';

const QUESTIONS_INITIAL_STATE = {
  categories: [],
  loading: false,
};

export const questionsReducer = createReducer(QUESTIONS_INITIAL_STATE, {
  [LOAD_QUESTIONS]: state => ({
    ...state,
    loading: true,
  }),
  [LOAD_QUESTIONS_SUCCESS]: (state, { payload }) => ({
    ...state,
    loading: false,
    categories: payload,
  }),
  [LOAD_QUESTIONS_FAILURE]: state => ({
    ...state,
    loading: false,
  }),
});
