// @flow
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Loader.scss';

export interface LoaderProps {
  size?: SizeProp;
}

export function Loader(props: LoaderProps) {
  return (
    <div className="loader">
      <FontAwesomeIcon icon={faSpinner} size={props.size} />
    </div>
  );
}
