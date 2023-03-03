const Discord = require('discord.js')
const Activate = require('../models/Activates')
const { MessageActionRow, MessageButton } = require('discord.js')
module.exports = {
	name: 'guildCreate',
	async execute(guild) {
		const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
		const ser = new MessageActionRow()
					.addComponents(
						new MessageButton()
    					.setLabel('Support Server')
    					.setURL('https://discord.gg/CVyx9qyYPF')
    					.setStyle('LINK'),
					)
		const embed = new Discord.MessageEmbed()
    	.setColor('FFFF00')
    	.setTitle('Hello I am Anti Ghost Ping bot,thanks for choosing me!')
    	.setDescription('Setup Instructions')
    	.addFields(
      		{name: 'Activate Ghost Ping detection', value: '```/activate```', inline: true},
      		{name: 'Deactivate Ghost Ping detection', value: '```/deactivate```', inline: true},
    	)
    	.setTimestamp()
		.setFooter({text: `Ghost ping detection is activated by default!`})
		Activate.findOne({ guild_id: guild.id }, (err, settings) => {
			if(err){
			  console.log(err)
			  return
			}
			if(!settings){
			  settings = new Activate({
				guild_id: guild.id,
				activated: 'true',
			  })
			}
			settings.save((err) => {
			  if(err){
				console.log(err)
				return
			  }
			})
		  })
		console.log(`Server joined: ${guild.name}`)
		if(channel){
			channel.send({ embeds: [embed], components: [ser] }).catch((err) => console.log(err))
		}else{
			return
		}
	}
}