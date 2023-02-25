const mongoose = require("mongoose");

const ActivateSchema = new mongoose.Schema({
  guild_id: String,
  activated: String,
});

module.exports = mongoose.model("Activate", ActivateSchema);
