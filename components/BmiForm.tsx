"use client";

import { useMemo, useState } from "react";
import { addLog } from "@/lib/storage";
import { bmiCategory, calcBmi, categoryLabel, round2, validateHeightWeight } from "@/lib/bmi";
import type { BmiLog } from "@/lib/types";

function uuid(): string {
  // simple uuid-ish for local usage
  return crypto?.randomUUID?.() ?? `id_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export default function BmiForm() {
  const [height, setHeight] = useState<string>("170");
  const [weight, setWeight] = useState<string>("65");
  const [note, setNote] = useState<string>("");
  const [result, setResult] = useState<{ bmi: number; cat: ReturnType<typeof bmiCategory> } | null>(null);
  const [msg, setMsg] = useState<string>("");

  const parsed = useMemo(() => {
    const h = Number(height);
    const w = Number(weight);
    return { h, w };
  }, [height, weight]);

  function onCalculate() {
    setMsg("");
    const err = validateHeightWeight(parsed.h, parsed.w);
    if (err) {
      setResult(null);
      setMsg(err);
      return;
    }
    const bmi = round2(calcBmi(parsed.h, parsed.w));
    const cat = bmiCategory(bmi);
    setResult({ bmi, cat });
  }

  function onSave() {
    setMsg("");
    if (!result) {
      setMsg("กรุณากด Calculate ก่อนบันทึก");
      return;
    }
    const log: BmiLog = {
      id: uuid(),
      height_cm: parsed.h,
      weight_kg: parsed.w,
      bmi: result.bmi,
      category: result.cat,
      note: note.trim() ? note.trim() : undefined,
      created_at: new Date().toISOString()
    };
    addLog(log);
    setMsg("บันทึกเรียบร้อย ✅");
  }

  return (
    <div className="rounded-2xl border p-4 shadow-sm space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-1">
          <div className="text-sm font-medium">ส่วนสูง (ซม.)</div>
          <input
            className="w-full rounded-xl border px-3 py-2"
            inputMode="decimal"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="เช่น 170"
          />
        </label>

        <label className="space-y-1">
          <div className="text-sm font-medium">น้ำหนัก (กก.)</div>
          <input
            className="w-full rounded-xl border px-3 py-2"
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="เช่น 65"
          />
        </label>

        <label className="space-y-1 sm:col-span-2">
          <div className="text-sm font-medium">หมายเหตุ (ไม่บังคับ)</div>
          <input
            className="w-full rounded-xl border px-3 py-2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="เช่น หลังออกกำลังกาย"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="rounded-xl border px-4 py-2" onClick={onCalculate}>
          Calculate
        </button>
        <button className="rounded-xl border px-4 py-2" onClick={onSave}>
          Save Log
        </button>
        <a className="rounded-xl border px-4 py-2" href="/history">
          ไปหน้าประวัติ
        </a>
      </div>

      {msg ? <div className="text-sm text-zinc-700">{msg}</div> : null}

      {result ? (
        <div className="rounded-xl bg-zinc-50 border p-3">
          <div className="text-sm text-zinc-600">ผลลัพธ์</div>
          <div className="text-lg font-semibold">BMI: {result.bmi}</div>
          <div className="text-sm">หมวดหมู่: {categoryLabel(result.cat)} ({result.cat})</div>
        </div>
      ) : null}
    </div>
  );
}