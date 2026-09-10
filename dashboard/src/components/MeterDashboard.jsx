// import { useParams, useNavigate } from "react-router-dom";
// import useMeterStore from "../store/useMeterStore";
// import MetricCard from "./MetricCard";
// import PressureChart from "./PressureChart";
// import TempChart from "./TempChart";
// import DataLog from "./DataLog";
// import ThresholdSettings from "../pages/ThresholdSettings";
// import Header from "./Header";

// function MeterDashboard() {
//   const { meterId } = useParams();
//   const navigate = useNavigate();
//   const routeKey = String(meterId || "")
//     .trim()
//     .toLowerCase();

//   const meter = useMeterStore((state) =>
//     state.meters.find((m) => {
//       const id = String(m.id || "")
//         .trim()
//         .toLowerCase();
//       const displayedMeterId = String(m.meterId || "")
//         .trim()
//         .toLowerCase();
//       return id === routeKey || displayedMeterId === routeKey;
//     }),
//   );

//   if (!meter) {
//     return (
//       <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center gap-4">
//         <p className="text-white text-xl">Meter not found: {meterId}</p>
//         <button
//           onClick={() => navigate("/")}
//           className="text-green-400 underline text-sm"
//         >
//           ← Back to Overview
//         </button>
//       </div>
//     );
//   }

//   const {
//     sensorData,
//     history,
//     status,
//     thresholds,
//     meterLocation,
//     meterId: mId,
//     name,
//     macAddress,
//   } = meter;
//   const isCritical = status === "critical";

//   return (
//     <div className="min-h-screen bg-[#0a0f1e] p-4">
//       <Header
//         meterName={name}
//         meterId={mId}
//         macAddress={macAddress}
//         status={status}
//         sensorData={sensorData}
//         onBack={() => navigate("/")}
//       />

//       {isCritical && (
//         <div className="bg-red-600 text-white text-center py-2 rounded-lg mb-4 font-bold tracking-wide animate-pulse">
//           ⚠ CRITICAL THRESHOLD EXCEEDED — IMMEDIATE ATTENTION REQUIRED
//         </div>
//       )}

//       <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-4 mb-4">
//         <p className="text-green-400 text-xs font-bold mb-3 tracking-widest">
//           METER DETAILS
//         </p>
//         <div className="grid grid-cols-3 gap-4 text-sm">
//           <div>
//             <p className="text-gray-400">Meter ID</p>
//             <p className="text-white font-semibold">{mId}</p>
//           </div>
//           <div>
//             <p className="text-gray-400">Meter Location</p>
//             <p className="text-white font-semibold">{meterLocation}</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
//         <MetricCard
//           label="PHASE A-N VOLTAGE"
//           value={sensorData?.phase_a_voltage}
//           unit="kV"
//         />
//         <MetricCard
//           label="PHASE B-N VOLTAGE"
//           value={sensorData?.phase_b_voltage}
//           unit="kV"
//         />
//         <MetricCard
//           label="PHASE C-N VOLTAGE"
//           value={sensorData?.phase_c_voltage}
//           unit="kV"
//         />
//         <MetricCard
//           label="Energy Supplied Today"
//           value={sensorData?.energy_supplied_today}
//           unit="kWh"
//         />
//         <MetricCard
//           label="Phase A Current"
//           value={sensorData?.phase_a_current}
//           unit="A"
//         />
//         <MetricCard
//           label="Phase B Current"
//           value={sensorData?.phase_b_current}
//           unit="A"
//         />
//         <MetricCard
//           label="Phase C Current"
//           value={sensorData?.phase_c_current}
//           unit="A"
//         />
//         <MetricCard label="Frequency" value={sensorData?.frequency} unit="Hz" />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
//         <PressureChart history={history} />
//         <TempChart history={history} />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
//         <div className="h-full">
//           <ThresholdSettings
//             meterId={meterId}
//             thresholds={thresholds}
//             phase="ab"
//           />
//         </div>
//         <div className="h-full">
//           <ThresholdSettings
//             meterId={meterId}
//             thresholds={thresholds}
//             phase="c"
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 mb-4">
//         <DataLog history={history} thresholds={thresholds} />
//       </div>
//     </div>
//   );
// }

// export default MeterDashboard;

import { useParams, useNavigate } from "react-router-dom";
import useMeterStore from "../store/useMeterStore";
import MetricCard from "./MetricCard";
import PressureChart from "./PressureChart";
import TempChart from "./TempChart";
import DataLog from "./DataLog";
import ThresholdSettings from "../pages/ThresholdSettings";
import Header from "./Header";

function MeterDashboard() {
  const { meterId } = useParams();
  const navigate = useNavigate();
  const routeKey = String(meterId || "")
    .trim()
    .toLowerCase();

  const meter = useMeterStore((state) =>
    state.meters.find((m) => {
      const id = String(m.id || "")
        .trim()
        .toLowerCase();
      const displayedMeterId = String(m.meterId || "")
        .trim()
        .toLowerCase();
      return id === routeKey || displayedMeterId === routeKey;
    }),
  );

  if (!meter) {
    return (
      <div className="min-h-screen bg-[#F6F5F1] flex flex-col items-center justify-center gap-4">
        <p className="text-[#17140F] text-lg">Meter not found: {meterId}</p>
        <button
          onClick={() => navigate("/")}
          className="text-[#1B7A43] hover:text-[#17693A] text-sm underline"
        >
          ← Back to overview
        </button>
      </div>
    );
  }

  const {
    sensorData,
    history,
    status,
    thresholds,
    meterLocation,
    meterId: mId,
    name,
    macAddress,
  } = meter;
  const isCritical = status === "critical";

  return (
    <div className="min-h-screen bg-[#F6F5F1]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Header
          meterName={name}
          meterId={mId}
          macAddress={macAddress}
          status={status}
          sensorData={sensorData}
          onBack={() => navigate("/")}
        />

        {isCritical && (
          <div className="flex items-center gap-2 bg-[#D62828] text-white text-sm font-medium px-4 py-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Critical threshold exceeded — immediate attention required
          </div>
        )}

        <div className="bg-white border border-[#E4E1D8] p-4 mb-6">
          <h2 className="text-[#17140F] font-semibold text-sm mb-3">
            Meter details
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-[#9C9788] text-xs">Meter ID</p>
              <p className="text-[#17140F] font-mono">{mId}</p>
            </div>
            <div>
              <p className="text-[#9C9788] text-xs">Location</p>
              <p className="text-[#17140F] font-mono">{meterLocation}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            label="Phase A-N voltage"
            value={sensorData?.phase_a_voltage}
            unit="kV"
          />
          <MetricCard
            label="Phase B-N voltage"
            value={sensorData?.phase_b_voltage}
            unit="kV"
          />
          <MetricCard
            label="Phase C-N voltage"
            value={sensorData?.phase_c_voltage}
            unit="kV"
          />
          <MetricCard
            label="Energy supplied today"
            value={sensorData?.energy_supplied_today}
            unit="kWh"
          />
          <MetricCard
            label="Phase A current"
            value={sensorData?.phase_a_current}
            unit="A"
          />
          <MetricCard
            label="Phase B current"
            value={sensorData?.phase_b_current}
            unit="A"
          />
          <MetricCard
            label="Phase C current"
            value={sensorData?.phase_c_current}
            unit="A"
          />
          <MetricCard
            label="Frequency"
            value={sensorData?.frequency}
            unit="Hz"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <PressureChart history={history} />
          <TempChart history={history} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <ThresholdSettings
            meterId={meterId}
            thresholds={thresholds}
            phase="ab"
          />
          <ThresholdSettings
            meterId={meterId}
            thresholds={thresholds}
            phase="c"
          />
        </div>

        <DataLog history={history} thresholds={thresholds} />
      </div>
    </div>
  );
}

export default MeterDashboard;
