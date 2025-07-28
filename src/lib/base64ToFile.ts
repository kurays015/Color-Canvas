// Convert base64 to File object
export const base64ToFile = (base64String: string, filename: string) => {
  // Remove the data URL prefix (e.g., "data:image/png;base64,")
  const base64Data = base64String.split(",")[1];

  // Convert base64 to bytes
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  // Create File object
  return new File([byteArray], filename, { type: "image/png" });
};
