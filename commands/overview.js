module.exports = {
    name: 'overview',
    category: 'stats',
    description: 'gets general stats',
    usage: `overview`,
    async execute(message, args, command, client, Discord, db){
        //check arguments
        var uid = message.author.id;


        const activeUser = await userSchema.findOne({ uid: uid }); // find user
        var numTasks = activeUser.tasks.length;
        activeUser.tasks = []; // clear
        await activeUser.save(); // saves change to database

        const embed = new MessageEmbed()
        .setColor("YELLOW")
        .setTitle("Cleared " + message.author.username + "'s To-Do List") //add task name, task date
        .setDescription("Removed " + numTasks + " tasks");

        message.channel.send(embed);
        client.commands.get("update").execute(message, args, command, client, Discord, db);

    }
}
