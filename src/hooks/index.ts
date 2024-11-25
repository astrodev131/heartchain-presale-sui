import { TransactionBlock } from '@mysten/sui.js';
import { bcsForVersion } from '@mysten/sui.js';
import { LAMPORT, OBJECT_RECORD } from "../config"
import {
    convertFloat,
    getProvider,
    parseSuiRawDataToFarms,
} from '../utils';
import { useEffect, useMemo, useState } from 'react';
import { useWalletKit } from '@mysten/wallet-kit';
import BigNumber from 'bignumber.js';
import { useStakings } from '../context';

export const useGetBalance = (account: string, updateNumber: number) => {
    const { changeVariable } = useStakings();
    const [data, setAccountBalance] = useState<string>("0");

    useEffect(() => {
        const getbalance = async () => {
            if (account === OBJECT_RECORD.ADDRESSZERO)
                setAccountBalance("0");
            else {
                const provider = getProvider();
                let accountBalance = await provider.getBalance({ owner: account });
                let balanceValue = convertFloat(BigNumber(accountBalance?.totalBalance).dividedBy(LAMPORT));
                changeVariable("balance", balanceValue);
                setAccountBalance(balanceValue);
            }
        }
        getbalance();
    }, [account, updateNumber])
    return data;
}

export const useGetFarm = (id: string, account: string, updateNumber: number) => {

    const [data, setdata] = useState<{}>(NaN);

    useMemo(() => {
        const getFarms = async () => {
            const txb = new TransactionBlock();
            txb.moveCall({
                target: `${OBJECT_RECORD.PACKAGEID}::interface::get_farms`,
                arguments: [
                    // txb.object(OBJECT_RECORD.MASTERCHEFSTORAGE),
                    // txb.object(OBJECT_RECORD.MASTERCHEFACCOUNTSTORAGE),
                    txb.pure(account || OBJECT_RECORD.ADDRESSZERO),
                    txb.pure(1),
                ],
                typeArguments: [id, id, id, id, id],
            });

            let provider = getProvider();
            const result = await provider.devInspectTransactionBlock({
                transactionBlock: txb,
                sender: account || OBJECT_RECORD.ADDRESSZERO,
            });

            const returnValues = result!["results"]![0]!["returnValues"]![0];

            if (!returnValues) return [];
            const bcs = bcsForVersion(await provider.getRpcApiVersion());
            let data = parseSuiRawDataToFarms(
                bcs.de(returnValues[1], Uint8Array.from(returnValues[0]))
            );
            setdata(data);
        }
        getFarms()
    }, [id, account, updateNumber])

    return data;
};

export const getAccount = async (account) => {
    const txb = new TransactionBlock();
    txb.moveCall({
        target: `${OBJECT_RECORD.PACKAGEID}::master_chef::get_account_detail`,
        arguments: [
            // txb.object(OBJECT_RECORD.MASTERCHEFSTORAGE),
            // txb.object(OBJECT_RECORD.MASTERCHEFACCOUNTSTORAGE),
            txb.pure(account || OBJECT_RECORD.ADDRESSZERO),
        ],
        typeArguments: [],
    });
    let provider = getProvider();
    const result = await provider.devInspectTransactionBlock({
        transactionBlock: txb,
        sender: account || OBJECT_RECORD.ADDRESSZERO,
    });

    if (result!["results"]) {

        const returnValues = result!["results"]![0]!["returnValues"];
        let totalStaked = bcsForVersion(await provider.getRpcApiVersion()).de(
            returnValues![0]![1],
            Uint8Array.from(returnValues![0]![0])
        );

        let totalRewards = bcsForVersion(await provider.getRpcApiVersion()).de(
            returnValues![3]![1],
            Uint8Array.from(returnValues![3]![0])
        );

        let totalUsers = bcsForVersion(await provider.getRpcApiVersion()).de(
            returnValues![2]![1],
            Uint8Array.from(returnValues![2]![0])
        );

        let unclaimedRewards = bcsForVersion(await provider.getRpcApiVersion()).de(
            returnValues![4]![1],
            Uint8Array.from(returnValues![4]![0])
        );

        const results = {
            TotalStaked: convertFloat(totalStaked / LAMPORT),
            TotalRewards: convertFloat(totalRewards / LAMPORT),
            TotalUsers: totalUsers,
            UnclaimedRewards: convertFloat(unclaimedRewards / LAMPORT),
        }
        return results

    } else {
        const results = {
            TotalStaked: 0,
            TotalRewards: 0,
            TotalUsers: 0,
            UnclaimedRewards: 0,
        }
        return results
    }
}
export const useGetAccountInfo = (account: string, updateNumber: number) => {

    const [data, setdata] = useState<{}>(NaN);
    console.log("current -account----------", account);

    useMemo(() => {
        const getAccountInfo = async () => {
            
                const results = await getAccount(account);
                setdata(results);
        }
        getAccountInfo()
    }, [account])

    return data;
};

export const useGetPendingRewards = (
    account: string | null, updateNumber: number
) => {
    const [data, setdata] = useState<any>(0);
    useMemo(() => {
        const getPendingRewards = async () => {

            const txb = new TransactionBlock();
            txb.moveCall({
                target: `${OBJECT_RECORD.PACKAGEID}::master_chef::get_pending_rewards`,
                typeArguments: ["0x2::sui::SUI"],
                // typeArguments: [`${OBJECT_RECORD.PACKAGEID}::ipx::IPX`],
                arguments: [
                    // txb.object(OBJECT_RECORD.MASTERCHEFSTORAGE),
                    // txb.object(OBJECT_RECORD.MASTERCHEFACCOUNTSTORAGE),
                    txb.object(OBJECT_RECORD.CLOCKOBJECT),
                    txb.pure(account || OBJECT_RECORD.ADDRESSZERO),
                ],
            });

            let provider = getProvider();
            const result = await provider.devInspectTransactionBlock({
                transactionBlock: txb,
                sender: account || OBJECT_RECORD.ADDRESSZERO,
            });
            const returnValues = result!["results"]![0]!["returnValues"]![0];

            bcsForVersion(await provider.getRpcApiVersion()).de(
                returnValues[1],
                Uint8Array.from(returnValues[0])
            );

            let total_pending_rewawrds = bcsForVersion(await provider.getRpcApiVersion()).de(
                returnValues[1],
                Uint8Array.from(returnValues[0])
            );
            setdata(total_pending_rewawrds);
        }
        getPendingRewards();
    }, [account, updateNumber])
    return data;
};

export const useStakingMethods = () => {
    const {
        signAndExecuteTransactionBlock,
    } = useWalletKit();

    console.log('debug stake 111========')
    const staking = async (amount:number) => {
        const txb = new TransactionBlock();
        
        const [coin] = txb.splitCoins(txb.gas, [txb.pure(amount)]);
        console.log('debug stake coin', coin)
        const packageObjectId = OBJECT_RECORD.PACKAGEID;
        txb.moveCall({
            target: `${packageObjectId}::presale::contribute`,
            arguments: [
                coin,
                txb.object(OBJECT_RECORD.USERSTATE),
                txb.object(OBJECT_RECORD.TREASURE),
                txb.object(OBJECT_RECORD.PRESALEPOOL),
            ],
            // typeArguments: [],
        });
        // txb.setGasBudget(100000000);
        const tx = await signAndExecuteTransactionBlock({
            transactionBlock: txb,
            // requestType: "WaitForEffectsCert",
            // options: { showEffects: true },
        });
        return tx;
    };

    // const unstaking = async (amount) => {
    //     const txb = new TransactionBlock();
    //     console.log("Starting Staking");
    //     txb.moveCall({
    //         target: `${OBJECT_RECORD.PACKAGEID}::interface::unstake`,
    //         arguments: [
    //             // txb.object(OBJECT_RECORD.MASTERCHEFSTORAGE),
    //             txb.object(OBJECT_RECORD.MASTERCHEFBALANCE),
    //             // txb.object(OBJECT_RECORD.MASTERCHEFACCOUNTSTORAGE),
    //             txb.object(OBJECT_RECORD.IPXSTORAGE),
    //             txb.object(OBJECT_RECORD.CLOCKOBJECT),
    //             txb.pure(amount),
    //         ],
    //         typeArguments: [],
    //     });
    //     txb.setGasBudget(100000000);
    //     const tx = await signAndExecuteTransactionBlock({
    //         transactionBlock: txb,
    //         requestType: "WaitForEffectsCert",
    //         options: { showEffects: true },
    //     });
    //     return tx;
    // };

    const claim = async (amount) => {
        const txb = new TransactionBlock();
        console.log("-------------Starting Withdraw--------------");
        const packageObjectId = OBJECT_RECORD.PACKAGEID;
        txb.moveCall({
            target: `${packageObjectId}::master_chef::donj`,
            arguments: [
                // txb.object(OBJECT_RECORD.MASTERCHEFSTORAGE),
                txb.object(OBJECT_RECORD.MASTERCHEFBALANCE),
                // txb.object(OBJECT_RECORD.MASTERCHEFACCOUNTSTORAGE),
                txb.object(OBJECT_RECORD.CLOCKOBJECT),
            ],
            typeArguments: [],
        });
        txb.setGasBudget(100000000);
        const tx = await signAndExecuteTransactionBlock({
            transactionBlock: txb,
            requestType: "WaitForEffectsCert",
            options: { showEffects: true },
        });
        console.log(tx);
        return tx;
    };

    return { staking, claim };
}


export const useGetPoolInfo = (updateNumber: number) => {
    const [poolInfo, setdata] = useState<{}>();

    const [status, setStatus] = useState('idle');
    
    useEffect(() => {
        const getPoolInfo = async () => {
            setStatus('fetching');
            const txb = new TransactionBlock();
            console.log("updated number", txb);
            txb.moveCall({
                target: `${OBJECT_RECORD.PACKAGEID}::heartchain::getTokenBalance`,
                typeArguments: ["0x2::sui::SUI"],
                arguments: [
                    // txb.object(OBJECT_RECORD.MASTERCHEFSTORAGE),
                ],
            });

            let provider = getProvider();
            const result = await provider.devInspectTransactionBlock({
                transactionBlock: txb,
                sender: OBJECT_RECORD.ADDRESSZERO,
            });

            console.log("get result----")
            const returnValues = result!["results"]![0]!["returnValues"];
            console.log("get result----")
            let allocationPoints = bcsForVersion(await provider.getRpcApiVersion()).de(
                returnValues![0]![1],
                Uint8Array.from(returnValues![0]![0])
            );

            let lastRewardTimeStamp = bcsForVersion(await provider.getRpcApiVersion()).de(
                returnValues![1]![1],
                Uint8Array.from(returnValues![1]![0])
            );

            let accruedIPXPerShare = bcsForVersion(await provider.getRpcApiVersion()).de(
                returnValues![2]![1],
                Uint8Array.from(returnValues![2]![0])
            );

            let balanceValue = bcsForVersion(await provider.getRpcApiVersion()).de(
                returnValues![3]![1],
                Uint8Array.from(returnValues![3]![0])
            );

            const results = {
                AllocationPoints: allocationPoints,
                LastRewardTimeStamp: lastRewardTimeStamp,
                AccruedIPXPerShare: accruedIPXPerShare,
                BalanceValue: BigNumber(balanceValue).dividedBy(LAMPORT),
            }
            console.log("result---", results);
            setdata(results);
            setStatus('fetched');
        }
        getPoolInfo();
    }, [updateNumber])
    return { status, poolInfo };
};