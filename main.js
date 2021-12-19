require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = '!';
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
  //client.channels.cache.get("786060008735113217").send("e");
});




client.on('messageCreate', message => {
  var msg = message.content.toLowerCase();

  if (message.author.id === client.user.id) return;

  if (msg.startsWith(`${prefix}`)){

    const args = msg.slice(prefix.length).trim().split(' ');
    const command = args;

    if (command === 'add') {
      client.commands.get("add").execute(message, args, command, client, Discord, db)
    }
    else if(command === 'overview'){
      client.commands.get("overview").execute(message, args, command, client, Discord, db)
  	}
    else if(command === 'mem'){
      client.commands.get("meme").execute(message, args, command, client, Discord, db)
    }
    else {
      const embed = new MessageEmbed()
      .setTitle("Invalid Command")
      .setColor("RED");
      channel.send({ embeds: [embed] });
    }
  }
})




client.login(process.env.BOT_TOKEN);
