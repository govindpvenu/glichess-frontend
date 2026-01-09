import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
//

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
// import { toast } from "react-toastify"

import { useCallback, useEffect, useState, useMemo } from "react"
import { Chess, Square } from "chess.js"
import { Chessboard } from "react-chessboard"
import socket from "../../socket"
import type { RootState } from "../../store"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { HistoryCard } from "@/components/Game/GameComponents/HistoryCard"
import { useUpdateWinsMutation } from "../../slices/gameApiSlice"
import Timer from "./GameComponents/Timer"
import { Link } from "@tanstack/react-router"

export function PlayGame({ players, room, orientation }: any) {
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const [gaveOver, setGameOver] = useState(false)
    const [game] = useState(new Chess())
    const [, forceUpdate] = useState(0) // Used to trigger re-render when turn changes
    const [updateWins] = useUpdateWinsMutation()

    const [position, setPosition] = useState("start")

    const { toast } = useToast()

    const updateWinsAsync = useCallback(async () => {
        if (userInfo?.email) {
            await updateWins({ email: userInfo.email }).unwrap()
        }
    }, [userInfo?.email, updateWins])

    const isOver = useCallback(() => {
        if (game.in_checkmate()) {
            updateWinsAsync()
            return { title: "White wins", description: `${game.turn() === "w" ? "Black" : "White"} won the game by checkmate.` }
        } else if (game.in_draw()) {
            return { title: "Draw", description: "It's a draw." }
        } else if (game.in_stalemate()) {
            return { title: "Stalemate", description: "The king has no moves." }
        } else if (game.in_threefold_repetition()) {
            return { title: "Draw", description: "Draw by repetition." }
        } else {
            return false
        }
    }, [game, updateWinsAsync])

    const makeAMove = useCallback(
        (move: any) => {
            try {
                const result = game.move(move) // update Chess instance
                setPosition(game.fen()) // update fen state to trigger a re-render

                const over = isOver()
                if (over) {
                    setGameOver(true)
                }

                return result
            } catch (e) {
                return null
            } // null if the move was illegal, the move object if the move was legal
        },
        [game, isOver]
    )

    function onDrop(sourceSquare: Square, targetSquare: Square) {
        console.log("Ondrop")
        if (game.turn() !== orientation[0]) {
            toast({
                title: "Uh oh! wrong moves.",
                description: "That was illegal move..",
                action: <ToastAction altText="Try another">Try another</ToastAction>,
            })
            return false
        } // <- 1 prohibit player from moving piece of other player

        if (players.length < 2) {
            toast({
                title: "Uh oh! .",
                description: "Opponent not joined.",
                action: <ToastAction altText="Try another">Try another</ToastAction>,
            })
            return false
        } // <- 2 disallow a move if the opponent has not joined

        const moveData = {
            from: sourceSquare,
            to: targetSquare,
            color: game.turn(),
            promotion: "q", // promote to queen where possible
        }

        const move = makeAMove(moveData)

        // illegal move
        if (move === null) {
            toast({
                title: "Uh oh! wrong moves.",
                description: "That was illegal move..",
                action: <ToastAction altText="Try another">Try another</ToastAction>,
            })
            return false
        }

        socket.emit("move", {
            // <- 3 emit a move event.
            move,
            room,
        }) // this event will be transmitted to the opponent via the server

        return true
    }

    useEffect(() => {
        socket.on("move", (move) => {
            makeAMove(move)
            forceUpdate((n) => n + 1) // Trigger re-render to update timer state
        })
        return () => {
            socket.off("move")
        }
    }, [makeAMove])

    // Create stable timer expiry timestamps that don't change on re-render
    const whiteTimerExpiry = useMemo(() => {
        const time = new Date()
        time.setSeconds(time.getSeconds() + 600) // 10 minutes
        return time
    }, [])

    const blackTimerExpiry = useMemo(() => {
        const time = new Date()
        time.setSeconds(time.getSeconds() + 600) // 10 minutes
        return time
    }, [])

    // Determine which timer should be running based on game turn
    const isWhiteTurn = game.turn() === "w"

    return (
        <ResizablePanelGroup direction="horizontal" className="max-w-full rounded-lg border">
            <ResizablePanel defaultSize={70}>
                <div className="flex items-center justify-center">
                    <div className="flex-col justify-center items-center">
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">Game ID: {room}</p>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => {
                                    navigator.clipboard.writeText(room)
                                    toast({
                                        title: "Copied!",
                                        description: "Game ID copied to clipboard.",
                                    })
                                }}
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="font-semibold">You are playing as {orientation}</p>
                        <div className="my-5">
                            {/* Opponent's timer (top) */}
                            <Timer expiryTimestamp={orientation === "white" ? blackTimerExpiry : whiteTimerExpiry} state={orientation === "white" ? !isWhiteTurn : isWhiteTurn} />
                        </div>

                        <div className="w-[700px] h-auto">
                            <Chessboard
                                id="PlayVsRandom"
                                position={position}
                                boardOrientation={orientation}
                                onPieceDrop={onDrop}
                                customDarkSquareStyle={{ backgroundColor: "#739451" }}
                                customLightSquareStyle={{ backgroundColor: "#ecedd1" }}
                                customBoardStyle={{
                                    borderRadius: "10px",
                                    boxShadow: "0 5px 30px rgb(115, 148, 81)",
                                }}
                            />
                        </div>

                        {/* Your timer (bottom) */}
                        <Timer expiryTimestamp={orientation === "white" ? whiteTimerExpiry : blackTimerExpiry} state={orientation === "white" ? isWhiteTurn : !isWhiteTurn} />

                        <AlertDialog open={gaveOver}>
                            <AlertDialogTrigger></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>{orientation === "white" ? "White" : "Black"} Wins</AlertDialogTitle>
                                    <AlertDialogDescription> {orientation === "white" ? "White" : "Black"} won the game by checkmate.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        <Link to="/" className="w-full">
                                            <Button className="w-full" variant="ghost">
                                                Home
                                            </Button>
                                        </Link>
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => {
                                            window.location.reload()
                                        }}
                                    >
                                        Play again
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                            <AlertDialogTrigger className="my-9 mx-5 dark " asChild>
                                <Button variant="destructive">Resign</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                                    <AlertDialogAction
                                        onClick={() => {
                                            window.location.reload()
                                        }}
                                    >
                                        Continue
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={100}>
                        <div className="flex h-full items-center justify-center">
                            <HistoryCard history={game.history()} />
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
