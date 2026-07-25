import { notFound } from "next/navigation";
import { getProject, listProjectTasks } from "@/actions/admin/projects";
import { ProjectDetailPanel } from "@/components/admin/forms/ProjectDetailPanel";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatusBadge } from "@/components/admin/StatusBadge";

interface ProjectDetailPageProps {
  params: { id: string };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [projectResult, tasksResult] = await Promise.all([
    getProject(params.id),
    listProjectTasks(params.id),
  ]);

  if (!projectResult.success || !projectResult.data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={projectResult.data.project_name}
        description={projectResult.data.client_name}
        actions={<StatusBadge status={projectResult.data.status} />}
      />
      <ProjectDetailPanel
        project={projectResult.data}
        tasks={tasksResult.data ?? []}
      />
    </div>
  );
}
