// @flow
import React, { Suspense } from 'react';
import { ComponentLoader } from './shared/components/ComponentLoader';
import { Nav } from './shared/components/Nav';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { Loader } from './shared/components/Loader';
import Home from './home/Home';
import { store } from './store';
import { Provider } from 'react-redux';
import './App.scss';
import Setup from './shared/containers/Setup';

const Settings = ComponentLoader(React.lazy(() => import('./settings/Settings')));

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Setup>
          {/* <React.StrictMode> */}
          <Nav />

          <Suspense fallback={<Loader />}>
            <div className="app__container">
              <Switch>
                <Route exact path="/settings" component={Settings} />

                <Route exact path="/" component={Home} />

                <Redirect to="/" />
              </Switch>
            </div>
          </Suspense>
          {/* </React.StrictMode> */}
        </Setup>
      </BrowserRouter>
    </Provider>
  );
}
