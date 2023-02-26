const Discord = require('discord.js')
const Activate = require('../models/Guilds')
module.exports = {
    name: 'messageDelete',
    async execute(message){
        if(message.author.bot) return
        if(!message.content) return
        const regex = /<@!?(1|\d{17,19})>/
        const activated = await Activate.findOne({guild_id: message.guild.id})
        if(!activated){
          return
        }else{
          if(!message.guild.me.permissionsIn(message.channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
            return
          }else{
            if(message.content.match(regex)){
              console.log(`${message.author.username} ghost pinged in ${message.channel} in ${message.guild}`)
              const embed = new Discord.MessageEmbed()
              .setColor('FF0000')
              .setAuthor(message.author.username, message.author.displayAvatarURL())
              .setDescription(`Well well well, <@${message.author.id}> decided to ghost-ping a user..`)
              .addFields(
                {name: 'Their Message', value: `${message.content}`}
              )
              .setThumbnail(message.author.displayAvatarURL())
              message.channel.send({embeds: [embed]})	
            }else if(message.content.match('@everyone')){
              console.log(`${message.author.username} ghost pinged everyone in ${message.channel} in ${message.guild}`)
              const embed = new Discord.MessageEmbed()
              .setColor('FF0000')
              .setAuthor(message.author.username, message.author.displayAvatarURL())
              .setDescription(`Well well well, <@${message.author.id}> decided to ghost-ping everyone..`)
              .addFields(
                {name: 'Their Message', value: `${message.content}`}
              )
              .setThumbnail(message.author.displayAvatarURL())
              message.channel.send({embeds: [embed]})	
            }
          }
        }
    }
} 