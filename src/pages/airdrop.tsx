import React, { useEffect, useState } from "react";
import { useWalletKit } from "@mysten/wallet-kit";
import { useStakings } from "../context";

const emptyArr = Array(10).fill(0);
export const AirdropPage = () => {
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
            Leaderboard
          </h1>
        </div>

        <p className="max-w-[690px] my-[5px]">
          See where you stack against the best.
        </p>

        <div className="w-[100%] xl:w-[1000px]">
          <div className="relative rounded-lg bg-tbBg text-white border border-thColor">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-thColor uppercase border-b border-b-thColor">
                <tr>
                  <th scope="col" className="p-[16px]">
                    #
                  </th>

                  <th scope="col" className="px-[24px] py-3 text-center">
                    Address
                  </th>
                  <th scope="col" className="px-[24px] py-3 text-center">
                    Total Deposit
                  </th>
                  <th scope="col" className="px-[24px] py-3 text-center">
                    Total Rewards
                  </th>
                  <th scope="col" className="px-[24px] py-3 text-center">
                    Total Users
                  </th>
                  <th scope="col" className="px-[24px] py-3 text-center">
                    Total Score
                  </th>
                </tr>
              </thead>

              <tbody className="border-b border-b-thColor">
                {state["accounts"].map(
                  (account, index) =>
                    Math.trunc(index / 10) === pageNumber && (
                      <tr className="text-white" key={index}>
                        <td className="w-[16px] p-[16px]">{index + 1}</td>

                        <th className="px-[24px] py-[16px] font-medium whitespace-nowrap text-center">
                          {account["address"]?.slice(0, 4) +
                            "..." +
                            account["address"]?.slice(-4)}
                        </th>
                        <td className="px-[24px] py-[16px] text-center">
                          {account["totalDeposit"]} SUI
                        </td>
                        <td className="px-[24px] py-[16px] text-center">
                          {account["totalRewards"]} SUI
                        </td>
                        <td className="px-[24px] py-[16px] text-center">
                          {account["totalUsers"]}
                        </td>
                        <td className="px-[24px] py-[16px] text-center">
                          {account["totalscore"]}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>

            <div className="w-full flex flex-row gap-10 items-center justify-between py-10 px-20">
              <div className="flex flex-row items-center justify-center text-thColor"></div>
              <div className=" flex flex-row gap-10 items-center py-10 px-20">
                <div
                  className="w-40 h-40 flex flex-row items-center justify-center bg-[#5137EE] rounded-md cursor-pointer"
                  onClick={() => {
                    setPageNumber(0);
                  }}
                >
                  1
                </div>

                <div
                  className={`w-40 h-40 flex flex-row items-center justify-center bg-[#232358] hover:bg-[#5137EE] rounded-md cursor-pointer ${
                    state["accounts"].length < 10 && "hidden"
                  }`}
                  onClick={() => {
                    setPageNumber(1);
                  }}
                >
                  2
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
