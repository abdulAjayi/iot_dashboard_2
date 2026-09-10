// import useMeterStore from "../store/useMeterStore";

// export default function MetricCard({ label, value, unit }) {
//   const gatewayConnection = useMeterStore((s) => s.gatewayConnection);
//   const serverConnection = useMeterStore((s) => s.serverConnection);

//   return (
//     <div className="bg-gray-900 border border-green-800 rounded-xl p-4">
//       <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
//         {label}
//       </p>
//       <p className="text-3xl font-bold text-white">
//         {value !== undefined &&
//         value !== null &&
//         gatewayConnection !== false &&
//         serverConnection !== false
//           ? value
//           : "--"}
//         <span className="text-sm text-gray-400 ml-1">{unit}</span>
//       </p>
//     </div>
//   );
// }

// import useMeterStore from "../store/useMeterStore";

// export default function MetricCard({ label, value, unit }) {
//   const gatewayConnection = useMeterStore((s) => s.gatewayConnection);
//   const serverConnection = useMeterStore((s) => s.serverConnection);
//   const live = gatewayConnection !== false && serverConnection !== false;

//   return (
//     <div className="bg-white border border-[#E4E1D8] px-4 py-3">
//       <p className="text-[#9C9788] text-[11px] mb-1">{label}</p>
//       <p className="font-mono text-2xl text-[#17140F] tabular-nums leading-none">
//         {value !== undefined && value !== null && live ? value : "—"}
//         <span className="text-xs text-[#9C9788] ml-1">{unit}</span>
//       </p>
//     </div>
//   );
// }

// MeterCard.jsx
import Reading from "./Reading";

const STATUS = {
  critical: {
    border: "#D62828",
    text: "#D62828",
    dot: "#D62828",
    label: "Critical",
    wash: "#FDF4F4",
    ring: "rgba(214,40,40,0.18)",
  },
  normal: {
    border: "#1B7A43",
    text: "#1B7A43",
    dot: "#3FB65F",
    label: "Live",
    wash: "#FFFFFF",
    ring: "rgba(27,122,67,0.14)",
  },
  offline: {
    border: "#C9C4B6",
    text: "#9C9788",
    dot: "#9C9788",
    label: "Offline",
    wash: "#FFFFFF",
    ring: "rgba(156,151,136,0.14)",
  },
};
export default function MeterCard({ meter, onClick }) {
  if (!meter) return null;
  const { name, meterId, meterLocation, sensorData, status } = meter;
  const s = STATUS[status] || STATUS.offline;
  const lastSync = sensorData?.timestamp
    ? new Date(sensorData.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "—";

  return (
    <button
      onClick={onClick}
      style={{
        borderColor: s.border,
        backgroundColor: s.wash,
        boxShadow: `0 1px 2px rgba(23,20,15,0.04), 0 8px 20px -6px ${s.ring}`,
      }}
      className="group text-left w-full rounded-2xl border-2 transition-all duration-200 hover:-translate-y-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17140F] focus-visible:ring-offset-2"
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 8px rgba(23,20,15,0.06), 0 16px 32px -8px ${s.ring}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 1px 2px rgba(23,20,15,0.04), 0 8px 20px -6px ${s.ring}`;
      }}
    >
      <div className="px-5 pt-4 pb-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-[#17140F] font-semibold text-base leading-tight">
            {name}
          </h3>
          <span
            className="flex items-center gap-1.5 text-[11px] font-mono font-medium shrink-0 ml-3 px-2 py-1 rounded-full"
            style={{ color: s.text, backgroundColor: `${s.border}14` }}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                status === "critical" ? "animate-pulse" : ""
              }`}
              style={{ backgroundColor: s.dot }}
            />
            {s.label}
          </span>
        </div>
        <p className="text-[#6B675E] text-xs font-mono mb-4">
          {meterId} · {meterLocation}
        </p>

        <div className="grid grid-cols-2 gap-px bg-[#E4E1D8] border border-[#E4E1D8] rounded-lg overflow-hidden">
          <Reading
            label="Phase A-N"
            value={sensorData?.phase_a_voltage}
            unit="kV"
          />
          <Reading
            label="Phase B-N"
            value={sensorData?.phase_b_voltage}
            unit="kV"
          />
          <Reading
            label="Phase A current"
            value={sensorData?.phase_a_current}
            unit="A"
          />
          <Reading
            label="Energy today"
            value={sensorData?.energy_supplied_today}
            unit="kWh"
          />
        </div>

        <div className="mt-3 pt-2 border-t border-[#E4E1D8] flex items-center justify-between">
          <span className="text-[10px] text-[#9C9788] font-mono">
            Synced {lastSync}
          </span>
          <span className="text-[10px] text-[#9C9788] group-hover:text-[#17140F] transition-colors">
            View meter →
          </span>
        </div>
      </div>
    </button>
  );
}
