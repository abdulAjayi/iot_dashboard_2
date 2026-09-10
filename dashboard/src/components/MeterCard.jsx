// import Reading from "./Reading";

// function statusColor(status) {
//   if (status === "critical") return "#ef4444";
//   if (status === "normal") return "#22c55e";
//   return "#6b7280";
// }

// function statusLabel(status) {
//   if (status === "critical") return "CRITICAL";
//   if (status === "normal") return "LIVE";
//   return "OFFLINE";
// }

// export default function MeterCard({ meter, onClick }) {
//   const { name, meterId, meterLocation, sensorData, status } = meter;
//   const color = statusColor(status);
//   return (
//     <div
//       onClick={onClick}
//       style={{ borderColor: color }}
//       className="bg-[#0f172a] border-2 rounded-xl p-5 cursor-pointer hover:brightness-110 transition-all duration-200"
//     >
//       <div className="flex items-center justify-between mb-3">
//         <span className="text-white font-bold text-lg">{name}</span>
//         <span
//           className="text-xs font-bold px-2 py-1 rounded-full"
//           style={{ backgroundColor: color + "22", color }}
//         >
//           ● {statusLabel(status)}
//         </span>
//       </div>
//       <div className="text-gray-400 text-xs mb-4 space-y-1">
//         <div>
//           Meter ID: <span className="text-gray-200">{meterId}</span>
//         </div>
//         <div>
//           MeterLocation: <span className="text-gray-200">{meterLocation}</span>
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-3">
//         <Reading
//           label="PHASE A-N VOLTAGE"
//           value={sensorData?.phase_a_voltage}
//           unit="kV"
//         />
//         <Reading
//           label="PHASE B-N VOLTAGE"
//           value={sensorData?.phase_b_voltage}
//           unit="kV"
//         />
//         <Reading
//           label="Phase A current"
//           value={sensorData?.phase_a_current}
//           unit="A"
//         />
//         <Reading
//           label="Energy Today"
//           value={sensorData?.energy_supplied_today}
//           unit="kWh"
//         />
//       </div>
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
    chipBg: "#FDF0F0",
  },
  normal: {
    border: "#1B7A43",
    text: "#1B7A43",
    dot: "#3FB65F",
    label: "Live",
    chipBg: "#F0F7F2",
  },
  offline: {
    border: "#B8B2A0",
    text: "#9C9788",
    dot: "#9C9788",
    label: "Offline",
    chipBg: "#F3F2ED",
  },
};

export default function MeterCard({ meter, onClick }) {
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
      style={{ border: `2px solid ${s.border}` }}
      className="group text-left w-full rounded-2xl bg-white transition-all duration-200 hover:-translate-y-[3px] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17140F] focus-visible:ring-offset-2"
    >
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-4">
        <div>
          <h3 className="text-[#17140F] font-semibold text-base leading-tight">
            {name}
          </h3>
          <p className="text-[#9C9788] text-[11px] font-mono mt-0.5">
            {meterId} · {meterLocation}
          </p>
        </div>
        <span
          className="flex items-center gap-1.5 text-[11px] font-mono font-medium shrink-0 ml-3 px-2.5 py-1 rounded-full"
          style={{ color: s.text, backgroundColor: s.chipBg }}
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

      {/* Featured metric — the number that matters most at a glance */}
      <div className="px-5 mt-4">
        <p className="text-[#9C9788] text-[11px] mb-0.5">Energy today</p>
        <p className="font-mono text-[#17140F] text-3xl tabular-nums leading-none">
          {sensorData?.energy_supplied_today ?? "—"}
          <span className="text-sm text-[#9C9788] ml-1.5">kWh</span>
        </p>
      </div>

      {/* Secondary readings — compact row, not boxed cells */}
      <div className="flex items-stretch mt-4 mx-5 border-t border-[#E4E1D8]">
        {[
          {
            label: "Phase A-N",
            value: sensorData?.phase_a_voltage,
            unit: "kV",
          },
          {
            label: "Phase B-N",
            value: sensorData?.phase_b_voltage,
            unit: "kV",
          },
          { label: "Phase A", value: sensorData?.phase_a_current, unit: "A" },
        ].map((r, i) => (
          <div
            key={r.label}
            className={`flex-1 py-3 ${
              i > 0 ? "border-l border-[#E4E1D8] pl-3" : ""
            }`}
          >
            <p className="text-[#9C9788] text-[10px] mb-0.5">{r.label}</p>
            <p className="font-mono text-[#17140F] text-sm tabular-nums">
              {r.value ?? "—"}
              <span className="text-[#9C9788] text-xs ml-0.5">{r.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 mt-1 border-t border-[#E4E1D8]">
        <span className="text-[10px] text-[#9C9788] font-mono">
          Synced {lastSync}
        </span>
        <span className="text-[10px] text-[#6B675E] group-hover:text-[#17140F] transition-colors">
          View meter →
        </span>
      </div>
    </button>
  );
}
