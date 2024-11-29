import { CreateRecordForm } from "@/components/create-record-form";
import { RecordsList } from "@/components/records-list";

export default function MedicalRecords() {
  return (
    <div className="space-y-8">
      <CreateRecordForm />
      <RecordsList />
    </div>
  );
}
