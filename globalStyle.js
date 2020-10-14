import { createGlobalStyle } from "styled-components";
import mainFont from "./fonts/FuturaStd-Heavy.otf";
import fancyFont from "./fonts/exmouth_.ttf";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Inter Black";
    src: url("./fonts/Inter-Black.otf");
  }
  @font-face {
    font-family: "Inter Regular";
    src: url("./fonts/Inter-Regular.otf");
  }

  @font-face {
    font-family: "Futura Std Heavy";
    src: url(${mainFont});
  }

  @font-face {
    font-family: "exmouth";
    src: url(${fancyFont});
  }

  body {
    margin: 0;
    font-family: "Futura Std Heavy", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    color: #272932;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 1.3px;
    line-height: 1.47;
    height: 100vh;
    background-color: E7ECEF;
    scroll-behavior: smooth;
  }

  html {
    scroll-behavior: smooth;
  }

  code {
    font-family: "Source Sans Pro", source-code-pro, Menlo, Monaco, Consolas,
      "Courier New", monospace;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 0;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    transition: background-color 5000s ease-in-out 0s;
    width: 100% !important;
  }

  /* Error Message Styling */

  .Toastify__toast-container {
    width: 225px !important;
  }

  .Toastify__toast {
    min-height: 50px !important;
    font-family: "Roboto" !important;
    font-weight: 600 !important;
    border-radius: 7px !important;
    text-align: center;
  }

  .Toastify__toast--success {
    background-color: #18d047 !important;
  }

  .Toastify__toast--error {
    background-color: #ec5b5b !important;
  }

  .Toastify__progress-bar {
    height: 3.2px !important;
    border-top-right-radius: 200px;
    border-bottom-right-radius: 200px;
    background-image: white;
  }

  .Toastify__close-button {
    color: white !important;
    display: none;
  }


  .DayPickerInput {
    width: 100%;
  }

  .DayPickerInput > input {
    padding: 14px 54px 14px 12px;
    font-size: 1rem;
    border-radius: 9px;
    outline: none;
    box-sizing: border-box;
    font-weight: 500;
    font-family: inherit;
    color: grey;
    width: 100%;
    border: none;
  }


.css-2b097c-container {
  width: 100%;
  border: none;
  border-radius: 9px;
}

.css-yk16xz-control {
  border: none !important;
  border-radius: 9px !important;
  font-size: 1rem !important;
  padding: 5.33px 5px;
}

 .css-1pahdxg-control {
     border-radius: 9px !important;
     font-size: 1rem !important;
     padding: 5.33px 5px;
     border: none !important;
     box-shadow: none !important;
 }

 .css-1pahdxg-control:hover {
     border: none;
     box-shadow: none;
 }

 .css-26l3qy-menu {
     font-size: 1rem;
 }

`;
