// @flow
import axios from 'axios';
import { LOAD_QUESTIONS, LOAD_QUESTIONS_FAILURE, LOAD_QUESTIONS_SUCCESS } from '../actions/questions.actions';

export function loadQuestions(url: string) {
  return async function(dispatch) {
    dispatch({
      type: LOAD_QUESTIONS,
    });

    try {
      const res = await axios.get(url);

      dispatch({
        type: LOAD_QUESTIONS_SUCCESS,
        payload: res.data,
      });
    } catch (e) {
      dispatch({
        type: LOAD_QUESTIONS_FAILURE,
      });
    }
  };
}
