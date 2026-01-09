import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useDispatch } from "react-redux"
import { useLogoutMutation } from "../slices/authApiSlice"
import { clearCredentials } from "../slices/authSlice"
import { clearGame } from "../slices/gameSlice"
import { Link, useNavigate } from "@tanstack/react-router"
import { useSelector } from "react-redux"
import type { RootState } from "../store"

const ProfileAvatar = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth)

    const dispatch = useDispatch()
    const [logoutApiCall] = useLogoutMutation()
    const navigate = useNavigate()
    const logoutHandler = async () => {
        try {
            await logoutApiCall({}).unwrap()
            dispatch(clearGame())
            dispatch(clearCredentials())
            const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"
            window.open(`${API_URL}/api/auth/auth/google/logout`, "_self")
            navigate({ to: "/" })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={userInfo?.profile} alt="Image not available" />
                        <AvatarFallback>{userInfo?.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userInfo?.username}</p>
                        <p className="text-xs leading-none text-muted-foreground">{userInfo?.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link to="/profile">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutHandler}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileAvatar
