import * as anchor from '@project-serum/anchor'
import { anchorProgram } from '@/util/anchorProgram';
import { v4 } from 'uuid';

export const createExpense = async (
  wallet: anchor.Wallet,
  merchantName: string,
  itemAmount: number,
) => {
  const program = anchorProgram(wallet);


  // Not the best way
  const newId = String(+new Date())
  console.log(newId)

  let [expense_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("expense"), wallet.publicKey.toBuffer(), Buffer.from(newId)],
    program.programId
  );

  try {
    const sig = await program.methods.initializeExpense(
      newId,
      merchantName,
      new anchor.BN(itemAmount)
    ).accounts({
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