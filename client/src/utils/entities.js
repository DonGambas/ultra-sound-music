import { ethers } from 'ethers'
import usmAbi from '../web3/usmAbi';
import * as metaMask from '../utils/metaMask';

const CONTRACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

export function hasAlreadyMintedAnArtist(entities, currentAccountId) {
  return entities.some((entity) => {
    return entity.tokenType === 'artist' && entity.metadata && areSameAccount(entity.metadata.artistDNA, currentAccountId);
  });
}

export function hasAlreadyMintedABand(entities, currentAccountId) {
  return entities.some((entity) => {
    return entity.tokenType === 'band' && areSameAccount(entity.owner, currentAccountId);
  });
}

export function hasAlreadyPublishedTrack(entity, currentAccountId) {
  // @todo 
  return entity.tokenType === 'band' && areSameAccount(entity.metadata.artistDNA, currentAccountId);
}

export function getOwnedArtists(entities, currentAccountId) {
  return entities.filter((entity) => {
    return entity.tokenType === 'artist' && areSameAccount(entity.owner, currentAccountId);
  })
}

export function entityIsOwned(entity, currentAccountId) {
  return areSameAccount(entity.owner, currentAccountId);
}

export function isMember(entity, currentAccountId) {
  // @todo not sure if owner is the right prop here
  return entity.tokenType === 'band' && entity.members.some((artist) => {
    return areSameAccount(artist.owner, currentAccountId);
  });
}

export async function joinBand(artistId, bandId) {
  const provider = metaMask.getProvider();
  const writeContract = new ethers.Contract(CONTRACT_ADDRESS, usmAbi, provider.getSigner());
  return writeContract.joinBand(artistId, bandId);
}

// Account addresses can have different casing
export function areSameAccount(...accId) {
  if (!accId[0]) {
    return false;
  }
  return accId.every(accountId => accountId.toLowerCase() === accId[0].toLowerCase());
}