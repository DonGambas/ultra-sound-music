
export function hasAlreadyMintedAnArtist(entities, currentAccountId) {
  return entities.some((entity) => {
    return entity.tokenType === 'artist' && entity.metadata && entity.metadata.artistDNA === currentAccountId;
  });
}

export function hasAlreadyMintedABand(entities, currentAccountId) {
  return entities.some((entity) => {
    return entity.tokenType === 'band' && entity.owner === currentAccountId;
  });
}

export function hasAlreadyPublishedTrack(entity, currentAccountId) {
  // @todo 
  return entity.tokenType === 'band' && entity.metadata.artistDNA === currentAccountId;
}

export function getOwnedArtists(entities, currentAccountId) {
  return entities.filter((entity) => {
    return entity.tokenType === 'artist' && entity.owner === currentAccountId;
  })
}

export function entityIsOwned(entity, currentAccountId) {
  return entity.owner === currentAccountId;
}

export function isMember(entity, currentAccountId) {
  // @todo not sure if owner is the right prop here
  return entity.entityType = 'band' && entity.members.some((artist) => artist.owner === currentAccountId);
}