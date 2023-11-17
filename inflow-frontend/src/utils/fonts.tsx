import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      /* Lato */
      @font-face {
        font-family: 'Lato 300', sans-serif;
        font-weight: 300;
        src: url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
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
