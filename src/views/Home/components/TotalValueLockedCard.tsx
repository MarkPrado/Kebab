import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from 'kebabfinance-uikit'
import useI18n from 'hooks/useI18n'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd, usePriceBtcbBusd } from 'state/hooks'
import { QuoteToken } from 'config/constants/types'
import BigNumber from 'bignumber.js'

const StyledTotalValueLockedCard = styled(Card)`
background-repeat: no-repeat;
background-position: top right;
margin-left: auto;
margin-right: auto;
max-width: 344px;
width: 100%;

${({ theme }) => theme.mediaQueries.lg} {
  margin: 0;
  max-width: none;
}
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const btcPrice = usePriceBtcbBusd()

  let tvl = new BigNumber(0)
  for (let i = 0; i < farmsLP.length; i++) {
    const farm = farmsLP[i]
    if (!farm.lpTotalInQuoteToken) {
      //
    } else if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      tvl = tvl.plus(new BigNumber(farm.lpTotalInQuoteToken).div(bnbPrice))
    } else if (farm.quoteTokenSymbol === QuoteToken.KEBAB) {
      tvl = tvl.plus(cakePrice.times(farm.lpTotalInQuoteToken))
    } else if (farm.quoteTokenSymbol === QuoteToken.BTCB) {
      tvl = tvl.plus(btcPrice.times(farm.lpTotalInQuoteToken))
    } else {
      tvl = tvl.plus(farm.lpTotalInQuoteToken)
    }
  }
  const total = (Math.round(tvl.toNumber() * 100) / 100).toLocaleString()

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {TranslateString(999, 'Total Vault')}
        </Heading>
        {total ? (
          <>
            <Heading size="xl">{`$${total}`}</Heading>
            <Text color="textSubtle">{TranslateString(999, 'Across all farming pairs and stakings')}</Text>
          </>
        ) : (
            <>
              <Skeleton height={66} />
            </>
          )}
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
