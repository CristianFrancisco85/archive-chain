import { useEffect, useState } from "react"
import { metaMask, useMetaMask } from "../connectors/metaMask"
import { IconButton } from "@mui/material"
import { Wallet } from "@mui/icons-material"

export const MetaMaskBtn = () => {
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { useAccount } = useMetaMask

  const account = useAccount()


  useEffect(() => {
    const init = async () => {
      try {
        onConnectMetaMask()
      }
      catch (error) {
        console.log(error)
      }
    }
    init()
  }, [])

  const onConnectMetaMask = async () => {
    const chainId = 11155111
    try {
        setLoading(true)
        setError(false)
        try {
          await metaMask.activate(chainId)
        } catch (err) {
          console.log("User rejected the request", err)
          setError(true)
        }
        setLoading(false)
      
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <IconButton
        size="large"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={onConnectMetaMask}
        color="inherit"
    >

      { 
        account ? <Wallet color='success' fontSize='large'/> : 
        error   ? <Wallet color='error' fontSize='large'/> : 
        loading ? <Wallet color='warning' fontSize='large'/> : 
        <Wallet fontSize='large'/>
      }
        
    </IconButton>
  )
}