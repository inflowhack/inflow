import { Heading, Box, Button, Card, Image } from "@chakra-ui/react";
import product from "../assets/product.png";
import Apple_logo_black from "../assets/Apple_logo_black.svg";
import flowRound from "../assets/flowRound.png";
import { createOverlaySdkInstance } from "../api/onramp-unlimit-sdk";
import { accountExecution } from "../api/simple-aa";
// import { PushNotification } from "../api/pushProtocol";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";


const Demo = () => {
  const [isLoading, setLoading] = useState(false);

  const handleClick = async () => {

    //Catching the notification from the wallet creation
    // const { targetedNotif, inboxNotifications } =
    //   await PushNotification();
    const { smartAccountAddress } = await accountExecution();
    setLoading(true);
    
    //if createOverlaySdkInstance is in error 
    createOverlaySdkInstance(smartAccountAddress);

    console.log(createOverlaySdkInstance); 
    isLoading ? console.log("loading") : console.log("not loading");
    
    // is the smartAccountAddress is not defined, it means it's still loading, and the state isLoading = true
    //else the smartAccountAddress is defined, it means the smart account has been created. Is loading = false and a push notification can be sent " your smart account has been created to this address ${smartAccountAddress}"
    const notify = () =>
      toast(`Your smart account has been created ${smartAccountAddress}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    notify();


  };

  // Use
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

      <Box display="flex" flexDirection="column" alignItems="center" gap="20px">
        <Button
          colorScheme="whiteAlpha"
          borderRadius="10px"
          textColor="black"
          height="75px"
          width="200px"
          isLoading={false}
          onClick={handleClick}
          border="1px solid black" // Add a border color
          _hover={{ border: "1px solid black" }} // Remove the border on hover
        >
          {" "}
          <Box
            gap="10px"
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Image src={flowRound} alt="Flow Pay" boxSize="30px" />
            <Heading>Pay</Heading>
          </Box>
        </Button>
        <Button
          colorScheme="whiteAlpha"
          borderRadius="10px"
          textColor="black"
          height="75px"
          width="200px"
          isDisabled={true}
          onClick={handleClick}
          border="1px solid black" // Add a border color
          _hover={{ border: "1px solid black" }} // Remove the border on hover
        >
          {" "}
          <Box
            gap="10px"
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Image src={Apple_logo_black} alt="Apple Pay" boxSize="30px" />
            <Heading> Pay</Heading>
          </Box>
        </Button>
      </Box>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </Box>
  );
};

export default Demo;
