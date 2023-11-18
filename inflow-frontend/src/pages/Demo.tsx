import { Heading, Box, Button, Card, Image } from "@chakra-ui/react";
import { createEmbedSdkInstance } from "../api/onramp-unlimit";
import { accountExecution } from "../api/simple-a";
import product from "../assets/product.png";


const Demo = () => {
  const handleClick = () => {
    // Define your parameters here
    const address = "0xFcf6544597778DA948CE76D148819c612F0e0325";
    const amount = "1";

    // Create SDK instance
    //createEmbedSdkInstance(address, amount);

    // Execute the accountExecution function
    accountExecution();

    //Add here the condition, if the paiement went succesful, then isLoading = false, and the a valid message is displayed

  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="20px"
      height="100vh"
      width="100vw"
    >     
      <Card
        maxW="300px"
        minH="200px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        h="300px"
        p="35px"
        border="1px solid rgba(255, 255, 255, .25)"
        borderRadius="20px"
        bg="rgba(255, 255, 255, 0.4)" // Adjusted alpha channel to 0.4
        boxShadow="0 0 10px 1px rgba(0, 0, 0, 0.25)"
        backdropFilter="blur(15px)"
      >
        <Image src={product} alt="Product" />

        
      </Card>
    
      <Button
         colorScheme='whiteAlpha'
         borderRadius="10px"       
         textColor="black"
         height="50px"
         width="150px"
         onClick={handleClick}
         border="none"// Add a border color
         _hover={{ border: "1px solid black" }} // Remove the border on hover
        >
        {" "}
        Pay with InFlow
      </Button>
    </Box>
  );
};

export default Demo;
