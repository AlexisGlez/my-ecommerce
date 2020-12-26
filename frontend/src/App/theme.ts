import { theme as chakraTheme, extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    body: `Nunito Sans,${chakraTheme.fonts.body}`,
    heading: `Nunito Sans,${chakraTheme.fonts.heading}`,
  },
})
