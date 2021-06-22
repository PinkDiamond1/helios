import {map, password, boolean} from '@cfxjs/spec'
import {decrypt} from 'browser-passworder'

export const NAME = 'wallet_validatePassword'

export const schemas = {
  input: [map, {closed: true}, ['password', password]],
  output: boolean,
}

export const permissions = {
  locked: true,
  db: ['getVault', 'getPassword', 'getLocked'],
}

export async function main({
  db: {getVault, getLocked, getPassword},
  params: {password},
}) {
  if (!getLocked()) return password === getPassword()
  const vaults = getVault()
  if (!vaults.length) return true
  let valid = false
  try {
    await decrypt(password, vaults[0].data)
    valid = true
  } catch (err) {
    valid = false
  }

  return valid
}
