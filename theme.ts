/*
 * @Author: cola
 * @Date: 2022-07-21 23:37:49
 * @LastEditors: cola
 * @Description:
 */
import { generateTypeColor, ns } from './src/utils/unocss'

export default {
  colors: {
    ...generateTypeColor(),
    textColor: {
      default: ns('primary', 'text-color'),
      regular: ns('regular', 'text-color'),
      secondary: ns('secondary', 'text-color'),
      placeholder: ns('placeholder', 'text-color'),
      disabled: ns('disabled', 'text-color'),
    },
    borderColor: {
      darker: ns('darker', 'border-color'),
      dark: ns('dark', 'border-color'),
      default: ns('', 'border-color'),
      light: ns('light', 'border-color'),
      lighter: ns('lighter', 'border-color'),
      'extra-light': ns('extra-light', 'border-color'),
    },
    bgColor: {
      page: ns('page', 'bg-color'),
      default: ns('page', 'bg-color'),
      overlay: ns('overlay', 'bg-color'),
    },
    fillColor: {
      default: ns('', 'fill-color'),
      light: ns('light', 'fill-color'),
      lighter: ns('lighter', 'fill-color'),
      'extra-light': ns('extra-light', 'fill-color'),
      dark: ns('dark', 'fill-color'),
      darker: ns('darker', 'fill-color'),
      blank: ns('blank', 'fill-color'),
    },
  },
  borderRadius: {
    base: ns('', 'border-radius'),
    medium: ns('medium', 'border-radius'),
    round: ns('round', 'border-radius'),
    circle: ns('circle', 'border-radius'),
  },
  lineHeight: {
    large: ns('large', 'line-height'),
    medium: ns('medium', 'line-height'),
    base: ns('', 'line-height'),
    small: ns('small', 'line-height'),
  },
  fontSize: {
    'extra-large': ns('extra-large', 'font-size'),
    large: ns('large', 'font-size'),
    medium: ns('medium', 'font-size'),
    base: ns('', 'font-size'),
    small: ns('small', 'font-size'),
    'extra-small': ns('extra-small', 'font-size'),
  },
  fontFamily: {
    base: ns('', 'font-family'),
  },
  fontWeight: {
    bolder: ns('bolder', 'font-weight'),
    bold: ns('bold', 'font-weight'),
    base: ns('', 'font-weight'),
    light: ns('bolder', 'font-weight'),
  },
  borderWidth: {
    none: ns('none', 'border-width'),
    base: ns('', 'border-width'),
    medium: ns('medium', 'border-width'),
    large: ns('large', 'border-width'),
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  space: {
    'extra-large': ns('extra-large', 'space'),
    large: ns('large', 'space'),
    medium: ns('medium', 'space'),
    base: ns('', 'space'),
    small: ns('small', 'space'),
    'extra-small': ns('extra-small', 'space'),
  },
  boxShadow: {
    default: ns('', 'box-shadow'),
    light: ns('light', 'box-shadow'),
    lighter: ns('lighter', 'box-shadow'),
    dark: ns('dark', 'box-shadow'),
  },
  zIndex: {
    base: ns('', 'z-index'),
    top: ns('top', 'z-index'),
    popper: ns('popper', 'z-index'),
  },
}
