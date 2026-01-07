import { createFileRoute } from "@tanstack/react-router"
import { useCallback, useEffect, useState } from "react"
export const Route = createFileRoute("/_private/game")({
    component: Game,
})
import socket from "../../socket"
import { useSelector } from "react-redux"
import type { RootState } from "../../store"
import { InitGame } from "@/components/Game/InitGame"
import { PlayGame } from "@/components/Game/PlayGame"

function Game() {
    const { userInfo } = useSelector((state: RootState) => state.auth)

    const [room, setRoom] = useState("")
    const [orientation, setOrientation] = useState("")
    const [players, setPlayers] = useState([])

    const cleanup = useCallback(() => {
        setRoom("")
        setOrientation("")
        setPlayers([])
    }, [])

    useEffect(() => {
        if (userInfo?.username) {
            socket.emit("username", userInfo.username)
            socket.on("opponentJoined", (roomData: any) => {
                setPlayers(roomData.players)
            })
            return () => {
                socket.off("opponentJoined")
            }
        }
    }, [userInfo?.username])

    return room ? (
        <PlayGame
        room={room}
        orientation={orientation}
        username={userInfo?.username}
        players={players}
        cleanup={cleanup}
        />
    ) : (
        <InitGame
        orientation={orientation}
        setRoom={setRoom}
        setOrientation={setOrientation}
        setPlayers={setPlayers} />
    )
}
