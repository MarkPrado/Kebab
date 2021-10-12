import { MenuEntry } from 'kebabfinance-uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://swap.kebabfinance.com/#/swap',
      },
      {
        label: 'Liquidity',
        href: 'https://swap.kebabfinance.com/#/pool',
      },
    ],
  },
  {
    label: 'Dashboard',
    icon: 'InfoIcon',
    href: '/dashboard'
  },
  {
    label: 'Farming',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Staking',
    icon: 'PoolIcon',
    href: '/syrup',
  },
  {
    label: 'IFO',
    icon: 'IfoIcon',
    href: '/ifo',
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://info.kebabfinance.com',
      },
      {
        label: 'Tokens',
        href: 'https://info.kebabfinance.com/#/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://info.kebabfinance.com/#/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://info.kebabfinance.com/#/accounts',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Governance',
        href: 'https://gov.kebabfinance.com',
      },
      {
        label: 'Github',
        href: 'https://github.com/chefkebab',
      },
      {
        label: 'Blog',
        href: 'https://kebabfinance1.medium.com',
      },
    ],
  },
]

export default config
