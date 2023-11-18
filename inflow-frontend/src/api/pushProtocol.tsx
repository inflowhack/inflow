// Import restapi for function calls
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

// Ethers v5 or Viem, both are supported
import { ethers } from "ethers";

import { accountExecution } from "./simple-a";


//Create a signer from the smart account address created in the Demo page
const { signer } = await accountExecution();

const userAlice = await PushAPI.initialize(signer); 

// List inbox notifications
const inboxNotifications = await userAlice.notification.list( 'INBOX' )

// List spam notifications
const spamNotifications = await userAlice.notification.list( 'SPAM' )

//Push channel address 
const pushChannelAdress = '0×B88460Bb2696CAb9D66013A05dFF29a28330689D'

// Subscribe to push channel
await userAlice.notification.subscribe(
    `eip155:11155111:${pushChannelAdress}` // channel address in CAIP format
)

//To send notifications 
await userAlice.channel.send([recipents], {Option?})

// to send a broadcast notification - pass '* in recipients array
const broadcastNotif = await userAlice.channel.send(['*'], {
    notification: { title: 'test', body: 'test' },
})



//to send a targeted notification - pass that single wallet address in recipients array
const targetedNotif = await userAlice.channel.send( [signer address], {
    notification: {
        title: 'test',
        body: 'test'
    },
})

//to send a subset notification - pass the list of wallet address in recipients array
const subsetNotif = await userAlice.channel.send(
    [randomkallet2, randomallet2, signer.address],
    {
        notificatton: {
            title: 'test',
            body: 'test', 
        },
    },
)

