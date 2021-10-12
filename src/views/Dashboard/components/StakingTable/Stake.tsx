import React from 'react'
import styled from 'styled-components'
import { Text, Image } from 'kebabfinance-uikit'

export interface StakeProps {
  label: string
  image: string
}

const IconImage = styled(Image)`
  width: 24px;
  height: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40px;
    height: 40px;
  }
`

const Container = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 32px;
  }
`

const Stake: React.FunctionComponent<StakeProps> = ({ image, label }) => {
  return (
    <Container>
      <IconImage src={`/images/tokens/${image}.png`} alt="icon" width={40} height={40} mr="8px" />
      <div>
        <Text bold>{label} Pool</Text>
      </div>
    </Container>
  )
}

export default Stake
