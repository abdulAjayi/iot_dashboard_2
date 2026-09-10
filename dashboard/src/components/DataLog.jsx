// import useMeterStore from "../store/useMeterStore";

// function computeRowStatus(row, thresholds) {
//   if (!row) return "OFFLINE";
//   for (const [key, threshold] of Object.entries(thresholds)) {
//     if (!threshold || typeof threshold !== "object") continue;
//     const value = row[key];
//     if (value === undefined) continue;
//     const hasMin = typeof threshold.min === "number";
//     const hasMax = typeof threshold.max === "number";
//     if (hasMin && value < threshold.min) return "CRITICAL";
//     if (hasMax && value > threshold.max) return "CRITICAL";
//   }
//   return "NORMAL";
// }

// export default function DataLog({ history, thresholds }) {
//   const serverConnection = useMeterStore((s) => s.serverConnection);
//   const gatewayConnection = useMeterStore((s) => s.gatewayConnection);
//   const rows = [...history].reverse().slice(0, 10);
//   const Connection = serverConnection && gatewayConnection;

//   return (
//     <div>
//       {Connection && (
//         <div className="bg-gray-900 border border-green-800 rounded-xl p-4 h-full">
//           <h2 className="text-green-400 font-bold text-sm mb-3 uppercase tracking-wider">
//             Data Log
//           </h2>
//           <div className="overflow-x-auto">
//             <table className="w-full text-xs text-left">
//               <thead>
//                 <tr className="text-gray-400 border-b border-gray-700">
//                   {[
//                     "Time",
//                     "PHASE A-N VOLTAGE",
//                     "PHASE B-N VOLTAGE",
//                     "PHASE C-N VOLTAGE",
//                     "Phase A Current",
//                     "Phase B Current",
//                     "Phase C Current",
//                     "Energy Today",
//                     "Frequency",
//                     "Power Factor",
//                     "Status",
//                   ].map((h) => (
//                     <th key={h} className="pb-2 pr-4">
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//             </table>
//           </div>

//           <div className="overflow-y-auto max-h-[280px]">
//             <table className="w-full text-xs text-left">
//               <tbody>
//                 {rows.map((d, i) => {
//                   const status = computeRowStatus(d, thresholds);
//                   return (
//                     <tr
//                       key={i}
//                       className="border-b border-gray-800 text-gray-300"
//                     >
//                       <td className="py-1 pr-4">
//                         {new Date(d.timestamp).toLocaleTimeString()}
//                       </td>
//                       <td className="py-1 pr-4">{d.phase_a_voltage} kV</td>
//                       <td className="py-1 pr-4">{d.phase_b_voltage} kV</td>
//                       <td className="py-1 pr-4">{d.phase_c_voltage} kV</td>
//                       <td className="py-1 pr-4">{d.phase_a_current} A</td>
//                       <td className="py-1 pr-4">{d.phase_b_current} A</td>
//                       <td className="py-1 pr-4">{d.phase_c_current} A</td>
//                       <td className="py-1 pr-4">
//                         {d.energy_supplied_today} kWh
//                       </td>
//                       <td className="py-1 pr-4">{d.frequency} Hz</td>
//                       <td className="py-1 pr-4">{d.power_factor}</td>
//                       <td className="py-1">
//                         <span
//                           className="text-xs font-bold"
//                           style={{
//                             color:
//                               status === "CRITICAL"
//                                 ? "#ef4444"
//                                 : status === "NORMAL"
//                                   ? "#22c55e"
//                                   : "#6b7280",
//                           }}
//                         >
//                           {status}
//                         </span>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import useMeterStore from "../store/useMeterStore";

function computeRowStatus(row, thresholds) {
  if (!row) return "OFFLINE";
  for (const [key, threshold] of Object.entries(thresholds)) {
    if (!threshold || typeof threshold !== "object") continue;
    const value = row[key];
    if (value === undefined) continue;
    const hasMin = typeof threshold.min === "number";
    const hasMax = typeof threshold.max === "number";
    if (hasMin && value < threshold.min) return "CRITICAL";
    if (hasMax && value > threshold.max) return "CRITICAL";
  }
  return "NORMAL";
}

const STATUS_COLOR = {
  CRITICAL: "#D62828",
  NORMAL: "#1B7A43",
  OFFLINE: "#9C9788",
};

export default function DataLog({ history, thresholds }) {
  const serverConnection = useMeterStore((s) => s.serverConnection);
  const gatewayConnection = useMeterStore((s) => s.gatewayConnection);
  const rows = [...history].reverse().slice(0, 10);
  const connected = serverConnection && gatewayConnection;

  if (!connected) return null;

  const columns = [
    "Time",
    "Phase A-N",
    "Phase B-N",
    "Phase C-N",
    "Phase A",
    "Phase B",
    "Phase C",
    "Energy today",
    "Frequency",
    "PF",
    "Status",
  ];

  return (
    <div className="bg-white border border-[#E4E1D8]">
      <h2 className="text-[#17140F] font-semibold text-sm px-4 pt-4 pb-3">
        Data log
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="text-[#9C9788] border-t border-b border-[#E4E1D8]">
              {columns.map((h) => (
                <th key={h} className="py-2 px-4 font-normal whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((d, i) => {
              const status = computeRowStatus(d, thresholds);
              return (
                <tr
                  key={i}
                  className="border-b border-[#E4E1D8] text-[#17140F] font-mono"
                >
                  <td className="py-2 px-4 whitespace-nowrap">
                    {new Date(d.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-4">{d.phase_a_voltage} kV</td>
                  <td className="py-2 px-4">{d.phase_b_voltage} kV</td>
                  <td className="py-2 px-4">{d.phase_c_voltage} kV</td>
                  <td className="py-2 px-4">{d.phase_a_current} A</td>
                  <td className="py-2 px-4">{d.phase_b_current} A</td>
                  <td className="py-2 px-4">{d.phase_c_current} A</td>
                  <td className="py-2 px-4">{d.energy_supplied_today} kWh</td>
                  <td className="py-2 px-4">{d.frequency} Hz</td>
                  <td className="py-2 px-4">{d.power_factor}</td>
                  <td className="py-2 px-4">
                    <span
                      className="flex items-center gap-1.5 font-sans font-medium"
                      style={{ color: STATUS_COLOR[status] }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: STATUS_COLOR[status] }}
                      />
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
