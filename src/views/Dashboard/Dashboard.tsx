import React, { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { RowType, Card, CardBody } from 'kebabfinance-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'

import { BLOCKS_PER_YEAR } from 'config'
import Page from 'components/layout/Page'
import { useFarms, usePriceCakeBusd, useGetApiPrices, usePools } from 'state/hooks'
import { Farm } from 'state/types'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { getFarmApy } from 'utils/apy'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard'
import Table from './components/FarmTable/FarmTable'
import { RowProps } from './components/FarmTable/Row'
import { DesktopColumnSchema, StakingPoolColumnSchema } from './components/types'

import StakingTable from './components/StakingTable/StakingTable'
import { StakingRowProps } from './components/StakingTable/Row'
import GrandTotal from './components/GrandTotal'

const Container = styled.div`
  padding: 10px 40px;
`

const Pool = styled.div`
  padding: 20px 0;
`

const Dashboard: React.FC = () => {
  const { account } = useWallet()
  const farmsLP = useFarms()
  const pools = usePools(account)
  const cakePrice = usePriceCakeBusd()
  const prices = useGetApiPrices()
  const block = useBlock()

  const poolsWithApy = pools.map((pool) => {
    const stakingTokenFarm = farmsLP.find((s) => s.lpSymbol === 'KEBAB-BUSD LP')

    const stakingTokenPrice = new BigNumber(stakingTokenFarm?.tokenPriceVsQuote)
    let rewardTokenPrice = stakingTokenPrice
    if (pool.tokenName === 'BTCB') {
      rewardTokenPrice = new BigNumber(farmsLP.find((f) => f.tokenSymbol === pool.tokenName).tokenPriceVsQuote)
    } else if (pool.tokenName === 'BNB') {
      rewardTokenPrice = new BigNumber(farmsLP.find((f) => f.tokenSymbol === pool.tokenName).tokenPriceVsQuote)
    }
    
    const totalRewardPricePerYear = rewardTokenPrice.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = stakingTokenPrice.times(getBalanceNumber(pool.totalStaked))
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,
    }
  })

  const farmList = farmsLP.filter((farm) => farm.pid !== 0)

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !prices) {
          return farm
        }

        const quoteTokenPriceUsd = prices[farm.quoteTokenSymbol.toLowerCase()]
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        const apy = getFarmApy(farm.poolWeight, cakePrice, totalLiquidity)

        return { ...farm, apy, liquidity: totalLiquidity }
      })

      return farmsToDisplayWithAPY
    },
    [cakePrice, prices],
  )

  const farmsStaked = farmsList(farmList)

  const rowData = farmsStaked.map((farm) => {
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row: RowProps = {
      farm: {
        image: farm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: farm.pid,
      },
      earned: {
        earnings: farm.userData ? getBalanceNumber(new BigNumber(farm.userData.earnings)) : null,
        pid: farm.pid,
      },
      liquidity: {
        liquidity: Number(farm.liquidity),
      },
      details: farm,
    }

    return row
  })

  const poolList = poolsWithApy.filter((pool) => pool.isActive)
  const stakingPools = poolList.map((pool) => {
    const lpSymbol = `${pool.tokenName}-BUSD LP`
    const row: StakingRowProps = {
      staking: {
        image: pool.tokenName,
        label: pool.tokenName
      },
      stake: {
        stakedBalance: new BigNumber(pool?.userData?.stakedBalance || 0)
      },
      harvest: {
        earned: getBalanceNumber(new BigNumber(pool?.userData?.pendingReward || 0), pool.tokenDecimals)
      },
      price: {
        symbol: lpSymbol,
        stakedBalance: new BigNumber(pool?.userData?.stakedBalance || 0)
      },
      total: {
        earned: getBalanceNumber(new BigNumber(pool?.userData?.pendingReward || 0), pool.tokenDecimals),
        symbol: lpSymbol,
        stakedBalance: new BigNumber(pool?.userData?.stakedBalance || 0)
      }
    }

    return row
  })

  const renderFarmingPool = (): JSX.Element => {
    const columnSchema = DesktopColumnSchema

    const columns = columnSchema.map((column) => ({
      id: column.id,
      name: column.name,
      label: column.label,
      sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
        switch (column.name) {
          case 'farm':
            return b.id - a.id
          case 'earned':
            return a.original.earned.earnings - b.original.earned.earnings
          default:
            return 1
        }
      },
      sortable: column.sortable,
    }))

    return <Table data={rowData} columns={columns} />
  }

  const renderStakingPool = (): JSX.Element => {
    const columnSchema = StakingPoolColumnSchema

    const columns = columnSchema.map((column) => ({
      id: column.id,
      name: column.name,
      label: column.label,
      sort: () => {
        switch (column.name) {
          default:
            return 1
        }
      },
      sortable: column.sortable,
    }))

    return <StakingTable data={stakingPools} columns={columns} />
  }

  return (
    <Page>
      <Container>
        <Card>
          <CardBody><GrandTotal/></CardBody>
        </Card>
        <Pool>
          {renderFarmingPool()}
        </Pool>
        <Pool>
          {renderStakingPool()}
        </Pool>
      </Container>
    </Page>
  )
}

export default Dashboard
