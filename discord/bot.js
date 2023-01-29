import * as dotenv from 'dotenv';
dotenv.config();
import * as Discord from 'discord.js';
import * as changesCmd from '../backend/nordyLib/getchanges.js';
import keys from '../backend/database/keys.json' assert { type: 'json' };
const client = new Discord.Client({intents:[7796]});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

getChanges();




async function getChanges() {
    let changes = await changesCmd.getChanges();
    let changesToText = `${changes}`;
    if (changesToText.includes("false")) {
        console.log('No changes detected, waiting 10 minutes...');
    } else {
        console.log(`Changes detected, sending message to user...`);
        await client.login(keys.BOT_TOKEN);
        const user = await client.users.fetch(keys.NORDY_ID); 
        for (var i = 0; i < changes.length; i++) {
            if (changes[i] != null) {
                await user.send("שינוי במערכת השעות: " + changes[i]);
            }
        }

        process.exit(0);
    }

}