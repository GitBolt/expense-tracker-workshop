# Expense Tracker

## 🎬 Recorded Sessions
| Link        | Instructor | Event |
| ----------- | ---------- | ----- |
| Coming Soon | -          | -     |

## ☄️ Open in Solana Playground IDE
| Program         | Link                                                                                                                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Expense Tracker | [ ![program](https://ik.imagekit.io/mkpjlhtny/solpg_button_zWM8WlPKs.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1662621556513)](https://beta.solpg.io/645acbc1d6ebe745da20439e) |


## 📗 Learn

In this workshop, we'll understand PDAs and their uses in Solana by creating a simple expense tracking app.

The app has a simple UI to connect wallet and view your expenses in tabular form and a distribution chart. You can add new expenses, update existing ones, or delete them.

Each expense is a PDA (Program Derived Address), owned by the user who creates them. Head over to [Diagrams](#diagrams) to understand it in depth.

### PDAs
A Program Derived Address (PDA) is an account whose public key is created using an algorithm based on the program's address. Unlike regular accounts, PDAs don't have private keys and can perform actions without needing signatures from clients or user wallets.

To create a PDA, we need to provide "seeds" which are external data as bytes. Seeds can be any data like wallet address, string, or unique ID. PDAs are deterministic, which means we can create and derive them again and again using the same seeds. We can perform actions for our PDA accounts using the derived public key.

Seeds often include a unique ID which is helpful when dealing with our expense entry data. By using the unique ID of an expense entry, we can easily derive its PDA and get the on-chain account by passing the ID in seeds.

In our case, we are using PDAs as separate accounts that are owned by the user. The user has authority over controlling these PDA accounts, which represent individual expense entry data.

> Note: PDAs are **derived** using an algorithm, we can get them using PublicKey.findProgramAddressSync from `@solana/web3.js`. PDAs are NOT fetched from on-chain data, only accounts are **fetched**.

### Client
Let's go through the code and understand how our client is working.
1. Program Interaction
- 1.1 Creating Anchor Provider
- 1.2 Adding IDL
- 1.3 Deriving PDAs in client
- 1.4 Understanding Instruction Calling
- 1.5 Fetching on-chain data

2. Rendering data
- 2.1 Creating expense data table
- 2.2 Creating Chart


#### 1.1
Let's get started with creating a Anchor provider, which will interact with our Solana program.
Head over to: [/app/util/anchorProgram.ts](/app/util/anchorProgram.ts)


We're first creating the anchor program provider that will help us interact with our program. Note that it takes in our `IDL`, let's understand that next.
```ts
export const anchorProgram = (wallet: anchor.Wallet, network?: string) => {
  const provider = getProvider(wallet, network);
  const idl = IDLData as anchor.Idl;
  const program = new anchor.Program(
    idl,
    new PublicKey(DEVNET_PROGRAM_ID),
    provider
  ) as unknown as anchor.Program<IDLType>;

  return program;
};
```

#### 1.2
When you build your program, in the `target/` directory, your program's IDL is created. IDL is essentially the strucuture of your entire program, including all instructions, instruction params and all accounts. 
The IDL is saved in a JSON file. We have to copy it in our client code and save it as a type so that we can easily work with our anchor provider with type annotations and checking. In this repository, the IDL is present in [/app/util/idl.ts](/app/util/idl.ts) file

#### 1.3
We learnt in the [PDAs](#PDAs) section above about PDAs. Let's see how we derive it in the client. Open up any file from the [/app/util/program](/app/util/program) directory.
For example, to derive an expense's account PDA, we're using
```ts
let [expense_account, bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
        Buffer.from("expense"), 
        wallet.publicKey.toBuffer(),
        Buffer.from(String(id))
    ],
    program.programId
);
```
The `findProgramAddressSync` function takes in a seeds array and program ID.
In our program, the seeds are: "expense" string, wallet public key and id of our expense entry. You can see how it works in [Diagrams](#Diagrams) section
This function returns out PDA and bump that kicked the public key off the ED2559 curve. Let's see how we can use this PDA and interact with our program in client

#### 1.4
Let's open [/app/util/program/createExpense.ts](/app/util/program/createExpense.ts) to understand how we're calling the `initializeExpense` instruction to add a new expense entry through client.
The function is deriving a PDA first, which we've covered, let's look at the important part, which is:
```ts
    const sig = await program.methods.initializeExpense(
      newId,
      merchantName,
      new anchor.BN(itemAmount)
    ).accounts({
      expenseAccount: expense_account,
      authority: wallet.publicKey,
    })
      .rpc();
```
Here. we're using our program provider and accessing the `initializeExpense` method. We're able to get it because of the IDL type we added.
The method takes in the parameters we defined in our program. Which is the unique ID, merchant name and the amount we spent.
Next, we need to enter all the accounts that are required for this method. We're first passing our PDA for `expenseAccount`, which will become our on-chain account holding the expense data. This is followed by the `authority`, which is simply who has the ownership of the account. Naturally, the user should have the ownership of their expense accounts, so we're setting it to our wallet's public key.

Similarly, we're calling all other instructions in client for updating and deleting expense.

#### 1.5
We've understand how to call instructions in our Solana program through client. But, how do we fetch the on-chain data?
Let's open up [app/util/program/getExpenses.ts](app/util/program/getExpenses.ts).
We're fetching all expense accounts in this part:
```ts
const expenses = await program.account.expenseAccount.all()
```
We're getting out expenseAccount and using the `all()` method to get all expense accounts. We can also fetch indiviual accounts by using the `fetch()` method and passing our PDA instead.

##### 2.1
Now, let's see where and how we are rendering out data.
Open up [/app/components/MyExpenses.tsx](/app/components/MyExpenses.tsx)
Notice this part:
```ts
  useEffect(() => {
    if (!wallet) {
      setExpenses([])
      return
    }
    const run = async () => {
      const data = await getExpenses(wallet as NodeWallet)
      setExpenses(data)
    }
    run()
  }, [wallet])
```
Here, we're calling the `getExpenses` function which we have defined in [/app/utils/program/getExpenses.ts](/app/utils/program/getExpenses.ts).
When we get the data, we're storing it in our expenses state, which is being rendered at the bottom as a table from Chakra UI components

##### 2.2
Finally, the chart which you see on the right side is defined in [/app/components/DistributionChart.tsx](/app/components/DistributionChart.tsx).
Using the `chart.js` library, we're passing the same data we get from `getExpenses`, filtering it a bit to be entered in Chart.js' data format and returning a simple Doughnut chart.


### How to Build & Run

1. You would need to deploy the program on Solana blockchain first. You can either:
    - Click on the [Solana Playground](https://beta.solpg.io/645acbc1d6ebe745da20439e) link and deploy it 
    - Install [Anchor](https://www.anchor-lang.com/), Rust and Solana CLI. Then head over to `/anchor-program` directory and follow instructions from Anchor docs to deploy the program to devnet.

2. To launch the frontend, head over to `/app` directory and enter: `yarn install && yarn dev`

### Diagrams
![](./assets/create_expense.png)
![](./assets/delete_expense.png)