import { GateFiDisplayModeEnum, GateFiSDK } from "@gatefi/js-sdk";
// import crypto from 'crypto'

// Function to create a new embed SDK instance
export const createEmbedSdkInstance = () => {
/*   const randomString = crypto.randomBytes(32).toString("hex");
 */   
  try {
    const embedInstanceSDK = new GateFiSDK({
      merchantId: import.meta.env.VITE_MERCHANT, // pv 
      displayMode: GateFiDisplayModeEnum.Embedded,
      nodeSelector: "#overlay-button",
      isSandbox: true,
      walletAddress: import.meta.env.VITE_WALLET, // pv
      styles: {
        type: "dark",
      },
      defaultCrypto: {
        currency: "ETH",
      },
    })

    return embedInstanceSDK;
  } catch (error) {
    console.error("Error creating GateFi SDK instance:", error);
    return null;
  }
};