import { GateFiDisplayModeEnum, GateFiSDK } from "@gatefi/js-sdk";
import crypto from 'crypto'

// Function to create a new embed SDK instance
const createEmbedSdkInstance = (address:string, amount: string) => {
    const randomString = crypto.randomBytes(32).toString("hex");
    
    const embedInstanceSDK = new GateFiSDK({
            merchantId: "411a3cf9-b432-43bf-933b-12f60a760c5d", // pv 
            displayMode: GateFiDisplayModeEnum.Embedded,
            nodeSelector: "#embed-button",
            isSandbox: true,
            walletAddress: address,
            email: "dannba0@gmail.com", // pv
            externalId: randomString,
            defaultFiat: {
              currency: "USD",
              amount: amount,
            },
            defaultCrypto: {
              currency: "ETH",
            },
          })
};
