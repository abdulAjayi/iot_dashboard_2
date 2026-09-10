// // import { useState } from "react";
// // import useMeterStore from "../store/useMeterStore";
// // import { ThresholdField } from "../components/ThresholdField";
// // import { useSocket } from "../hooks/useSocket";
// // import { defaultThresholds } from "../store/meterConstants";

// // function ThresholdSettings({ meterId, thresholds }) {
// //   const updateThresholds = useMeterStore((state) => state.updateThresholds);
// //   const { sendCommand } = useSocket();

// //   const [local, setLocal] = useState({ ...thresholds });
// //   const [saved, setSaved] = useState(false);

// //   function handleChange(field, value) {
// //     setLocal((prev) => {
// //       const [sensor, minmax] = field.split(".");
// //       return {
// //         ...prev,
// //         [sensor]: { ...prev[sensor], [minmax]: value },
// //       };
// //     });
// //     setSaved(false);
// //   }

// //   function handleSave(field, value) {
// //     updateThresholds(meterId, local);
// //     setSaved(true);
// //     sendCommand(field, value, meterId);
// //     setTimeout(() => setSaved(false), 2000);
// //   }

// //   function handleReset() {
// //     const defaults = { ...defaultThresholds };
// //     setLocal(defaults);
// //     updateThresholds(meterId, defaults);
// //     setSaved(false);
// //   }

// //   return (
// //     <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5">
// //       <p className="text-green-400 text-xs font-bold mb-4 tracking-widest">
// //         THRESHOLD SETTINGS
// //       </p>

// //       <ThresholdField
// //         label="PHASE A-N VOLTAGE (kV)"
// //         fieldMin="phase_a_voltage.min"
// //         fieldMax="phase_a_voltage.max"
// //         values={local.phase_a_voltage}
// //         onChange={handleChange}
// //       />

// //       <ThresholdField
// //         label="PHASE B-N VOLTAGE (kV)"
// //         fieldMin="phase_b_voltage.min"
// //         fieldMax="phase_b_voltage.max"
// //         values={local.phase_b_voltage}
// //         onChange={handleChange}
// //       />

// //       <ThresholdField
// //         label="PHASE C-N VOLTAGE (kV)"
// //         fieldMin="phase_c_voltage.min"
// //         fieldMax="phase_c_voltage.max"
// //         values={local.phase_c_voltage}
// //         onChange={handleChange}
// //       />

// //       <ThresholdField
// //         label="Phase A Current (A)"
// //         fieldMin="phase_a_current.min"
// //         fieldMax="phase_a_current.max"
// //         values={local.phase_a_current}
// //         onChange={handleChange}
// //       />

// //       <ThresholdField
// //         label="Phase B Current (A)"
// //         fieldMin="phase_b_current.min"
// //         fieldMax="phase_b_current.max"
// //         values={local.phase_b_current}
// //         onChange={handleChange}
// //       />

// //       <ThresholdField
// //         label="Phase C Current (A)"
// //         fieldMin="phase_c_current.min"
// //         fieldMax="phase_c_current.max"
// //         values={local.phase_c_current}
// //         onChange={handleChange}
// //       />

// //       <div className="flex gap-3 mt-2">
// //         <button
// //           onClick={handleSave}
// //           className="flex-1 bg-green-600 hover:bg-green-500 text-white text-sm font-bold py-2 rounded-lg transition-colors"
// //         >
// //           {saved ? "✓ Saved" : "Save Thresholds"}
// //         </button>
// //         <button
// //           onClick={handleReset}
// //           className="px-4 bg-[#1e293b] hover:bg-[#334155] text-gray-300 text-sm font-bold py-2 rounded-lg transition-colors"
// //         >
// //           Reset
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
// // export default ThresholdSettings;

// import { useState } from "react";
// import useMeterStore from "../store/useMeterStore";
// import { ThresholdField } from "../components/ThresholdField";
// import { useSocket } from "../hooks/useSocket";
// import { defaultThresholds } from "../store/meterConstants";

// function ThresholdSettings({ meterId, thresholds }) {
//   const updateThresholds = useMeterStore((state) => state.updateThresholds);
//   const { sendCommand } = useSocket();

//   const [local, setLocal] = useState({ ...thresholds });
//   const [saved, setSaved] = useState(false);

//   function handleChange(field, value) {
//     setLocal((prev) => {
//       const [sensor, minmax] = field.split(".");
//       return {
//         ...prev,
//         [sensor]: { ...prev[sensor], [minmax]: value },
//       };
//     });
//     setSaved(false);
//   }

//   function handleSave() {
//     updateThresholds(meterId, local);
//     setSaved(true);
//     sendCommand("update_thresholds", local, meterId);
//     setTimeout(() => setSaved(false), 2000);
//   }

//   function handleReset() {
//     const defaults = { ...defaultThresholds };
//     setLocal(defaults);
//     updateThresholds(meterId, defaults);
//     setSaved(false);
//   }

//   return (
//     <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl p-5">
//       <p className="text-green-400 text-xs font-bold mb-4 tracking-widest">
//         THRESHOLD SETTINGS
//       </p>

//       <ThresholdField
//         label="PHASE A-N VOLTAGE (kV)"
//         fieldMin="phase_a_voltage.min"
//         fieldMax="phase_a_voltage.max"
//         values={local.phase_a_voltage}
//         onChange={handleChange}
//       />

//       <ThresholdField
//         label="PHASE B-N VOLTAGE (kV)"
//         fieldMin="phase_b_voltage.min"
//         fieldMax="phase_b_voltage.max"
//         values={local.phase_b_voltage}
//         onChange={handleChange}
//       />

//       <div className="flex gap-3 mt-2">
//         <button
//           onClick={handleSave}
//           className="flex-1 bg-green-600 hover:bg-green-500 text-white text-sm font-bold py-2 rounded-lg transition-colors"
//         >
//           {saved ? "✓ Saved" : "Save Thresholds"}
//         </button>
//         <button
//           onClick={handleReset}
//           className="px-4 bg-[#1e293b] hover:bg-[#334155] text-gray-300 text-sm font-bold py-2 rounded-lg transition-colors"
//         >
//           Reset
//         </button>
//       </div>
//     </div>
//   );
// }
// export default ThresholdSettings;
import { useEffect, useState } from "react";
import useMeterStore from "../store/useMeterStore";
import { ThresholdField } from "../components/ThresholdField";

// Which sensor fields this panel edits, keyed by the "phase" prop passed
// from MeterDashboard ("ab" -> Phase A & B voltage, "c" -> Phase C voltage + current).
const FIELD_GROUPS = {
  ab: [
    {
      label: "Phase A-N voltage (kV)",
      min: "phase_a_voltage_min",
      max: "phase_a_voltage_max",
    },
    {
      label: "Phase B-N voltage (kV)",
      min: "phase_b_voltage_min",
      max: "phase_b_voltage_max",
    },
  ],
  c: [
    {
      label: "Phase C-N voltage (kV)",
      min: "phase_c_voltage_min",
      max: "phase_c_voltage_max",
    },
    {
      label: "Phase C current (A)",
      min: "phase_c_current_min",
      max: "phase_c_current_max",
    },
  ],
};

export default function ThresholdSettings({ meterId, thresholds, phase }) {
  const updateThresholds = useMeterStore((s) => s.updateThresholds);
  const groups = FIELD_GROUPS[phase] || [];

  // Local draft state so edits don't hit the store until "Save" is pressed.
  const [draft, setDraft] = useState(thresholds || {});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(thresholds || {});
  }, [thresholds]);

  function handleChange(field, value) {
    setSaved(false);
    setDraft((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    updateThresholds?.(meterId, draft);
    setSaved(true);
  }

  function handleReset() {
    setDraft(thresholds || {});
    setSaved(false);
  }

  return (
    <div className="bg-white border border-[#E4E1D8] p-4 h-full flex flex-col">
      <h2 className="text-[#17140F] font-semibold text-sm mb-4">
        Threshold settings
      </h2>

      <div className="flex-1">
        {groups.map((group) => (
          <ThresholdField
            key={group.min}
            label={group.label}
            fieldMin={group.min}
            fieldMax={group.max}
            values={{
              min: draft[group.min] ?? 0,
              max: draft[group.max] ?? 0,
            }}
            onChange={handleChange}
          />
        ))}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSave}
          className="flex-1 bg-[#1B7A43] hover:bg-[#17693A] text-white text-sm font-medium py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17140F] focus-visible:ring-offset-2"
        >
          Save thresholds
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 border border-[#E4E1D8] text-[#6B675E] hover:text-[#17140F] hover:border-[#17140F] text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17140F] focus-visible:ring-offset-2"
        >
          Reset
        </button>
      </div>

      {saved && (
        <p className="text-[#1B7A43] text-xs font-mono mt-2">
          Thresholds saved.
        </p>
      )}
    </div>
  );
}
