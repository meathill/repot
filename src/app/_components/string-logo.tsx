import { getInitials, string2color } from '@/utils';

interface StringLogoProps {
  name: string;
}

export default function StringLogo({ name }: StringLogoProps) {
  const initials = getInitials(name);
  const color = string2color(initials);
  return <div style={{ color }} className="w-12 h-12 rounded-lg text-center leading-12 font-bold text-primary-800">{initials}</div>
}
