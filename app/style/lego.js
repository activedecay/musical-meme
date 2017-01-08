import React from 'react';
import styled, { keyframes, ThemeProvider, css } from 'styled-components';

const gutter = 10;
const itemWidth = 100;
const minorRadius = 6;
const majorRadius = 11;
const avatarSize = 24;
const statSpace = 30;

export const hilite = '#95d4ff';
export const lite = '#e9c195';
export const medium = '#aa7e5d';
export const darkDesat = '#545454';
export const dark = '#4f392f';
export const shadow = '#1c150f';

export const padding = `padding: ${gutter / 2}px;`;
const paddingLR = `padding: 0 ${gutter / 2}px;`;
const marginTB = `margin: ${gutter / 2}px 0;`;
const paddingTB = `padding: ${gutter / 2}px 0;`;
const marginLR = `margin: 0 ${gutter / 2}px;`;
export const borderAsymReverse = `border-radius: ${minorRadius}px ${majorRadius}px;`;
export const borderAsym = `border-radius: ${majorRadius}px ${minorRadius}px;`;
export const borderRadius = `border-radius: ${minorRadius}px ${minorRadius}px;`;

const docPaddingX = gutter / 2;
const docPaddingY = 0;
const docPadding = `padding: ${docPaddingY}px ${docPaddingX}px;`;

const Document = styled.div`
  ${docPadding}
  color: ${medium};
  background: ${shadow};
`;
export const Doc = props => <Document role="document" {...props} />

export const Article = styled.article`
  ${paddingLR}
  ${marginTB}

  color: ${hilite};
  background: ${medium};
  ${borderRadius}
  border: 1px solid ${dark};
`;

export const Header = styled.header`
  ${padding}
  color: ${lite};
  background: ${dark};
`;

export const Section = styled.section`
  ${padding}
  color: ${lite};
  background: ${dark};
  min-width: 100px;
  position: relative;
  padding-right: ${statSpace}px;
`;

const Status = styled.span`
  position: absolute;
  top: 0; 
  right: 0;
  ${padding}
  padding-top: 0;
  font-size: smaller;
  background: ${shadow};
`;
export const Stat = props => <Status role="status" {...props} />

export const Summary = styled.summary`
`;
export const Details = styled.details`
  margin-right: -${statSpace}px;
`;
export const Stack = styled.div`
  ${paddingLR}
  ${marginTB}

  color: ${hilite};
`;

const Toolbar = styled.menu`
  ${padding}
  background: ${hilite};
  ${borderAsymReverse}
`;
export const Tools = props => <Toolbar role="toolbar" {...props} />

const ToolButton = styled.button`
  ${padding}
`;
export const Tool = props => <ToolButton {...props} />

/* todo refactor the below to be more like the above. */

/** contains all the things */
export const Container = styled.div`
  margin: 0 auto;
  ${padding};
  background: ${shadow};
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
    align-items: ${prop};
  `
};
/** can be start, end, center, between or around */
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
    justify-content: ${prop};
  `
};

/**
 * main ltr, cross up/down, reverse rtl
 *  @param: main: start, end, center, between, around
 *  @param: cross: fill, start, end, or center
 *  @param: reverse: direction; true means rtl
 *  @param: wrap: presence means wrap
 */
export const Row = styled(Container)`
  display: flex;
  flex-wrap: ${props => props.wrap != undefined ? 'wrap' : 'nowrap'}
  flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
  ${props => mainAxis(props.main)}
  ${props => crossAxis(props.cross)}
`;

/**
 * main up/down, cross ltr, reverse down/up
 *  @param: main: start, end, center, between, around
 *  @param: cross: fill, start, end, or center
 *  @param: reverse: direction; true means down/up
 *  @param: wrap: presence means wrap
 */
export const Column = styled(Container)`
  display: flex;
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'}
  flex-direction: ${props => props.reverse ? 'column-reverse' : 'column'};
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
  background: ${medium};
  ${borderAsym}
`;

export const Item = styled.div`
  width: ${itemWidth + gutter}px;
  ${borderAsym}
  cursor: pointer;
`;
