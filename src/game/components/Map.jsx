// @flow
import React from 'react';
import { MapTile } from './MapTile';
import './Map.scss';
import { MapPath, MapPathProps } from './MapPath';

export interface MapProps extends MapPathProps {
  viewBox: string;
  islands: string[];
}

export function Map(props: MapProps) {
  const { islands, viewBox, ...rest } = props;
  const islandItems = islands && islands.map(island => <MapTile d={island} key={island} />);

  return (
    <div className="map__wrapper">
      <svg className="map__svg" viewBox={props.viewBox}>
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
          </filter>
        </defs>
        <g>{islandItems}</g>

        <MapPath {...rest} />
      </svg>
    </div>
  );
}
