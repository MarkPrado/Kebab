import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'

export interface TokenProps {
  tokenAmount: BigNumber
  quoteTokenAmount: BigNumber
  tokenPriceVsQuote: BigNumber
  quoteTokenSymbol: string
  tokenSymbol: string
}

const Container = styled.div`
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

const TokenWrapper = styled.div`
  display: flex;
  min-width: 60px;
  text-align: left;
  span {
    margin: 10px;
  }
`

const SymbolWrapper = styled.span`
  min-width: 120px;
`

const Tokens: React.FC<TokenProps> = ({
  tokenAmount, tokenSymbol,
  quoteTokenAmount, quoteTokenSymbol,
  tokenPriceVsQuote
}) => {
  const TranslateString = useI18n()

  return (
    <Container>
      {tokenAmount ? (
        <TokenWrapper>
          <SymbolWrapper>Token {tokenSymbol}</SymbolWrapper>
          <span>{(new BigNumber(tokenAmount)).toFixed(2)}</span>
        </TokenWrapper>
      ) : (
        <TokenWrapper>{TranslateString(656, 'Loading...')}</TokenWrapper>
      )}
      {quoteTokenAmount ? (
        <TokenWrapper>
          <SymbolWrapper>Quote {quoteTokenSymbol}</SymbolWrapper>
          <span>{(new BigNumber(quoteTokenAmount)).toFixed(2)}</span>
        </TokenWrapper>
      ) : (
        <TokenWrapper>{TranslateString(656, 'Loading...')}</TokenWrapper>
      )}
      {tokenPriceVsQuote ? (
        <TokenWrapper>
          <SymbolWrapper>{tokenSymbol} VS {quoteTokenSymbol}</SymbolWrapper>
          <span>{(new BigNumber(tokenPriceVsQuote)).toFixed(6)}</span>
        </TokenWrapper>
      ) : (
        <TokenWrapper>{TranslateString(656, 'Loading...')}</TokenWrapper>
      )}
    </Container>
  )
}

export default Tokens
