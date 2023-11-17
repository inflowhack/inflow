import "./Home.css";
import { Button, Box } from "@chakra-ui/react";

function Home() {
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        gap= "2vh">
        <h1>Inflow</h1>

        <Button 
          colorScheme="blue" 
          variant="solid">
          Demo
        </Button>
      </Box>
    </>
  );
}

export default Home;
