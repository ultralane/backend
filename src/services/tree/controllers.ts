import { ICtrl } from "../../types/controller";
import { InCollect, InSend, OutCollect, OutSend } from "./interfaces";
import { AddressLike, JsonRpcProvider, Wallet } from "ethers";
import { Field, Transaction, getContracts } from "@ultralane/sdk";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const getRPCUrl = (chainId: string) => {
  let rpc_url_base;
  switch (chainId) {
    case "421614":
      rpc_url_base = `https://arb-sepolia.g.alchemy.com/v2/`;
      break;
    case "11155420":
      rpc_url_base = `https://opt-sepolia.g.alchemy.com/v2/`;
      break;
    case "11155111":
      rpc_url_base = `https://eth-sepolia.g.alchemy.com/v2/`;
      break;
  }
  return `${rpc_url_base}${ALCHEMY_API_KEY}`;
};

export const Collect: ICtrl<OutCollect, InCollect> = async (req) => {
  const body = req.body;
  let rpc = getRPCUrl(body.chainId);
  let provider = new JsonRpcProvider(rpc);
  let wallet = new Wallet(process.env.PRIVATE_KEY as string, provider);
  let tx = await wallet.sendTransaction({ to: body.to, data: body.data });
  return { txHash: tx.hash };
};

export const Send: ICtrl<OutSend, InSend> = async (req) => {
  let body = req.body;
  let publicInputs = body.publicInputs;
  let proof = new Uint8Array(JSON.parse(body.proof));
  let rpc = getRPCUrl(body.chainId);
  console.log({ publicInputs, proof, rpc });
  let status = await Transaction.verify({ publicInputs, proof }, 16);
  if (status) {
    let provider = new JsonRpcProvider(rpc);
    let wallet = new Wallet(process.env.PRIVATE_KEY as string, provider);
    let { ultralane } = await getContracts(wallet);
    let num = Field.from(publicInputs[1]);
    if (num.isNeg()) {
      num = num.neg();
    }
    let tx = await ultralane.crosschainTransact(
      body.withdrawAddress,
      num.hex(),
      [body.nullifiers[0], body.nullifiers[0]],
      publicInputs[5]
    );
    return { txHash: tx.hash };
  }
  return { txHash: "0x" };
};
