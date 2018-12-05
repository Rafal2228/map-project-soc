// @flow
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { questionsReducer } from './game/reducers/questions.reducer';
import { gameReducer } from './game/reducers/game.reducer';

const rootReducer = combineReducers({
  questions: questionsReducer,
  game: gameReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
