import { GateFiDisplayModeEnum, GateFiSDK } from "@gatefi/js-sdk";
import crypto from 'crypto'

// Function to create a new embed SDK instance
export const createEmbedSdkInstance = (address:string, amount: string) => {
  const randomString = crypto.randomBytes(32).toString("hex");
  try {
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

    return embedInstanceSDK;
  } catch (error) {
    console.error("Error creating GateFi SDK instance:", error);
    return null;
  }
};

// Hash the secret key with the data
// function calcAuthSigHash(data: crypto.BinaryLike, key: string) {
//   const hmac = crypto.createHmac('sha256', key);
//   hmac.update(data);
//   return hmac.digest('hex');
// }


// const buyAssetAPI = async (instanceSDK:GateFiSDK) => {

//     instanceSDK?.show();

//     const randomString = crypto.randomBytes(32).toString('hex');

//     const dataVerify4 = "GET" + "/onramp/v1/buy";
//     const secretkey = "oDTOPaVDYaDkgmYWkcZavaFLpNkxAMqn" // pv secret key

//     const  signature = calcAuthSigHash(dataVerify4, secretkey)

//     await fetch(`/api/proxy?endpoint=/onramp/v1/buy&amount=21&crypto=ETH&fiat=USD&orderCustomId=${randomString}&partnerAccountId=9e34f479-b43a-4372-8bdf-90689e16cd5b&payment=BANKCARD&redirectUrl=https://www.citadel.com/&region=US&walletAddress=0xb43Ae6CC2060e31790d5A7FDAAea828681a9bB4B`, {
//         redirect: 'follow',
//         headers: {
//             "api-key": 'vboDgAnqEZcXMLiocRdEZDPgOEUmVcSg', // pv api key
//             "signature": signature
//         }
//     });
    
// }