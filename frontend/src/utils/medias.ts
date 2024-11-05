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
