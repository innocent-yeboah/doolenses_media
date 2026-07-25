import { ProjectCreateForm } from "@/components/admin/forms/ProjectCreateForm";
import { PageHeader } from "@/components/admin/PageHeader";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="New project" description="Start a new production in the pipeline." />
      <ProjectCreateForm />
    </div>
  );
}
