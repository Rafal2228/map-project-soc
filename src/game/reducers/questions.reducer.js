// @flow
import {
  LOAD_QUESTIONS,
  LOAD_QUESTIONS_SUCCESS,
  LOAD_QUESTIONS_FAILURE,
  CHANGE_QUESTIONS,
  CHANGE_QUESTIONS_SUCCESS,
  CHANGE_QUESTIONS_FAILURE
} from '../actions/questions.actions';
import { createReducer } from '../../shared/utils';

const QUESTIONS_INITIAL_STATE = {
  categories: [],
  loading: false
};

export const questionsReducer = createReducer(QUESTIONS_INITIAL_STATE, {
  [LOAD_QUESTIONS]: state => ({
    ...state,
    loading: true
  }),
  [LOAD_QUESTIONS_SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false
  }),
  [LOAD_QUESTIONS_FAILURE]: state => ({
    ...state,
    loading: false
  }),
  [CHANGE_QUESTIONS]: state => ({
    ...state,
    loading: true
  }),
  [CHANGE_QUESTIONS_SUCCESS]: (state, { payload }) => ({
    ...state,
    ...payload,
    loading: false
  }),
  [CHANGE_QUESTIONS_FAILURE]: state => ({
    ...state,
    loading: false
  })
});
