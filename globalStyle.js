import { createGlobalStyle } from "styled-components";
import fancyFont from "./public/fonts/exmouth_.ttf";
import KarlaExtraBold from "./public/fonts/Karla-ExtraBold.ttf";
import KarlaBold from "./public/fonts/Karla-Bold.ttf";
import KarlaSemiBold from "./public/fonts/Karla-SemiBold.ttf";
import KarlaRegular from "./public/fonts/Karla-Regular.ttf";
import AttractTypeReborn from "./public/fonts/Attractype Reborn.ttf";

export const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: "Att-reborn";
    font-display: optional;
    unicode-range: U+000-5FF;
  src: url(${AttractTypeReborn});
}

@font-face {
  font-family: Att-reborn-fallback;
  src: local(Brush Script MT);
  size-adjust: 99%;
  advance-override: 10;
  ascent-override: 100%;
  descent-override: 20%;
  line-gap-override: normal;
}

@font-face {
  font-family: "Karla-ExtraBold";
    font-display: optional;
    unicode-range: U+000-5FF;
  src: url(${KarlaExtraBold});
}

@font-face {
  font-family: Karla-ExtraBold-fallback;
  src: local(Arial);
  advance-override: 10;
  ascent-override: 100%;
  descent-override: 20%;
  line-gap-override: normal;
}

@font-face {
  font-family: "Karla-Bold";
    font-display: optional;
    unicode-range: U+000-5FF;
  src: url(${KarlaBold});
}

@font-face {
  font-family: Karla-Bold-fallback;
  src: local(Arial);
  advance-override: 10;
  ascent-override: 100%;
  descent-override: 20%;
  line-gap-override: normal;
}

@font-face {
  font-family: "Karla-SemiBold";
    font-display: optional;
    unicode-range: U+000-5FF;
  src: url(${KarlaSemiBold});
}

@font-face {
  font-family: Karla-SemiBold-fallback;
  src: local(Arial);
  advance-override: 10;
  ascent-override: 100%;
  descent-override: 20%;
  line-gap-override: normal;
}

@font-face {
  font-family: "Karla-Regular";
    font-display: optional;
    unicode-range: U+000-5FF;
  src: url(${KarlaRegular});
}

@font-face {
  font-family: Karla-Regular-fallback;
  src: local(Arial);
  advance-override: 10;
  ascent-override: 100%;
  descent-override: 20%;
  line-gap-override: normal;
}


  @font-face {
    font-family: "exmouth";
      font-display: optional;
      unicode-range: U+000-5FF;
    src: url(${fancyFont});
  }

  @font-face {
  font-family: exmouth-fallback;
  src: local(Arial);
  advance-override: 10;
  ascent-override: 100%;
  descent-override: 20%;
  line-gap-override: normal;
}

  body {
    margin: 0;
    font-family: "Karla-Bold", "Karla-Bold-fallback", sans-serif;
    color: rgb(60, 60, 60);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: 0px;
    line-height: 1.47;
    font-weight: 600;
    height: 100vh;
    background-color: E7ECEF;
    scroll-behavior: smooth;
  }

  html {
    scroll-behavior: smooth;
  }

  a {
      color: inherit;
      text-decoration: none;
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

/* safari support to clear random 1px margin in inputs */
  input {
    margin: 0;
    font-family: inherit;
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
    padding: 13px 54px 14px 12px;
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
  font-family: inherit;
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
