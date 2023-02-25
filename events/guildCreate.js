const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "guildCreate",
  async execute(guild) {
    // Being sent to joined server
    const channel = guild.channels.cache.find(
      (channel) =>
        channel.type === "GUILD_TEXT" &&
        channel.permissionsFor(guild.me).has("SEND_MESSAGES")
    );

    const ser = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Support Server")
        .setURL("https://discord.gg/CVyx9qyYPF")
        .setStyle("LINK")
    );

    const embed = new Discord.MessageEmbed()
      .setColor("FFFF00")
      .setTitle("Hello I am Ghost Ping bot,thanks for choosing me!")
      .addFields(
        { name: "Setup instructions", value: "👇" },
        {
          name: "Activate Ghost Ping detection",
          value: "```/activate```",
        },
        {
          name: "Deactivate Ghost Ping detection",
          value: "```/deactivate```",
        }
      )
      .setTimestamp();

    channel
      .send({ embeds: [embed], components: [ser] })
      .catch((err) => console.log(err));

    console.log(`Server joined: ${guild.name}`);
  },
};
