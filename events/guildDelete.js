const Redirect = require('../models/Redirects')
const Activate = require('../models/Activates')
module.exports = {
  name: 'guildDelete',
  async execute(guild) {
    if (!guild.available) return
    const activated = await Activate.findOne({guild_id: guild.id})
    if(!activated) return
    Activate.deleteOne({ guild_id: guild.id }, (err) => {
      if(err){
        console.log(err)
        return
      }
    })
    const red = await Redirect.findOne({guild_id: guild.id})
    if(!red) return
    Redirect.deleteOne({ guild_id: guild.id }, (err) => {
      if(err){
        console.log(err)
        return
      }
    })
    console.log(`Server left: ${guild.name}`)
  }
}
