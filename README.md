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

The app has a simple UI to connect wallet and view your expenses in tabular form. You can add new expenses or delete existing ones.

Each expense is a PDA (Program Derived Address), owned the user who creates them. Head over to [Diagrams](###diagrams) to understand in depth.


### How to Build & Run

1. You would need to deploy the program on Solana blockchain first. You can either:
    - Click on the [SolPg](https://beta.solpg.io/645acbc1d6ebe745da20439e) link and deploy it 
    - Install [Anchor](https://www.anchor-lang.com/), Rust and Solana CLI. Then head over to `/anchor-program` directory. Following anchor instructions, build and deploy your program to devnet.

2. To launch the frontend: `yarn install && yarn dev` (in the `app/` directory).

### Diagrams
![](./assets/create_expense.png)
![](./assets/delete_expense.png)