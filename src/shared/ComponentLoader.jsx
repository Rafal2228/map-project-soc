import React, { Suspense } from 'react';
import { Loader } from './Loader';

export function ComponentLoader(Component) {
  return function(props) {
    return (
      <Suspense
        maxDuration={0}
        fallback={() => (
          <div>
            test
            <Loader />
          </div>
        )}
      >
        <Component {...props} />
      </Suspense>
    );
  };
}
