// @flow
import React, { Suspense } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { Loader } from './shared/components/Loader';
import Main from './game/containers/Main';
import { store } from './store';
import { Provider } from 'react-redux';
import './App.scss';
import Setup from './game/containers/Setup';

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Setup>
          <Suspense fallback={<Loader />}>
            <div className="app__container">
              <Switch>
                <Route exact path="/" component={Main} />

                <Redirect to="/" />
              </Switch>
            </div>
          </Suspense>
        </Setup>
      </BrowserRouter>
    </Provider>
  );
}
