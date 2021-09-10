import {nul, or, and, empty, arrp} from '@fluent-wallet/spec'
import {chan} from '@fluent-wallet/csp'

export const NAME = 'wallet_requestUnlockUI'

export const schemas = {
  input: [or, nul, [and, arrp, empty]],
}

export const permissions = {
  locked: true,
  db: ['getLocked', 't', 'getUnlockReq', 'retract'],
}

async function requestUnlockUI({
  Err: {Internal},
  db: {getLocked, getUnlockReq, retract},
}) {
  if (!window) throw Internal('Invalid running env, window is not defined')
  const {
    browser,
    popup: {show},
  } = await import('@fluent-wallet/webextension')
  const {id: popupWindowId} = await show({url: 'popup.html#unlock'})

  function windowOnRemovedListener(windowId) {
    if (windowId !== popupWindowId) return
    browser.windows.onRemoved.removeListener(windowOnRemovedListener)
    if (!getLocked()) return
    const unlockReqs = getUnlockReq() || []
    unlockReqs.forEach(({eid, req}) =>
      req.write(false).then(() => retract(eid)),
    )
  }

  browser.windows.onRemoved.addListener(windowOnRemovedListener)
}

export const main = async args => {
  const {
    Err: {UserRejected},
    db: {getLocked, getUnlockReq, t},
  } = args
  if (!getLocked()) return
  const unlockReqs = getUnlockReq()

  let unlocked = false
  if (unlockReqs.length) {
    unlocked = await unlockReqs[0].read()
  } else {
    const c = chan(1)
    t([{unlockReq: {req: c}}])
    requestUnlockUI(args)
    unlocked = await c.read()
  }

  if (unlocked) return
  throw UserRejected()
}