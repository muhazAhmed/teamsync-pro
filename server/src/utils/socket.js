import { Server } from "socket.io";
import { CLIENT_URL } from "./constants.js";

export const initializeSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: CLIENT_URL,
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {

        socket.on("chat message", (msg) => {
            io.emit("chat message", msg);
        });

        socket.on("disconnect", () => {
            return
        });
    });

    return io;
};
