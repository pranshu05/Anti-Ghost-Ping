const { SlashCommandBuilder } = require('@discordjs/builders')
const os = require('os')
const Discord = require('discord.js')
const pkg = require('../package.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Basic Information About me!'),
        async execute(interaction) {
        let ut_days = Math.floor(os.uptime() / 86400 )
        let ut_hours = Math.floor(os.uptime() / 3600 ) % 24 
        let ut_minutes = Math.floor(os.uptime() / 60) % 60
        let ut_seconds = Math.floor(os.uptime()) % 60
        let days = Math.floor(interaction.client.uptime / 86400000 )
        let hours = Math.floor(interaction.client.uptime / 3600000 ) % 24 
        let minutes = Math.floor(interaction.client.uptime / 60000) % 60
        let seconds = Math.floor(interaction.client.uptime / 1000) % 60
        let totalPeople = 0
        totalPeople = interaction.client.guilds.cache.map(person => person.memberCount).reduce(function (s, v) { return s + (v || 0) }, 0)
        const embed = new Discord.MessageEmbed()
        .setColor('FFFF00')
        .setThumbnail(interaction.client.user.displayAvatarURL())
        .setTitle(interaction.client.user.username + ' V: ' + pkg.version + ' ' )
        .setDescription(`\n **Anti ghost ping has been awake for ${days}d, ${hours}h, ${minutes}m, ${seconds}s**`)
        .addFields(
            {name: '\u200B', value: '\u200B' },
            {name: '🏠 Guilds', value: `\`\`\`yml\n${interaction.client.guilds.cache.size}\`\`\``, inline: true},
            {name: '🤵 Total Users', value: `\`\`\`yml\n${(totalPeople)}\`\`\``, inline: true},
            {name: ':clock: System Uptime', value:  `\`\`\`yml\n${ut_days}d, ${ut_hours}h, ${ut_minutes}m, ${ut_seconds}s\n\`\`\``, inline: true},
            {name: '🏓 Ping', value: `\`\`\`yml\n${(interaction.client.ws.ping).toFixed(0)} ms\`\`\``, inline: true},
            {name: ':control_knobs: Library', value: `\`\`\`yml\ndiscord.js v${Discord.version}\`\`\``, inline: true},
            {name: ':computer: Node.js Version', value: `\`\`\`yml\n${process.version}\`\`\``, inline: true},
            {name: 'Server', value: '[Click here](https://discord.gg/uJCX5yfuTf)', inline: true},
        )
        interaction.reply({ embeds: [embed] })
    }
}