
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

export function getOwnedArtists(entities, currentAccountId) {
  return entities.filter((entity) => {
    return entity.tokenType === 'artist' && entity.owner === currentAccountId;
  })
}