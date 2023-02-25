const Discord = require("discord.js");
const Activate = require("../models/Guilds");

module.exports = {
  name: "messageDelete",
  async execute(message) {
    if (message.author.bot) return;
    if (!message.content) return;

    const activated = await Activate.findOne({
      guild_id: message.guild.id,
    });
    const regex = /<@!?(1|\d{17,19})>/;

    if (!activated) {
      return;
    } else {
        if (message.content.match(regex)) {
          console.log(
            `${message.author.username} ghost pinged in ${message.channel} in ${message.guild}`
          );

          const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription(
              `Well well well, <@${message.author.id}> decided to ghost-ping a user..`
            )
            .addField("Their Message", `${message.content}`);

          message.channel.send({ embeds: [embed] });
        } else if (message.content.match("@everyone")) {
          console.log(
            `${message.author.username} ghost pinged everyone in ${message.channel} in ${message.guild}`
          );
          if(message.content.length > 1024)
          message.content = 'Message is too long to be displayed!'
          const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setDescription(
              `Well well well, <@${message.author.id}> decided to ghost-ping everyone..`
            )
            .addField("Their Message", `${message.content}`);

          message.channel.send({ embeds: [embed] });
        }
    }
  },
};
