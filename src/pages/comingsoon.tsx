import React, { useEffect, useState } from "react";
import { useWalletKit } from "@mysten/wallet-kit";
import { useStakings } from "../context";

const emptyArr = Array(10).fill(0);
export const ComingsoonPage = () => {
  const { currentAccount } = useWalletKit();
  const { state, changeVariable, readAccounts } = useStakings();

  const [logDays, setLogDays] = useState<number>(7);
  const [pageNumber, setPageNumber] = useState<number>(0);

  useEffect(() => {
    const update = async () => {
      let accounts = await readAccounts();
      changeVariable("accounts", accounts);
    };
    update();
  }, []);

  // ---------- Get Farming details -----------

  useEffect(() => {}, [currentAccount]);

  return (
    <>
      <div className=" mx-auto max-w-[954px] p-[20px]">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-[35px] sm:text-[48px] flex flex-row items-center gap-x-[20px]">
            Coming Soon!
          </h1>
        </div>

        <p className="max-w-[690px] my-[5px] text-center">
          Go Home
        </p>

      </div>
    </>
  );
};
