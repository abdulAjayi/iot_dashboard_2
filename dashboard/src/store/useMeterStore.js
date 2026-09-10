import { create } from "zustand";
import { initialMeters } from "./meterConstants";

function computeStatus(sensorData, thresholds) {
  if (!sensorData) return "offline";
  for (const [key, threshold] of Object.entries(thresholds)) {
    if (!threshold || typeof threshold !== "object") continue;
    const value = sensorData[key];
    if (value === undefined) continue;
    const hasMin = typeof threshold.min === "number";
    const hasMax = typeof threshold.max === "number";
    if (hasMin && value < threshold.min) return "critical";
    if (hasMax && value > threshold.max) return "critical";
  }
  return "normal";
}

const useMeterStore = create((set) => ({
  meters: initialMeters,
  connected: false,
  gatewayConnection: false,
  serverConnection: false,
  commands: {},

  updateMeterData: (meterId, data) =>
    set((state) => ({
      meters: state.meters.map((meter) => {
        if (meter.id !== meterId) return meter;
        const newHistory = [...meter.history.slice(-59), data];
        const newStatus = computeStatus(data, meter.thresholds);
        return {
          ...meter,
          sensorData: data,
          history: newHistory,
          status: newStatus,
        };
      }),
    })),

  updateThresholds: (meterId, newThresholds) =>
    set((state) => ({
      meters: state.meters.map((meter) => {
        if (meter.id !== meterId) return meter;
        const newStatus = computeStatus(meter.sensorData, newThresholds);
        return { ...meter, thresholds: newThresholds, status: newStatus };
      }),
    })),

  setConnected: (val) => set({ connected: val }),
  setGatewayConnection: (val) => set({ gatewayConnection: val }),
  setServerConnection: (val) => set({ serverConnection: val }),
  setCommand: (val) => set({ commands: val }),
}));

export default useMeterStore;
