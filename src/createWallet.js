// dependecias
const ecc = require("tiny-secp256k1")
const { BIP32Factory } = require("bip32");
const bip39 = require("bip39");
const bitcoinjs = require("bitcoinjs-lib");

const bip32 = BIP32Factory(ecc);

// selecionado a rede testnet
const network = bitcoinjs.networks.testnet;

// derivação de carteira
const path = "m/49'/1'/0'/0/0";

let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// raiz da carteira
let root = bip32.fromSeed(seed, network);

//conta
let account = root.derivePath(path);
let node = account.derive(0).derive(0);
//console.log(node);

let btcAddress = bitcoinjs.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address;

console.log("Carteira Gerada");
console.log("Endereço: ", btcAddress);
console.log("Chave Privada: ", node.toWIF());
console.log("Seed: ",mnemonic);