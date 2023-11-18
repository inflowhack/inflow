import { Heading, Box, Button, Card, Image } from "@chakra-ui/react";
import product from "../assets/product.png";
import Apple_logo_black from "../assets/Apple_logo_black.svg";
import flowRound from "../assets/flowRound.png";
import { PushAPI } from "@pushprotocol/restapi";
import { ethers } from "ethers";
import { NotificationItem } from "@pushprotocol/uiweb";
import { createOverlaySdkInstance } from "../api/onramp-unlimit-sdk";
import { accountExecution } from "../api/simple-aa";
import { pushProtocol } from "../api/pushProtocol";

const Demo =  () => {

  const handleClick = async () => { 
    const { signer, smartAccountAddress } = await accountExecution();

    //Console.log
    console.log(signer)
    console.log(smartAccountAddress)

    createOverlaySdkInstance(smartAccountAddress);

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

        <div>
{notifications.map((oneNotification, i) => {
    const { 
        cta,
        title,
        message,
        app,
        icon,
        image,
        url,
        blockchain,
        notification
    } = oneNotification;

    return (
        <NotificationItem
            key={id} // any unique id
            notificationTitle={title}
            notificationBody={message}
            cta={cta}
            app={app}
            icon={icon}
            image={image}
            url={url}
            theme={theme}
            chainName={blockchain}
            // chainName={blockchain as chainNameType} // if using Typescript
        />
        );
    })}
</div>
    </Box>
    
  );
};

export default Demo;