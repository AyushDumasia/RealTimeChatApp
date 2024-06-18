import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import http from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";

// * Postgres connection
import { connectPostgres } from "./Postgres/config";
// * Schemas
import { createTable } from "./src/model/user.schema";
import { createMessageSchema } from "./src/model/message.schema";
import { createContactSchema } from "./src/model/contact.schema";
// * Routes
import userRoutes from "./src/route/user.route";
import messageRoutes from "./src/route/message.route";
import contactRoutes from "./src/route/contact.route";

dotenv.config();

const corsOptions: cors.CorsOptions = {
  origin: "*", // Adjust this to your frontend's origin or use a specific domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

export const configApp = async () => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:4000", "*"],
      methods: ["GET", "POST", "DELETE"],
      credentials: true,
    },
  });
  const PORT = process.env.PORT || 3000;

  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(cors(corsOptions));

  createTable();
  createMessageSchema();
  createContactSchema();

  app.get("/", (req: Request, res: Response) => {
    res.send("/ Get Route");
  });

  app.use("/api/v1/auth", userRoutes);
  app.use("/api/v1/message", messageRoutes);
  app.use("/api/v1/contact", contactRoutes);

  const emailToSocketMapping = new Map();

  io.on("connection", (socket) => {
    console.log("New Connection : ");
    socket.on("joinRoom", (data) => {
      const { roomId, emailId } = data;
      console.log("User:", emailId, roomId);
      emailToSocketMapping.set(emailId, socket.id);
      socket.join(roomId);
      socket.emit("joinRoom", { roomId });
      socket.broadcast.to(roomId).emit("userJoined", { emailId });
    });
  });

  server.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}/api/v1/`);
    connectPostgres();
  });

  io.listen(8000);
};
