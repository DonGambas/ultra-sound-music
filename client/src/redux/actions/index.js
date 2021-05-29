import * as ActionTypes from '../actionTypes';

import * as metaMask from '../../utils/metaMask';

export function showModal(id) {
  return {
    type: ActionTypes.SHOW_MODAL,
    data: {
      id,
    },
  };
}

export function connectToWallet() {
  metaMask.connectToMetaMask();
  metaMask.getAccountId();
  return {

  };
}

export function setEntities(entities) {
  return {
    type: ActionTypes.SET_ENTITIES,
    data: {
      entities
    }
  }
}

export function installMetaMask() {
  return {

  };
}
