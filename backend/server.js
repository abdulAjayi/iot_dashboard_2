import express from "express";
import { WebSocketServer } from "ws";
import authRoutes from "./routes/auth.js";
import http from "http";
import cors from "cors";
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
import helmet from "helmet";
// www.tiktok.com/@auto_lyrics27/video/7650448711453052180
// app.use(
//   cors({
//     origin: ["https://iot-dashboard-rouge-zeta.vercel.app"],
//     credentials: true,
//   }),
// );

// app.use(
//   cors({
//     origin: [
//       "https://iot-dashboard-rouge-zeta.vercel.app",
//       "https://backslid-deflate-hangnail.ngrok-free.dev",
//       "http://localhost:5173",
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "ngrok-skip-browser-warning",
//     ],
//     credentials: true,
//   }),
// );

https: app.use(
  cors({
    origin: [
      "https://iot-dashboard-rouge-zeta.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json()); // ← must be before routes
app.use(helmet());
app.use("/auth", authRoutes);

let gatewayClient = null;
let dashboardClients = new Set();

wss.on("connection", (ws, req) => {
  const param = new URL(req.url, "http://localhost").searchParams;
  const type = param.get("type");
  if (type === "gateway") {
    gatewayClient = ws;
    console.log("gateway has been connected successfully");
    ws.on("message", async (data) => {
      const dataString = data.toString();
      dashboardClients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(dataString);
          client.send(
            JSON.stringify({ type: "gateway_status", gatewayConnection: true }),
          );
        }
      });
    });

    ws.on("close", () => {
      gatewayClient = null;
      dashboardClients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(
            JSON.stringify({
              type: "gateway_status",
              gatewayConnection: false,
            }),
          );
        }
      });
      console.log("gateway successfully disconnected");
    });
  } else if (type === "dashboard") {
    dashboardClients.add(ws);
    console.log("dashboard has been connected successfully");
    ws.send(
      JSON.stringify({
        type: "server_status",
        serverConnection: true,
      }),
    );
    ws.send(
      JSON.stringify({
        type: "gateway_status",
        gatewayConnection: gatewayClient?.readyState === 1,
      }),
    );
    ws.on("message", (data) => {
      const text = Buffer.isBuffer(data) ? data.toString("utf8") : String(data);

      if (gatewayClient?.readyState === 1) {
        gatewayClient.send(text);
      }

      dashboardClients.forEach((client) => {
        if (client !== ws && client.readyState === 1) {
          client.send(text);
        }
      });
    });

    ws.on("close", () => {
      console.log("dashboard client deleted successfully");
      dashboardClients.delete(ws);
    });
  }
});

function shutDownServer() {
  dashboardClients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: "server_status",
        serverConnection: false,
      }),
    );
  });
  wss.close(() => {
    server.close(() => {
      process.exit(0);
    });
  });
}
process.on("SIGINT", shutDownServer);
process.on("SIGTERM", shutDownServer);

server.listen(process.env.PORT || 3000, () => {
  console.log("server has successfully started");
});
