"use client";

import { exportJson, importJson } from "@/lib/storage";
import { useState } from "react";

export default function ImportExportPanel() {
  const [raw, setRaw] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  function doExport() {
    setMsg("");
    const text = exportJson();
    setRaw(text);
    setMsg("Export สำเร็จ: คัดลอก JSON ไปเก็บไว้ได้เลย");
  }

  function doImport() {
    setMsg("");
    const res = importJson(raw);
    if (!res.ok) {
      setMsg(`Import ไม่สำเร็จ: ${res.error}`);
      return;
    }
    setMsg(`Import สำเร็จ: ${res.count} รายการ ✅ (รีเฟรชหน้าเพื่อดูตาราง)`);
  }

  return (
    <div className="rounded-2xl border p-4 shadow-sm space-y-3">
      <div className="flex flex-wrap gap-2">
        <button className="rounded-xl border px-4 py-2" onClick={doExport}>
          Export JSON
        </button>
        <button className="rounded-xl border px-4 py-2" onClick={doImport}>
          Import JSON
        </button>
      </div>

      <textarea
        className="w-full min-h-[160px] rounded-xl border p-3 font-mono text-xs"
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        placeholder="กด Export เพื่อสร้าง JSON หรือวาง JSON ที่ต้องการ Import"
      />

      {msg ? <div className="text-sm text-zinc-700">{msg}</div> : null}
      <div className="text-xs text-zinc-600">
        หมายเหตุ: Import จะ “แทนที่ข้อมูลเดิมทั้งหมด” (เหมาะกับการกู้คืน/ย้ายเครื่อง)
      </div>
    </div>
  );
}