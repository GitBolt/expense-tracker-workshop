import * as anchor from '@project-serum/anchor'
import { anchorProgram } from '@/util/anchorProgram';

export const updateExpense = async (
  wallet: anchor.Wallet,
  id: number,
  merchantName: string,
  amount: number,
) => {
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
    const sig = await program.methods.modifyExpense(
      new anchor.BN(id),
      merchantName,
      new anchor.BN(amount)
    ).accounts({
      expenseAccount: expense_account,
      authority: wallet.publicKey,
    })
      .rpc();
    return { sig, error: false }
  } catch (e: any) {
    console.log(e)
    return { sig: null, error: e.toString() }
  }

}