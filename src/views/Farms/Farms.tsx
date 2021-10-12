import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Route, useRouteMatch, NavLink } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID, CAKE_POOL_BNB_PID } from 'config'
import Grid from 'components/layout/Grid'
import { useFarms } from 'state/hooks'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import Page from 'components/Page'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')

  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      const kebabPriceUsd = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const kebabPriceBnb = new BigNumber(
        farmsLP.find((farm) => farm.pid === CAKE_POOL_BNB_PID)?.tokenPriceVsQuote || 0,
      )
      const btcbPriceUsd = new BigNumber(farmsLP.find((farm) => farm.pid === 4)?.tokenPriceVsQuote || 0)

      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const cakeRewardPerBlock = CAKE_PER_BLOCK.times(farm.poolWeight)
        const kebabRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = kebabPriceUsd.times(kebabRewardPerYear).div(farm.lpTotalInQuoteToken)

        if (farm.quoteTokenSymbol === QuoteToken.BUSD) {
          // all the /BUSD pairs
          apy = kebabPriceUsd.times(kebabRewardPerYear).div(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.BTCB) {
          // all the /BTCB pairs
          apy = kebabPriceUsd.times(kebabRewardPerYear).div(farm.lpTotalInQuoteToken).div(btcbPriceUsd)
        } else if (farm.quoteTokenSymbol === QuoteToken.KEBAB) {
          // the syrup pool
          apy = kebabRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          // KEBAB/BNB
          apy = kebabPriceBnb.times(kebabRewardPerYear).div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const cakeApy =
            farm && kebabPriceUsd.times(cakeRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = cakeApy && dualApy && cakeApy.plus(dualApy)
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => <FarmCard key={farm.pid} farm={farm} removed={removed} />)
    },
    [farmsLP],
  )

  return (
    <Page>
      <Title>{TranslateString(999, 'Stake LP tokens to earn KEBAB')}</Title>
      <StyledLink exact activeClassName="active" to="/staking">
        Staking
      </StyledLink>
      <FarmTabButtons />
      <Page>
        <Divider />
        <Route exact path={`${path}`}>
          <Grid>{farmsList(activeFarms, false)}</Grid>
        </Route>
        <Route exact path={`${path}/history`}>
          <Grid>{farmsList(inactiveFarms, true)}</Grid>
        </Route>
      </Page>
      <Image src="/images/cakecat.png" />
    </Page>
  )
}

const StyledLink = styled(NavLink)`
  display: none;
  @media (max-width: 400px) {
    display: block;
    background: #50d7dd;
    border-radius: 5px;
    line-height: 40px;
    font-weight: 900;
    padding: 0 20px;
    margin-bottom: 30px;
    color: #fff;
  }
`

const Image = styled.img`
  @media (max-width: 500px) {
    width: 100vw;
  }
`

const Title = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 29px;
  width: 50vw;
  text-align: center;
  font-weight: 900;
  margin: 50px;
`

export default Farms
