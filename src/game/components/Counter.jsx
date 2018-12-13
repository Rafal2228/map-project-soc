// @flow
import React, { Component } from 'react';
import './Counter.scss';

export class Counter extends Component<{}, CounterState> {
  state = {
    totalTime: 90,
    timeLeft: 90
  };

  timeoutId;

  componentDidMount() {
    this.nextTick();
  }

  componentWillUnmount() {
    if (this.state.timeLeft > 0 && this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  nextTick = () => {
    this.timeoutId = setTimeout(() => {
      if (this.state.timeLeft <= 0) {
        return;
      }

      this.setState({ timeLeft: this.state.timeLeft - 1 });
      this.nextTick();
    }, 1000);
  };

  render() {
    const { state } = this;
    const r = 5;
    const perimeter = 2 * Math.PI * r;
    const offset = perimeter * ((state.totalTime - state.timeLeft) / state.totalTime);

    return (
      <div className="counter__wrapper">
        <svg className="counter__svg" viewBox="-1 -1 12 12">
          <circle
            className="counter__circle"
            cx="5"
            cy="5"
            r={r}
            strokeDasharray={perimeter}
            strokeDashoffset={offset}
          />
        </svg>

        <div className="counter__digit">{state.timeLeft}</div>
      </div>
    );
  }
}
