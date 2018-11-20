// @flow
import { SELECT_MAP } from '../actions/atlas.actions';
import { createReducer } from '../utils';
import poland from '../constants/maps/poland.json';

const ATLAS_INITIAL_STATE = {
  currentMapKey: poland.key,
  maps: [poland],
};

export const atlasReducer = createReducer(ATLAS_INITIAL_STATE, {
  [SELECT_MAP]: (state, { payload }) => ({
    ...state,
    currentMapKey: payload && payload.key,
  }),
});
