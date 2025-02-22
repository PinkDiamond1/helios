const GlobalProviderCache = {
  cfx: window.conflux,
  eth: window.ethereum,
}
const TakeOverInterval = {cfx: null, eth: null}

function _takeOverConflux(PROVIDER, resolve) {
  if (window.conflux === PROVIDER) return
  if (!TakeOverInterval.cfx) return
  if (!window.conflux) return
  GlobalProviderCache.cfx = window.conflux
  window.conflux = PROVIDER
  window.confluxJS = PROVIDER.confluxJS
  clearInterval(TakeOverInterval.cfx)
  resolve(true)
}
function _takeOverEthereum(PROVIDER, resolve) {
  if (window.ethereum === PROVIDER) return
  if (!TakeOverInterval.eth) return
  if (!window.ethereum) return
  GlobalProviderCache.eth = window.ethereum
  window.ethereum = PROVIDER
  clearInterval(TakeOverInterval.eth)
  resolve(true)
}

export async function takeOver(PROVIDER, type = 'cfx') {
  if (!PROVIDER) return
  const takeOverFn = type === 'cfx' ? _takeOverConflux : _takeOverEthereum
  return await new Promise(resolve => {
    TakeOverInterval[type] = setInterval(
      () => takeOverFn(PROVIDER, resolve),
      50,
    )
  })
}

export function handBack(type = 'cfx') {
  if (type === 'cfx') {
    if (!GlobalProviderCache.cfx) return
    if (TakeOverInterval.cfx) clearInterval(TakeOverInterval.cfx)
    window.conflux = GlobalProviderCache.cfx
  } else {
    if (!GlobalProviderCache.eth) return
    if (TakeOverInterval.eth) clearInterval(TakeOverInterval.eth)
    window.ethereum = GlobalProviderCache.eth
  }
}
