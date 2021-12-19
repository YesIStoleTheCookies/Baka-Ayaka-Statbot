require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
  client.channels.cache.get("786060008735113217").send("go to sleep, PeePee");
});

client.login(process.env.BOT_TOKEN);
