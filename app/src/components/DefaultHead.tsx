import Head from 'next/head'


export const DefaultHead = () => {

  return (
    <Head>
      <title>Solana Expense Tracker</title>
      <meta name="description" content="A simple on-page app for tracking expenses on-chain" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}