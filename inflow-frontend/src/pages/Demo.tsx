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
    const address =  await accountExecution();
    
    // create sdk instance
    createOverlaySdkInstance(address);



    // is the smartAccountAddress is not defined, it means it's still loading, and the state isLoading = true 
    //else the smartAccountAddress is defined, it means the smart account has been created. Is loading = false and a push notification can be sent " your smart account has been created to this address ${smartAccountAddress}"

    
  

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
        maxW="500px"
        minH="400px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        h="500px"
        p="35px"
        border="1px solid rgba(255, 255, 255, .25)"
        borderRadius="20px"
        bg="rgba(255, 255, 255, 0.4)" // Adjusted alpha channel to 0.4
        boxShadow="0 0 10px 1px rgba(0, 0, 0, 0.25)"
        backdropFilter="blur(15px)"
      >
        <Image src={product} alt="Product" />

        
      </Card>
    
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center"
        gap = "20px" 
        > 

        <Button
           colorScheme='whiteAlpha'
           borderRadius="10px"       
           textColor="black"
           height="75px"
           width="200px"
           isLoading={false}
           onClick={handleClick}
           border="1px solid black"// Add a border color
           _hover={{ border: "1px solid black" }} // Remove the border on hover
          >
          {" "}
          <Box 
            gap="10px"
            display="flex"
            flexDirection="row"
            alignItems="center">
          <Image 
            src={flowRound} 
            alt="Flow Pay"
            boxSize='30px' />
            <Heading>
              Pay
            </Heading>
            </Box>
        </Button>
        <Button
           colorScheme='whiteAlpha'
           borderRadius="10px"       
           textColor="black"
           height="75px"
           width="200px"
           isDisabled={true}
           isLoading={false}
           onClick={handleClick}
           border="1px solid black"// Add a border color
           _hover={{ border: "1px solid black" }} // Remove the border on hover

          >
          {" "}
          <Box 
            gap="10px"
            display="flex"
            flexDirection="row"
            alignItems="center">
          <Image 
            src={Apple_logo_black} 
            alt="Apple Pay"
            boxSize='30px'
             />
             <Heading>
              {" "}
              Pay
             </Heading>
          </Box>
          
        </Button>
        </Box>
    </Box>
  );
};

export default Demo;
