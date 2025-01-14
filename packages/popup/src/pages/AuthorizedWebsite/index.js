import {useTranslation} from 'react-i18next'
import {isUndefined} from '@fluent-wallet/checks'
import {TitleNav, NoResult} from '../../components'
import {GroupItem} from './components'
import {useGroupAccountAuthorizedDapps} from '../../hooks/useApi'

const getAccountSiteId = groupData => {
  let ret = {}
  groupData.forEach(({account}) => {
    account.forEach(({app, eid}) => {
      if (app) {
        app.forEach(({site}) => {
          if (site) {
            if (ret[site.eid]) {
              ret[site.eid].push(eid)
            } else {
              ret[site.eid] = [eid]
            }
          }
        })
      }
    })
  })
  return ret
}

function AuthorizedWebsite() {
  const {t} = useTranslation()
  const {data} = useGroupAccountAuthorizedDapps()
  const groupData = (data || []).filter(({account}) =>
    account.some(({app}) => !!app),
  )
  const accountSiteId = getAccountSiteId(groupData)

  return (
    <div id="auth-web" className="bg-bg pb-8 h-full w-full flex flex-col">
      <TitleNav title={t('authorizedWebsite')} />
      <div className="flex-1 overflow-y-auto no-scroll px-3 mt-1">
        {!isUndefined(data) && groupData.length === 0 ? (
          <NoResult content={t('noAuthorizedWebsite')} />
        ) : (
          groupData.map(({nickname, account, vault}, index) => (
            <GroupItem
              groupNickname={nickname}
              account={account}
              key={index}
              groupType={vault?.type}
              accountSiteId={accountSiteId}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default AuthorizedWebsite
