const Discord = require('discord.js')
module.exports = {
    name: 'interactionCreate',
    async execute(interaction){
        const err_embed = new Discord.MessageEmbed()
        .setColor('FF0000')
        .setAuthor(
            {name: `Error Occured!`, iconURL: `${interaction.client.user.displayAvatarURL()}`}
        )
        .setTitle('An error occured while executing the command')
        .setTimestamp()
        if(!interaction.isCommand()) return interaction.reply(`interaction isn't a valid command!`)
        if(!interaction.guild) return interaction.reply(`You can use slash commands only in a server!`)
        const command = interaction.client.commands.get(interaction.commandName)
        if(!command) return
        try{
            await command.execute(interaction)
        }catch(err){
            if (err) console.error(err)
            await interaction.reply({
                embeds: [err_embed],
                ephemeral: true
            })
        }
    }
}