import type { RootState } from "../store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setCredentials } from "../slices/authSlice"

export const useAuth = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const isAuthenticated = () => {
        return userInfo?.verified
    }

    const googleAuth = () => {
        console.log("Google auth..")
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"
        fetch(`${API_URL}/api/auth/auth/login/success`, {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                if (response.status === 200) return response.json()
                throw new Error("authentication has been failed!")
            })
            .then((resObject) => {
                console.log(resObject)
                dispatch(
                    setCredentials({
                        _id: resObject.user?._id,
                        username: resObject.user.username,
                        email: resObject.user.email,
                        profile: resObject.user.profile,
                        verified: resObject.user.verified,
                    })
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return { isAuthenticated, googleAuth }
}

export type AuthContext = ReturnType<typeof useAuth>
