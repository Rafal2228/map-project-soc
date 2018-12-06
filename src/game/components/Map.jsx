// @flow
import React from 'react';
import { MapTile } from './MapTile';
import './Map.scss';

interface MapProps {
  viewBox: string;
  islands: string[];
  currentSegments: number;
  totalSegments: number;
}

export function Map(props: MapProps) {
  const { islands } = props;
  const islandItems = islands && islands.map(island => <MapTile d={island} key={island} />);

  return (
    <div className="map__wrapper">
      <svg className="map__svg" viewBox={props.viewBox}>
        <g>{islandItems}</g>
      </svg>
    </div>
  );
}
