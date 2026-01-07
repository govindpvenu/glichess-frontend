import { createFileRoute, useNavigate, Link } from "@tanstack/react-router"
export const Route = createFileRoute("/_auth/login")({
    component: Login,
})

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { useLoginMutation } from "../../slices/authApiSlice"
import { setCredentials } from "../../slices/authSlice"

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [login] = useLoginMutation()
    const googleAuth = () => {
        window.open("http://localhost:5000/api/auth/auth/google", "_self")
    }
    const submitHandler = async () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Email is not valid.")
        } else if (password.length < 8) {
            toast.error("Password should have atleast 8 characters.")
        } else {
            try {
                const res = await login({ email, password }).unwrap()
                dispatch(setCredentials({ ...res }))
                navigate({ to: "/" })
            } catch (err: any) {
                console.log(err?.data?.message || err?.error)
                toast.error(err?.data?.message || err.error)
            }
        }
    }
    return (
        <div className="flex justify-center items-center flex-1 overflow-y-auto">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Enter your email below to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" required />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link to={"/forgot-password"} className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" type="password" required />
                        </div>
                        <Button onClick={submitHandler} type="submit" className="w-full">
                            Login
                        </Button>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className=" px-2 text-foreground">Or continue with</span>
                            </div>
                        </div>
                        <Button variant="outline" onClick={googleAuth}>
                            <Icons.google className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to={"/register"} className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
