import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for merging Tailwind CSS classes
 * 
 * Combines clsx and tailwind-merge to handle:
 * - Conditional classes
 * - Class name conflicts
 * - Class merging
 * 
 * @param inputs - Array of class values, conditions, or objects
 * @returns Merged and optimized className string
 * 
 * @example
 * ```ts
 * cn('px-2 py-1', condition && 'bg-blue-500', { 'text-white': isActive })
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 