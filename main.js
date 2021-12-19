require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = '!baka';
// native Node.js module
const https = require('https');
// don't forget to `npm install cheerio` to get the parser!
const cheerio = require('cheerio');
const imageSearch = require('image-search-google');
const fs = require('fs');


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}




client.once('ready', () => {
	console.log('Ready!');
  client.user.setActivity("<3", {type: "PLAYING"})
  client.channels.cache.get("786060008735113217").send("");
});




client.on('message', message => {
  message = message.toLowerCase();

  if (message.author.id === client.user.id) return;

  if (message.content.toLowerCase().startsWith(`${prefix}`)){

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'add') {
      client.commands.get("add").execute(message, args, command, client, Discord, db)
    }
    else if(command === 'overview'){
      client.commands.get("overview").execute(message, args, command, client, Discord, db)
  	}
    else if(command === 'mem'){
      client.commands.get("meme").execute(message, args, command, client, Discord, db)
    }
  }
})




client.login(process.env.BOT_TOKEN);
