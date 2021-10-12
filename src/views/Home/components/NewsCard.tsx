import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from 'kebabfinance-uikit'
import { TwitterTimelineEmbed } from 'react-twitter-embed/dist';
import useTheme from 'hooks/useTheme'

const StyledCard = styled(Card)`
  background-repeat: no-repeat;
  background-position: top right;
  margin-left: auto;
  margin-right: auto;
  max-width: 344px;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardTitle = styled(Heading).attrs({ size: 'lg' })`
  margin-bottom: 24px;
`

const NewsCard = () => {
  const { isDark } = useTheme()

  return (
    <StyledCard>
      <CardBody>
        <CardTitle>Latest Chef Tweet</CardTitle>
        {isDark ? (<TwitterTimelineEmbed
          sourceType="profile"
          screenName="kebabfinance"
          theme="dark"
          options={{ tweetLimit: '1' }}
          noBorders
          noHeader
          noFooter
          placeholder="Loading Last Chef Tweet"
          transparent
        />) : (<TwitterTimelineEmbed
          sourceType="profile"
          screenName="kebabfinance"
          theme="light"
          options={{ tweetLimit: '1' }}
          noBorders
          noHeader
          noFooter
          placeholder="Loading Last Chef Tweet"
          transparent
        />)}

        {/* Jan 20: Welcome aboard everyone. KEBAB is now listed and actively trading. We stay at <strong>1 KEBAB / block</strong> by community decision. More farming pairs will be added in the coming weeks: vote on twitter. */}
      </CardBody>
    </StyledCard>
  )
}

export default NewsCard
