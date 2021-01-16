import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    &::-webkit-scrollbar {
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb{
        background-color: darkgrey;
    }
    &::-webkit-scrollbar-track {
        background: white;
    }
}

 body {
     font-family: "Roboto", sans-serif;
     background-color: #a99829;
    background-image: linear-gradient(147deg, #b09e2d 0%, #9f2626 74%);
     height: 100vh;
 }

 h2{
     font-size: 3rem;
     font-family: "Anton", cursive;
     font-weight: lighter;
     color: white;

     @media(max-width: 400px) {
    padding: 1rem;
    font-size: 2rem;
  }
 }
 h3 {
     font-size: 1.3rem;
     color: whitesmoke;
     padding: 1.5rem 0rem;
 }

 p {
     font-size: 1.2rem;
     line-height: 200%;
     color: whitesmoke;
 }

 a {
     text-decoration: none;
     color: whitesmoke;
 }

img {
    display: block;
}

input {
    font-weight: bold;
    font-family: "Roboto", sans-serif;
}

`;

export default GlobalStyles;
