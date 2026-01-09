import { ThemeProvider } from "@/components/ui/theme-provider"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { ToastContainer } from "react-toastify"
import { Toaster } from "@/components/ui/toaster"
import "react-toastify/dist/ReactToastify.css"
import { useAuth } from "./hooks/useAuth"
import { useEffect } from "react"

const router = createRouter({
    routeTree,
    context: { authentication: undefined! },
})

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

const App = () => {
    const authentication = useAuth()
    const { checkGoogleAuthCallback } = authentication
    useEffect(() => {
        checkGoogleAuthCallback()
    }, [checkGoogleAuthCallback])
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ToastContainer />
            <Toaster />
            <RouterProvider router={router} context={{ authentication }} />
        </ThemeProvider>
    )
}

export default App
