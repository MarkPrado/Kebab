import React from 'react'
import styled from 'styled-components'
import { useMatchBreakpoints, Text } from 'kebabfinance-uikit'
import useI18n from 'hooks/useI18n'

import Stake, { StakeProps } from './Stake'
import StakeBalance, { StakeBalanceProps } from './StakeBalance'
import Harvest, { HarvestProps } from './Harvest'
import Price, { PriceProps } from './Price'
import Total, { TotalProps } from './Total'
import CellLayout from './CellLayout'
import { StakingPoolColumnSchema } from '../types'

export interface StakingRowProps {
  staking: StakeProps
  stake: StakeBalanceProps
  harvest: HarvestProps
  price: PriceProps
  total: TotalProps
}

const cells = {
  staking: Stake,
  stake: StakeBalance,
  harvest: Harvest,
  price: Price,
  total: Total
}

const CellInner = styled.div`
  padding: 24px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
  }
`

const StyledTr = styled.tr`
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
`
const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const Row: React.FunctionComponent<StakingRowProps> = (props) => {
  const TranslateString = useI18n()

  const { isXs } = useMatchBreakpoints()
  const columnNames = StakingPoolColumnSchema.map((column) => column.name)

  const handleRenderRow = () => {
    if (!isXs) {
      return (
        <StyledTr>
          {Object.keys(props).map((key) => {
            const columnIndex = columnNames.indexOf(key)
            if (columnIndex === -1) {
              return null
            }

            switch (key) {
              default:
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout
                        label={TranslateString(StakingPoolColumnSchema[columnIndex].translationId, StakingPoolColumnSchema[columnIndex].label)}
                      >
                        {React.createElement(cells[key], props[key])}
                      </CellLayout>
                    </CellInner>
                  </td>
                )
            }
          })}
        </StyledTr>
      )
    }

    return (
      <ValueContainer>
        <ValueWrapper>
          <Text>{TranslateString(999, 'Liquidity')}</Text>
          {/* <Liquidity {...props.liquidity} /> */}
        </ValueWrapper>
      </ValueContainer>
    )
  }

  return (
    <>
      {handleRenderRow()}
    </>
  )
}

export default Row
