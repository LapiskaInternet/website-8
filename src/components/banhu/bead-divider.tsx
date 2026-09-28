import { cn } from "@/lib/utils";

const BEAD_COLORS = [
  "#1d4a2b",
  "#de7b33",
  "#8a9a5b",
  "#de7b33",
  "#1d4a2b",
  "#e5d7b4",
];

/**
 * A decorative strip of "beads" (alternating green / orange / sand dots)
 * inspired by the beadwork borders on the Banhu posters.
 */
export function BeadDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      {Array.from({ length: 27 }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ backgroundColor: BEAD_COLORS[i % BEAD_COLORS.length] }}
        />
      ))}
    </div>
  );
}
