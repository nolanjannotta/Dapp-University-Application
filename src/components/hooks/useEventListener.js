import {useEffect, useState} from "react"
import useContract from "./useEventListener";


const useEventListener = (eventName, handler) => {
    const { contract, cDaiContract, LendingPoolContract } = useContract()
    
    useEffect(() => {

        LendingPoolContract.on(eventName, handler);    
    
          return () => {
            
            LendingPoolContract.removeListener(eventName, handler)
            
        }
    }, [])
    






}

export default useEventListener;