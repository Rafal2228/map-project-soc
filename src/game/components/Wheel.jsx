// @flow
import React from 'react';
import './Wheel.scss';
import { Spring, SpringConfig } from 'react-spring';
import WheelPlate from './WheelPlate';

interface WheelProps {
  angle: number;
  colors: string[];
  selectedColorIndex: number;
  numberOfSpins: number;
  config: SpringConfig;
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
        config={props.config}
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
