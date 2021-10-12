import React, { useContext } from 'react'
import { Menu as UikitMenu } from 'kebabfinance-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { allLanguages } from 'config/localisation/languageCodes'
import { LanguageContext } from 'contexts/Localisation/languageContext'
import useTheme from 'hooks/useTheme'
import { usePriceCakeBusd } from 'state/hooks'
import config from './config'

const Menu = (props) => {
  const { account, connect, reset } = useWallet()
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext)
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = usePriceCakeBusd()
  if (!sessionStorage.lastprice)
    sessionStorage.lastprice = cakePriceUsd.toNumber().toString()
  if (sessionStorage.lastprice !== cakePriceUsd.toNumber().toString()) {
    setTimeout(() => {
      sessionStorage.lastprice = cakePriceUsd.toNumber().toString()
    }, 1500);
  }
  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      cakePriceUsd={cakePriceUsd.toNumber()}
      priceUp={Number(sessionStorage.lastprice) < cakePriceUsd.toNumber()}
      links={config}
      {...props}
    />
  )
}

export default Menu
