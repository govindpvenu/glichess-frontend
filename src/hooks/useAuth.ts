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

    const checkGoogleAuthCallback = () => {
        // Check if we're returning from Google OAuth with user data in URL
        const urlParams = new URLSearchParams(window.location.search)
        const googleAuthData = urlParams.get("googleAuth")
        
        if (googleAuthData) {
            try {
                const userData = JSON.parse(decodeURIComponent(googleAuthData))
                dispatch(setCredentials(userData))
                // Clean up URL
                window.history.replaceState({}, document.title, window.location.pathname)
            } catch (e) {
                console.error("Failed to parse Google auth data")
            }
        }
    }

    return { isAuthenticated, checkGoogleAuthCallback }
}

export type AuthContext = ReturnType<typeof useAuth>
