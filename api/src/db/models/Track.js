const mongoose = require("mongoose")

const schema = mongoose.Schema({
  tokenId: Number,
	creator: String,
	owner: String,
  tokenType: String,
  band: Number,
  metadataUri: String,
  metadata: mongoose.Schema.Types.Mixed
})

module.exports = mongoose.model("Track", schema)