import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), TanStackRouterVite()],
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:5000/",
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
})
