import {
  Camera,
  Church,
  Clapperboard,
  Flower2,
  GraduationCap,
  Heart,
  Monitor,
  MonitorPlay,
  Music,
  Palette,
  Printer,
  Shirt,
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
  Palette,
  Camera,
  Clapperboard,
  Monitor,
  Printer,
  Shirt,
};

export function getServiceIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Users;
}
