import { io } from "socket.io-client";

const URL = "http://localhost:5000/user";

export const socket = io(URL,{
    autoConnect:false,
    reconnectionAttempts:1,
})