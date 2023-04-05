import http from "node:http";

import { config } from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import fileUploader from "express-fileupload";
import mongoose from "mongoose";
import { Server, Socket } from "socket.io";
import swaggerUi from "swagger-ui-express";

import { configs } from "./configs";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter, carRouter, userRouter } from "./routes";
import swaggerJson from "./utils/swagger.json";

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  /** SEND MESSAGE TO PARTICULAR CLIENT */
  // socket.emit("message", { message: "hallow socket" });

  /** SEND MESSAGE TO ALL CLIENTS */
  // io.emit("user:connected", { message: "SEND MESSAGE TO ALL CLIENTS" });

  /** SEND MESSAGE TO ALL CLIENTS EXCEPT SENDER */
  // socket.broadcast.emit("user:connected", {
  //   message: "SEND ALL CLIENTS EXCEPT SENDER",
  // });
  // socket.broadcast.emit("message", {});

  // socket.on("message:send", (text) => {
  //   io.emit("message:get", `${socket.id} - ${text}`);
  // });

  // console.log(socket.id);

  // socket.on("disconnect", () => {
  //   console.log(`${socket.id} -- disconnect`);
  // });

  socket.on("join:room", ({ roomName }) => {
    socket.join(roomName);

    socket
      .to(roomName)
      .emit("user:joined", { sockedId: `${socket.id} joined ${roomName}` });

    socket.on("message:send", (text) => {
      io.emit("message:get", `${socket.id} - ${text}`);
    });
  });

  socket.on("leave:room", ({ roomName }) => {
    socket.leave(roomName);

    socket
      .to(roomName)
      .emit("user:leave", { sockedId: `${socket.id} leaved ${roomName}` });

    socket._cleanup();
  });
});

config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());

app.use("/auth", authRouter);
app.use("/cars", carRouter);
app.use("/users", userRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use((err: ApiError, req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status,
  });
});
mongoose.set("strictQuery", true);
server.listen(configs.PORT, async () => {
  await mongoose.connect(configs.API_URL);
  cronRunner();
  // eslint-disable-next-line no-console
  console.log(`Server started on port: ${configs.PORT}`);
});
