export const meters = [
  {
    id: "meter-001",
    meterLocation: "Ikeja",
    meterId: "IKJ-IM-001",
  },
  {
    id: "meter-002",
    meterLocation: "Oregun",
    meterId: "IKJ-OM-002",
  },
  {
    id: "meter-003",
    meterLocation: "Alawa",
    meterId: "IKJ-AM-003",
  },
  {
    id: "meter-004",
    meterLocation: "Agidingbi",
    meterId: "IKJ-AGM-004",
  },
  {
    id: "meter-005",
    meterLocation: "Anifowose",
    meterId: "IKJ-ANM-005",
  },
];

// IMPORTANT: these must stay identical to `defaultThresholds` in
// frontend/meterConstants.js. The frontend recomputes status locally
// from these ranges (see useMeterStore.computeStatus) — it does NOT
// trust whatever "status"/"meterStatus" the gateway sends. If these
// two files drift apart, the border colors will look wrong or random.
export const THRESHOLDS = {
  phase_a_voltage: { min: 18.96, max: 19.12 }, // kV
  phase_b_voltage: { min: 18.96, max: 19.12 }, // kV
  phase_c_voltage: { min: 18.96, max: 19.12 }, // kV
  phase_a_current: { min: 200, max: 400 }, // A
  phase_b_current: { min: 200, max: 440 }, // A
  phase_c_current: { min: 200, max: 440 }, // A
};

// Baselines are set near the middle of each threshold band so the
// live fluctuation (see sensorUtils.js) naturally drifts in and out
// of range over time instead of sitting permanently safe or
// permanently critical. meter-003 is intentionally biased a bit
// higher so it trips "critical" more often, as a demo of a
// problem meter.
export const baselines = {
  "meter-001": {
    phase_a_voltage: 19.02,
    phase_b_voltage: 19.03,
    phase_c_voltage: 19.01,
    phase_a_current: 300,
    phase_b_current: 310,
    phase_c_current: 305,
    energy_supplied_today: 125,
    frequency: 49.98,
    power_factor: 296,
  },
  "meter-002": {
    phase_a_voltage: 19.05,
    phase_b_voltage: 19.02,
    phase_c_voltage: 19.04,
    phase_a_current: 320,
    phase_b_current: 330,
    phase_c_current: 325,
    energy_supplied_today: 140,
    frequency: 49.98,
    power_factor: 296,
  },
  "meter-003": {
    phase_a_voltage: 19.09,
    phase_b_voltage: 19.08,
    phase_c_voltage: 19.1,
    phase_a_current: 380,
    phase_b_current: 410,
    phase_c_current: 415,
    energy_supplied_today: 160,
    frequency: 49.98,
    power_factor: 296,
  },
  "meter-004": {
    phase_a_voltage: 18.99,
    phase_b_voltage: 19.0,
    phase_c_voltage: 18.98,
    phase_a_current: 260,
    phase_b_current: 270,
    phase_c_current: 265,
    energy_supplied_today: 100,
    frequency: 49.98,
    power_factor: 296,
  },
  "meter-005": {
    phase_a_voltage: 19.04,
    phase_b_voltage: 19.03,
    phase_c_voltage: 19.05,
    phase_a_current: 310,
    phase_b_current: 320,
    phase_c_current: 315,
    energy_supplied_today: 135,
    frequency: 49.98,
    power_factor: 296,
  },
};
