export const readMediaFile = (
  file: File
): Promise<string | ArrayBuffer | null | DOMException> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", function () {
      resolve(this.result);
    });

    reader.addEventListener("error", function () {
      reject(this.error);
    });

    reader.readAsDataURL(file);
  });
};

export const getMediaEltKey = (file: File) => {
  return `${file.lastModified}-${file.name}-${file.size}`;
};

export function validateImageSize(file: File | null, MB: number = 1) {
  // 1 MB = 1024 * 1024 bytes
  const MAX_SIZE = MB * 1024 * 1024; // 1MB in bytes

  return !!file && file.size <= MAX_SIZE;
}

export function convertImageSizeToMo(
  fileSize: number | undefined
): number | string {
  return fileSize ? (fileSize / (1024 * 1024)).toFixed(2) : 0;
}
