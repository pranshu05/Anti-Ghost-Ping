const Discord = require('discord.js')
const Activate = require('../models/Activates')
const Redirect = require('../models/Redirects')
module.exports = {
    name: 'messageUpdate',
    async execute(oldMessage, newMessage) {
        if(oldMessage.author.bot) return
        if(!oldMessage.content) return
        if(!oldMessage.guild) return
        const regex = /<@!?(1|\d{17,19})>/
        const activated = await Activate.findOne({guild_id: oldMessage.guild.id})
        const redirected = await Redirect.findOne({guild_id: oldMessage.guild.id})
        let old_map = oldMessage.mentions.members.sort((a, b) => b.position - a.position).map(r => r).join(' ')
        let new_map = newMessage.mentions.members.sort((a, b) => b.position - a.position).map(r => r).join(' ')
        if(!activated){
          return
        }else{
          if(!redirected){
            if(!oldMessage.guild.members.me.permissionsIn(oldMessage.channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
              return
            }else{
              if(oldMessage.content.match(regex) || oldMessage.content.match('@everyone')){
                if(old_map === new_map || newMessage.content.match('@everyone')){
                  return
                }
                if(old_map.length > 1024){
                  old_map = 'Oof there are so many mentions to be displayed!'
                }
                if(new_map.length > 1024){
                  new_map = 'Oof there are so many mentions to be displayed!'
                }else if(new_map.length === 0){
                  new_map = '```None!```'
                }
                const embed = new Discord.MessageEmbed()
                .setColor('FF0000')
                .setAuthor({name: `${oldMessage.author.username}`, iconURL: `${oldMessage.author.displayAvatarURL()}`})
                .setDescription('**Ghost Ping Detected! :skull:**')
                .addFields(
                  {name: 'Author :' , value: `${newMessage.author}`},
                  {name: 'Old Mentions :' , value: `${old_map}`},
                  {name: 'New Mentions :' , value: `${new_map}`},
                  {name: 'Go To Message' , value: `[Click Here](${newMessage.url})`}
                )
                .setThumbnail(oldMessage.author.displayAvatarURL())
                .setTimestamp()
                console.log(`Ghost ping detected in Channel : ${oldMessage.channel.name} [${oldMessage.channel.id}] in Server: ${oldMessage.guild.name} [${oldMessage.guild.id}]`)
                oldMessage.channel.send({embeds: [embed]})
              }
            }
          }else{
            const channel = oldMessage.guild.channels.cache.get(redirected.channel_id)
            if(!channel){
              if(!oldMessage.guild.members.me.permissionsIn(oldMessage.channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
                return
              }else{
                if(oldMessage.content.match(regex) || oldMessage.content.match('@everyone')){
                  if(old_map === new_map || newMessage.content.match('@everyone')){
                    return
                  }
                  if(old_map.length > 1024){
                    old_map = 'Oof there are so many mentions to be displayed!'
                  }
                  if(new_map.length > 1024){
                    new_map = 'Oof there are so many mentions to be displayed!'
                  }else if(new_map.length === 0){
                    new_map = '```None!```'
                  }
                  const embed = new Discord.MessageEmbed()
                  .setColor('FF0000')
                  .setAuthor({name: `${oldMessage.author.username}`, iconURL: `${oldMessage.author.displayAvatarURL()}`})
                  .setDescription('**Ghost Ping Detected! :skull:**')
                  .addFields(
                    {name: 'Author :' , value: `${newMessage.author}`},
                    {name: 'Old Mentions :' , value: `${old_map}`},
                    {name: 'New Mentions :' , value: `${new_map}`},
                    {name: 'Go To Message' , value: `[Click Here](${newMessage.url})`}
                  )
                  .setThumbnail(oldMessage.author.displayAvatarURL())
                  .setTimestamp()
                  console.log(`Ghost ping detected in Channel : ${oldMessage.channel.name} [${oldMessage.channel.id}] in Server: ${oldMessage.guild.name} [${oldMessage.guild.id}]`)
                  oldMessage.channel.send({embeds: [embed]})
                }
              }
            }else{
              if(!oldMessage.guild.members.me.permissionsIn(channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
                return
              }else{
                if(oldMessage.content.match(regex) || oldMessage.content.match('@everyone')){
                  if(old_map === new_map || newMessage.content.match('@everyone')){
                    return
                  }
                  if(old_map.length > 1024){
                    old_map = 'Oof there are so many mentions to be displayed!'
                  }
                  if(new_map.length > 1024){
                    new_map = 'Oof there are so many mentions to be displayed!'
                  }else if(new_map.length === 0){
                    new_map = '```None!```'
                  }
                  const channel_embed = new Discord.MessageEmbed()
                  .setColor('FF0000')
                  .setAuthor({name: `${oldMessage.author.username}`, iconURL: `${oldMessage.author.displayAvatarURL()}`})
                  .setDescription('**Ghost Ping Detected! :skull:**')
                  .addFields(
                    {name: 'Author :' , value: `${newMessage.author}`},
                    {name: 'Old Mentions :' , value: `${old_map}`},
                    {name: 'New Mentions :' , value: `${new_map}`},
                    {name: 'Go To Message' , value: `[Click Here](${newMessage.url})`},
                    {name: 'channel :' , value: `${oldMessage.channel}`}
                  )
                  .setThumbnail(oldMessage.author.displayAvatarURL())
                  .setTimestamp()
                  console.log(`Ghost ping detected in Channel : ${oldMessage.channel.name} [${oldMessage.channel.id}] in Server: ${oldMessage.guild.name} [${oldMessage.guild.id}]`)
                  channel.send({embeds: [channel_embed]})
                }
              }
            }
          }
        }
    }
}