// @flow
import React from 'react';
import { MapTile } from './MapTile';
import './Map.scss';

interface MapProps {
  tiles: string[];
  viewBox: string;
}

export function Map(props: MapProps) {
  const { tiles } = props;
  const tileItems = tiles && tiles.map(tile => <MapTile d={tile} key={tile} />);

  return (
    <div className="map__wrapper">
      <svg className="map__svg" viewBox={props.viewBox}>
        <g>{tileItems}</g>
      </svg>
    </div>
  );
}
