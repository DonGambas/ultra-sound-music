import * as ActionTypes from '../actionTypes';
import * as metaMask from '../../utils/metaMask';

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
  };
}

export function installMetaMask() {
  return {

  };
}

export function updateAppUI() {
  return {
    type: 'UPDATE_APP_UI'
  }
}

export function showModal({
  title,
  bodyText,
  ctaText
}) {
  return {
    type: ActionTypes.SHOW_MODAL,
    data: {
      title,
      bodyText,
      ctaText
    }
  };
}

export function hideModal() {
  return {
    type: ActionTypes.HIDE_MODAL
  };
}
