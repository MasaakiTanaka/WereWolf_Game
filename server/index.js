import express from 'express';
import cors from 'cors';

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const socket = require("socket.io");

// import gameRoutes from './routes/game.js'


const app = express();
app.use(cors());

const server = app.listen("8000", () => {
    console.log("Server Running on Port 8000...");
});

const io = socket(server);

io.on("connection", (socket) => {

    socket.on("create_room", ({ hostName, codeNo }) => {
        console.log("Host Joined Room: " + hostName + "CodeNo" + codeNo);
        socket.join(codeNo);
    });

    socket.on("join_room", ({ codeNo, userName }) => {
        console.log(userName + " Joined Room: " + " codeNo:" + codeNo);
        socket.join(codeNo);
        io.emit("ready", { userName });
    });

    socket.on("start_game", ({ codeNo, array, userList }) => {
        console.log("start_game");
        io.emit("during_start_game", { array, userList });
    });

    socket.on("pass_newArray", ({ array, roles }) => {
        io.emit("go_to_gameOn", { array, roles });
    });

    socket.on("send_new_game", ({ newArray, gameTimes }) => {
        console.log(newArray, "newArray");
        io.emit("receive_new_game", { newArray, gameTimes });
    });
});