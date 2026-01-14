import { Link, createFileRoute } from "@tanstack/react-router"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../../store"
import { FlagOff, Handshake, Trophy } from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"
import { setCredentials } from "../../slices/authSlice"
import { useUpdateUserMutation } from "../../slices/userApiSlice"

export const Route = createFileRoute("/_private/profile")({
    component: Profile,
})

function Profile() {
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const [updateUser] = useUpdateUserMutation()

    const [userName, setUserName] = useState(userInfo.username)
    const [bio, setBio] = useState(userInfo.bio)
    const submitHandler = async () => {
        console.log(userName, bio)
        if (userName.length < 3) {
            toast.error("User name should have atleast 3 characters.")
        } else if (bio === "") {
            toast.error("Add bio")
        } else {
            try {
                const res = await updateUser({ userName, bio }).unwrap()
                console.log(res)
                dispatch(setCredentials({ ...res }))
            } catch (err: any) {
                console.log(err)
                toast.error(err?.data?.message || err.error)
            }
        }
    }

    console.log(userInfo)
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-col md:flex-row items-start justify-center gap-6 py-12 md:py-16 lg:py-20 flex-1">
                <div className="flex flex-col items-center gap-4 md:w-1/3">
                    <Avatar className="h-20 w-20">
                        <AvatarImage alt="" src={userInfo?.profile} />
                        <AvatarFallback>{userInfo?.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 text-center">
                        <h1 className="text-2xl font-bold">{userInfo.username}</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{userInfo?.bio}</p>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>
                                Joined:{" "}
                                {new Date(userInfo.createdAt).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <div className="flex items-center justify-center">
                                <p className="text-2xl font-bold">{(userInfo.wins ?? 0) + (userInfo.draw ?? 0) + (userInfo.loss ?? 0)}</p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Games Played</p>
                        </div>

                        <div>
                            <div className="flex items-center justify-center">
                                <p className="text-2xl font-bold">{userInfo.rating ?? 0}</p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link to="/ranking">
                            <Button variant="outline">View Rank</Button>
                        </Link>
                    </div>
                </div>
                <Separator orientation="vertical" />

                <div className=" border-gray-200 dark:border-gray-800 px-6 flex-1">
                    <Tabs className="w-full" defaultValue="overview">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="details">Details</TabsTrigger>
                        </TabsList>
                        <TabsContent className="mt-4" value="overview">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-center">
                                            <Trophy />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-center">
                                            <CardTitle>Wins:</CardTitle>
                                            <p className="text-2xl font-bold">{userInfo.wins ?? 0}</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-center">
                                            <Handshake />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-center">
                                            <CardTitle>Draws:</CardTitle>
                                            <p className="text-2xl font-bold">{userInfo.draw ?? 0}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-center">
                                            <FlagOff />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-center">
                                            <CardTitle>Losses:</CardTitle>
                                            <p className="text-2xl font-bold">{userInfo.loss ?? 0}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                        <TabsContent className="mt-4" value="details">
                            <div className="grid gap-6">
                                {/* <div className="grid gap-2">
                                    <Label htmlFor="profile-picture">Profile Picture</Label>
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-20 w-20">
                                            <AvatarImage alt="" src={userInfo?.profile} />
                                            <AvatarFallback>{userInfo?.username[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <Button  variant="outline">
                                            Change
                                        </Button>
                                    </div>
                                </div> */}
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input onChange={(e) => setUserName(e.target.value)} defaultValue={userName} id="username" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input readOnly defaultValue={userInfo?.email} id="email" type="email" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea onChange={(e) => setBio(e.target.value)} defaultValue={bio} id="bio" />
                                </div>
                                {/* <div className="grid gap-2">
                                    <Label htmlFor="country">Country</Label>
                                    <Select defaultValue="usa" id="country">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="usa">USA</SelectItem>
                                            <SelectItem value="canada">Canada</SelectItem>
                                            <SelectItem value="uk">United Kingdom</SelectItem>
                                            <SelectItem value="germany">Germany</SelectItem>
                                            <SelectItem value="france">France</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div> */}
                                <div className="grid gap-2">
                                    <div>
                                        <Button onClick={submitHandler} className="mt-4">
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
