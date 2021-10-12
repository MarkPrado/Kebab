import React, { useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard'
import { useMatchBreakpoints, Text } from 'kebabfinance-uikit'
import useI18n from 'hooks/useI18n'

import Farm, { FarmProps } from './Farm'
import Earned, { EarnedProps } from './Earned'
import Details from './Details'
import { LiquidityProps } from './Liquidity'
import LPSupply from './LPSupply'
import Tokens from './Tokens'
import MyLP from './MyLP'
import LPPrice from './LPPrice'
import MyDollarValue from './MyDollarValue'
import CellLayout from './CellLayout'

export interface RowProps {
  farm: FarmProps
  earned: EarnedProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
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

const EarnedMobileCell = styled.td`
  padding: 16px 0 24px 16px;
`

const FarmMobileCell = styled.td`
  padding-top: 24px;
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

const Row: React.FunctionComponent<RowProps> = (props) => {
  const { details } = props
  const [actionPanelToggled, setActionPanelToggled] = useState(false)
  const TranslateString = useI18n()

  const toggleActionPanel = () => {
    setActionPanelToggled(!actionPanelToggled)
  }

  const { isXs } = useMatchBreakpoints()

  const handleRenderRow = () => {
    const lpSupply = props.liquidity.liquidity ? (Number(props.liquidity.liquidity) / (new BigNumber(details.lpSupply).dividedBy((new BigNumber(10)).pow(18))).toNumber()) : 0
    if (!isXs) {
      return (
        <StyledTr onClick={toggleActionPanel}>
          <td key="farm">
            <CellLayout>
              <Farm {...props.farm} />
            </CellLayout>
          </td>
          <td key="earned">
            <CellLayout label={TranslateString(1072, 'Earned')}>
              <Earned {...props.earned} />
            </CellLayout>
          </td>
          <td key='lpSymbol'>
            <CellInner>
              <CellLayout label={TranslateString(1072, 'My LP')}>
                <MyLP symbol={details.lpSymbol}/>
              </CellLayout>
            </CellInner>
          </td>
          <td key='myDollarValue'>
            <CellInner>
              <CellLayout label={TranslateString(1072, 'My Dollar Value')}>
                <MyDollarValue price={lpSupply} symbol={details.lpSymbol}/>
              </CellLayout>
            </CellInner>
          </td>
          <td key="details">
            <CellInner>
              <CellLayout>
                <Details actionPanelToggled={actionPanelToggled} />
              </CellLayout>
            </CellInner>
          </td>
        </StyledTr>
      )
    }

    return (
      <StyledTr onClick={toggleActionPanel}>
        <td>
          <tr>
            <FarmMobileCell>
              <CellLayout>
                <Farm {...props.farm} />
              </CellLayout>
            </FarmMobileCell>
          </tr>
          <tr>
            <EarnedMobileCell>
              <CellLayout label={TranslateString(1072, 'Earned')}>
                <Earned {...props.earned} />
              </CellLayout>
            </EarnedMobileCell>
          </tr>
        </td>
        <td>
          <CellInner>
            <CellLayout>
              <Details actionPanelToggled={actionPanelToggled} />
            </CellLayout>
          </CellInner>
        </td>
      </StyledTr>
    )
  }

  const handleSecondRenderRow = () => {
    const lpSupply = (Number(props.liquidity.liquidity) / (new BigNumber(details.lpSupply).dividedBy((new BigNumber(10)).pow(18))).toNumber())
    if (!isXs) {
      return (
        <StyledTr>
          <td key='tokenAmount'>
            <Tokens tokenAmount={details.tokenAmount} 
              quoteTokenAmount={details.quoteTokenAmount}
              tokenSymbol={details.tokenSymbol}
              quoteTokenSymbol={details.quoteTokenSymbol}
              tokenPriceVsQuote={details.tokenPriceVsQuote}/>
          </td>
          <td key='lpSupply'>
            <CellInner>
              <CellLayout label={TranslateString(1072, 'LP Supply')}>
                <LPSupply value={details.lpSupply}/>
              </CellLayout>
            </CellInner>
          </td>
          <td key='lpPrice'>
            <CellInner>
              <CellLayout label={TranslateString(1072, '1 LP Price')}>
                <LPPrice value={lpSupply.toFixed(8)}/>
              </CellLayout>
            </CellInner>
          </td>
          <td/>
          <td/>
        </StyledTr>
      )
    }

    return (
      <ValueContainer>
        <ValueWrapper>
          <Text>{TranslateString(1072, 'LP Supply')}</Text>
          <LPSupply value={details.lpSupply}/>
        </ValueWrapper>
        <ValueWrapper>
          <Text>{TranslateString(1072, 'My LP')}</Text>
          <MyLP symbol={details.lpSymbol}/>
        </ValueWrapper>
        <ValueWrapper>
          <Text>{TranslateString(1072, '1 LP Price')}</Text>
          <LPPrice value={lpSupply.toFixed(8)}/>
        </ValueWrapper>
        <ValueWrapper>
          <Text>{TranslateString(1072, 'My Dollar Value')}</Text>
          <MyDollarValue price={lpSupply} symbol={details.lpSymbol}/>
        </ValueWrapper>
      </ValueContainer>
    )
  }

  return (
    <>
      {handleRenderRow()}
      {actionPanelToggled && details && (
        handleSecondRenderRow()
      )}
    </>
  )
}

export default Row
