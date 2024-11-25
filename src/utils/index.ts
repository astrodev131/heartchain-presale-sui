import BigNumber from 'bignumber.js';
import { Connection, JsonRpcProvider } from "@mysten/sui.js";

export const parseSuiRawDataToFarms = (
  x: ReadonlyArray<ReadonlyArray<BigInt>>
) =>
  x.map((elem: ReadonlyArray<BigInt>) => ({
    allocationPoints: BigNumber(elem[0].toString()),
    totalStakedAmount: BigNumber(elem[1].toString()),
    accountBalance: BigNumber(elem[2].toString()),
  }));

export const convertTimestampToDateFormat = (timestamp) => {
  if (timestamp) {
    const dateTimeStr = new Date(parseInt(timestamp)).toLocaleDateString("en-CA")
    return dateTimeStr;
  } else {
    return "";
  }
}


export const limitDecimalsWithoutRounding = (val, decimals) => {
  let parts = val.toString().split(".");
  return parseFloat(parts[0] + "." + parts[1].substring(0, decimals));
}

export const getProvider = () => {
  return new JsonRpcProvider(
    new Connection({
      fullnode: "https://wallet-rpc.devnet.sui.io/",
      websocket: "wss://fullnode.devnet.sui.io:443",
      faucet: "https://faucet.devnet.sui.io/gas",
    }))
} 


export const convertFloat = (input:any) => {
  return input?parseFloat(input.toFixed(3)).toString():"0";
} 

