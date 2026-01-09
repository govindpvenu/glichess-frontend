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

    function isOver() {
        if (game.in_checkmate()) {
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
        <ResizablePanelGroup direction="horizontal" className="max-w-full rounded-lg border">
            <ResizablePanel defaultSize={70}>
                <div className="flex h-full items-center justify-center">
                    <div className="flex-col justify-center items-center h-full">
                        <div className="w-[700px] h-auto">
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
                            <AlertDialogTrigger className="my-9 dark" asChild>
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
                                            dispatch(clearGame())
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
                <div className="flex h-full items-center justify-center p-6">
                    <HistoryCard history={history} />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
