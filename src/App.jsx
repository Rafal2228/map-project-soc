// @flow
import React, { Suspense } from 'react';
import { ComponentLoader } from './shared/ComponentLoader';
import { Nav } from './shared/Nav';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.scss';

const Settings = ComponentLoader(
  React.lazy(
    () =>
      new Promise(resolve => {
        setTimeout(async () => {
          const m = await import('./settings/Settings');
          resolve(m);
        }, 10000);
      })
  )
);

export function App() {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Nav />
        <Suspense fallback="Wtf">
          <div className="app__container">
            <Switch>
              <Route exact path="/settings" component={Settings} />
            </Switch>
          </div>
        </Suspense>
      </React.StrictMode>
    </BrowserRouter>
  );
}
