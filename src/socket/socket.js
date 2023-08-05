import { io } from "socket.io-client";

const URL = "http://192.168.1.2:5000/user";

export const socket = io(URL,{
    autoConnect:false,
    reconnectionAttempts:1,
})