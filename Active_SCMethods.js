// set "type": "module" in package.json
import { ethers } from "ethers";
import { config as loadEnv } from 'dotenv';
import { promises } from "fs";
const fsPromises = promises;
loadEnv();

const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;
const BASIC_CONTRACT_ADDRESS = "0x34bf23FFB6Fe39fc3Bf4a21f08690a8652653b50";
const UPDATED_CONTRACT_ADDRESS = "0xE8D11cFaD8B908f507390b0882D7d011a6642443";
const my_address = "0x6f9e2777D267FAe69b0C5A24a402D14DA1fBcaA1";
const BASIC_ABI_FILE_PATH = './ABI/ERC1155Basic.json';
const UPDATED_ABI_FILE_PATH = './build/contracts/POM.json'

const provider = ethers.getDefaultProvider(`https://rpc.chiado.gnosis.gateway.fm`);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

async function getAbi(){
    const data = await fsPromises.readFile(UPDATED_ABI_FILE_PATH, 'utf8');
    const abi = JSON.parse(data)['abi'];
    //console.log(abi);
    return abi;
}
const abi = await getAbi();

const my_contract = new ethers.Contract(UPDATED_CONTRACT_ADDRESS, abi, signer);

export async function mintToken(userAddress, _id) {
    let id = 0;
    const mint_tx = await my_contract.mint(userAddress, 0, 1, '0x0102');  // second argumnent is id
    return mint_tx;
}

export async function setURI(userAddress) {
    const newURI = await my_contract.setURI('ipfs://Qmdtyqjx5ha9dBda6ZE5dc2N4vB8oAZYrLhGQj5jAah2RF/');
    //console.log(uri);
    return newURI.hash;
}