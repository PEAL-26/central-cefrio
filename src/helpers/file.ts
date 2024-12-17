export async function blobToBase64(blob: Blob | null) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    blob && reader.readAsDataURL(blob);
  });
}

export function generateUrlFromName(name?: string | null, folder?: string) {
  if (!name) return undefined;

  const folderUrl = folder ? `/${folder}` : '';
  const url = `${process.env.UPLOAD_FILE_PROTOCOL}://${process.env.UPLOAD_FILE_HOSTNAME}`;

  return `${url}${folderUrl}/${name}`;
}
