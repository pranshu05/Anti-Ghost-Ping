const Discord = require('discord.js')
const Activate = require('../models/Guilds')
const Redirect = require('../models/Redirects')
module.exports = {
    name: 'messageDelete',
    async execute(message){
        if(message.author.bot) return
        if(!message.content) return
        const regex = /<@!?(1|\d{17,19})>/
        const activated = await Activate.findOne({guild_id: message.guild.id})
        const redirected = await Redirect.findOne({guild_id: message.guild.id})
        if(!activated){
          return
        }else{
          if(!redirected){
            if(!message.guild.me.permissionsIn(message.channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
              return
            }else{
              if(message.content.match(regex)){
                if(message.content.length === 0){
                  message.content = 'undefined'
                }else if(message.content.length > 1020){
                  message.content = 'Message is too long to be displayed!'
                }
                const embed = new Discord.MessageEmbed()
                .setColor('FF0000')
                .setAuthor({name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}`})
                .setDescription(`Well well well, <@${message.author.id}> decided to ghost-ping a user..`)
                .addFields({name: 'Their Message', value: `${message.content}`})
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp()
                message.channel.send({embeds: [embed]})	
              }else if(message.content.match('@everyone')){
                const embed = new Discord.MessageEmbed()
                .setColor('FF0000')
                .setAuthor({name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}`})
                .setDescription(`Well well well, <@${message.author.id}> decided to ghost-ping everyone..`)
                .addFields({name: 'Their Message', value: `${message.content}`})
                .setThumbnail(message.author.displayAvatarURL())
                .setTimestamp()
                message.channel.send({embeds: [embed]})	
              }
            }
          }else{
            const channel = message.guild.channels.cache.get(redirected.channel_id)
            if(!channel){
              if(!message.guild.me.permissionsIn(message.channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
                return
              }else{
                if(message.content.match(regex)){
                  if(message.content.length === 0){
                    message.content = 'undefined'
                  }else if(message.content.length > 1020){
                    message.content = 'Message is too long to be displayed!'
                  }
                  const embed = new Discord.MessageEmbed()
                  .setColor('FF0000')
                  .setAuthor({name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}`})
                  .setDescription(`Well well well, <@${message.author.id}> decided to ghost-ping a user..`)
                  .addFields({name: 'Their Message', value: `${message.content}`})
                  .setThumbnail(message.author.displayAvatarURL())
                  .setTimestamp()
                  message.channel.send({embeds: [embed]})	
                }else if(message.content.match('@everyone')){
                  const embed = new Discord.MessageEmbed()
                  .setColor('FF0000')
                  .setAuthor({name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}`})
                  .setDescription(`Well well well, <@${message.author.id}> decided to ghost-ping everyone..`)
                  .addFields({name: 'Their Message', value: `${message.content}`})
                  .setThumbnail(message.author.displayAvatarURL())
                  .setTimestamp()
                  message.channel.send({embeds: [embed]})	
                }
              }
            }else{
              if(!message.guild.me.permissionsIn(channel).has(Discord.Permissions.FLAGS.SEND_MESSAGES)){
                return
              }else{
                if(message.content.match(regex)){
                  if(message.content.length === 0){
                    message.content = 'undefined'
                  }else if(message.content.length > 1020){
                    message.content = 'Message is too long to be displayed!'
                  }
                  const embed = new Discord.MessageEmbed()
                  .setColor('FF0000')
                  .setAuthor({name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}`})
                  .setDescription(`Well well well, <@${message.author.id}> decided to ghost-ping a user..`)
                  .addFields({name: 'Their Message', value: `${message.content}`})
                  .setThumbnail(message.author.displayAvatarURL())
                  .setTimestamp()
                  channel.send({embeds: [embed]})	
                }else if(message.content.match('@everyone')){
                  const embed = new Discord.MessageEmbed()
                  .setColor('FF0000')
                  .setAuthor({name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}`})
                  .setDescription(`Well well well, <@${message.author.id}> decided to ghost-ping everyone..`)
                  .addFields({name: 'Their Message', value: `${message.content}`})
                  .setThumbnail(message.author.displayAvatarURL())
                  .setTimestamp()
                  channel.send({embeds: [embed]})	
                }
              }
            }
          }
        }
    }
} 