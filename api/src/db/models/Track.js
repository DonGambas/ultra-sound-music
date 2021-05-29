const mongoose = require("mongoose")

const schema = mongoose.Schema({
  tokenId: Number,
	creator: String,
	owner: String,
  tokenType: String,
  band: Number,
  metadataUri: String,
})

module.exports = mongoose.model("Track", schema)