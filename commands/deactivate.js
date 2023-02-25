const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions } = require("discord.js")
const Discord = require("discord.js")
const Activate = require("../models/Guilds")

module.exports = {
  data: new SlashCommandBuilder()
  .setName("deactivate")
  .setDescription("Deactivate the ghost ping feature of the bot"),
  async execute(interaction) {
    const insf_perms = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`**:x: Insufficient Permission!**`)
    .setDescription(`You don't have permission to use this command.`)
    const deactivated_embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`**Ghost Ping detection deactivated succesfully!**`)
    .setDescription(`Now the bot will not detect any ghost pings in this server!`)
    .setTimestamp()
    .setThumbnail(interaction.client.user.displayAvatarURL())
    const db_fail = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle(`**:x: DataBase Error!**`)
    .setDescription(`An error occurred in the database!`)
    const activated = await Activate.findOne({guild_id: interaction.guild.id,})
    if(!interaction.member.permissions.has([Permissions.FLAGS.MANAGE_MASSAGES])){
      interaction.reply({ embeds: [insf_perms] })
      return
    }
    if(!activated){
      interaction.reply(`Ghost ping detection isnt activated yet in this server!`)
      return
    }
    Activate.deleteOne({ guild_id: interaction.guild.id }, (err, settings) => {
      if(err){
        console.log(err)
        interaction.reply({ embeds: [db_fail] })
        return
      }
      if(!settings){
        interaction.reply({ embeds: [db_fail] })
        return
      }
      interaction.reply({ embeds: [deactivated_embed] })
    })
  },
}
