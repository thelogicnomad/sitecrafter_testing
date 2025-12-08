import { type ClassValue, clsx } from "clsx";
    import { twMerge } from "tailwind-merge";

    export function cn(...inputs: ClassValue[]) {
      return twMerge(clsx(inputs));
    }

    // Utility for generating random images from picsum.photos
    export const getRandomImageUrl = (width: number, height: number) =>
      `https://picsum.photos/${width}/${height}?random=${Math.random()}`;

    export const getSeededImageUrl = (keyword: string, width: number, height: number) =>
      `https://picsum.photos/seed/${keyword}/${width}/${height}`;