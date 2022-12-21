import { createContext } from "react";
import {io} from 'socket.io-client'

// export const socket = io('http://localhost:8800')
export const socket = io('http://happynest.tk',{path:"/socket/socket.io"})

export const SocketContext = createContext()



function SocketProvider({children}) {
    return (
      <SocketContext.Provider value={socket}>
  
      </SocketContext.Provider>
    )
  }
  
  export default SocketProvider