const { SlashCommandBuilder } = require('@discordjs/builders')
const { Permissions } = require('discord.js')
const Discord = require('discord.js')
const Activate = require('../models/Activates')
module.exports = {
  data: new SlashCommandBuilder()
  .setName('activate')
  .setDescription('Activate the ghost ping feature of the bot'),
  async execute(interaction) {
    const insf_perms = new Discord.MessageEmbed()
    .setColor('FF0000')
    .setTitle(`**:x: Insufficient Permission!**`)
    .setDescription(`You don't have permission to use this command.`)
    const activated_embed = new Discord.MessageEmbed()
    .setColor('FF0000')
    .setTitle(`**Ghost Ping detection activated succesfully!**`)
    .setDescription(`Now the bot will detect ghost pings in each and every channel of this server!`)
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
    const activated = await Activate.findOne({guild_id: interaction.guild.id})
    if(activated) return interaction.reply('Ghost ping detection is already activated!')
    Activate.findOne({ guild_id: interaction.guild.id }, (err, settings) => {
      if(err){
        console.log(err)
        interaction.reply({ embeds: [db_fail] })
        return
      }
      if(!settings){
        settings = new Activate({
          guild_id: interaction.guild.id,
          activated: 'true',
        })
      }
      settings.save((err) => {
        if(err){
          console.log(err)
          interaction.reply({ embeds: [db_fail] })
          return
        }
      })
    })
    interaction.reply({ embeds: [activated_embed] })
  }
}
