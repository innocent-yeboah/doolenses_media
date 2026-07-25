import { LeadCreateForm } from "@/components/admin/forms/LeadCreateForm";
import { PageHeader } from "@/components/admin/PageHeader";

export default function NewLeadPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="New lead" description="Add a lead manually to the CRM pipeline." />
      <LeadCreateForm />
    </div>
  );
}
