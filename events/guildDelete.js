module.exports = {
  name: "guildDelete",
  async execute(guild) {
    if (!guild.available) return
    console.log(`Server left: ${guild.name}`)
  },
}
