import React, { createContext, Component } from 'react';
import { debounce } from 'lodash-es';

const INITIAL_WINDOW_WIDTH = window.innerWidth;
const INITIAL_WINDOW_HEIGHT = window.innerHeight;

const { Provider, Consumer } = createContext({
  width: INITIAL_WINDOW_WIDTH,
  height: INITIAL_WINDOW_HEIGHT,
});

export class WindowSizeProvider extends Component {
  state = {
    width: INITIAL_WINDOW_WIDTH,
    height: INITIAL_WINDOW_HEIGHT,
  };

  updateWindowSize = debounce(() => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 100);

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowSize);
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export function withWindowSize(Component) {
  return function(props) {
    return <Consumer>{({ width, height }) => <Component {...props} width={width} height={height} />}</Consumer>;
  };
}
