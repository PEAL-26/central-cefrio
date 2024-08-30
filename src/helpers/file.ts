export async function blobToBase64(blob: Blob | null) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    blob && reader.readAsDataURL(blob);
  });
}

export function generateUrlFromName(name?: string | null) {
  if (!name) return undefined;

  const isProduction = process.env.NODE_ENV === "production";
  const isLocal = process.env.NEXT_PUBLIC_UPLOAD_LOCAL === "true";
  const url = process.env.NEXT_PUBLIC_URL;
  let folder = "";

  if (isLocal) {
    folder = "/files";
  }

  return `${url}/${folder}/${name}`;
}
