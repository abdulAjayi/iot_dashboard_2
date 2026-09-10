import { useEffect, useRef } from "react";
import useMeterStore from "../store/useMeterStore";
import useAuthStore from "../store/useAuthStore";
const ws_url =
  import.meta.env.VITE_WS_URL || "ws://localhost:3000?type=dashboard";

export function useSocket() {
  const ws = useRef(null);
  const shouldReconnect = useRef(true);
  const updateMeterData = useMeterStore((s) => s.updateMeterData);
  const token = useAuthStore((s) => s.token);
  const setConnected = useMeterStore((s) => s.setConnected);
  const setCommand = useMeterStore((s) => s.setCommand);
  const setgatewayConnection = useMeterStore((s) => s.setGatewayConnection);
  const setServerConnection = useMeterStore((s) => s.setServerConnection);

  useEffect(() => {
    if (!token) return;
    shouldReconnect.current = true;
    function connect() {
      if (!shouldReconnect.current) return;
      ws.current = new WebSocket(ws_url);
      ws.current.onopen = () => {
        setConnected(true);
      };
      ws.current.onmessage = async (e) => {
        const text = e.data instanceof Blob ? await e.data.text() : e.data;
        const Data = JSON.parse(text);
        const { type, ...rest } = Data;
        const { meterId, ...sensorFields } = rest;

        if (type === "command") {
          setCommand(rest);
        }
        if (type === "gateway_status") {
          setgatewayConnection(rest.gatewayConnection);
        }
        if (type === "server_status") {
          setServerConnection(rest.serverConnection);
        }
        if (type === "sensor_data") {
          updateMeterData(meterId, sensorFields);
        }
      };
      ws.current.onclose = () => {
        setConnected(false);
        if (token && shouldReconnect.current) setTimeout(connect, 3000);
      };
    }
    connect();
    return () => {
      shouldReconnect.current = false;
      ws.current?.close();
    };
  }, [token]);

  const sendCommand = (field, value, meterId = null) => {
    if (ws.current.readyState === 1) {
      ws.current.send(
        JSON.stringify({ type: "command", field, value, meterId }),
      );
    }
  };
  return { sendCommand };
}
