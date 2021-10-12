import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'

export interface LPPriceProps {
  value: string
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

const LPPrice: React.FC<LPPriceProps> = ({
  value
}) => {
  const TranslateString = useI18n()
  return <Container>
    {value ? (
      <>
        <SupplyWrapper>{value}</SupplyWrapper>
      </>
    ) : (
      <SupplyWrapper>{TranslateString(656, 'Loading...')}</SupplyWrapper>
    )}
  </Container>
}

export default LPPrice
