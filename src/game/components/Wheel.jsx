// @flow
import React from 'react';
import './Wheel.scss';
import { Spring } from 'react-spring';
import WheelPlate from './WheelPlate';
import { easeQuadOut } from 'd3-ease';

interface WheelProps {
  angle: number;
  colors: string[];
  selectedColorIndex: number;
  numberOfSpins: number;
  onSpin: () => void;
}

export function Wheel(props: WheelProps) {
  const rotationTarget = props.numberOfSpins * 360 + props.angle * props.selectedColorIndex;

  return (
    <div className="wheel__wrapper" onClick={props.onSpin}>
      <Spring
        from={{
          transform: 'rotateZ(0deg)',
        }}
        to={{
          transform: `rotateZ(${rotationTarget}deg)`,
        }}
        reset
        config={{
          duration: 4000,
          easing: easeQuadOut,
        }}
      >
        {prop => (
          <div style={prop} className="wheel__plate">
            <WheelPlate angle={props.angle} colors={props.colors} />
          </div>
        )}
      </Spring>
    </div>
  );
}
