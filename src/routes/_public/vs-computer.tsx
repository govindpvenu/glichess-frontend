import { createFileRoute } from "@tanstack/react-router"
export const Route = createFileRoute("/_public/vs-computer")({
    component: HumanVsComputer,
})
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

import { useEffect, useState } from "react"
import { Chess, Square } from "chess.js"
import { Chessboard } from "react-chessboard"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { saveGame, clearGame } from "../../slices/gameSlice"
import { Button } from "@/components/ui/button"
import { HistoryCard } from "@/components/Game/GameComponents/HistoryCard"

function HumanVsComputer() {
    const moveSound = new Audio('/public/move.mp3');
    const dispatch = useDispatch()
    const { gameState } = useSelector((state: RootState) => state.game)
    const { toast } = useToast()
    const [game] = useState(new Chess())
    const [position, setPosition] = useState("start")

    useEffect(() => {
        console.log("useEffect:", gameState)
        if (gameState?.mode === "vs-computer" && gameState?.position) {
            console.log("useEffect:", gameState?.position)
            game.load(gameState.position)
            setPosition(gameState.position)
        }
    }, [game, gameState])

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
    // function findBestMove() {
    //     stockfish.postMessage("position fen " + position)
    //     stockfish.postMessage("go depth " + "2")

    //     stockfish.onmessage = function (event: any) {
    //         const message = event.data
    //         if (message.startsWith("bestmove")) {
    //             const bestMove = message.split(" ")[1]
    //             game.move(bestMove)
    //             setPosition(game.fen())
    //             dispatch(saveGame({ mode: "vs-computer", position: game.fen() }))
    //         }
    //     }
    // }

    // function findBestMove() {
    //     engine.evaluatePosition(game.fen(), 2)

    //     engine.onMessage(({ bestMove }: any) => {
    //         if (bestMove) {
    //             game.move(bestMove)
    //             setPosition(game.fen())
    //             dispatch(saveGame({ mode: "vs-computer", position: game.fen() }))
    //         }
    //     })
    // }

    function makeRandomMove() {
        const possibleMoves = game.moves()
        const randomIndex = Math.floor(Math.random() * possibleMoves.length)
        game.move(possibleMoves[randomIndex])
        moveSound.play()
        // isOver()
        setPosition(game.fen())
        dispatch(saveGame({ mode: "vs-computer", position: game.fen() }))
    }

    function onDrop(sourceSquare: Square, targetSquare: Square) {
        let move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
        })
        // If illegal move
        if (move === null) {
            console.log("illegal")
            // toast({
            //     title: "Uh oh!",
            //     description: "That's not a valid move.",
            //     action: <ToastAction altText="Try again">Ok</ToastAction>,
            // })
            return false
        }
        moveSound.play();
        setPosition(game.fen())
        dispatch(saveGame({ mode: "vs-computer", position: game.fen() }))
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
        setTimeout(makeRandomMove, 500)
        return true
    }

    return (
        <ResizablePanelGroup direction="horizontal" className="max-w-full rounded-lg border h-full">
            <ResizablePanel defaultSize={70}>
                <div className="flex items-center justify-center">
                    <div className="flex-col justify-center items-center ">
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
                <div className="flex h-full items-center justify-center">
                    <HistoryCard history={game.history()} />
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

// function HumanVsComputer() {
//     const [game, setGame] = useState(new Chess())
//     const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout>()

//     function safeGameMutate(modify: (game: ChessInstance) => void) {
//         setGame((g) => {
//             const update = new Chess(g.fen())
//             console.log(modify(update))
//             return update
//         })
//     }

//     function makeRandomMove() {
//         const possibleMoves = game.moves()

//         if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
//             console.log("Exitt")
//             return
//         }

//         const randomIndex = Math.floor(Math.random() * possibleMoves.length)
//         console.log(randomIndex)

//         safeGameMutate((game) => {
//             game.move(possibleMoves[randomIndex])
//         })
//     }

//     function onDrop(sourceSquare: any, targetSquare: any, piece: any) {
//         const gameCopy = new Chess(game.fen())
//         const move = gameCopy.move({
//             from: sourceSquare,
//             to: targetSquare,
//             promotion: piece[1]?.toLowerCase() ?? "q",
//         })
//         setGame(gameCopy)

//         // illegal moveee
//         if (move === null) return false

//         const newTimeout = setTimeout(makeRandomMove, 200)
//         setCurrentTimeout(newTimeout)
//         return true
//     }

//     return (
//         <div className="flex justify-center items-center h-[846px]">
//             <div className="w-96 h-auto">
//                 <Chessboard
//                     id="PlayVsRandom"
//                     position={game.fen()}
//                     onPieceDrop={onDrop}
//                     customBoardStyle={{
//                         borderRadius: "4px",
//                         boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
//                     }}
//                 />
//             </div>

//             <button
//                 onClick={() => {
//                     safeGameMutate((game) => {
//                         game.reset()
//                     })
//                     clearTimeout(currentTimeout)
//                 }}
//             >
//                 reset
//             </button>
//             <button
//                 onClick={() => {
//                     safeGameMutate((game) => {
//                         game.undo()
//                     })
//                     clearTimeout(currentTimeout)
//                 }}
//             >
//                 undo
//             </button>
//         </div>
//     )
// }

// function HumanVsComputer() {
//     const [chess] = useState(new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"))
//     const [fen, setFen] = useState(chess.fen())
//     const handleMove = (move: ShortMove) => {
//         if (chess.move(move)) {
//             setTimeout(() => {
//                 const moves = chess.moves()
//                 if (moves.length > 0) {
//                     const computerMove = moves[Math.floor(Math.random() * moves.length)]
//                     chess.move(computerMove)
//                     setFen(chess.fen())
//                 }
//             }, 300)
//             setFen(chess.fen())
//         }
//     }
//     return (
//         <div className="flex justify-center items-center h-[846px]">
//             <Chessboard
//                 position={fen}
//                 onDrop={(move) =>
//                     handleMove({
//                         from: move.sourceSquare,
//                         to: move.targetSquare,
//                         promotion: "q",
//                     })
//                 }
//             />
//         </div>
//     )
// }
