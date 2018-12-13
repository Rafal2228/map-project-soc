// @flow
import React from 'react';
import { Point } from '../models';
import './MapCross.scss';

interface MapCrossProps {
  position: Point;
  size: number;
  onClick: () => void;
}

export function MapCross(props: MapCrossProps) {
  return (
    <svg
      x={props.position.x}
      y={props.position.y}
      onClick={props.onClick}
      width={props.size}
      height={props.size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130 123"
      className="map-cross"
    >
      <path
        className="map-cross__path"
        d="M23.5,103.5s-21-5-17-15,34-53,54-63,50-24,50-24v2l11-3,9,3v4l-31,14-37,30-27,28Z"
        transform="translate(-0.5 -0.5)"
      />
      <path
        className="map-cross__path"
        d="M17.5,4.5l-15,10-2,6,8,1,6,8,51,36s12,5,22,25,15,33,15,33l-3-24,7,19-2-28,5,5s-18-43-57-69S17.5,4.5,17.5,4.5Z"
        transform="translate(-0.5 -0.5)"
      />
    </svg>
  );
}
