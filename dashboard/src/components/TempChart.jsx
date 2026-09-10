// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import useMeterStore from "../store/useMeterStore";

// export default function TempChart({ history }) {
//   const serverConnection = useMeterStore((s) => s.serverConnection);
//   const gatewayConnection = useMeterStore((s) => s.gatewayConnection);

//   const data = history.map((d) => ({
//     time:
//       serverConnection && gatewayConnection
//         ? new Date(d.timestamp).toLocaleTimeString()
//         : null,
//     "Phase A Current":
//       serverConnection && gatewayConnection ? d.phase_a_current : null,
//     "Phase B Current":
//       serverConnection && gatewayConnection ? d.phase_b_current : null,
//     "Phase C Current":
//       serverConnection && gatewayConnection ? d.phase_c_current : null,
//   }));

//   return (
//     <div className="bg-gray-900 border border-green-800 rounded-xl p-4">
//       <h2 className="text-green-400 font-bold text-sm mb-3 uppercase tracking-wider">
//         Current Phase Trend (A) — Last 60s
//       </h2>
//       <ResponsiveContainer width="100%" height={260}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" stroke="#1f2d1f" />
//           <XAxis
//             dataKey="time"
//             tick={{ fill: "#6b7280", fontSize: 10 }}
//             interval="preserveStartEnd"
//           />
//           {/* <YAxis domain={[100, 500]} tick={{ fill: "#6b7280", fontSize: 10 }} /> */}
//           <YAxis domain={[100, 900]} tick={{ fill: "#6b7280", fontSize: 10 }} />
//           <Tooltip
//             contentStyle={{ background: "#111", border: "1px solid #166534" }}
//           />
//           <Legend />
//           <Line
//             type="monotone"
//             dataKey="Phase A Current"
//             stroke="#f97316"
//             dot={false}
//           />
//           <Line
//             type="monotone"
//             dataKey="Phase B Current"
//             stroke="#a78bfa"
//             dot={false}
//           />
//           <Line
//             type="monotone"
//             dataKey="Phase C Current"
//             stroke="#38bdf8"
//             dot={false}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useMeterStore from "../store/useMeterStore";

export default function TempChart({ history }) {
  const serverConnection = useMeterStore((s) => s.serverConnection);
  const gatewayConnection = useMeterStore((s) => s.gatewayConnection);
  const live = serverConnection && gatewayConnection;

  const data = history.map((d) => ({
    time: live ? new Date(d.timestamp).toLocaleTimeString() : null,
    "Phase A": live ? d.phase_a_current : null,
    "Phase B": live ? d.phase_b_current : null,
    "Phase C": live ? d.phase_c_current : null,
  }));

  return (
    <div className="bg-white border border-[#E4E1D8] p-4">
      <h2 className="text-[#17140F] font-semibold text-sm mb-4">
        Phase current trend{" "}
        <span className="text-[#9C9788] font-normal">— A, last 60s</span>
      </h2>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E4E1D8" />
          <XAxis
            dataKey="time"
            tick={{ fill: "#9C9788", fontSize: 10 }}
            interval="preserveStartEnd"
          />
          <YAxis domain={[100, 900]} tick={{ fill: "#9C9788", fontSize: 10 }} />
          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #E4E1D8",
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="Phase A"
            stroke="#1B7A43"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Phase B"
            stroke="#C98A00"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Phase C"
            stroke="#D62828"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
