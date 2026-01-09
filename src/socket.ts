import { io } from "socket.io-client" // import connection function

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"
const socket = io(API_URL) // initialize websocket connection

export default socket
