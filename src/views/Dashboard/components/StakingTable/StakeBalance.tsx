import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'

import { getBalanceNumber } from 'utils/formatBalance'

export interface StakeBalanceProps {
  stakedBalance: BigNumber
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

const SupplyWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`

const StakeBalance: React.FC<StakeBalanceProps> = ({
  stakedBalance
}) => {
  const TranslateString = useI18n()
  return <Container>
    {stakedBalance ? (
      <>
        <SupplyWrapper>{getBalanceNumber(stakedBalance).toFixed(0)}</SupplyWrapper>
      </>
    ) : (
      <SupplyWrapper>{TranslateString(656, 'Loading...')}</SupplyWrapper>
    )}
  </Container>
}

export default StakeBalance
