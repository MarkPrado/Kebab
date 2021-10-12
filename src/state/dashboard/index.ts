/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { DashboardState, FarmTotal, PoolTotal } from '../types'

const initialState: DashboardState = { farms: [], pools: [] }

export const dashboardSlice = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
    setFarmsTotalData: (state, action) => {
      const farmTotal: FarmTotal = action.payload
      const index = state.farms.findIndex((f) => f.pid === farmTotal.pid)
      if (index > -1) state.farms[index] = { ...state.farms[index], value: farmTotal.value }
      else state.farms.push(farmTotal)
    },
    setPoolsTotalData: (state, action) => {
      const poolTotal: PoolTotal = action.payload
      const index = state.pools.findIndex((f) => f.symbol === poolTotal.symbol)
      if (index > -1) state.pools[index] = { ...state.pools[index], value: poolTotal.value }
      else state.pools.push(poolTotal)
    },
  },
})

// Actions
export const { setFarmsTotalData, setPoolsTotalData } = dashboardSlice.actions

export default dashboardSlice.reducer
