// @flow
import React from 'react';
import './MapTile.scss';

interface MapTileProps {
  /**
   * @description d property of SVGPathElement
   */
  d: string;
}

export function MapTile(props: MapTileProps) {
  return <path filter="url(#blur)" className="map-tile" d={props.d} />;
}
