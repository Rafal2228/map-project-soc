// @flow

export function createReducer(initialState, handlers: { [key: string]: (state, action) => typeof state }) {
  return function reducer(state, action) {
    if (state === undefined) {
      state = initialState;
    }

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  };
}
