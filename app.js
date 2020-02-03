const { Client } = require('discord.js');
const axios = require('axios').default;
const consoleTitle = require('console-title')
const readline = require('readline');
const chalk = require('chalk');
const client = new Client();
const readder = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
readder.question('Insert the account token: ', token => {
    client.on('ready', () => {
        consoleTitle('NitroSniper');
        console.log(`${chalk.greenBright('[Started]')} - Looking for discord gifts...`);
    });
    const config = 
    client.on('message', message => {
        if(message.content.includes('discord.gift') || message.content.includes('discordapp.com/gifts/')) {
            const giftRegex = /(discord\.(gift)|discordapp\.com\/gift)\/.+[a-z]/
            const giftUrl = giftRegex.exec(message.content);
            const giftCode = giftUrl[0].split('/')[1];
            console.log(`${chalk.green('[GIFT]')} - Found a gift on ${message.guild.name} (${giftUrl[0]})`);
            axios({ method: 'POST', url: `https://discordapp.com/api/v6/entitlements/gift-codes/${giftCode}/redeem`, headers: { 'Authorization': client.token }})
            .then(() => console.log(`${chalk.green('[uwu]')} - gift REDEEMED on ${message.guild.name}`))
            .catch(ex => console.log(`${chalk.red('[ERROR]')} - Failed`))
        }
    })
    
    client.login(token)
    .catch(error => {
        if(error.code == 4004) {
            console.log(`${chalk.red('[ERROR]')} - Invalid token`)
        } else {
            console.log(`${chalk.red('[ERROR]')} - ${error}`)
        }
    })
})