const Discord = require('discord.js')
const Activate = require('../models/Activates')
const Redirect = require('../models/Redirects')
module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage) {
        if(oldMessage.author.bot) return
        if(!oldMessage.content) return
        const regex = /<@!?(1|\d{17,19})>/
        const activated = await Activate.findOne({guild_id: oldMessage.guild.id})
        const redirected = await Redirect.findOne({guild_id: oldMessage.guild.id})
        if(!activated){
          return
        }else{
          if(!redirected){
            if(!oldMessage.guild.me.permissionsIn(oldMessage.channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
              return
            }else{
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
                let map = oldMessage.mentions.members.sort((a, b) => b.position - a.position).map(r => r).join(" ")
                if(map.length > 1020){
                  map = 'Oof there are so many mentions to be displayed!'
                }
                console.log(`${oldMessage.author.username} updated ghost pinged message in ${oldMessage.channel} in ${oldMessage.guild}`)
                const embed = new Discord.MessageEmbed()
                .setColor('FF0000')
                .setAuthor({name: `${oldMessage.author.username}`, iconURL: `${oldMessage.author.displayAvatarURL()}`})
                .setDescription(`Well well well, <@${oldMessage.author.id}> decided to edit their ghost pinged message...`)
                .addFields(
                  {name: 'Their OldMessage was :', value: `${oldMessage.content}`},
                  {name: 'Their NewMessage : ', value: `${newMessage.content}`},
                  {name: 'Mention :' , value: `${map}`}
                )
                .setThumbnail(oldMessage.author.displayAvatarURL())
                .setTimestamp()
                oldMessage.channel.send({embeds: [embed]})
              }
            }
          }else{
            const channel = oldMessage.guild.channels.cache.get(redirected.channel_id)
            if(!channel){
              if(!oldMessage.guild.me.permissionsIn(oldMessage.channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
                return
              }else{
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
                  let map = oldMessage.mentions.members.sort((a, b) => b.position - a.position).map(r => r).join(" ")
                  if(map.length > 1020){
                    map = 'Oof there are so many mentions to be displayed!'
                  }
                  console.log(`${oldMessage.author.username} updated ghost pinged message in ${oldMessage.channel} in ${oldMessage.guild}`)
                  const embed = new Discord.MessageEmbed()
                  .setColor('FF0000')
                  .setAuthor({name: `${oldMessage.author.username}`, iconURL: `${oldMessage.author.displayAvatarURL()}`})
                  .setDescription(`Well well well, <@${oldMessage.author.id}> decided to edit their ghost pinged message...`)
                  .addFields(
                    {name: 'Their OldMessage was :', value: `${oldMessage.content}`},
                    {name: 'Their NewMessage : ', value: `${newMessage.content}`},
                    {name: 'Mention :' , value: `${map}`}
                  )
                  .setThumbnail(oldMessage.author.displayAvatarURL())
                  .setTimestamp()
                  oldMessage.channel.send({embeds: [embed]})
                }
              }
            }else{
              if(!oldMessage.guild.me.permissionsIn(channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
                return
              }else{
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
                  let map = oldMessage.mentions.members.sort((a, b) => b.position - a.position).map(r => r).join(" ")
                  if(map.length > 1020){
                    map = 'Oof there are so many mentions to be displayed!'
                  }
                  console.log(`${oldMessage.author.username} updated ghost pinged message in ${oldMessage.channel} in ${oldMessage.guild}`)
                  const embed = new Discord.MessageEmbed()
                  .setColor('FF0000')
                  .setAuthor({name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}`})
                  .setDescription(`Well well well, <@${oldMessage.author.id}> decided to edit their ghost pinged message...`)
                  .addFields(
                    {name: 'Their OldMessage was :', value: `${oldMessage.content}`},
                    {name: 'Their NewMessage : ', value: `${newMessage.content}`},
                    {name: 'Mention :' , value: `${map}`},
                    {name: 'channel :' , value: `${oldMessage.channel}`}
                  )
                  .setThumbnail(oldMessage.author.displayAvatarURL())
                  .setTimestamp()
                  channel.send({embeds: [embed]})
                }
              }
            }
          }
        }
    }
}