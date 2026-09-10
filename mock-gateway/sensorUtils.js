import { baselines, THRESHOLDS } from "./meterConfig.js";

export function fluctuate(base, range) {
  return parseFloat((base + (Math.random() * range * 2 - range)).toFixed(2));
}

function getMeterCycle(meterId) {
  const meterNumber = Number.parseInt(meterId.split("-").at(-1), 10) || 0;
  const meterOffset = meterNumber * 1.4;
  return Math.sin(Date.now() / 3500 + meterOffset);
}

// Voltage amplitude is derived from the actual threshold band width
// (max - min) instead of a fixed 0.5, so it reliably drifts past the
// edges sometimes regardless of how tight/wide the band is.
function fluctuateKvVoltage(base, cycle, { min, max }) {
  const halfBand = (max - min) / 2;
  // 1.25x the half-band means the sine wave pokes past the edge on
  // roughly its outer ~35% of swing, not for most of the cycle.
  const amplitude = halfBand * 1.25;
  const jitter = Math.random() * 0.02 - 0.01;
  return parseFloat((base + cycle * amplitude + jitter).toFixed(2));
}

// Current fluctuation now takes each phase's own min/max, so phase A
// (200-400) and phase B/C (200-440) swing across their own correct
// boundary instead of sharing one global range.
function fluctuateCurrentAcrossThreshold(base, { min, max }, cycle) {
  const safeWindow = Math.max(1, (max - min) * 0.2);
  const drift = cycle * safeWindow;
  const jitter = Math.random() * 6 - 3;
  const next = base + drift + jitter;
  return parseFloat(Math.max(min - 20, Math.min(max + 20, next)).toFixed(2));
}

// Returns "critical" if value falls outside [min, max], else "normal".
function getStatus(value, { min, max }) {
  return value < min || value > max ? "critical" : "normal";
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
    energy_supplied_today: fluctuate(b.energy_supplied_today, 5),
    frequency: b.frequency,
    power_factor: b.power_factor,
    timestamp: new Date().toISOString(),
  };

  // Per-reading status the frontend can use directly for border color:
  // "normal" -> green, "critical" -> red.
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

  // If any single reading is critical, the whole meter card is critical.
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
