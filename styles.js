import { createGlobalStyle } from "styled-components";
import { Roboto_Slab } from "next/font/google";

const robotoSlab = Roboto_Slab({ weight: "400", subsets: ["latin"] });

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  :root{
    --primary-color: white;
    --primary-color-back: black;
  
    --font-roboto: ${robotoSlab.style.fontFamily}; 
  }
  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-roboto);
    background-color: blau;
  }
`;


/* 
  

  body {
    margin: 0;
    padding:0;
    font-family: system-ui;
    padding: 2rem;
    color: var(--primary-color);
    background-color: var(--primary-color-back);
  
  }
  
`; */
