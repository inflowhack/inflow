import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
 fonts: {
   heading: `'Noto Serif Display', serif`,
   body: `'Noto Serif Display', serif`,
   button: `'Noto Serif Display', serif`,
 },
 styles: {
   global: {
     body: {
       backgroundImage: "linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%)",
     },
   },
 },
});

export default theme;