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

  .nftSyle {
    width:100px;
    height:100px;
  }

  html, body, #root, .wrapper {
    width:100%;
    height: 100%;
  }

  @font-face {
    font-family: 'cubic';
    src: local('cubic'), url(fonts/cubicfive10.otf) format('truetype');
  }
`;

export default GlobalStyle;