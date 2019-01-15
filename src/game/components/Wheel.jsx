// @flow
import React from 'react';
import './Wheel.scss';
import { Spring, SpringConfig } from 'react-spring';
// import WheelPlate from './WheelPlate';

interface WheelProps {
  angle: number;
  colors: string[];
  selectedColorIndex: number;
  numberOfSpins: number;
  config: SpringConfig;
  nextQuestionId: string;
  onSpin: () => void;
}

export const Wheel = React.memo<WheelProps>(
  function(props: WheelProps) {
    const rotationTarget = props.numberOfSpins * 360 + props.angle * props.selectedColorIndex;
    let finished = rotationTarget === 0 ? true : false;

    return (
      <div className="wheel__wrapper" onClick={() => finished && props.onSpin()}>
        <Spring
          from={{
            transform: 'rotateZ(0deg)'
          }}
          to={{
            transform: `rotateZ(${rotationTarget}deg)`
          }}
          reset
          config={props.config}
          onRest={() => (finished = true)}
        >
          {prop => (
            <div style={prop} className="wheel__plate">
              <img className="wheel__compass" src={`${process.env.PUBLIC_URL}/assets/compass.svg`} alt="" />
              {/* <WheelPlate angle={props.angle} colors={props.colors} /> */}
            </div>
          )}
        </Spring>
      </div>
    );
  },
  function(prev, next) {
    return prev.nextQuestionId === next.nextQuestionId;
  }
);
