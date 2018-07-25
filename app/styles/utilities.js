import { Dimensions } from 'react-native';

export const Vh = Dimensions.get('window').height / 100;
export const Vw = Dimensions.get('window').width / 100;
export const SCREEN_HEIGHT = 100*Vh;
export const SCREEN_WIDTH = 100*Vw;

export const PADDING = {
  VERTICAL_CONTAINER: 7*Vh,
  HORIZONTAL_CONTAINER: 7*Vw
}

export const COLOR = {
  BLACK: 'rgb(0, 0, 0)',
  RED: 'rgb(255, 46, 82)',
  GREEN: 'rgb(28, 211, 176)',
  BLUE: 'rgb(74, 143, 227)',
  YELLOW: 'rgb(255, 191, 0)',
  GREY: 'rgb(180, 180, 180)',
  GREY_DARKER: 'rgb(120,120,120)',
  WHITE: 'rgb(255,255,255)'
}

export const FONT = {
  BEBAS: 'BebasNeueBold',
  AVENIR: 'AvenirLTStd-Roman',
};

export const FONT_SIZE = {
  DEFAULT: 14,
  S: 12,
  M: 23,
  L: 33,
  XL: 60
};
