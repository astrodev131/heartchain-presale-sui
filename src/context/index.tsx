import React, { createContext, useContext, useReducer } from "react";
// import { db } from "./firebase.config";
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";

const StakingContext = createContext(null);

export const useStakings = () => useContext(StakingContext);

const INIT_STATE = {
  // Wallet varible
  balance: "0.000",
  // Stake Variable
  totalStaked: "Loading...",
  lastRewardTime: "Loading...",
  accruedToken: "Loading...",
  allocationProfit: "Loading...",
  // Referral Variable
  totalTradingValume: "0",
  totalReward: "0",
  totalUsers: "0",
  unclaimedSui: "0",
  // Airdrop variable
  accounts:[]
};

const reducer = (state: any, { type, payload }: any) => {
  return {
    ...state,
    [type]: payload,
  };
};

const writeAccount = async (
  address,
  totalDeposit,
  totalRewards,
  totalUsers
) => {
  try {
    let totalScore = parseFloat((parseFloat(totalDeposit) * 2+parseFloat(totalRewards)*1.5+parseFloat(totalUsers)).toFixed(3));
    // await setDoc(doc(db, "Accounts", address), {
    await setDoc(doc(undefined, "Accounts", address), {
      address: address,
      totalDeposit: totalDeposit,
      totalRewards: totalRewards,
      totalUsers: totalUsers,
      totalscore: totalScore,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.log(error)
  }
};

const readAccounts = async () => {
  try {
    const collectionRef = collection(undefined, "Accounts");
    const q = query(collectionRef, orderBy("totalscore"));
    const res = await getDocs(q);
    const accounts = res.docs;
    const results = [];
    accounts.map((account)=>{
      results.push(account.data());
    })
    return results.slice(0,20).reverse();
  } catch (error) {
    return []
  }
};

export default function Provider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const changeVariable = (key: any, value: any) => {
    dispatch({
      type: key,
      payload: value,
    });
  };
  return (
    <StakingContext.Provider value={{ state, changeVariable,writeAccount,readAccounts }}>
      {children}
    </StakingContext.Provider>
  );
}
