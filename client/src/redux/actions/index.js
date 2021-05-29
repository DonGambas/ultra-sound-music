import {
  SHOW_MODAL,
} from '../actionTypes';

import * as metaMask from '../../utils/metaMask';

export function showModal(id) {
  return {
    type: SHOW_MODAL,
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

export function installMetaMask() {
  return {

  };
}
