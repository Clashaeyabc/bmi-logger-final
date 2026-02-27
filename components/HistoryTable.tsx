"use client";

import { useEffect, useMemo, useState } from "react";
import type { BmiLog } from "@/lib/types";
import { deleteLog, loadLogs, updateLog } from "@/lib/storage";
import { bmiCategory, calcBmi, categoryLabel, round2, validateHeightWeight } from "@/lib/bmi";

type EditState = {
  id: string;
  height: string;
  weight: string;
  note: string;
};

export default function HistoryTable() {
  const [logs, setLogs] = useState<BmiLog[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [edit, setEdit] = useState<EditState | null>(null);

  useEffect(() => {
    setLogs(loadLogs());
  }, []);

  const hasLogs = useMemo(() => logs.length > 0, [logs]);

  function startEdit(l: BmiLog) {
    setMsg("");
    setEdit({
      id: l.id,
      height: String(l.height_cm),
      weight: String(l.weight_kg),
      note: l.note ?? ""
    });
  }

  function cancelEdit() {
    setEdit(null);
  }

  function saveEdit() {
    if (!edit) return;
    setMsg("");

    const h = Number(edit.height);
    const w = Number(edit.weight);
    const err = validateHeightWeight(h, w);
    if (err) {
      setMsg(err);
      return;
    }
    const bmi = round2(calcBmi(h, w));
    const cat = bmiCategory(bmi);

    const next = updateLog(edit.id, {
      height_cm: h,
      weight_kg: w,
      bmi,
      category: cat,
      note: edit.note.trim() ? edit.note.trim() : undefined
    });
    setLogs(next);
    setEdit(null);
    setMsg("อัปเดตสำเร็จ ✅");
  }

  function onDelete(id: string) {
    setMsg("");
    const next = deleteLog(id);
    setLogs(next);
    setMsg("ลบรายการแล้ว");
  }

  return (
    <div className="rounded-2xl border p-4 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="font-medium">Logs</div>
        <button className="rounded-xl border px-3 py-2 text-sm" onClick={() => setLogs(loadLogs())}>
          Refresh
        </button>
      </div>

      {msg ? <div className="text-sm text-zinc-700">{msg}</div> : null}

      {!hasLogs ? (
        <div className="text-sm text-zinc-600">ยังไม่มีข้อมูล — ไปหน้าคำนวณเพื่อบันทึก</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-3">เวลา</th>
                <th className="py-2 pr-3">ส่วนสูง</th>
                <th className="py-2 pr-3">น้ำหนัก</th>
                <th className="py-2 pr-3">BMI</th>
                <th className="py-2 pr-3">หมวด</th>
                <th className="py-2 pr-3">หมายเหตุ</th>
                <th className="py-2 pr-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l) => {
                const isEditing = edit?.id === l.id;
                return (
                  <tr key={l.id} className="border-b align-top">
                    <td className="py-2 pr-3 whitespace-nowrap">
                      {new Date(l.created_at).toLocaleString()}
                      {l.updated_at ? (
                        <div className="text-xs text-zinc-500">แก้ไข: {new Date(l.updated_at).toLocaleString()}</div>
                      ) : null}
                    </td>

                    <td className="py-2 pr-3">
                      {isEditing ? (
                        <input
                          className="w-24 rounded-lg border px-2 py-1"
                          value={edit!.height}
                          onChange={(e) => setEdit({ ...edit!, height: e.target.value })}
                        />
                      ) : (
                        `${l.height_cm} ซม.`
                      )}
                    </td>

                    <td className="py-2 pr-3">
                      {isEditing ? (
                        <input
                          className="w-24 rounded-lg border px-2 py-1"
                          value={edit!.weight}
                          onChange={(e) => setEdit({ ...edit!, weight: e.target.value })}
                        />
                      ) : (
                        `${l.weight_kg} กก.`
                      )}
                    </td>

                    <td className="py-2 pr-3">{l.bmi}</td>
                    <td className="py-2 pr-3">
                      {categoryLabel(l.category)} <span className="text-xs text-zinc-500">({l.category})</span>
                    </td>

                    <td className="py-2 pr-3">
                      {isEditing ? (
                        <input
                          className="w-56 max-w-[14rem] rounded-lg border px-2 py-1"
                          value={edit!.note}
                          onChange={(e) => setEdit({ ...edit!, note: e.target.value })}
                        />
                      ) : (
                        l.note ?? <span className="text-zinc-400">—</span>
                      )}
                    </td>

                    <td className="py-2 pr-3 whitespace-nowrap">
                      {isEditing ? (
                        <div className="flex gap-2">
                          <button className="rounded-lg border px-3 py-1" onClick={saveEdit}>Save</button>
                          <button className="rounded-lg border px-3 py-1" onClick={cancelEdit}>Cancel</button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button className="rounded-lg border px-3 py-1" onClick={() => startEdit(l)}>Edit</button>
                          <button className="rounded-lg border px-3 py-1" onClick={() => onDelete(l.id)}>Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="text-xs text-zinc-600">
        Edge cases: ถ้ากรอกผิด/เกินช่วง ระบบจะไม่ยอม Save และแจ้ง error
      </div>
    </div>
  );
}