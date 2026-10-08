import { Global, css } from '@emotion/react'
import { colors } from './colors.ts'

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: ${colors.background};
    color: ${colors.text};
  }
`

export const GlobalStyles = () => <Global styles={styles} />
