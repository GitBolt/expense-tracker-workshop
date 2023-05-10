# Expense Tracker

## 🎬 Recorded Sessions
| Link | Instructor | Event |
| ---- | ---------- | ----- |
| Coming Soon | - | - |

## ☄️ Open in Solana Playground IDE
| Program | Link |
| -------------------- | --------------------------------------- |
| Expense Tracker | [ ![program](https://ik.imagekit.io/mkpjlhtny/solpg_button_zWM8WlPKs.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1662621556513)](https://beta.solpg.io/645acbc1d6ebe745da20439e) |


## 📗 Learn

In this workshop, we'll understand PDAs and their uses in Solana by creating a simple expense tracking app.

The app has a simple UI to connect wallet and view your expenses in tabular form and a distribution chart. You can add new expenses, update existing ones, or delete them.

Each expense is a PDA (Program Derived Address), owned by the user who creates them. Head over to [Diagrams](###diagrams) to understand it in depth.

### PDAs
A Program Derived Address (PDA) is an account whose public key is created using an algorithm based on the program's address. Unlike regular accounts, PDAs don't have private keys and can perform actions without needing signatures from clients or user wallets.

To create a PDA, we need to provide "seeds" which are external data as bytes. Seeds can be any data like wallet address, string, or unique ID. PDAs are deterministic, which means we can create and derive them again and again using the same seeds. We can perform actions for our PDA accounts using the derived public key.

Seeds often include a unique ID which is helpful when dealing with our expense entry data. By using the unique ID of an expense entry, we can easily derive its PDA and get the on-chain account by passing the ID in seeds.

In our case, we are using PDAs as separate accounts that are owned by the user. The user has authority over controlling these PDA accounts, which represent individual expense entry data.

> Note: PDAs are **derived** using an algorithm, we can get them using PublicKey.findProgramAddressSync from `@solana/web3.js`. PDAs are NOT fetched from on-chain data, only accounts are **fetched**.

### How to Build & Run

1. You would need to deploy the program on Solana blockchain first. You can either:
    - Click on the [Solana Playground](https://beta.solpg.io/645acbc1d6ebe745da20439e) link and deploy it 
    - Install [Anchor](https://www.anchor-lang.com/), Rust and Solana CLI. Then head over to `/anchor-program` directory and follow instructions from Anchor docs to deploy the program to devnet.

2. To launch the frontend, head over to `/app` directory and enter: `yarn install && yarn dev`

### Diagrams
![](./assets/create_expense.png)
![](./assets/delete_expense.png)