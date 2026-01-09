import { createFileRoute } from "@tanstack/react-router"
export const Route = createFileRoute("/_public/vs-human")({
    component: HumanVsComputer,
})
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

import { useState } from "react"
import { Chess, Square } from "chess.js"
import { Chessboard } from "react-chessboard"

import { useDispatch } from "react-redux"
import { clearGame } from "../../slices/gameSlice"
import { Button } from "@/components/ui/button"
import { HistoryCard } from "@/components/Game/GameComponents/HistoryCard"

function HumanVsComputer() {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const [game] = useState(new Chess())
    const [position, setPosition] = useState("start")
    const [history, setHistory] = useState<string[]>([])

    function resetGame() {
        game.reset()
        setPosition("start")
        setHistory([])
        dispatch(clearGame())
    }

    function isOver() {
        if (game.in_checkmate()) {
            const winner = game.turn() === "w" ? "Black" : "White"
            return { title: `${winner} wins`, description: `${winner} won the game by checkmate.` }
        } else if (game.in_draw()) {
            return { title: "Draw", description: "It's a draw." }
        } else if (game.in_stalemate()) {
            return { title: "Stalemate", description: "The king has no moves." }
        } else if (game.in_threefold_repetition()) {
            return { title: "Draw", description: "Draw by repetition." }
        } else {
            return false
        }
    }

    function onDrop(sourceSquare: Square, targetSquare: Square) {
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
        })

        if (move === null) {
            return false
        }

        setPosition(game.fen())
        setHistory((prev) => [...prev, move.san])

        const over = isOver()
        if (over) {
            dispatch(clearGame())
            toast({
                title: over.title,
                description: over.description,
                action: (
                    <ToastAction
                        onClick={() => {
                            window.location.reload()
                        }}
                        altText="Game over"
                    >
                        Play again
                    </ToastAction>
                ),
            })
            return false
        }
        return true
    }

    return (
        <ResizablePanelGroup direction="horizontal" className="max-w-full rounded-lg border flex-1">
            <ResizablePanel defaultSize={70}>
                <div className="flex h-full items-center justify-center p-6">
                    <div className="flex flex-col justify-center items-center gap-4">
                        <div className="w-[600px]">
                            <Chessboard
                                id="PlayVsRandom"
                                position={position}
                                onPieceDrop={onDrop}
                                // arePremovesAllowed={true}
                                customDarkSquareStyle={{ backgroundColor: "#739451" }}
                                customLightSquareStyle={{ backgroundColor: "#ecedd1" }}
                                customBoardStyle={{
                                    borderRadius: "10px",
                                    boxShadow: "0 5px 30px rgb(115, 148, 81)                                    ",
                                }}
                            />
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger className="dark" asChild>
                                <Button variant="destructive">Resign</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Resign from game?</AlertDialogTitle>
                                    <AlertDialogDescription>Are you sure you want to resign? The game will be reset and you can start a new game.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={resetGame}>
                                        Resign
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={30}>
                <div className="flex h-full items-center justify-center p-6">
                    <HistoryCard history={history} />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
