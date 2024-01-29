import {Client, LocalAuth, MessageTypes} from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal'

const GROUP_ID = "393339736446-1631688444@g.us";
const USER_ID = "393755216723@c.us"

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: "./data"
    }),
    puppeteer: {
        args: ['--no-sandbox'],
    }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    if(msg.from === GROUP_ID && msg.author == USER_ID) {
        console.log("Found target message")
        if ((msg.type == MessageTypes.IMAGE || msg.type == MessageTypes.VIDEO || msg.type == MessageTypes.STICKER) || (msg.type == MessageTypes.TEXT && msg.body.includes("http"))) {
            await msg.delete(true);
        }
    }
});

await client.initialize();
