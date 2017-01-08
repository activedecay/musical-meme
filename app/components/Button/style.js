import { css } from 'styled-components';
import { hilite, lite, dark, borderAsymReverse } from 'style/lego'
export default css`
  background: ${dark};
  border: outset ${hilite};
  padding: 4px 10px;
  color: ${lite};
  ${borderAsymReverse};
  
  &:active {
    background: ${lite};
    color: black;
    border: inset ${hilite};
  }
`;