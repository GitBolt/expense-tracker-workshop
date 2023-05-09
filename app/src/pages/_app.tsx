import { Wallet } from '@/contexts/walletContext'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { theme } from '@/util/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Wallet>
        <Component {...pageProps} />
      </Wallet>
    </ChakraProvider>
  )
}
