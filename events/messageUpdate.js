const Discord = require("discord.js");
const Activate = require("../models/Guilds");

module.exports = {
  name: "messageUpdate",
  async execute(oldMessage, newMessage) {
    if (oldMessage.author.bot) return;
    if (!oldMessage.content) return;
    if(oldMessage.content.length > 1024)
    oldMessage.content = 'Message is too long to be displayed!'
    if(newMessage.content.length > 1024)
    newMessage.content = 'Message is too long to be displayed!'
    const activated = await Activate.findOne({
      guild_id: oldMessage.guild.id,
    });
    const regex = /<@!?(1|\d{17,19})>/;
    if (!activated) {
      return;
    } else {
      if (
        !message.guild.me
          .permissionsIn(oldMessage.channel)
          .has(Discord.Permissions.FLAGS.SEND_MESSAGES)
      ) {
        return;
      }else{

        
        if (
          oldMessage.content.match(regex) ||
          oldMessage.content.match("@everyone")
        ) {
          if (
            newMessage.content.match(regex) ||
            newMessage.content.match("@everyone")
          ) {
            return;
          }
          console.log(
            `${oldMessage.author.username} updated ghost pinged message in ${oldMessage.channel} in ${oldMessage.guild}`
          );

          const embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(
              oldMessage.author.username,
              oldMessage.author.displayAvatarURL
            )
            .setDescription(
              `Well well well, <@${oldMessage.author.id}> decided to edit their ghost pinged message...`
            )
            .addField("Their OldMessage was", `${oldMessage.content}`)
            .addField("Their NewMessage ", `${newMessage.content}`);

          oldMessage.channel.send({
            embeds: [embed],
          });
        }
      }
      }
    
  },
};
