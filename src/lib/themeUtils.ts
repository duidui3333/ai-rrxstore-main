export const PALETTES = [
  { from: "from-emerald-50", via: "via-teal-50", to: "to-cyan-50", orb1: "bg-emerald-200/50", orb2: "bg-blue-200/50", text: "text-emerald-800", icon: "text-emerald-500", border: "border-emerald-200", btn: "bg-emerald-600 hover:bg-emerald-700" },
  { from: "from-amber-50", via: "via-orange-50", to: "to-rose-50", orb1: "bg-amber-200/50", orb2: "bg-rose-200/50", text: "text-amber-800", icon: "text-amber-500", border: "border-amber-200", btn: "bg-orange-500 hover:bg-orange-600" },
  { from: "from-purple-50", via: "via-fuchsia-50", to: "to-pink-50", orb1: "bg-purple-200/50", orb2: "bg-pink-200/50", text: "text-purple-800", icon: "text-purple-500", border: "border-purple-200", btn: "bg-purple-600 hover:bg-purple-700" },
  { from: "from-blue-50", via: "via-indigo-50", to: "to-violet-50", orb1: "bg-blue-200/50", orb2: "bg-violet-200/50", text: "text-blue-800", icon: "text-blue-500", border: "border-blue-200", btn: "bg-blue-600 hover:bg-blue-700" },
  { from: "from-rose-50", via: "via-pink-50", to: "to-red-50", orb1: "bg-rose-200/50", orb2: "bg-red-200/50", text: "text-rose-800", icon: "text-rose-500", border: "border-rose-200", btn: "bg-rose-600 hover:bg-rose-700" },
];

export function getThemePalette(name: string) {
  if (name === "精选推荐") return PALETTES[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTES[Math.abs(hash) % PALETTES.length];
}
