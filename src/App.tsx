import React, { useEffect } from 'react'
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from 'kebabfinance-uikit'
import BigNumber from 'bignumber.js'
import { useFetchPriceList, useFetchPublicData } from 'state/hooks'
import Ifos from 'views/Ifos'
import Farms from './views/Farms'
import Farm from './views/Farm'
import Home from './views/Home'
import Pools from './views/Pools'
import Dashboard from './views/Dashboard'
import NotFound from './views/NotFound'
import Menu from './components/Menu'
import GlobalStyle from './style/Global'
// import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()
  useFetchPriceList()

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/farms">
            <Farms />
          </Route>
          <Route path="/farm/:lpSymbol">
            <Farm />
          </Route>
          <Route path="/pools">
            <Pools />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/ifo">
            <Ifos />
          </Route>
          {/* Redirect */}
          <Route path="/staking">
            <Redirect to="/pools" />
          </Route>
          <Route path="/syrup">
            <Redirect to="/pools" />
          </Route>
          {/* 404 */}
          <Route component={NotFound} />
        </Switch>
      </Menu>
    </Router>
  )
}

export default React.memo(App)
