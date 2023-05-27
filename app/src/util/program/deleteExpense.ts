import * as anchor from '@project-serum/anchor'
import { anchorProgram } from '@/util/anchorProgram';

export const deleteExpense = async (
  wallet: anchor.Wallet,
  id: number,
) => {

  console.log(id)
  const program = anchorProgram(wallet);

  let [expense_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("expense"),
      wallet.publicKey.toBuffer(),
      new anchor.BN(id).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );
  try {
    const sig = await program.methods.deleteExpense(
      new anchor.BN(id)
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