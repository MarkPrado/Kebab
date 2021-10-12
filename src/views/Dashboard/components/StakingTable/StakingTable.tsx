import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTable, ColumnType } from 'kebabfinance-uikit'
import useI18n from 'hooks/useI18n'

import Row, { StakingRowProps } from './Row'

export interface ITableProps {
  data: StakingRowProps[]
  columns: ColumnType<StakingRowProps>[]
  sortColumn?: string
}

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin: 16px 0px;
`

const TableHeader = styled.div`
  padding: 10px 20px;
  font-weight: bold;
  font-size: 28.1px;
  line-height: 34px;
`

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const TableBody = styled.tbody`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`

const TableContainer = styled.div`
  position: relative;
`

const StakingTable: React.FC<ITableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const TranslateString = useI18n()
  const { data, columns } = props

  const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'farm' })

  return (
    <Container>
      <TableContainer>
        <TableHeader>{TranslateString(674, 'Staking')}</TableHeader>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <TableBody>
              {rows.map((row) => {
                return <Row {...row.original} key={`table-row-${row.id}`} />
              })}
            </TableBody>
          </StyledTable>
        </TableWrapper>
      </TableContainer>
    </Container>
  )
}

export default StakingTable
