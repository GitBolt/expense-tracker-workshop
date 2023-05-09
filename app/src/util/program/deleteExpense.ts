import * as anchor from '@project-serum/anchor'
import { anchorProgram } from '@/util/anchorProgram';

export const deleteExpense = async (
  wallet: anchor.Wallet,
  id: number,
) => {
  const program = anchorProgram(wallet);

  let [expense_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("expense"), wallet.publicKey.toBuffer(), Buffer.from(String(id))],
    program.programId
  );

  try {
    const sig = await program.methods.deleteExpense(
      String(id)
    ).accounts({
      expenseAccount: expense_account,
      authority: wallet.publicKey,
    })
      .rpc();
    return sig
  } catch (e) {
    console.log(e)
  }

}