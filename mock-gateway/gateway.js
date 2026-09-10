import { WebSocket } from "ws";
import { meters } from "./meterConfig.js";
import { generateSensorData } from "./sensorUtils.js";

const WS_URL = process.env.WS_URL || "ws://localhost:3000?type=gateway";

let intervalId = null;

function connect() {
  const ws = new WebSocket(WS_URL);

  ws.on("open", () => {
    console.log("gateway connected successfully");

    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(() => {
      meters.forEach((meter) => {
        const sensorData = generateSensorData(meter.id);
        const payload = {
          type: "sensor_data",
          meterId: meter.id,
          ...sensorData, // includes thresholds, per-reading status, meterStatus
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
    clearInterval(intervalId);
    setTimeout(connect, 3000);
  });

  ws.on("error", (error) => {
    console.warn("gateway websocket error:", error.message);
  });
}

connect();
