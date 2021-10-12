import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from 'kebabfinance-uikit'
import useI18n from 'hooks/useI18n'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: #FFF;
  margin-bottom: 24px;
  font-weight: bold;
  font-size: 48px;
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.017em;
`

const StyledHero = styled.div`
  background: #404040;
  padding-bottom: 40px;
  padding-top: 40px;
  margin-top: 60px;
  margin-bottom: 32px;
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04);
  border-radius: 19px;
  position: relative;
`

const Image = styled.img`
  display: none;
  position: absolute;
  bottom: -24px;
  right: 24px;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`

const FlexWrapper = styled.div`
  display: flex;
`

const TextWrapper = styled.div`
  padding: 20px;
`

const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <FlexWrapper>
        <TextWrapper>
          <Title>{TranslateString(500, 'IFO: Initial Farm Offerings')}</Title>
          <Blurb>{TranslateString(502, 'Buy new tokens with a brand new token sale model.')}</Blurb>
        </TextWrapper>
        <Image src="/images/ifos/ifo-kebab.png" alt="ifo kebab" />
      </FlexWrapper>
    </StyledHero>
  )
}

export default Hero
