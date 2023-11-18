import { Presets } from "userop";
import { ethers } from 'ethers';


export const accountExecution = async () => {
    const privateKey = ethers.Wallet.createRandom().privateKey;
    const signer = new ethers.Wallet(privateKey);
    console.log('signer address', signer.address);
    const bundlerRPCUrl:string = import.meta.env.VITE_BUNDLER_RPC_URL || "";

    // peut etre add a try catch block
    console.log(bundlerRPCUrl);

    // Create a new Smart Account
    const smartAccount = await Presets.Builder.SimpleAccount.init(
        signer,
        bundlerRPCUrl,
        {  
            entryPoint: import.meta.env.VITE_ENTRYPOINT,
        }
    );
    
    const smartAccountAddress = smartAccount.getSender();
    console.log('smart wallet address', smartAccountAddress);

    return {signer, smartAccountAddress};
    
    // initialize a user op
    /*
    const client = await Client.init(bundlerRPCUrl, { 
        entryPoint: import.meta.env.VITE_ENTRYPOINT,
    });
    
    const result = await client.sendUserOperation(
        smartAccount.execute(smartAccount.getSender(), 0, "0x"),
    );
    
    const event = await result.wait();
    console.log(`Transaction hash: ${event?.transactionHash}`); 
     */

    
};