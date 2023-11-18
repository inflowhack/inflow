import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      /* Noto Serif Display */
      @font-face {
        font-family: 'Noto Serif Display', serif;
        font-weight: 400;
        src: url('https://fonts.googleapis.com/css2?family=Noto+Serif+Display&display=swap');
      }

        /* Lato */
      @font-face {
        font-family: 'Lato 400', sans-serif;
        font-weight: 300;
        src: url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
      }

      `}
  />
);

export default Fonts;
