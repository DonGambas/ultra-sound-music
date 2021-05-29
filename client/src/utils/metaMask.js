import { ethers } from 'ethers';

const ethereum = window.ethereum && window.ethereum.isMetaMask ? window.ethereum : null;

export function isInstalled() {
  return !!(ethereum && ethereum.isMetaMask);
}

export function isConnected() {
  return isInstalled() && ethereum.isConnected();
}

export async function request() {
  return isInstalled() && ethereum.request();
}

export async function getChainId() {
  return await ethereum.request({ method: 'eth_chainId' });
}

export async function requestAccessToWallet() {
  return new ethers.providers.Web3Provider(ethereum); // Request access to user's accounts
}

export async function getAccountId() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  return accounts[0] || 'Not able to get accounts';
}

export async function connectToMetaMask({ setUser }) {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const activeAccount = accounts[0] || 'Not able to get accounts';
  setUser({ wallet: activeAccount });
}
