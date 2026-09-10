// export default function Reading({ label, value, unit }) {
//   return (
//     <div className="bg-[#1A1A1A] rounded-lg p-3">
//       <div className="text-[#FFFFFF] text-xs mb-1 opacity-60">{label}</div>
//       <div className="text-[#FFFFFF] font-semibold text-sm">
//         {value !== undefined && value !== null ? `${value} ${unit}` : "--"}
//       </div>
//     </div>
//   );
// }

export default function Reading({ label, value, unit }) {
  return (
    <div className="bg-white px-3 py-2.5">
      <div className="text-[10px] text-[#9C9788] mb-1">{label}</div>
      <div className="font-mono text-sm text-[#17140F] tabular-nums">
        {value !== undefined && value !== null ? (
          <>
            {value}
            <span className="text-[#9C9788] ml-1">{unit}</span>
          </>
        ) : (
          "—"
        )}
      </div>
    </div>
  );
}
