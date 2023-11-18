import { Client, Presets } from "userop";
import { ethers } from 'ethers';


export const accountExecution = async () => {
    const privateKey = ethers.Wallet.createRandom().privateKey;
    const owner = new ethers.Wallet(privateKey);
    const bundlerRPCUrl:string = import.meta.env.VITE_BUNDLER_RPC_URL || "";
// peut etre add a try catch block
    console.log(bundlerRPCUrl);
    // Create a new Smart Account
    const smartAccount = await Presets.Builder.SimpleAccount.init(
        owner,
        bundlerRPCUrl,
        {
            entryPoint: import.meta.env.VITE_ENTRYPOINT,
            factory: import.meta.env.VITE_WALLETFACTORY_CONTRACT,
        }
    );
    
    console.log('smart wallet address', smartAccount.getSender());


    const client = await Client.init(bundlerRPCUrl, { 
        entryPoint: import.meta.env.VITE_ENTRYPOINT,
    });
    
    const result = await client.sendUserOperation(
        smartAccount.execute(smartAccount.getSender(), 0, "0x"),
    );
    
    const event = await result.wait();
    console.log(`Transaction hash: ${event?.transactionHash}`); 

    
};