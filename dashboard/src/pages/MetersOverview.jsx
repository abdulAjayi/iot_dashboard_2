// import { useNavigate } from "react-router-dom";
// import useMeterStore from "../store/useMeterStore";
// import useAuthStore from "../store/useAuthStore";
// import MeterCard from "../components/MeterCard";
// import SummaryPill from "../components/SummaryPill";
// import { useSocket } from "../hooks/useSocket";

// export default function MetersOverview() {
//   const meters = useMeterStore((s) => s.meters);
//   const navigate = useNavigate();
//   const logout = useAuthStore((s) => s.logout);
//   const user = useAuthStore((s) => s.user);
//   useSocket();

//   const sorted = [...meters].sort((a, b) => {
//     const order = { critical: 0, normal: 1, offline: 2 };
//     return (order[a.status] ?? 2) - (order[b.status] ?? 2);
//   });

//   const criticalCount = meters.filter((m) => m.status === "critical").length;
//   const normalCount = meters.filter((m) => m.status === "normal").length;
//   const offlineCount = meters.filter((m) => m.status === "offline").length;

//   function handleLogout() {
//     logout();
//     navigate("/login");
//   }

//   return (
//     <div className="min-h-screen bg-[#FFFFFF] p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-[#14100F] text-2xl font-bold">
//             Ikeja Electric Monitoring Dashboard
//           </h1>
//           <p className="text-[#C8102E] text-sm">Meters Overview</p>
//         </div>

//         <div className="flex items-center gap-3">
//           <div className="flex items-center gap-2">
//             <span className="text-[#A8A29E] text-xs">
//               👤 {user?.name || user?.email || "User"}
//             </span>
//           </div>

//           <div className="w-px h-4 bg-[#6B7280]" />

//           <button
//             onClick={handleLogout}
//             className="text-[#A8A29E] hover:text-[#C8102E] text-xs transition-colors px-2 py-1 rounded hover:bg-[#C8102E]/10"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       <div className="flex gap-4 mb-8">
//         <SummaryPill count={criticalCount} label="Critical" color="#E4002B" />
//         <SummaryPill count={normalCount} label="Live" color="#22c55e" />
//         <SummaryPill count={offlineCount} label="Offline" color="#6b7280" />
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//         {sorted.map((meter) => (
//           <MeterCard
//             key={meter.id}
//             meter={meter}
//             onClick={() => navigate(`/meter/${encodeURIComponent(meter.id)}`)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
// MetersOverview.jsx

import { useNavigate } from "react-router-dom";
import useMeterStore from "../store/useMeterStore";
import useAuthStore from "../store/useAuthStore";
import MeterCard from "../components/MeterCard";
import SummaryPill from "../components/SummaryPill";
import { useSocket } from "../hooks/useSocket";

export default function MetersOverview() {
  const meters = useMeterStore((s) => s.meters);
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  useSocket();

  const sorted = [...meters].filter(Boolean).sort((a, b) => {
    const order = { critical: 0, normal: 1, offline: 2 };
    return (order[a.status] ?? 2) - (order[b.status] ?? 2);
  });

  const criticalCount = meters.filter((m) => m.status === "critical").length;
  const normalCount = meters.filter((m) => m.status === "normal").length;
  const offlineCount = meters.filter((m) => m.status === "offline").length;
  const total = meters.length;

  const healthLine =
    criticalCount > 0
      ? `${criticalCount} meter${criticalCount > 1 ? "s need" : " needs"} attention`
      : offlineCount > 0
        ? `${offlineCount} meter${offlineCount > 1 ? "s" : ""} offline, rest normal`
        : "All systems normal";

  const healthColor = criticalCount > 0 ? "#D62828" : "#1B7A43";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-[#F6F5F1]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-end justify-between mb-8 pb-6 border-b border-[#E4E1D8]">
          <div>
            <p className="text-[#D62828] text-xs font-mono mb-1">
              Meters overview
            </p>
            <h1 className="text-[#17140F] text-[28px] font-bold leading-none mb-2">
              Ikeja Electric Monitoring
            </h1>
            <p
              className="flex items-center gap-1.5 text-xs font-mono"
              style={{ color: healthColor }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: healthColor }}
              />
              {healthLine}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#6B675E] text-xs">
              {user?.name || user?.email || "User"}
            </span>
            <div className="w-px h-4 bg-[#E4E1D8]" />
            <button
              onClick={handleLogout}
              className="text-[#6B675E] hover:text-[#D62828] text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17140F] rounded-sm"
            >
              Log out
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-px bg-[#E4E1D8] border border-[#E4E1D8] mb-8">
          <SummaryPill
            count={criticalCount}
            label="Critical"
            accent="#D62828"
            total={total}
          />
          <SummaryPill
            count={normalCount}
            label="Live"
            accent="#1B7A43"
            total={total}
          />
          <SummaryPill
            count={offlineCount}
            label="Offline"
            accent="#9C9788"
            total={total}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((meter) => (
            <MeterCard
              key={meter.id}
              meter={meter}
              onClick={() => navigate(`/meter/${encodeURIComponent(meter.id)}`)}
            />
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-20 text-[#9C9788] text-sm">
            No meters connected yet.
          </div>
        )}
      </div>
    </div>
  );
}
