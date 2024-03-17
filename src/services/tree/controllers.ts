import { ICtrl } from "../../types/controller";
import { InCollect, OutCollect } from "./interfaces";
import { JsonRpcProvider, Wallet } from "ethers";
import { getContracts } from "@ultralane/sdk";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

export const Collect: ICtrl<OutCollect, InCollect> = async (req) => {
  const body = req.body;
  let rpc_url_base;
  switch (body.chainId) {
    case "421614":
      rpc_url_base = `https://arb-sepolia.g.alchemy.com/v2/`;
      break;
    case "11155420":
      rpc_url_base = `https://opt-sepolia.g.alchemy.com/v2/`;
      break;
  }
  let rpc = `${rpc_url_base}${ALCHEMY_API_KEY}`;
  let provider = new JsonRpcProvider(rpc);
  let wallet = new Wallet(process.env.PRIVATE_KEY as string, provider);
  let tx = await wallet.sendTransaction({ to: body.to, data: body.data });
  return { txHash: tx.hash };
};
