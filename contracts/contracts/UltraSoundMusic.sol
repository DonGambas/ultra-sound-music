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
    mapping(uint256 => uint256) private bandAttestations;

    //bandd members
    mapping(uint256 => mapping(address => bool)) private bandMembers;

    // who is the leadder of the band
    mapping(uint256 => adddress) private bandLeaders;

    // has a member of a band minted a track on behalf of the band
    mapping(uint256 => mapping(address => bool)) private mintedTracks;

    Counters.Counter private _artistTokenIds;

    constructor() ERC1155("https://token.example/type/{id}.json") {}

    // return current number of artists

    function artistCount() public view returns (uint256) {
        return _artistTokenIds.current();
    }

    function _ownsArtist(uint256 artistId) private returns (bool) {
        return balanceOf(msg.sender, artistId) > 0;
    }

    function _isBandMintable(uint256 bandId) private returns (bool) {
        return bandAttestations[bandId] == 4;
    }

    function _isBandJoinabble(uint256 bandId) private returns (bool) {
        return bandAttestation[bandId] > 0;
    }

    function _isBandMember(uint256 bandId, address member)
        private
        returns (bool)
    {
        return bandMembers[bandId][member];
    }

    function _hasMintedTrack(uint256 bandId, address member)
        private
        returns (bool)
    {
        return mintedTracks[bandId][memberd];
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
        require(_ownsArtist(artistId), "you do not own the specified artist");
        uint256 bandId = BAND_PREFIX + idPartial;
        require(!_isBandJoinable(bandId), "this band is already active");
        bandLeader[bandId] = msg.sender;
        bandAttestations[bandId].push(message.sender);
    }

    /*
     * @dev function for msg.sender to join band, can't currently be in specified band,
      band must be inactive. if this is 4th vote active band for minting
     */

    function joinBand(uint256 artistId, uint256 bandId)
        public
        returns (uint256)
    {
        require(_ownsArtist(artistId), "you do not own the specified artist");
        require(!_isBandMintable(bandId), "this band is already active");

        const numAttest = bandAttestations[bandId].length();
        bandAttestations[bandId].push(msg.sender);
        if (numAttest + 1 == 4) {
            address bandLeader = bandLeadders[bandId];
            _mint(bandLeader, bandId, 1, "");
        }
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
        require(_ownsArtist(artistId), "you do not own the specified artist");
        require(_isBandMember(bandid, artistId), "you're not in the band");
        require(
            _hasMintedTrack(bandId, artistId),
            "artist already minted track"
        );

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
