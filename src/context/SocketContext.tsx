import { createContext, useState, useEffect, useContext } from "react"
import io from "socket.io-client"
import { useSelector } from "react-redux"
import type { RootState } from "../store"

const SocketContext = createContext(null)

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }: any) => {
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { userInfo } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        if (userInfo) {
            const newSocket: any = io("http://localhost:3000", {
                query: {
                    userId: userInfo._id,
                },
            })

            setSocket(newSocket)

            // socket.on() is used to listen to the events. can be used both on client and server side
            newSocket.on("getOnlineUsers", (users: any) => {
                setOnlineUsers(users)
            })

            return () => {
                newSocket.close()
            }
        } else {
            setSocket(null)
        }
    }, [userInfo])

    return <SocketContext.Provider value={{ socket, onlineUsers } as any}>{children}</SocketContext.Provider>
}
