// @flow
import React from 'react';
import { MapTile } from './MapTile';
import './Map.scss';
import { MapPath, MapPathProps } from './MapPath';
import { MapCross } from './MapCross';

export interface MapProps extends MapPathProps {
  viewBox: string;
  islands: string[];
  onCrossClick: () => void;
}

export function Map(props: MapProps) {
  const { islands, viewBox, ...rest } = props;
  const islandItems = islands && islands.map(island => <MapTile d={island} key={island} />);
  const crossPosition = {
    x: props.end.x - 50,
    y: props.end.y - 50
  };

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

        {props.currentSegments >= props.totalSegments && (
          <MapCross size={100} position={crossPosition} onClick={props.onCrossClick} />
        )}
      </svg>
    </div>
  );
}
