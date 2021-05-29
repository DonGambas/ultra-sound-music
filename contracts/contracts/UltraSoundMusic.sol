pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract UltraSoundMusic is ERC1155 {
    using Counters for Counters.Counter;

    // prefix for artist NFTs
    uint256 private constant ARTIST_PREFIX = 111 << 128;

    //prefix for band NFTs
    uint256 public constant BAND_PREFIX = 111 << 128;

    // prefix for track NFTs
    uint256 public constant TRACK_PREFIX = 222 << 128;

    // max num artists
    uint256 public constant ARTIST_CAP = 80;

    uint256[] internal allArtistTokens;
    uint256[] internal allBandTokens;
    uint256[] internal allTrackTokens;

    mapping(uint256 => string) public MetadataUris;

    //if band has sufficient members can be minted
    mapping(uint256 => bool) private bandMintable;

    Counters.Counter private _artistTokenIds;

    constructor() ERC1155("https://token.example/type/{id}.json") {}

    // return current number of artists

    function artistCount() public view returns (uint256) {
        return _artistTokenIds.current();
    }

    /*
     * @dev can only mint 80 artist tokens
     */

    function createArtist(string memory _uri) public returns (uint256) {
        require(
            _artistTokenIds.current() < ARTIST_CAP,
            "Max artist supply reached"
        );
        _artistTokenIds.increment();
        uint256 newTokenId = _artistTokenIds.current();
        _mint(msg.sender, newTokenId, 1, "");
        MetadataUris[newTokenId] = _uri;
        allArtistTokens.push(newTokenId);
        return newTokenId;
    }

    /*
     * @dev function to start a band, must provide artistId that you own, and partialId
     */

    function startBand(uint256 artistId, uint256 idPartial)
        public
        returns (uint256)
    {
        uint256 newTokenId = BAND_PREFIX + idPartial;
        // is owner of artist ID
        // check that band is not active
        // add band Id to is active false
        // create tracking for band votes
    }

    /*
     * @dev function for msg.sender to join band, can't currently be in specified band,
      band must be inactive. if this is 4th vote active band for minting
     */

    function joinBand(uint256 artistId, uint256 bandId)
        public
        returns (uint256)
    {
        // check msg.sender not currently in band
        // add msg.sender to band votes
        // if band votes === 4 set active
        //return current # of attestations
    }

    // TODO: should ban be automatically minted on 4th vote or should be there be another function t ocall it

    /*
     * @dev function to mint band NFT, requiries band to be active and for artist to be owned by msg
     * sender and for artist to be band leader
     */

    function createBand(
        string memory _uri,
        uint256 bandId,
        uint256 artistId
    ) public returns (uint256) {
        //msg.sender = owner of artistID
        //artistID = proposer of band
        //band is mintable

        _mint(msg.sender, bandId, 1, "");
        MetadataUris[bandId] = _uri;
        allBandTokens.push(bandId);
        return bandId;
    }

    /*
     *checks if msg.sender owns artist iid that is sent, checks that artist hasn't minted track for band
     * checks that artist in band
     *
     */

    function createTrack(
        uint256 artistId,
        uint256 bandId,
        string memory _uri,
        uint256 idPartial
    ) public returns (uint256) {
        // check msg.sender owner of artist and that artist in band
        //check tracks minted by band for artist, only 1 track per artist

        uint256 newTokenId = TRACK_PREFIX + idPartial;
        _mint(msg.sender, newTokenId, 1, "");
        MetadataUris[newTokenId] = _uri;
        allTrackTokens.push(newTokenId);
        return newTokenId;
    }

    function uri(uint256 _id)
        public
        view
        virtual
        override
        returns (string memory)
    {
        return MetadataUris[_id];
    }
}
