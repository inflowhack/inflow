import "./Home.css";
import { Button, Box, Heading, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Home() {
  const history = useNavigate();

  const goToDemo = () => {
    console.log("go to demo");
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
         height="50px"
         width="150px"
         onClick={goToDemo}
         border="none"// Add a border color
         _hover={{ border: "1px solid black" }} // Remove the border on hover
        >
        Demo
      </Button>
    </Box>
  );
}

export default Home;
