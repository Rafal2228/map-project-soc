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
          <filter id="innerShadow" x="-40%" y="-40%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feOffset in="blur" dx="2.5" dy="2.5" />
          </filter>
        </defs>
        <g>{islandItems}</g>

        <MapPath {...rest} />
      </svg>
    </div>
  );
}
