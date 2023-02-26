const Discord = require('discord.js')
const Activate = require('../models/Guilds')
module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage) {
        if(oldMessage.author.bot) return
        if(!oldMessage.content) return
        const regex = /<@!?(1|\d{17,19})>/
        const activated = await Activate.findOne({guild_id: oldMessage.guild.id})
        if(!activated){
          return
        }else{
          if(!oldMessage.guild.me.permissionsIn(oldMessage.channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
            return
          }else{
            const oldMessage = await oldMessage.fetch()
            if(oldMessage.content.match(regex) || oldMessage.content.match('@everyone')){
              if(newMessage.content.match(regex) || newMessage.content.match('@everyone')){
                return
              }
              if(newMessage.content.length === 0){
                newMessage.content = 'undefined'
              }else if(newMessage.content.length > 1020){
                newMessage.content = 'Message is too long to be displayed!'
              }
              if(oldMessage.content.length === 0){
                oldMessage.content = 'undefined'
              }else if(oldMessage.content.length > 1020){
                oldMessage.content = 'Message is too long to be displayed!'
              }
              console.log(`${oldMessage.author.username} updated ghost pinged message in ${oldMessage.channel} in ${oldMessage.guild}`)
              const embed = new Discord.MessageEmbed()
              .setColor('FF0000')
              .setAuthor(oldMessage.author.username, oldMessage.author.displayAvatarURL())
              .setDescription(`Well well well, <@${oldMessage.author.id}> decided to edit their ghost pinged message...`)
              .addFields(
                {name: 'Their OldMessage was :', value: `${oldMessage.content}`},
                {name: 'Their NewMessage : ', value: `${newMessage.content}`}
              )
              .setThumbnail(oldMessage.author.displayAvatarURL())
              oldMessage.channel.send({embeds: [embed]})
            }
          }
        }
    }
}