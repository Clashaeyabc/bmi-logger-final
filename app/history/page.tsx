import HistoryTable from "@/components/HistoryTable";
import ImportExportPanel from "@/components/ImportExportPanel";

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">ประวัติการบันทึก</h1>
      <ImportExportPanel />
      <HistoryTable />
    </div>
  );
}