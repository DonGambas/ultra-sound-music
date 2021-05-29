const { ethers } = require('ethers');
const express = require('express');
const util = require('util');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Artist = require("./db/models/Artist") // new


const Network = require( './contracts/network.json');
const UltraSoundMusicABI = require( './contracts/UltraSoundMusicABI.json');
//import { SimpleStorageInstance } from './contracts/types/truffle-contracts/index';
//import sql from './db';

const nullAddress = "0x0000000000000000000000000000000000000000";


// start express app
const app = express();
const port = 3001;


const providerUrl = 'http://localhost:8545';
const customHttpProvider = new ethers.providers.JsonRpcProvider(providerUrl);

let contract = new ethers.Contract(
  // TODO: improve next line
  Network.development.UltraSoundMusic,
  UltraSoundMusicABI,
  customHttpProvider,
)

// connect to DB 

var mongoDB = 'mongodb://localhost:27017';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('open', console.log.bind(console, "connected to db"))
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//sql.query = util.promisify(sql.query);
// support /post
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const handleArtistToken = async(from,to,id) =>{

  console.log("handle artist being called")
  if(from === nullAddress){
    console.log("handling new artist token")
    const metadataUri = await contract.uri(id)
    const artist = new Artist({
      tokenId: id,
      creator: to,
      owner: to,
      metadataUri
    })

    await artist.save()

    const artistNew = await Artist.findOne({ id })

    console.log(artistNew)


  }



}


app.get('/cache/artists', async (req, res) => {
  const artists = await Artist.find()
	res.send(artists)
});

app.listen(port, async () => {
    // Connect to the network

    const providerUrl = 'http://localhost:8545';
    const customHttpProvider = new ethers.providers.JsonRpcProvider(providerUrl);

    let contract = new ethers.Contract(
  // TODO: improve next line
      Network.development.UltraSoundMusic,
      UltraSoundMusicABI,
      customHttpProvider,
    )

    const network = await customHttpProvider.getNetwork();

    console.log("network", network)
  
    contract.on("TransferSingle", async (operator, from, to, id, value, event) => {

      console.log(`new token ${id}`)

      if(id <= 80){
        //handle artist token write id, to as owner and metadataURI
        await handleArtistToken(from,to,id)
        console.log(`artist token id = ${id} transfered`)
      } else if (id > 100 && id < 100000) {
        //handle band token write iid, to as owner and metaddataURI
        console.log(`band token id = ${id} transfered`)
      } else if (id > 100000) {
        //handle track token write id, to as owner and metadataURI
        console.log(`track token id = ${id} transfered`)
      }
    });

    console.log(`Example app listening on port ${port}!`);
});


