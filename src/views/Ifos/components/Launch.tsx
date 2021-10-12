import React from 'react'
import styled from 'styled-components'
import { Heading, Text, Button } from 'kebabfinance-uikit'
import useI18n from 'hooks/useI18n'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: #E46149;
  font-size: 32px;
  margin-bottom: 16px;
`

const Blurb = styled(Text)`
  color: #23001E;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 16px;
`

const StyledLaunch = styled.div`
  margin-top: 60px;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const Image = styled.img`
`

const RightText = styled.div`
  text-align: right;
  padding-left: 20px;
`

const Launch = () => {
  const TranslateString = useI18n()

  return (
    <StyledLaunch>
      <Image src="/images/ifos/ifo-launch.png" alt="ifo launch" />
      <RightText>
        <Title>{TranslateString(500, 'Want to launch your own IFO?')}</Title>
        <Blurb>{TranslateString(502, 'Launch your project with KebapSwap, Binance Smart Chain’s most-used AMM project and liquidity provider, to bring your token directly to the most active and rapidly growing community on BSC.')}</Blurb>
        <Button
          as="a"
          href="https://docs.google.com/forms/d/1uerVBpniyl60iaPy-NFWcJ7fZsZ8kIvqPxaiaZt_BJM/edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          {TranslateString(516, 'Apply to launch')}
        </Button>
      </RightText>
    </StyledLaunch>
  )
}

export default Launch
