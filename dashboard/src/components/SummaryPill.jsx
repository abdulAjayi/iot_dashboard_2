// export default function SummaryPill({
//   count,
//   label,
//   color,
//   backgroundColor,
//   textColor,
//   opacity,
// }) {
//   return (
//     <div
//       className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
//       style={{
//         backgroundColor: backgroundColor || color + "22",
//         color: textColor || color,
//         opacity: opacity || 1,
//       }}
//     >
//       <span className="text-lg font-bold">{count}</span> {label}
//     </div>
//   );
// }

// export default function SummaryPill({ count, label, accent }) {
//   return (
//     <div className="flex-1 min-w-[140px] bg-white px-5 py-4 flex items-center gap-4">
//       <span
//         className="w-2.5 h-2.5 rounded-full shrink-0"
//         style={{ backgroundColor: accent, boxShadow: `0 0 0 4px ${accent}1A` }}
//       />
//       <div>
//         <div className="font-mono text-2xl leading-none text-[#17140F] tabular-nums">
//           {String(count).padStart(2, "0")}
//         </div>
//         <div className="text-xs text-[#6B675E] mt-1">{label}</div>
//       </div>
//     </div>
//   );
// }

// SummaryPill.jsx
export default function SummaryPill({ count, label, accent, total }) {
  const pct = total ? Math.round((count / total) * 100) : null;

  return (
    <div
      className="flex-1 min-w-[140px] bg-white px-5 py-4 border-t-2"
      style={{ borderTopColor: accent }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: accent }}
        />
        <span className="font-mono text-3xl leading-none text-[#17140F] tabular-nums">
          {String(count).padStart(2, "0")}
        </span>
      </div>
      <div className="flex items-baseline justify-between mt-2">
        <span className="text-xs text-[#6B675E]">{label}</span>
        {pct !== null && (
          <span className="text-[10px] font-mono text-[#9C9788]">{pct}%</span>
        )}
      </div>
    </div>
  );
}
