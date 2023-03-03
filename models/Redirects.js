const mongoose = require('mongoose')
const RedirectSchema = new mongoose.Schema({
  guild_id: String,
  channel_id: String,
})
module.exports = mongoose.model('Redirect', RedirectSchema)
