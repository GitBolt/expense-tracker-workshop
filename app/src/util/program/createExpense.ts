import * as anchor from '@project-serum/anchor'
import { anchorProgram } from '@/util/anchorProgram';

export const createExpense = async (
  wallet: anchor.Wallet,
  merchantName: string,
  itemAmount: number,
) => {
  const program = anchorProgram(wallet);



  let id = +new Date()

  let [expense_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("expense"),
      wallet.publicKey.toBuffer(),
      new anchor.BN(id).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );

  try {
    const sig = await program.methods
      .initializeExpense(
        new anchor.BN(id),
        merchantName,
        new anchor.BN(itemAmount))
      .accounts({
        expenseAccount: expense_account,
        authority: wallet.publicKey,
      })
      .rpc();

    return { error: false, sig }
  } catch (e: any) {
    console.log(e)
    return { error: e.toString(), sig: null }
  }
}