import { createFileRoute, Link } from "@tanstack/react-router"
export const Route = createFileRoute("/_public/")({
    component: Index,
})
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { useSelector, useDispatch } from "react-redux"
import { useLogoutMutation } from "../../slices/authApiSlice"
import { clearCredentials } from "../../slices/authSlice"
import type { RootState } from "../../store"

function Index() {
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const [logoutApiCall] = useLogoutMutation()
    const logoutHandler = async () => {
        try {
            await logoutApiCall({}).unwrap()
            dispatch(clearCredentials())
        } catch (err) {
            console.log(err)
        }
    }
    return userInfo?.verified ? (
        <div className="flex justify-center items-center flex-1 overflow-y-auto"> 
            <Card className="w-[500px]">
                <CardHeader>
                    <CardTitle>Hello {userInfo?.username} 🚀 </CardTitle>
                    <CardDescription>Welcome back!!</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <Link to="/vs-computer">
                        <Button className="w-96 my-4" variant="outline">
                            Human vs Computer
                        </Button>
                    </Link>
                    <Link to="/vs-human">
                        <Button className="w-96 my-4" variant="outline">
                            Human vs Human
                        </Button>
                    </Link>
                    <Link to="/game">
                        <Button className="w-96 my-4" variant="outline">
                            Play Online
                        </Button>
                    </Link>

                    <Link to="/ranking">
                        <Button className="w-96 my-4" variant="outline">
                            Ranking
                        </Button>
                    </Link>
                    <Link to="/community">
                        <Button className="w-96 my-4" variant="outline">
                            Community
                        </Button>
                    </Link>
                    <Link to="/profile">
                        <Button className="w-96 my-4" variant="outline">
                            Profile
                        </Button>
                    </Link>
                    <Button className="w-96 my-4" onClick={logoutHandler} variant="destructive">
                        Logout
                    </Button>
                </CardContent>
            </Card>
        </div>
    ) : (
        <div className="flex justify-center items-center flex-1 overflow-y-auto">
            <Card className="w-[900px] h-96 flex flex-col items-center">
                <CardHeader>
                    <CardTitle>Hey there, Welcome to Chess.com♟️.</CardTitle>
                </CardHeader>
                <CardContent className="my-10 w-[500px]">
                    <p>Play interactive chess online with people around the world Create new account to join the large community of players or Login to your existing account, and start enjoying all the chess.</p>
                </CardContent>
                <CardFooter className="my-5">
                    <Link to="/login">
                        <Button>
                            <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button className="mx-5" variant="secondary">
                            Create new Account
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
