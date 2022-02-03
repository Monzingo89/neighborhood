import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .squareStyle {
    width:100%;
    min-width:10px;
    min-height:10px;
  }

  .neighborhood-row-container {
    display: flex;
  }
`;

export default GlobalStyle;