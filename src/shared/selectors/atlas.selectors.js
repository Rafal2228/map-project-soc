// @flow
import { createSelector } from 'reselect';

function getMaps(state) {
  return state.atlas.maps;
}

function getCurrentMapKey(state) {
  return state.atlas.currentMapKey;
}

export const getCurrentMap = createSelector(
  [getMaps, getCurrentMapKey],
  function(maps, currentMapKey) {
    return maps.find(map => map.key === currentMapKey);
  }
);
