import { Contract } from "ethers";
import ArchiveChainArtifact from "../artifacts/ArchiveChain";
import { useMemo } from "react";
import { useMetaMask } from "../connectors/metaMask";
import { useWeb3React } from "@web3-react/core";


export function useContract() {

    const {useChainId,useIsActive,useProvider} = useMetaMask
    const chainId = useChainId()
    const isActive = useIsActive()
    const provider = useProvider()
    const {abi,address} = ArchiveChainArtifact
    

    const contract = useMemo(() => {
        if (isActive && chainId) {
            return new Contract(address, abi, provider?.getSigner())
        }
    }, [isActive, chainId])

    return contract
    

}

export default useContract