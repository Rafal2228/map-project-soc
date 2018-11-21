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
        <mask id="map-mask">{tileItems}</mask>

        <image
          mask="url(#map-mask)"
          className="map__background"
          xlinkHref="https://images.pexels.com/photos/207962/pexels-photo-207962.jpeg?cs=srgb&dl=artistic-blossom-bright-207962.jpg&fm=jpg"
        />
      </svg>
    </div>
  );
}
