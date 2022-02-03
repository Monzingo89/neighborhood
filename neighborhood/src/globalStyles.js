import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .squareStyle {
    width:100%;
    min-width:10px;
    min-height:10px;
  }

  a.squareStyle:hover{
    -webkit-filter: drop-shadow(12px 12px 7px rgba(0,0,0,0.5));
  }

  .neighborhood-row-container {
    display: flex;
  }
`;

export default GlobalStyle;