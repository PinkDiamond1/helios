const {CFXNODE, sendCFX} = require('./cfx.js')
// const {Ganache, sendETH} = require('./eth.js')
const sendETH = require('./sendETH.js')
const delay = require('delay')

const cfx = new CFXNODE({killPortProcess: true})
// const eth = new Ganache()
const MNEMONIC =
  'error mom brown point sun magnet armor fish urge business until plastic'

const CFX_ACCOUNTS = [
  {
    address: '0x7b3d01a14c84181f4df3983ae68118e4bad48407',
    privateKey:
      '0xf581242f2de1111638b9da336c283f177ca1e17cb3d6e3b09434161e26135992',
    index: 0,
    cfxHex: '0x1b3d01a14c84181f4df3983ae68118e4bad48407',
    base32: 'NET2999:TYPE.USER:AARX4ARBKWCBUH4R8SPDZ3YBDDWNZZEEA6THG8YTMR',
  },
  {
    address: '0xe68539313a4a03211ee03f5f9a6c149751fb4f44',
    privateKey:
      '0x27060ca3f246dac356b785a4fb98656a7750d5a3fe5c519dd6d2e17cd8ca7906',
    index: 1,
    cfxHex: '0x168539313a4a03211ee03f5f9a6c149751fb4f44',
    base32: 'NET2999:TYPE.USER:AANJMSKVHKFAGJJ86A9Z9GXPCWNZD84TJU1871CS1P',
  },
  {
    address: '0x8bb3720c8323cfb8fefdbdb9229872ed34ef9b57',
    privateKey:
      '0xe77d4353a349d770b7d2f6d0f1870231f2e7a850b9b0c0a50da6b34f1db46da9',
    index: 2,
    cfxHex: '0x1bb3720c8323cfb8fefdbdb9229872ed34ef9b57',
    base32: 'NET2999:TYPE.USER:AAR5G6UPUPV69SH89085WJY2SN0XK565M6XY2GMWN0',
  },
  {
    address: '0xfa7ec9a3befd686393b2105e88fa31484a2f072f',
    privateKey:
      '0xbe05f6d746489c2d216ba3c3ee40f42b8caf5ca60836faa05eb05d68a1d33942',
    index: 3,
    cfxHex: '0x1a7ec9a3befd686393b2105e88fa31484a2f072f',
    base32: 'NET2999:TYPE.USER:AARH7WRD1580U26X0JJF7CH4GFEEYN2HF6SE0G551F',
  },
  {
    address: '0xaf6f1a940f67b27514683239889def43d9d5106e',
    privateKey:
      '0x6c5e7d010fb60e3305d00cf5dccfe9da1dd6cf3ac8793bfdf51c2dd1e36a9226',
    index: 4,
    cfxHex: '0x1f6f1a940f67b27514683239889def43d9d5106e',
    base32: 'NET2999:TYPE.USER:AAT08GYYB7X5E7JYRA3DXCE777B7XZJUR2FSAWHE3N',
  },
  {
    address: '0x22b97cfe15fc16a7da78d0483138adb0a7e521e8',
    privateKey:
      '0x3771c552fe6c256f1b26d969fdd503ce7bb23d95823adb248e221c95698f515a',
    index: 5,
    cfxHex: '0x12b97cfe15fc16a7da78d0483138adb0a7e521e8',
    base32: 'NET2999:TYPE.USER:AAKNW9H8C18BRK84TDJEUPK2Z02MT3KB7AAMTXH0CX',
  },
  {
    address: '0xf4148df077c5c0cabdbb637989e93d083f715256',
    privateKey:
      '0xfc70edae23d39f6009369c692bc5cda0872680a169a531d8d148fd2af09d4276',
    index: 6,
    cfxHex: '0x14148df077c5c0cabdbb637989e93d083f715256',
    base32: 'NET2999:TYPE.USER:AAMBKDTUS9C6BWZ71RV1XCTKHYED86MWM29XS1HR8D',
  },
  {
    address: '0xc222f26a0b7bb5302152673dc40d9eb4436c461d',
    privateKey:
      '0x284595e3b3b1bf20d1281747ae5c4aef2f4d0270ac327057dcccab08e31f9078',
    index: 7,
    cfxHex: '0x1222f26a0b7bb5302152673dc40d9eb4436c461d',
    base32: 'NET2999:TYPE.USER:AAKCF6XMBR75MPBBMKXX5VARX44EG5CGDYA9DMXM7W',
  },
  {
    address: '0x3da6bce29dacc740369b259b29b93cd6425c7108',
    privateKey:
      '0x080d44ec61d07fe49da897d44c3213606389f8329efcf9a783fa5ae97aa00768',
    index: 8,
    cfxHex: '0x1da6bce29dacc740369b259b29b93cd6425c7108',
    base32: 'NET2999:TYPE.USER:AAS4RTHCX00PSUB0XPW30MR3HXNEE1DVBAX149CFUW',
  },
  {
    address: '0xd465709d8195fff311333fc454b5e792ddc4ba12',
    privateKey:
      '0xc13af00b42e30c3e878a20852996078b83011b89a20194fd4db566d1e3a7001e',
    index: 9,
    cfxHex: '0x1465709d8195fff311333fc454b5e792ddc4ba12',
    base32: 'NET2999:TYPE.USER:AAMGM6E7UGM9962VGP96JZFZ68KR5VF4CJ8JYJ50GN',
  },
]
const ETH_ACCOUNTS = [
  {
    address: '0x1de7fb621a141182bf6e65beabc6e8705cdff3d1',
    privateKey:
      '0x6a94c1f02edc1caff0849d46a068ff2819c0a338774fb99674e3d286a3351552',
    index: 0,
  },
  {
    address: '0x28b19b15abd3b20c71c7c808403ab934f2fd9cb1',
    privateKey:
      '0xecd08979ab150d6bc0569f291b7a6db501bdc21f83a1db704b59a9a6f7910811',
    index: 1,
  },
  {
    address: '0x65e4e03771f45eb921520631419f8c56533cf931',
    privateKey:
      '0x5bb8bf17f890b11446867583e7c33c1ca368285f48c67ecbe6c7c2a45a0625f9',
    index: 2,
  },
  {
    address: '0xb73e9bf43ec0614e46c0b37e1b975ff8510da729',
    privateKey:
      '0xbeafcc0a688c709fcc248efc12e70b044a553252ec18daafefceec5b6e5fcb6b',
    index: 3,
  },
  {
    address: '0x968018ae9540ac2a6a0e2a1114143a73ce0a0f92',
    privateKey:
      '0x82ba11e7be74c679ad6ad9ee1ddbff7f5f62ca4ffa019d46bd6af127c625191d',
    index: 4,
  },
  {
    address: '0x57c642a48debd1ca4215fe6c1a3dd32f29c3f723',
    privateKey:
      '0xf591befc556bb49604f01731aec5ede1e68f6cb74f5128b98171bb5d5046a798',
    index: 5,
  },
  {
    address: '0xb2d1bbbfc1020e1a451255dc82876cbbff7f2ad0',
    privateKey:
      '0xceec445c1aae819954133b63dba28a42eb40c1fd6cf6daef45ecc29b560e2bef',
    index: 6,
  },
  {
    address: '0x968b1c2d4911668062a584663a69253fc172f30d',
    privateKey:
      '0xb25f23901da9d45bf2e1e2cb218be60a753c366f4b0f98472dbc1bb719d6f863',
    index: 7,
  },
  {
    address: '0xb7ce762f7af433545800c1b2c7130e65f922379f',
    privateKey:
      '0xe685a39c8a41c48581bacfab7d9f3c5c6334fb6c59e4831fda34131172ce62cb',
    index: 8,
  },
  {
    address: '0xc15ed446a0d2db804314e93192666ccfc2021a4a',
    privateKey:
      '0x617a260992af90f20fbbe43cd2e2a4edb9a0ec2ded468de133797184be3cd818',
    index: 9,
  },
]

module.exports = {
  delay,
  cfx,
  // eth,
  MNEMONIC,
  CFX_ACCOUNTS,
  ETH_ACCOUNTS,
  sendCFX,
  sendETH,
}