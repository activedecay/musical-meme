import styled, { keyframes, ThemeProvider, css } from 'styled-components';

const Button = styled.button`
  /* Set the background of this button from the theme */
  background: ${props => props.theme.main};
`;

// Create a green theme
const greenTheme = {
  main: 'mediumseagreen',
};

// Create a red theme
const redTheme = {
  main: 'palevioletred',
};

/*const MyApp = () => {
 *  return (
 *    <div>
 *      {/!* All children of this component will be green *!/}
 *      <ThemeProvider theme={greenTheme}>
 *        <Button>I'm green!</Button>
 *      </ThemeProvider>
 *      {/!* All children of this component will be red *!/}
 *      <ThemeProvider theme={redTheme}>
 *        <div>
 *          <Button>I'm red!</Button>
 *        </div>
 *      </ThemeProvider>
 *    </div>
 *  );
 *};
 */

/*truncate!, media queries!*/
/* use ellipses on text */
export function truncate(width) {
  return `
    width: ${width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}
// Then you can use it like this:
const Box = styled.div`
  ${ truncate('250px') }
  background: papayawhip;
`;
// Due to the functional nature of javascript, you can
// easily define your own tagged template literal to wrap styles in media queries. For example:
// these sizes are arbitrary and you can set them to whatever you wish
const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  handheld: 420,
  phone: 376
};
// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `;
  return accumulator
}, {});
// Great! Now that you've defined your media templates, you can use them like this:
const Container = styled.div`
  color: #333;
  ${media.desktop`padding: 0 20px;`}
  ${media.tablet`padding: 0 10px;`}
  ${media.phone`padding: 0 5px;`}
`;
// Make the text smaller on handheld devices
const Thing = styled.div`
  font-size: 16px;
  ${ media.handheld`
    font-size: 14px;
  ` }
`;


/*animations*/
// keyframes returns a unique name based on a hash of the contents of the keyframes
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
`;

/*flex... not that great. use lego*/
const Wrapper = styled.div`
  display: flex;
  min-height: 20vh;
  flex-direction: column;
  border: 1px solid ${props=>props.border}
`;
const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border: 1px solid ${props=>props.border}
`;
const Header = styled.div`
  flex: 0 0 1em;
  order: -1;  
  border: 1px solid ${props=>props.border}
`;
const Content = styled.div`
  flex: 0 0 20em;
  border: 1px solid ${props=>props.border}
`;
