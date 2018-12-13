// @flow
import React, { Component, createRef } from 'react';
import './MapPath.scss';
import { Point } from '../models';

export interface MapPathProps {
  start: Point;
  center: Point;
  end: Point;
  totalSegments: number;
  currentSegments: number;
}

interface MapPathState {
  d: string;
  start: Point;
  center: Point;
  end: Point;
}

function createPath(start: Point, center: Point, end: Point) {
  const shift = 250;
  const firstMiddle = {
    x: (start.x + center.x) / 2,
    y: (start.y + center.y) / 2
  };
  const secondMiddle = {
    x: (center.x + end.x) / 2,
    y: (center.y + end.y) / 2
  };

  return `
    M
    ${start.x},${start.y}
    C
    ${firstMiddle.x - shift * 2},${firstMiddle.y + shift}
    ${center.x - shift},${center.y}
    ${center.x},${center.y}
    C
    ${secondMiddle.x + shift},${secondMiddle.y + shift}
    ${end.x + shift},${end.y}
    ${end.x},${end.y}
  `;
}

export class MapPath extends Component<MapPathProps, MapPathState> {
  static getDerivedStateFromProps(nextProps: MapPathProps, prevState: MapPathState) {
    if (nextProps.start === prevState.start && nextProps.end === prevState.end) {
      return prevState;
    }

    return {
      start: nextProps.start,
      center: nextProps.center,
      end: nextProps.end,
      d: createPath(nextProps.start, nextProps.center, nextProps.end)
    };
  }

  state = {
    start: this.props.start,
    center: this.props.center,
    end: this.props.end,
    d: createPath(this.props.start, this.props.center, this.props.end)
  };

  maskRef = createRef<any>();
  pathRef = createRef<any>();

  componentDidMount() {
    const { current: mask } = this.maskRef;
    const { current: path } = this.pathRef;

    if (!mask || !path) {
      return;
    }

    const { currentSegments, totalSegments } = this.props;
    const length = mask.getTotalLength();

    path.style.strokeDasharray = length / (totalSegments * 2);
    path.getBoundingClientRect();

    this.updatePath(length, totalSegments, currentSegments);
  }

  componentDidUpdate() {
    const { current: path } = this.maskRef;
    const { currentSegments, totalSegments } = this.props;

    if (!path) {
      return;
    }

    const length = path.getTotalLength();
    this.updatePath(length, totalSegments, currentSegments);
  }

  render() {
    const { state } = this;

    return (
      <svg>
        <defs>
          <filter id="path">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="5" dy="5" result="offsetblur" />
            <feComponentTransfer result="blur2">
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>

            <feTurbulence type="fractalNoise" baseFrequency="0.3 0.1" numOctaves="1" result="warp" />
            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="10" in="SourceGraphic" in2="warp" />
            <feMerge>
              <feMergeNode in />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <mask id="map-path">
            <path className="map-path" ref={this.maskRef} d={state.d} />
          </mask>
        </defs>

        <path ref={this.pathRef} className="map-path--red" filter="url(#path)" mask="url(#map-path)" d={state.d} />
      </svg>
    );
  }

  updatePath(length: number, totalSegments: number, currentSegments: number) {
    const { current: mask } = this.maskRef;

    if (!mask) {
      return;
    }

    mask.style.strokeDasharray = length + ' ' + length;
    mask.style.strokeDashoffset = (1 - currentSegments / totalSegments + 0.01) * length;
    mask.getBoundingClientRect();
    mask.style.transition = mask.style.WebkitTransition = 'stroke-dashoffset 0.4s ease-in-out 0s';
  }
}
