import * as anchor from '@project-serum/anchor'
import { PublicKey } from '@solana/web3.js';
import { DEVNET_RPC } from './constants';
import { IDLData, IDLType } from "@/util/idl";


export const getProvider = (wallet: anchor.Wallet, rpc_url?: string) => {
  const opts = {
    preflightCommitment: 'processed' as anchor.web3.ConfirmOptions,
  };
  const connectionURI =
    rpc_url || process.env.NEXT_PUBLIC_RPC_URL || DEVNET_RPC

  const connection = new anchor.web3.Connection(
    connectionURI,
    opts.preflightCommitment
  );
  const provider = new anchor.AnchorProvider(
    connection,
    wallet,
    opts.preflightCommitment
  );
  return provider;
};

export const anchorProgram = (wallet: anchor.Wallet, network?: string) => {
  const provider = getProvider(wallet, network);
  const idl = IDLData as anchor.Idl;
  const program = new anchor.Program(
    idl,
    new PublicKey(IDLData.metadata.address),
    provider
  ) as unknown as anchor.Program<IDLType>;

  return program;
};