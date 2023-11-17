import { Heading, Box, Button } from '@chakra-ui/react';

const Demo = () => {

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
        <Button> Pay with InFlow</Button>

        </Box>
    )
}

export default Demo;
