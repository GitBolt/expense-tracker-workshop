import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Etracker } from "../target/types/etracker";
import { BN } from "bn.js";

describe("Expense Tracker", async () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.local();

  const program = anchor.workspace.Etracker as Program<Etracker>;

  const wallet = provider.wallet as anchor.Wallet;

  let merchantName = "test";
  let amount = 100;
  let id = 1;

  let merchantName2 = "test 2";
  let amount2 = 200;

  let [expense_account] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("expense"),
      wallet.publicKey.toBuffer(),
      new BN(id).toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );

  it("Initialize Expense", async () => {
    await program.methods
      .initializeExpense(
        new anchor.BN(id),
        merchantName,
        new anchor.BN(amount)
      )
      .accounts({
        expenseAccount: expense_account,
        authority: wallet.publicKey,
      })
      .rpc();
  });

  it("Modify Expense", async () => {
    await program.methods
      .modifyExpense(new anchor.BN(id), merchantName2, new anchor.BN(amount2))
      .accounts({
        expenseAccount: expense_account,
        authority: wallet.publicKey,
      })
      .rpc();
  });

  it("Delete Expense", async () => {
    await program.methods
      .deleteExpense(new anchor.BN(id))
      .accounts({
        expenseAccount: expense_account,
        authority: wallet.publicKey,
      })
      .rpc();
  });
});
