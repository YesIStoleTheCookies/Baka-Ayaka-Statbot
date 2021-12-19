const imageSearch = require('image-search-google');

module.exports = {
    name: 'meme',
    category: 'img',
    description: 'gets meme',
    usage: `meme`,
    async execute(message, args, command, client, Discord, db){
      var r = (Math.floor(Math.random() * 225)).toString(16);
      var g = (Math.floor(Math.random() * 225)).toString(16);
      var b = (Math.floor(Math.random() * 225)).toString(16);

      var url = await  image_finder.find("Genshin memes");

        const embed = new MessageEmbed()
        .setColor("#"+r+g+b)
        .setTitle(message.author.username+"'s Geshimemi") //add task name, task date
        .setDescription("E")
        .setImage(url)
        .setTimestamp();

        message.channel.send(embed);

    }
}
