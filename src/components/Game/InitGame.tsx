import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Shuffle } from "lucide-react"

import { Input } from "@/components/ui/input"
import { useState } from "react"
import socket from "../../socket"
import { Button } from "@/components/ui/button"

export function InitGame({ orientation, setRoom, setOrientation, setPlayers }: any) {
    const [roomInput, setRoomInput] = useState("")

    function createGame() {
        const finalOrientation = orientation || "white"
        if (!orientation) {
            setOrientation(finalOrientation)
        }
        socket.emit("createRoom", { orientation: finalOrientation }, (roomId: any) => {
            setRoom(roomId)
        })
    }

    function joinGame() {
        if (!roomInput) return
        socket.emit("joinRoom", { roomId: roomInput }, (roomData: any) => {
            if (roomData.error) {
                console.log(roomData.message)
                return
            }
            setRoom(roomData?.roomId)
            setPlayers(roomData?.players)

            // Get the opposite orientation of the game creator
            const creatorOrientation = roomData.players[0].orientation
            setOrientation(creatorOrientation === "white" ? "black" : "white")
        })
    }
    return (
        <div className="flex justify-center items-center flex-1 overflow-auto-y">
            <Card className="w-[900px] h-96 flex flex-col items-center">
                <CardHeader>
                    <CardTitle>Play Online with your friend</CardTitle>
                </CardHeader>
                <CardContent className="my-10 w-[500px]">
                    <ToggleGroup
                        value={orientation}
                        onValueChange={(value) => {
                            if (value === "random") {
                                const randomOrientation = Math.random() < 0.5 ? "black" : "white"
                                setOrientation(randomOrientation)
                            } else if (value) {
                                setOrientation(value)
                            }
                        }}
                        size={"lg"}
                        variant="outline"
                        type="single"
                    >
                        <ToggleGroupItem value="white" aria-label="Toggle white">
                            White
                        </ToggleGroupItem>

                        <ToggleGroupItem value="black" aria-label="Toggle black">
                            Black
                        </ToggleGroupItem>
                        <ToggleGroupItem value="random" aria-label="Toggle random">
                            <Shuffle />
                        </ToggleGroupItem>
                    </ToggleGroup>
                    <Button className="w-96 my-4" variant="outline" onClick={createGame}>
                        Create Game
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
