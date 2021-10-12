import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useFarmFromSymbol, useFarmUser } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'

export interface MyLPProps {
  symbol: string
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

const MyLP: React.FC<MyLPProps> = ({
  symbol
}) => {
  const TranslateString = useI18n()
  const { account } = useWallet()
  const { pid } = useFarmFromSymbol(symbol)
  const { stakedBalance } = useFarmUser(pid, account)

  return <Container>
    {symbol ? (
      <>
        <SupplyWrapper>{getBalanceNumber(stakedBalance)}</SupplyWrapper>
      </>
    ) : (
      <SupplyWrapper>{TranslateString(656, 'Loading...')}</SupplyWrapper>
    )}
  </Container>
}

export default MyLP
