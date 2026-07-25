import { listProjects } from "@/actions/admin/projects";
import { InvoiceCreateForm } from "@/components/admin/forms/InvoiceCreateForm";
import { PageHeader } from "@/components/admin/PageHeader";

export default async function NewInvoicePage() {
  const projectsResult = await listProjects();
  const projects = projectsResult.data ?? [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="New invoice"
        description="Invoice numbers are auto-generated as DL-YYYY-####."
      />
      <InvoiceCreateForm projects={projects} />
    </div>
  );
}
