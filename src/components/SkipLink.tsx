import type { AnchorHTMLAttributes, FC } from 'react'
import styled from '@emotion/styled'

type SkipLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

const SkipLinkRoot = styled('a')(({ theme }) => ({
  position: 'absolute',
  left: '-999px',
  top: 'auto',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  zIndex: 2000,
  '&:focus': {
    left: '1.5rem',
    top: '1.5rem',
    width: 'auto',
    height: 'auto',
    padding: '0.75rem 1rem',
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    textDecoration: 'none',
    borderRadius: '2px',
  },
}))

const SkipLink: FC<SkipLinkProps> = props => <SkipLinkRoot {...props} />

export { SkipLink }
