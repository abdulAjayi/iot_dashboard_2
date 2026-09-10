// import useAuthStore from "../store/useAuthStore";
// import { useNavigate } from "react-router-dom";

// function Header({ meterName, status, sensorData, onBack }) {
//   const isLive = status === "normal" || status === "critical";
//   const lastSync = sensorData?.timestamp
//     ? new Date(sensorData.timestamp).toLocaleTimeString()
//     : "--";
//   const logout = useAuthStore((s) => s.logout);
//   const user = useAuthStore((s) => s.user);
//   const navigate = useNavigate();

//   function handleLogout() {
//     logout();
//     navigate("/login");
//   }

//   const isAdmin = user?.role === "admin";

//   return (
//     <div className="mb-4">
//       {/* Row 1 — Back button + Logout */}
//       <div className="flex items-center justify-between ">
//         <div className="flex items-center gap-3">
//           {onBack && (
//             <button
//               onClick={onBack}
//               className="text-green-400 hover:text-green-300 text-sm transition-colors"
//             >
//               ← Overview
//             </button>
//           )}
//         </div>

//         {/* Logout always visible top right on mobile */}
//         <button
//           onClick={handleLogout}
//           className="ml-auto text-gray-400 hover:text-red-400 text-xs transition-colors  rounded hover:bg-red-400/10 lg:hidden"
//         >
//           Logout
//         </button>
//       </div>
//       {/* Row 2 — Title */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1
//             className="text-white text-lg lg:text-xl font-bold cursor-pointer"
//             onClick={onBack}
//           >
//             Ikeja Electric Monitoring Dashboard
//           </h1>
//         </div>

//         {/* Desktop only right side */}
//         <div className="hidden lg:flex items-center gap-3">
//           {/* Live status */}
//           <span
//             className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
//             style={{
//               backgroundColor: isLive ? "#22c55e22" : "#ef444422",
//               color: isLive ? "#22c55e" : "#ef4444",
//             }}
//           >
//             ● {isLive ? "LIVE" : "OFFLINE"}
//           </span>

//           <span className="text-gray-400 text-xs">Last sync: {lastSync}</span>

//           <div className="w-px h-4 bg-gray-600" />

//           <div className="flex items-center gap-2">
//             <span className="text-gray-400 text-xs">👤 {user?.username}</span>
//             <span
//               className="text-xs font-semibold px-2 py-0.5 rounded-full"
//               style={{
//                 backgroundColor: isAdmin ? "#7c3aed22" : "#64748b22",
//                 color: isAdmin ? "#a78bfa" : "#94a3b8",
//                 border: `1px solid ${isAdmin ? "#7c3aed44" : "#64748b44"}`,
//               }}
//             >
//               {isAdmin ? "ADMIN" : "OPERATOR"}
//             </span>
//           </div>

//           <div className="w-px h-4 bg-gray-600" />

//           <button
//             onClick={handleLogout}
//             className="text-gray-400 hover:text-red-400 text-xs transition-colors px-2 py-1 rounded hover:bg-red-400/10"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Row 3 — Mobile only status bar */}
//       <div className="flex items-center gap-3 mt-2 lg:hidden flex-wrap">
//         <span
//           className="text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
//           style={{
//             backgroundColor: isLive ? "#22c55e22" : "#ef444422",
//             color: isLive ? "#22c55e" : "#ef4444",
//           }}
//         >
//           ● {isLive ? "LIVE" : "OFFLINE"}
//         </span>

//         <span className="text-gray-400 text-xs">Last sync: {lastSync}</span>

//         <div className="flex items-center gap-2">
//           <span className="text-gray-400 text-xs">👤 {user?.username}</span>
//           <span
//             className="text-xs font-semibold px-2 py-0.5 rounded-full"
//             style={{
//               backgroundColor: isAdmin ? "#7c3aed22" : "#64748b22",
//               color: isAdmin ? "#a78bfa" : "#94a3b8",
//               border: `1px solid ${isAdmin ? "#7c3aed44" : "#64748b44"}`,
//             }}
//           >
//             {isAdmin ? "ADMIN" : "OPERATOR"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Header;
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const STATUS = {
  critical: { color: "#D62828", dot: "#D62828", label: "Critical" },
  normal: { color: "#1B7A43", dot: "#3FB65F", label: "Live" },
};

function Header({
  meterName,
  meterId,
  macAddress,
  status,
  sensorData,
  onBack,
}) {
  const isLive = status === "normal" || status === "critical";
  const s = STATUS[status] || {
    color: "#9C9788",
    dot: "#9C9788",
    label: "Offline",
  };
  const lastSync = sensorData?.timestamp
    ? new Date(sensorData.timestamp).toLocaleTimeString()
    : "--";
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="pb-6 border-b border-[#E4E1D8] mb-6">
      <div className="flex items-center justify-between mb-4">
        {onBack && (
          <button
            onClick={onBack}
            className="text-[#6B675E] hover:text-[#17140F] text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17140F] rounded-sm"
          >
            ← Overview
          </button>
        )}
        <button
          onClick={handleLogout}
          className="lg:hidden text-[#6B675E] hover:text-[#D62828] text-xs transition-colors"
        >
          Log out
        </button>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[#D62828] text-xs font-mono mb-1">
            {meterId || "—"}
            {macAddress ? ` · ${macAddress}` : ""}
          </p>
          <h1
            className="text-[#17140F] text-[26px] font-bold leading-none cursor-pointer"
            onClick={onBack}
          >
            {meterName || "Meter"}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="flex items-center gap-1.5 text-xs font-mono font-medium"
            style={{ color: s.color }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: s.dot }}
            />
            {isLive ? s.label : "Offline"}
          </span>
          <span className="text-[#9C9788] text-xs font-mono">
            Synced {lastSync}
          </span>

          <div className="hidden lg:block w-px h-4 bg-[#E4E1D8]" />

          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[#6B675E] text-xs">{user?.username}</span>
            <span
              className="text-[10px] font-mono px-1.5 py-0.5 border"
              style={{
                color: isAdmin ? "#B8860B" : "#6B675E",
                borderColor: isAdmin ? "#E8A600" : "#E4E1D8",
              }}
            >
              {isAdmin ? "ADMIN" : "OPERATOR"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="hidden lg:block text-[#6B675E] hover:text-[#D62828] text-xs transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
