import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { useDashboard } from 'state/hooks'

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
  font-weight: bold;
  font-size: 20px;
`

const GrandTotal: React.FC = () => {
  const TranslateString = useI18n()
  const total = useDashboard()

  return total !== 0 ? <Container>
    {total ? (
      <>
        <SupplyWrapper>Grand Total: ${total.toFixed(6)}</SupplyWrapper>
      </>
    ) : (
      <SupplyWrapper>{TranslateString(656, 'Loading...')}</SupplyWrapper>
    )}
  </Container> :<Container>
    <SupplyWrapper>Grand Total: ${total}</SupplyWrapper>
  </Container>
}

export default GrandTotal
