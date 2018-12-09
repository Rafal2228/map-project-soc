// @flow
import React from 'react';
import './MapBackground.scss';
import { withWindowSize } from './WithWindowSize';
import { Coordinate } from './Coordinate';

function generateCoordinates(width: number, height: number, spaceBetween: number, maxControlPointSpace: number) {
  const horizontalCurves = [];
  const verticalCurves = [];

  const horizontalLength = Math.floor(height / spaceBetween);
  for (let i = 0; i <= horizontalLength; i++) {
    const fromTop = i * spaceBetween;
    const controlFromTop = fromTop + ((horizontalLength / 2 - i) / horizontalLength) * maxControlPointSpace;
    horizontalCurves.push(
      `M
      0,${fromTop}
      C
      ${maxControlPointSpace},${controlFromTop}
      ${width - maxControlPointSpace},${controlFromTop}
      ${width},${fromTop}`
    );
  }

  const verticalLength = Math.floor(width / spaceBetween);
  for (let i = 0; i <= verticalLength; i++) {
    const fromLeft = i * spaceBetween;
    const controlFromLeft = fromLeft + ((verticalLength / 2 - i) / verticalLength) * maxControlPointSpace;
    verticalCurves.push(
      `M
      ${fromLeft},0
      C
      ${controlFromLeft},${maxControlPointSpace}
      ${controlFromLeft},${width - maxControlPointSpace}
      ${fromLeft},${height}`
    );
  }

  return [...horizontalCurves, ...verticalCurves];
}

interface MapBackgroundProps {
  viewBox: string;
  coordinates: string[];
  islands: string[];
  width: number;
  height: number;
}

function MapBackground(props: MapBackgroundProps) {
  const { width, height } = props;
  const coordinateItems = generateCoordinates(width, height, width / 10, width / 20).map((d, index) => (
    <Coordinate key={d} className="map-background__coordinate" d={d} index={index} />
  ));

  return (
    <div className="map-background">
      <svg className="map-background__svg" viewBox={`0 0 ${width} ${height}`}>
        <g>{coordinateItems}</g>
      </svg>
    </div>
  );
}

export default withWindowSize(MapBackground);
