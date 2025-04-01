import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatWeight = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} ton`;
  }
  return `${value.toFixed(2)} kg`;
};

export const formatVolume = (value: number) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} kL`;
  }
  return `${value.toFixed(2)} L`;
};