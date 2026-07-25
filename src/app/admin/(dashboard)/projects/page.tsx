import { listProjects } from "@/actions/admin/projects";
import { ProjectKanban } from "@/components/admin/forms/ProjectKanban";
import { EmptyState } from "@/components/admin/EmptyState";
import { PageHeader } from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/Button";

export default async function ProjectsPage() {
  const result = await listProjects();
  const projects = result.data ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Track productions from planning through delivery."
        actions={
          <Button href="/admin/projects/new" size="sm">
            New project
          </Button>
        }
      />

      {!result.success ? (
        <p className="text-sm text-red-300">{result.message}</p>
      ) : projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description="Convert a booked lead or create a project manually."
          action={
            <Button href="/admin/projects/new" size="sm">
              Create project
            </Button>
          }
        />
      ) : (
        <ProjectKanban projects={projects} />
      )}
    </div>
  );
}
