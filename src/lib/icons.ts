import {
  Church,
  Flower2,
  GraduationCap,
  Heart,
  MonitorPlay,
  Music,
  Trophy,
  Users,
  Vote,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Flower2,
  MonitorPlay,
  Users,
  Music,
  Church,
  Vote,
  GraduationCap,
  Trophy,
};

export function getServiceIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Users;
}
