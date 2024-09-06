import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomRGB() {
    const color = {
      red: Math.floor(Math.random() * 160) + 95,
      green: Math.floor(Math.random() * 160) + 95,
      blue: Math.floor(Math.random() * 160) + 95,
    }
    return `rgb(${color.red}, ${color.green}, ${color.blue})`;

}