type ClassValue = string | false | null | undefined;

/** Junta classes CSS ignorando valores falsy (ex: `cn(styles.card, isActive && styles.active)`). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
