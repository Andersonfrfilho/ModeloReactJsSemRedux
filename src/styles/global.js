import { createGlobalStyle } from 'styled-components';
import background from '../assets/images/background.svg';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
  *{
    margin:0;
    padding:0;
    outline:0;
    box-sizing:border-box;
  }
  html,body,#root{
    min-height:100%
  }
  body{
    background:#7159c1;
    -webkit-font-smoothing:antialiased !important;
  }
  body,input,button{
    color:#222;
    font:14px Roboto, sans-serif, Arial, Helvetica;
  }
  #root {
    /*max-width:1020px;
    margin:0 auto;
    padding: 0 20px 50px;*/
  }
  button{
    cursor:pointer
  }
`;
