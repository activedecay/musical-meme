import styled, { keyframes, ThemeProvider, css } from 'styled-components';

const gutter = 10;
const itemWidth = 100;
const titleWidth = 145;
const radius = 6;
const avatarSize = 24;

export const hilite = '#95d4ff';
export const lite = '#d6b087';
export const medium = '#aa7e5d';
export const darkDesat = '#545454';
export const dark = '#4f392f';
export const shadow = '#1c150f';

const padding = `padding: ${gutter / 2}px`;
const paddingLR = `padding: 0 ${gutter / 2}px`;
const marginTB = `padding: ${gutter / 2}px 0`;
const borderRadius = `border-radius: ${radius}px`;

/** contains all the things */
export const Container = styled.div`
  margin: 0 auto
  ${padding}
  background: ${shadow}
`;

/** can be fill, start, end, or center */
const crossAxis = (type) => {
  let prop = type;
  if (type === 'fill') {
    prop = 'stretch';
  } else if (type === 'start') {
    prop = 'flex-start';
  } else if (type === 'end') {
    prop = 'flex-end';
  } else if (type === 'center') {
    prop = 'center';
  } else {
    return
  }
  return `
    align-items: ${prop}
  `
};
const mainAxis = (type) => {
  let prop;
  if (type === 'start') {
    prop = 'flex-start';
  } else if (type === 'end') {
    prop = 'flex-end';
  } else if (type === 'center') {
    prop = 'center';
  } else if (type === 'between') {
    prop = 'space-between';
  } else if (type === 'around') {
    prop = 'space-around';
  } else {
    return
  }
  return `
    justify-content: ${prop}
  `
};

/**
 *  @param: mainAxis: start, end, center, between, around
 *  @param: crossAxis: fill, start, end, or center
 * */
export const Row = styled(Container)`
  display: flex
  flex-direction: row
  ${props => mainAxis(props.main)}
  ${props => crossAxis(props.cross)}
`;
export const Column = styled(Container)`
  display: flex
  flex-direction: column
  ${props => mainAxis(props.main)}
  ${props => crossAxis(props.cross)}
`;

/** element inside containers */
export const Element = styled.div`
  ${padding}
  color: ${lite};
  background: ${dark};

  &:empty { 
    display:none;
  }
`;

/** vertically stacked; margins collapse */
export const ElementStack = styled.div`
  ${paddingLR}
  ${marginTB}

  color: ${hilite};
  background: ${medium}
  ${borderRadius}
`;

export const Item = styled.div`
  /* items contain a fixed width img... so, width needed? */
  width: ${itemWidth + gutter}px; 
  ${borderRadius}
  cursor: pointer;

  &:hover {
    background: ${darkDesat};
  }
`;
