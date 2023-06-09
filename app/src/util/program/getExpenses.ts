import * as anchor from '@project-serum/anchor'
import { anchorProgram } from '@/util/anchorProgram';
import { v4 } from 'uuid';

export const getExpenses = async (
  wallet: anchor.Wallet,
) => {
  const program = anchorProgram(wallet);


  // @ts-ignore
  const expenses = await program.account.expenseAccount.all([
    {
      memcmp: {
        offset:
          8 +
          8,
        bytes: wallet.publicKey.toBase58()
      }
    }
  ])
  console.log(expenses)
  const output = expenses.map((expense: any) => {
    return {
      merchant: expense.account.merchantName,
      amount: expense.account.amount.toNumber(),
      id: expense.account.id.toNumber(),
      pubKey: expense.publicKey.toBase58(),
    };
  });
  return output
}