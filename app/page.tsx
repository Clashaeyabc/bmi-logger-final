import BmiForm from "@/components/BmiForm";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">คำนวณและบันทึก BMI</h1>
      <BmiForm />
      <div className="text-sm text-zinc-600">
        เคล็ดลับ: ถ้าต้องการสำรองข้อมูล ให้ไปหน้า “ประวัติ” แล้ว Export เป็น JSON
      </div>
    </div>
  );
}