import * as anchor from '@project-serum/anchor'
import { anchorProgram } from '@/util/anchorProgram';


export const addItem = async (
  wallet: anchor.Wallet,
) => {
  const program = anchorProgram(wallet);

  let [user_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      wallet.publicKey.toBuffer()
    ],
    program.programId
  )

  let details: any
  try {
    // @ts-ignore
    details = await program.account.user.fetch(user_account)
  } catch {
    console.log("Account not created yet")
  }

  const nextNumber = String(details.playgroundCount.toNumber() + 1)
  let [playground_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      wallet.publicKey.toBuffer(),
      Buffer.from(nextNumber)
    ],
    program.programId

  )

  try {
    //@ts-ignore
    const ix = await program.methods.addItem(nextNumber, data_uri).accounts({
      userAccount: user_account,
      playgroundAccount: playground_account
    }).instruction()
    return ix

  } catch (e) {
    console.log(e)
    return undefined
  }
};
