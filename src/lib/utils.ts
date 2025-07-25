import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format numbers to French locale
export function formatNumber(num: number): string {
  // Ensure the number is valid and not NaN
  if (isNaN(num) || !isFinite(num) || num === null || num === undefined) {
    return "0";
  }
  // Ensure we're working with a valid number
  const validNum = Number(num);
  if (isNaN(validNum) || !isFinite(validNum)) {
    return "0";
  }
  return new Intl.NumberFormat("fr-FR").format(Math.round(validNum));
}

// Format dates to French locale
export function formatDate(date: string | Date): string {
  if (!date) return "غير محدد";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return "غير محدد";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(dateObj);
}

// Format date and time to French locale
export function formatDateTime(date: string | Date): string {
  if (!date) return "غير محدد";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return "غير محدد";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
}

// Format time with Algerian timezone
export function formatTimeAlgeria(date: string | Date): string {
  if (!date) return "غير محدد";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return "غير محدد";
  }

  return dateObj.toLocaleString("ar-DZ", {
    timeZone: "Africa/Algiers",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// Compress image before upload
export async function compressImage(
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 600,
  quality: number = 0.8,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);

      // Convert to base64 with compression
      const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedDataUrl);
    };

    img.onerror = () => {
      reject(new Error("فشل في تحميل الصورة"));
    };

    // Create object URL for the image
    img.src = URL.createObjectURL(file);
  });
}

// Batch compress images for import processing
export async function batchCompressImages(
  imageUrls: string[],
  maxWidth: number = 400,
  maxHeight: number = 400,
  quality: number = 0.6,
): Promise<string[]> {
  const compressedImages: string[] = [];

  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];

    if (!imageUrl || !imageUrl.startsWith("data:")) {
      compressedImages.push(imageUrl);
      continue;
    }

    try {
      const compressed = await new Promise<string>((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
          // Calculate new dimensions while maintaining aspect ratio
          let { width, height } = img;

          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }

          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;

          // Draw and compress
          ctx?.drawImage(img, 0, 0, width, height);

          // Convert to base64 with compression
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(compressedDataUrl);
        };

        img.onerror = () => {
          resolve(imageUrl); // Return original if compression fails
        };

        img.src = imageUrl;
      });

      compressedImages.push(compressed);
    } catch (error) {
      console.warn(`فشل في ضغط الصورة ${i + 1}:`, error);
      compressedImages.push(imageUrl); // Use original if compression fails
    }

    // Small delay between compressions to prevent overwhelming the browser
    if (i < imageUrls.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  return compressedImages;
}

// Resize image for display optimization
export function optimizeImageForDisplay(
  imageUrl: string,
  size: "small" | "medium" | "large" = "medium",
): string {
  // If it's already a data URL, return as is
  if (imageUrl.startsWith("data:")) {
    return imageUrl;
  }

  // For external URLs, you could add query parameters for optimization
  // This is a placeholder for future enhancement
  return imageUrl;
}
