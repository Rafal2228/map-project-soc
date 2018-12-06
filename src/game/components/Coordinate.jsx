// @flow
import React, { Component, createRef } from 'react';

export interface CoordinateProps {
  d: string;
  index: number;
  className?: string;
}

export class Coordinate extends Component<CoordinateProps> {
  ref = createRef<any>();

  componentDidMount() {
    const { current: path } = this.ref;

    if (!path) {
      return;
    }

    const length = path.getTotalLength();
    this.updatePath(length);
  }

  updatePath = (length: number) => {
    const { current: path } = this.ref;

    if (!path) {
      return;
    }

    const { index: i } = this.props;
    path.style.transition = path.style.WebkitTransition = 'none';
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = i % 2 === 0 ? length : -1 * length;
    path.getBoundingClientRect();
    path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 2s ease-in-out 0s';
    path.style.strokeDashoffset = '0';
  };

  render() {
    const { d, className } = this.props;

    return <path ref={this.ref} className={className} d={d} />;
  }
}
