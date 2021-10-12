import React from 'react'
import { Card, CardBody, Heading, Text } from 'kebabfinance-uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from 'components/Card/CardValue'

const StyledCard = styled(Card)`
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

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const Title = styled(Heading).attrs({ size: 'lg' })`
  margin-bottom: 24px;
`

const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - getBalanceNumber(burnedBalance) : 0

  return (
    <StyledCard>
      <CardBody>
        <Title>{TranslateString(534, 'KEBAB Stats')}</Title>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total KEBAB Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total KEBAB Burned')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New KEBAB/block')}</Text>
          <CardValue fontSize="14px" decimals={0} value={1} />
        </Row>
      </CardBody>
    </StyledCard>
  )
}

export default CakeStats
