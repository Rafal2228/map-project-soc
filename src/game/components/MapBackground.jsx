// @flow
import React from 'react';
import { MapTile } from './MapTile';
import './MapBackground.scss';

interface MapBackgroundProps {
  coordinates: string[];
  viewBox: string;
}

export function MapBackground(props: MapProps) {
  const { coordinates } = props;
  const coordinateItems = coordinates && coordinates.map((d, index) => (
    <path key={`coordinate-${index}`} className="map-background__coordinate" d={d} />
  ));

  return (
    <div className="map-background">
      <svg className="map-background__svg" viewBox={props.viewBox}>

        <g className="map-background__coordinates-wrapper">
          {coordinateItems}
        </g>
      </svg>
    </div>
  );
}
