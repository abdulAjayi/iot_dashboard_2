export const defaultThresholds = {
  phase_a_voltage: { min: 18.96, max: 19.12 },
  phase_b_voltage: { min: 18.96, max: 19.12 },
  phase_c_voltage: { min: 18.96, max: 19.12 },
  phase_a_current: { min: 200, max: 400 },
  phase_b_current: { min: 200, max: 440 },
  phase_c_current: { min: 200, max: 440 },
};

export const initialMeters = [
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
].map((meter) => ({
  ...meter,
  sensorData: null,
  history: [],
  status: "offline",
  thresholds: { ...defaultThresholds },
}));
