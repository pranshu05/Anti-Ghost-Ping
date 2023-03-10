const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Pong!'),
    async execute(interaction) {
      const embed = new Discord.MessageEmbed()
      .setColor('FFFF00')
      .setTimestamp()
      .setTitle(`Pong !`)
      .addFields(
        {name: 'API Latancy:', value: `\`\`\`${(interaction.client.ws.ping).toFixed(0)} ms\`\`\``, inline: true},
        {name: 'Latancy:', value: `\`\`\`${Date.now() - interaction.createdTimestamp} ms\`\`\``, inline: true}
      )
      .setFooter({text: `counted for ${interaction.user.username}`})
      interaction.reply({ embeds: [embed] })
    }
}