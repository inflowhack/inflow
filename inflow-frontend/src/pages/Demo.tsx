import { Heading, Box, Button } from '@chakra-ui/react';
//import { createEmbedSdkInstance } from '../api/onramp-unlimit';
import { accountExecution } from '../api/simple-a';

const Demo = () => {

    const handleClick = () => {
        // Define your parameters here
        const address = "0xFcf6544597778DA948CE76D148819c612F0e0325";
        const amount = "1";

        // Create SDK instance
        //createEmbedSdkInstance(address, amount);

        // Execute the accountExecution function
        accountExecution();
    };

    return( 
        <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap= "20px"
        height="100vh"
        width="100vw"
        >

        <Heading> This is the demo </Heading>
        <Button onClick={handleClick}> Pay with InFlow</Button>

        </Box>
    )
}

export default Demo;
