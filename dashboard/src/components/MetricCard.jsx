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
import useMeterStore from "../store/useMeterStore";

export default function MetricCard({ label, value, unit }) {
  const gatewayConnection = useMeterStore((s) => s.gatewayConnection);
  const serverConnection = useMeterStore((s) => s.serverConnection);
  const live = gatewayConnection !== false && serverConnection !== false;

  return (
    <div className="bg-white border border-[#E4E1D8] px-4 py-3">
      <p className="text-[#9C9788] text-[11px] mb-1">{label}</p>
      <p className="font-mono text-2xl text-[#17140F] tabular-nums leading-none">
        {value !== undefined && value !== null && live ? value : "—"}
        <span className="text-xs text-[#9C9788] ml-1">{unit}</span>
      </p>
    </div>
  );
}
