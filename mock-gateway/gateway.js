import { WebSocket } from "ws";
import http from "http";
import { meters } from "./meterConfig.js";
import { generateSensorData } from "./sensorUtils.js";

const WS_URL = process.env.WS_URL || "ws://localhost:3000?type=gateway";
const PORT = process.env.PORT || 10000;

let intervalId = null;
let gatewayConnected = false;

// --- Minimal HTTP server just so Render sees the port bound ---
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", gatewayConnected }));
  })
  .listen(PORT, () => {
    console.log(`gateway health server listening on ${PORT}`);
  });

function connect() {
  const ws = new WebSocket(WS_URL);

  ws.on("open", () => {
    console.log("gateway connected successfully");
    gatewayConnected = true;

    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
      meters.forEach((meter) => {
        const sensorData = generateSensorData(meter.id);
        const payload = {
          type: "sensor_data",
          meterId: meter.id,
          ...sensorData,
        };
        if (ws.readyState === 1) {
          ws.send(JSON.stringify(payload));
        }
      });
    }, 1000);
  });

  ws.on("message", (data) => {
    try {
      const text = Buffer.isBuffer(data) ? data.toString("utf8") : String(data);
      const cmd = JSON.parse(text);
      console.log("gateway command", cmd);
    } catch (error) {
      console.warn("gateway received non-JSON command frame:", String(data));
    }
  });

  ws.on("close", () => {
    console.log("gateway reconnecting in 3s...");
    gatewayConnected = false;
    clearInterval(intervalId);
    setTimeout(connect, 3000);
  });

  ws.on("error", (error) => {
    console.warn("gateway websocket error:", error.message);
  });
}

connect();
