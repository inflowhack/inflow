import { GateFiDisplayModeEnum, GateFiSDK } from "@gatefi/js-sdk";

// Function to create a new embed SDK instance
export const createOverlaySdkInstance = (address:string) => {

  try {
    const embedInstanceSDK = new GateFiSDK({
      merchantId: import.meta.env.VITE_MERCHANT, // pv 
      displayMode: GateFiDisplayModeEnum.Overlay,
      isSandbox: true,
      walletAddress: address, // pv
      styles: {
        type: "dark",
      },
    })

    embedInstanceSDK.show();
  } catch (error) {
    console.error("Error creating GateFi SDK instance:", error);
    return null;
  }
};
