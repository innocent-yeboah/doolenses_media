import { PageHeader } from "@/components/admin/PageHeader";
import { MonthCalendar } from "@/components/admin/forms/MonthCalendar";
import { getCalendarEvents } from "@/lib/admin/dashboard-data";

interface CalendarPageProps {
  searchParams: { year?: string; month?: string };
}

export default async function CalendarPage({ searchParams }: CalendarPageProps) {
  const now = new Date();
  const year = searchParams.year ? Number(searchParams.year) : now.getFullYear();
  const month = searchParams.month ? Number(searchParams.month) : now.getMonth() + 1;

  const events = await getCalendarEvents(year, month);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Calendar"
        description="Leads and projects with scheduled event dates."
      />
      <MonthCalendar year={year} month={month} events={events} />
    </div>
  );
}
