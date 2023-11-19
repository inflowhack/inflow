import "./Home.css";
import { Button, Box, Image, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Home() {
  const history = useNavigate();

  const goToDemo = () => {
    history("/demo");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100vw"
    >
      <Image 
        src={logo} 
        alt="logo"
         />

      <Button
         colorScheme='whiteAlpha'
         borderRadius="10px"       
         textColor="black"
         height="75px"
         width="200px"
         onClick={goToDemo}
         border="1px solid black"// Add a border color
         _hover={{ border: "1px solid black" }} // Remove the border on hover
        >
        <Heading>
          Demo</Heading>
      </Button>
    </Box>
  );
}

export default Home;
