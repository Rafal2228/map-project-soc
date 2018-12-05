// @flow
import React from 'react';
import './MapBackground.scss';

function generateCoordinates(width: number, height: number, spaceBetween: number, maxControlPointSpace: number) {
  const horizontalCurves = [];
  const verticalCurves = [];

  const horizontalLength = Math.floor(height / spaceBetween);
  for (let i = 1; i <= horizontalLength; i++) {
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

  return [...horizontalCurves, ...verticalCurves];
}

interface MapBackgroundProps {
  viewBox: string;
  coordinates: string[];
  islands: string[];
}

export function MapBackground(props: MapBackgroundProps) {
  const { islands } = props;
  const coordinateItems = generateCoordinates(100, 100, 10, 5).map((d, index) => (
    <path key={`coordinate-${index}`} className="map-background__coordinate" d={d} />
  ));

  const islandItems =
    islands &&
    islands.map((d, index) => <path key={`coordinate-${index}`} className="map-background__coordinate" d={d} />);

  return (
    <div className="map-background">
      <svg className="map-background__svg" viewBox="0 0 100 100">
        <g className="map-background__coordinates-wrapper">{coordinateItems}</g>

        <svg width="100%" height="100%" viewBox={props.viewBox}>
          <g className="map-background__islands-wrapper">{islandItems}</g>
        </svg>
      </svg>
    </div>
  );
}
