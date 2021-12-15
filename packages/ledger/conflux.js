import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import AppCfx from '@fluent-wallet/hw-app-conflux'
import {LEDGER_APP_NAME, LEDGER_CLA, INS} from './const'

/**
 * Connecting Ledger Conflux App API for fluent
 *
 * @example
 * import {Conflux} from "@fluent-wallet/ledger";
 * const cfx = new Conflux()
 * cfx.getAddress("44'/503'/0'/0/0").then(o => o.publicKey)
 */

export default class Conflux {
  app = null
  transport = null
  constuctor() {
    this.app = null
    this.transport = null
  }

  async setApp() {
    if (!this.app) {
      try {
        this.transport = await TransportWebUSB.create()
        this.app = new AppCfx(this.transport)
      } catch (error) {
        console.warn(error)
      }
    }
  }

  /**
   * get address from ledger
   * @param {*} hdPath
   * @returns
   */
  async getAddress(hdPath) {
    await this.setApp()
    return this.app?.getAddress(hdPath)
  }

  /**
   * sign transaction
   * @param {*} hdPath
   * @param {*} txHex
   * @returns
   */
  async signTransaction(hdPath, txHex) {
    await this.setApp()
    try {
      return this.app?.signTransaction(hdPath, txHex)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * get configuration of ledger conflux app
   * @returns
   */
  async getAppConfiguration() {
    await this.setApp()
    return this.app?.getAppConfiguration()
  }

  async isDeviceAuthed() {
    const devices = await TransportWebUSB.list()
    return Boolean(devices.length)
  }

  async isAppOpen() {
    try {
      const {name} = await this.getAppConfiguration()
      return name === LEDGER_APP_NAME.CONFLUX
    } catch (error) {
      return false
    }
  }

  async openApp() {
    try {
      await this.transport?.send(
        LEDGER_CLA,
        INS.OPEN_APP,
        0x00,
        0x00,
        Buffer.from(LEDGER_APP_NAME.CONFLUX, 'ascii'),
      )
      return true
    } catch (error) {
      return false
    }
  }
}
