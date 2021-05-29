const mongoose = require("mongoose")

const schema = mongoose.Schema({
  tokenId: Number,
	creator: String,
	owner: String,
  metadataUri: String,
  members: Array,
  active: Boolean,
  tokenType: String
})

module.exports = mongoose.model("Band", schema)