import { listEquipment } from "@/actions/admin/equipment";
import { listProjects } from "@/actions/admin/projects";
import { DataTable } from "@/components/admin/DataTable";
import { EquipmentPanel } from "@/components/admin/forms/EquipmentPanel";
import { PageHeader } from "@/components/admin/PageHeader";
import { EQUIPMENT_CATEGORY_LABELS } from "@/lib/admin/constants";
import type { Equipment } from "@/types/admin";

export default async function EquipmentPage() {
  const [equipmentResult, projectsResult] = await Promise.all([
    listEquipment(),
    listProjects(),
  ]);

  const equipment = equipmentResult.data ?? [];
  const projects = projectsResult.data ?? [];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Equipment"
        description="Inventory and project assignments for production gear."
      />

      <DataTable<Equipment>
        rows={equipment}
        emptyMessage="No equipment registered"
        emptyDescription="Add cameras, audio, lighting, and other gear below."
        columns={[
          { key: "item_name", header: "Item" },
          {
            key: "category",
            header: "Category",
            render: (row) => EQUIPMENT_CATEGORY_LABELS[row.category],
          },
          {
            key: "quantity",
            header: "Qty / Available",
            render: (row) => `${row.quantity} / ${row.available}`,
          },
          { key: "condition", header: "Condition", className: "capitalize" },
          { key: "location", header: "Location" },
        ]}
      />

      <EquipmentPanel equipment={equipment} projects={projects} />
    </div>
  );
}
