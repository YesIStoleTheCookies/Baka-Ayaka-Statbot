const fs = require('fs');
module.exports = {
    name: 'add',
    category: 'add',
    description: 'add uid',
    usage: `add`,


    async execute(message, args, command, client, Discord, db){
        var discID = message.author.id;
        var uid = args[0];

        let rawdata = fs.readFileSync('uids.json');
        let data = JSON.parse(rawdata);
        var users = data.users;
        var exists = false;

        for (var user in users) {
          if (user.discID === discID) {

            exists = true;
            break;
          }
        }

        if (!exists) {
          let newUser = {"discID": discID, "uid": uid}
        };
          users.push(newUser);

          var newData = JSON.stringify(newUser);
          fs.writeFile('uids.json', newUser, err => {
              // error checking
              if(err) throw err;

              console.log("New data added");
              const embed = new MessageEmbed()
              .setColor("GREEN")
              .setTitle("UID Added, " + message.author.username + "!");
              message.channel.send(embed);
          });
        }
      }

}
