// @flow
import React from 'react';

interface WheelPlateProps {
  colors: string[];
  angle: number;
}

function createTriangle(cx, cy, height, angle) {
  const pointA = `${cx} ${cy}`;
  const halfAngleTan = Math.tan(((angle / 2) * Math.PI) / 180);
  const halfOfBase = halfAngleTan * height;

  const pointB = `${cx - halfOfBase} ${cy - height}`;
  const pointC = `${cx + halfOfBase} ${cy - height}`;

  return `M ${pointA} L ${pointB} L ${pointC} Z`;
}

function WheelPlate(props: WheelPlateProps) {
  const numberOfTriangles = 360 / props.angle;
  const triangleBase = createTriangle(50, 50, 50, props.angle);

  const triangles = new Array(numberOfTriangles).fill(null).map((val, index) => {
    const color = props.colors[index % props.colors.length];

    return (
      <path
        key={index}
        d={triangleBase}
        style={{
          fill: color,
          transform: `rotateZ(${props.angle * index}deg)`,
          transformOrigin: 'center',
        }}
      />
    );
  });

  return (
    <svg className="wheel-plate" viewBox="0 0 100 100">
      <clipPath id="wheel-plate-clip">
        <circle cx="50" cy="50" r="50" fill="white" />
      </clipPath>

      <g clipPath="url(#wheel-plate-clip)">{triangles}</g>
    </svg>
  );
}

export default React.memo(WheelPlate);
