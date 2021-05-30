const mongoose = require("mongoose")

const schema = mongoose.Schema({
  tokenId: Number,
	creator: String,
	owner: String,
  metadataUri: String,
  tokenType: String,
  metadata: mongoose.Schema.Types.Mixed
})

module.exports = mongoose.model("Artist", schema)