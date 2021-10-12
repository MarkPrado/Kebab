import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'

export interface HarvestProps {
  earned: number
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

const Harvest: React.FC<HarvestProps> = ({
  earned
}) => {
  const TranslateString = useI18n()
  return earned !== 0 ? <Container>
    {earned ? (
      <>
        <SupplyWrapper>{earned.toFixed(6)}</SupplyWrapper>
      </>
    ) : (
      <SupplyWrapper>{TranslateString(656, 'Loading...')}</SupplyWrapper>
    )}
  </Container> :<Container>
    <SupplyWrapper>{earned}</SupplyWrapper>
  </Container>
}

export default Harvest
