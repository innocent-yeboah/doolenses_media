"use server";

import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/admin/auth";
import { actionError, actionSuccess, type AdminActionResult } from "@/lib/admin/action-result";
import {
  createProjectSchema,
  createProjectTaskSchema,
  projectStatusSchema,
  updateProjectSchema,
  updateProjectTaskSchema,
} from "@/lib/admin/validations";
import { createClient } from "@/lib/supabase/server";
import type { Project, ProjectTask } from "@/types/admin";

function normalizeEmail(email: string | null | undefined): string | null {
  if (!email?.trim()) return null;
  return email.trim();
}

export async function listProjects(
  status?: string
): Promise<AdminActionResult<Project[]>> {
  try {
    await requireStaff();
    const supabase = createClient();
    let query = supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) return actionError(error.message);
    return actionSuccess("Projects loaded.", data as Project[]);
  } catch {
    return actionError("Unable to load projects.");
  }
}

export async function getProject(id: string): Promise<AdminActionResult<Project>> {
  try {
    await requireStaff();
    const supabase = createClient();
    const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
    if (error) return actionError(error.message);
    if (!data) return actionError("Project not found.");
    return actionSuccess("Project loaded.", data as Project);
  } catch {
    return actionError("Unable to load project.");
  }
}

export async function listProjectTasks(
  projectId: string
): Promise<AdminActionResult<ProjectTask[]>> {
  try {
    await requireStaff();
    const supabase = createClient();
    const { data, error } = await supabase
      .from("project_tasks")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true });

    if (error) return actionError(error.message);
    return actionSuccess("Tasks loaded.", data as ProjectTask[]);
  } catch {
    return actionError("Unable to load tasks.");
  }
}

export async function createProject(
  input: unknown
): Promise<AdminActionResult<Project>> {
  try {
    const { user } = await requireStaff();
    const parsed = createProjectSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid project data.");
    }

    const supabase = createClient();
    const payload = {
      ...parsed.data,
      client_email: normalizeEmail(parsed.data.client_email ?? null),
      status: parsed.data.status ?? "planning",
      priority: parsed.data.priority ?? "normal",
      created_by: user.id,
    };

    const { data, error } = await supabase.from("projects").insert(payload).select("*").single();
    if (error) return actionError(error.message);

    revalidatePath("/admin/projects");
    revalidatePath("/admin/calendar");
    return actionSuccess("Project created.", data as Project);
  } catch {
    return actionError("Unable to create project.");
  }
}

export async function updateProject(
  input: unknown
): Promise<AdminActionResult<Project>> {
  try {
    await requireStaff();
    const parsed = updateProjectSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid project data.");
    }

    const { id, ...fields } = parsed.data;
    const supabase = createClient();

    const payload = {
      ...fields,
      client_email:
        fields.client_email !== undefined
          ? normalizeEmail(fields.client_email ?? null)
          : undefined,
      completed_at:
        fields.status === "completed" ? new Date().toISOString() : undefined,
    };

    const { data, error } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", id)
      .select("*")
      .single();

    if (error) return actionError(error.message);

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${id}`);
    revalidatePath("/admin/calendar");
    return actionSuccess("Project updated.", data as Project);
  } catch {
    return actionError("Unable to update project.");
  }
}

export async function updateProjectStatus(
  input: unknown
): Promise<AdminActionResult<Project>> {
  try {
    await requireStaff();
    const parsed = projectStatusSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid status.");
    }

    const supabase = createClient();
    const patch: Record<string, unknown> = { status: parsed.data.status };
    if (parsed.data.status === "completed") {
      patch.completed_at = new Date().toISOString();
      patch.actual_completion = new Date().toISOString().slice(0, 10);
    }

    const { data, error } = await supabase
      .from("projects")
      .update(patch)
      .eq("id", parsed.data.id)
      .select("*")
      .single();

    if (error) return actionError(error.message);

    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${parsed.data.id}`);
    return actionSuccess("Project status updated.", data as Project);
  } catch {
    return actionError("Unable to update project status.");
  }
}

export async function addProjectTask(
  input: unknown
): Promise<AdminActionResult<ProjectTask>> {
  try {
    await requireStaff();
    const parsed = createProjectTaskSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid task data.");
    }

    const supabase = createClient();
    const payload = {
      ...parsed.data,
      status: parsed.data.status ?? "pending",
      priority: parsed.data.priority ?? "normal",
    };

    const { data, error } = await supabase
      .from("project_tasks")
      .insert(payload)
      .select("*")
      .single();

    if (error) return actionError(error.message);

    revalidatePath(`/admin/projects/${parsed.data.project_id}`);
    return actionSuccess("Task added.", data as ProjectTask);
  } catch {
    return actionError("Unable to add task.");
  }
}

export async function updateProjectTask(
  input: unknown
): Promise<AdminActionResult<ProjectTask>> {
  try {
    await requireStaff();
    const parsed = updateProjectTaskSchema.safeParse(input);
    if (!parsed.success) {
      return actionError(parsed.error.issues[0]?.message ?? "Invalid task data.");
    }

    const { id, ...fields } = parsed.data;
    const supabase = createClient();

    const patch: Record<string, unknown> = { ...fields };
    if (fields.status === "completed") {
      patch.completed_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("project_tasks")
      .update(patch)
      .eq("id", id)
      .select("*")
      .single();

    if (error) return actionError(error.message);

    if (data?.project_id) {
      revalidatePath(`/admin/projects/${data.project_id}`);
    }
    return actionSuccess("Task updated.", data as ProjectTask);
  } catch {
    return actionError("Unable to update task.");
  }
}
