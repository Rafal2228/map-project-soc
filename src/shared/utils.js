// @flow
import Noty from 'noty';

export function createReducer<T>(initialState: T, handlers: { [key: string]: (state: T, action: any) => T }) {
  return function reducer(state: T, action: any) {
    if (state === undefined) {
      state = initialState;
    }

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

export function showError(message: string) {
  return new Noty({
    theme: 'metroui',
    text: message,
  }).show();
}

export function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}
