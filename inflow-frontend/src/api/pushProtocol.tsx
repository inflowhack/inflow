import { PushAPI } from "@pushprotocol/restapi";
import { accountExecution } from "./simple-aa";


export const PushNotification = async () => {
    const { signer } = await accountExecution();
    const userAlice = await PushAPI.initialize(signer); 

    const inboxNotifications = await userAlice.notification.list( 'INBOX' )
    const spamNotifications = await userAlice.notification.list( 'SPAM' )

    //to send a targeted notification - pass that single wallet address in recipients array
    const targetedNotif = await userAlice.channel.send( [signer.address], {
        notification: {
            title: 'You have a new notification !',
            body: 'Account Abstraction created ${signet.address}'
        },
    })

    return { targetedNotif, inboxNotifications, spamNotifications}
}