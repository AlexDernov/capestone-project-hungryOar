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
    --primary-color-shadow: black;
    --primary-color-back:rgb(131, 159, 209);
      );
  
    --font-roboto: ${robotoSlab.style.fontFamily}; 
  }
  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-roboto);
    background-color: var(--primary-color-back);
  }
  .map {
    width: auto;
    height: 53vh;
  }
`;
