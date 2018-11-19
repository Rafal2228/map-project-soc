import React, { Suspense } from 'react';
import { Loader } from './Loader';

export function ComponentLoader(Component) {
  return function(props) {
    return (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
