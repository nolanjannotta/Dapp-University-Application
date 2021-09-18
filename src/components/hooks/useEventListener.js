import {useEffect, useState} from "react"
import useContract from "./useEventListener";


const useEventListener = (eventName, handler) => {
    const { contract } = useContract()
    
    useEffect(() => {

            contract.on(eventName, handler);    
    
          return () => {
            
            contract.removeListener(eventName, handler)
            
        }
    }, [])
    






}

export default useEventListener;