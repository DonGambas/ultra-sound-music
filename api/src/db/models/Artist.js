const mongoose = require("mongoose")

const schema = mongoose.Schema({
  tokenid: Number,
	creator: String,
	owner: String,
  metadataUri: String
})

module.exports = mongoose.model("Artist", schema)