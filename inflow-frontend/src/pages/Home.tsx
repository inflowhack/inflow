import "./Home.css";
import { Button, Box, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home() {

  const history = useNavigate();

  const goToDemo = () => {
    history("/demo");
  }

  return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap= "20px"
        height="100vh"
        width="100vw"
        >

        <Heading>Inflow</Heading>

        <Button 
          borderRadius="0px"
          borderColor="black"
          variant="solid"
          height= "5vh"
          width="5vw"
          onClick={goToDemo}>
          Demo
        </Button>
      </Box>

  );
}

export default Home;
