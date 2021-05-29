import {
  SHOW_MODAL,
} from '../actionTypes';

export function showModal(id) {
  return {
    type: SHOW_MODAL,
    data: {
      id,
    },
  };
}
