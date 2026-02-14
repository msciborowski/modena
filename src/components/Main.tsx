import type { FC, HTMLAttributes, PropsWithChildren } from 'react'
import styled from '@emotion/styled'

type MainProps = PropsWithChildren<HTMLAttributes<HTMLElement>>

const MainRoot = styled('main')({
  paddingTop: '84px',
  display: 'block',

  '@media (max-width: 768px)': {
    paddingTop: '84px',
  },
})

const Main: FC<MainProps> = ({ children, ...props }) => <MainRoot {...props}>{children}</MainRoot>

export { Main }
