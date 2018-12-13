// @flow
import axios from 'axios';
import {
  LOAD_QUESTIONS,
  LOAD_QUESTIONS_FAILURE,
  LOAD_QUESTIONS_SUCCESS,
  CHANGE_QUESTIONS,
  CHANGE_QUESTIONS_FAILURE,
  CHANGE_QUESTIONS_SUCCESS
} from '../actions/questions.actions';
import { ThunkDispatch } from 'redux-thunk';
import { parseQuestions } from '../helpers';

export function loadQuestions(url: string) {
  return async function(dispatch: ThunkDispatch) {
    dispatch({
      type: LOAD_QUESTIONS
    });

    try {
      const res = await axios.get(url);
      const payload = parseQuestions(res.data);

      dispatch({
        type: LOAD_QUESTIONS_SUCCESS,
        payload
      });
    } catch (e) {
      dispatch({
        type: LOAD_QUESTIONS_FAILURE
      });
    }
  };
}

export function changeQuestions(files: File[]) {
  return async function(dispatch: ThunkDispatch) {
    dispatch({
      type: CHANGE_QUESTIONS
    });

    try {
      const file = files[0];
      const fr = new FileReader();

      const payload = await new Promise((resolve, reject) => {
        fr.addEventListener('load', () => {
          try {
            const data = JSON.parse(fr.result);
            const parsed = parseQuestions(data);
            resolve(parsed);
          } catch (e) {
            reject();
          }
        });

        fr.addEventListener('error', () => {
          reject();
        });

        fr.readAsText(file);
      });

      dispatch({
        type: CHANGE_QUESTIONS_SUCCESS,
        payload
      });
    } catch (e) {
      dispatch({
        type: CHANGE_QUESTIONS_FAILURE
      });
    }
  };
}
