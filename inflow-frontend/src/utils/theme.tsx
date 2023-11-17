import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
 fonts: {
   heading: `'Lato 400', sans-serif`,
   body: `'Lato 300', sans-serif`,
   button: `'Lato 300', sans-serif`,
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