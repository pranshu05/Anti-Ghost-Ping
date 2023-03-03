const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')
const Discord = require('discord.js')
const Redirect = require('../models/Redirects')
module.exports = {
  data: new SlashCommandBuilder()
  .setName('redirect')
  .setDescription("redirects bot's messages to a particular channel")
  .addChannelOption(option => option.setName('redirect_channel').setDescription('The channel to set as the redirect channel').setRequired(true)),
  async execute(interaction) {
    const insf_perms = new Discord.MessageEmbed()
    .setColor('FF0000')
    .setTitle(`**:x: Insufficient Permission!**`)
    .setDescription(`You don't have permission to use this command.`)
    const invalid_channel = new Discord.MessageEmbed()
    .setColor('FF0000')
    .setTitle(`**:x: Invalid Channel**`)
    .setDescription(`This command is only applicable for text channels`)
    const redirect_embed = new Discord.MessageEmbed()
    .setColor('FF0000')
    .setTitle(`**Redirect activated succesfully!**`)
    .setDescription(`Now the bot will send messages in redirected channel !`)
    .setTimestamp()
    .setThumbnail(interaction.client.user.displayAvatarURL())
    const db_fail = new Discord.MessageEmbed()
    .setColor('FF0000')
    .setTitle(`**:x: DataBase Error!**`)
    .setDescription(`An error occurred in the database!`)
    .setImage('https://media.discordapp.net/attachments/1079259438566883349/1080014089163649094/image.png')
    if(!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_MASSAGES])){
      interaction.reply({ embeds: [insf_perms] })
      return
    }
    if(interaction.options.getChannel('redirect_channel').type !== 'GUILD_TEXT'){
      interaction.reply({embeds: [invalid_channel]})
      return
    }
    Redirect.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
      if(err){
        console.log(err)
        interaction.reply({ embeds: [db_fail] })
        return
      }
      if(!settings){
        settings = new Redirect({
          guild_id: interaction.guild.id,
          channel_id: interaction.options.getChannel('redirect_channel').id
        })
      }else{
        settings.channel_id = interaction.options.getChannel('redirect_channel').id
      }
      settings.save((err) => {
        if(err){
          console.log(err)
          interaction.reply({ embeds: [db_fail] })
          return
        }
      })
    })
    interaction.reply({ embeds: [redirect_embed] })
  },
}
