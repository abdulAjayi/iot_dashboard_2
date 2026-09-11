import { baselines, THRESHOLDS } from "./meterConfig.js";

export function fluctuate(base, range) {
  return parseFloat((base + (Math.random() * range * 2 - range)).toFixed(2));
}

function getMeterCycle(meterId) {
  const meterNumber = Number.parseInt(meterId.split("-").at(-1), 10) || 0;
  const meterOffset = meterNumber * 1.4;
  return Math.sin(Date.now() / 3500 + meterOffset);
}

function fluctuateKvVoltage(base, cycle, { min, max }) {
  const halfBand = (max - min) / 2;
  const amplitude = halfBand * 1.25;
  const jitter = Math.random() * 0.02 - 0.01;
  return parseFloat((base + cycle * amplitude + jitter).toFixed(2));
}

function fluctuateCurrentAcrossThreshold(base, { min, max }, cycle) {
  const safeWindow = Math.max(1, (max - min) * 0.2);
  const drift = cycle * safeWindow;
  const jitter = Math.random() * 6 - 3;
  const next = base + drift + jitter;
  return parseFloat(Math.max(min - 20, Math.min(max + 20, next)).toFixed(2));
}

function getStatus(value, { min, max }) {
  return value < min || value > max ? "critical" : "normal";
}

// --- Running energy totals, kept in memory per meter ---
// Starts at each meter's baseline the first time it's read, then
// climbs by ENERGY_STEP on every subsequent call. This persists only
// for the lifetime of this process (resets on restart/redeploy).
const ENERGY_STEP = 0.06;
const energyTotals = {};

function getNextEnergyReading(meterId, baseline) {
  if (energyTotals[meterId] === undefined) {
    energyTotals[meterId] = baseline;
  } else {
    energyTotals[meterId] = parseFloat(
      (energyTotals[meterId] + ENERGY_STEP).toFixed(2),
    );
  }
  return energyTotals[meterId];
}

export function generateSensorData(meterId) {
  const b = baselines[meterId];
  if (!b) {
    throw new Error(
      `No baseline found for meterId: "${meterId}". Check that meters[].id in meterConfig.js matches a key in baselines.`,
    );
  }

  const cycle = getMeterCycle(meterId);

  const reading = {
    phase_a_voltage: fluctuateKvVoltage(
      b.phase_a_voltage,
      cycle,
      THRESHOLDS.phase_a_voltage,
    ),
    phase_b_voltage: fluctuateKvVoltage(
      b.phase_b_voltage,
      cycle,
      THRESHOLDS.phase_b_voltage,
    ),
    phase_c_voltage: fluctuateKvVoltage(
      b.phase_c_voltage,
      cycle,
      THRESHOLDS.phase_c_voltage,
    ),
    phase_a_current: fluctuateCurrentAcrossThreshold(
      b.phase_a_current,
      THRESHOLDS.phase_a_current,
      cycle,
    ),
    phase_b_current: fluctuateCurrentAcrossThreshold(
      b.phase_b_current,
      THRESHOLDS.phase_b_current,
      cycle,
    ),
    phase_c_current: fluctuateCurrentAcrossThreshold(
      b.phase_c_current,
      THRESHOLDS.phase_c_current,
      cycle,
    ),
    energy_supplied_today: getNextEnergyReading(
      meterId,
      b.energy_supplied_today,
    ),
    frequency: b.frequency,
    power_factor: b.power_factor,
    timestamp: new Date().toISOString(),
  };

  const status = {
    phase_a_voltage: getStatus(
      reading.phase_a_voltage,
      THRESHOLDS.phase_a_voltage,
    ),
    phase_b_voltage: getStatus(
      reading.phase_b_voltage,
      THRESHOLDS.phase_b_voltage,
    ),
    phase_c_voltage: getStatus(
      reading.phase_c_voltage,
      THRESHOLDS.phase_c_voltage,
    ),
    phase_a_current: getStatus(
      reading.phase_a_current,
      THRESHOLDS.phase_a_current,
    ),
    phase_b_current: getStatus(
      reading.phase_b_current,
      THRESHOLDS.phase_b_current,
    ),
    phase_c_current: getStatus(
      reading.phase_c_current,
      THRESHOLDS.phase_c_current,
    ),
  };

  const meterStatus = Object.values(status).includes("critical")
    ? "critical"
    : "normal";

  return {
    ...reading,
    thresholds: THRESHOLDS,
    status,
    meterStatus,
  };
}
