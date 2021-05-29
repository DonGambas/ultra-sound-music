import { ethers } from 'ethers';

const ethereum = window.ethereum && window.ethereum.isMetaMask ? window.ethereum : null;

export function isInstalled() {
  return !!(ethereum && ethereum.isMetaMask);
}

export function isConnectedToNetwork() {
  return isInstalled() && ethereum.isConnected();
}

export async function getAccountId() {
  const provider = new ethers.providers.Web3Provider(ethereum); // Request access to user's accounts
  const accounts = await provider.listAccounts();
  return accounts[0];
}

export async function isConnectedToAccount() {
  return !!(await getAccountId());
}

export async function request() {
  return isInstalled() && ethereum.request();
}

export async function getChainId() {
  return await ethereum.request({ method: 'eth_chainId' });
}

export async function connectToMetaMask() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const activeAccount = accounts[0] || 'Not able to get accounts';
  return activeAccount;
}
