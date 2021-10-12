import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from 'kebabfinance-uikit'
import useI18n from 'hooks/useI18n'

const StyledLotteryCard = styled(Card)`
  background-image: url('/images/ticket-bg.svg');
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
const CardTitle = styled(Heading).attrs({ size: 'lg' })`
  margin-bottom: 24px;
`

const FarmedStakingCard = () => {
  const TranslateString = useI18n()

  return (
    <StyledLotteryCard>
      <CardBody>
        <CardTitle>{TranslateString(550, 'Kebab News')}</CardTitle>
        Jan 23: Timelock is in place. Staking APY corrected.
        <br /><br />
        Jan 20: Welcome aboard everyone. KEBAB is now listed and actively trading. We stay at{' '}
        <strong>1 KEBAB / block</strong> by community decision. More farming pairs will be added in the coming weeks:
        vote on twitter.
      </CardBody>
    </StyledLotteryCard>
  )
}

export default FarmedStakingCard
