export async function generateFileFromUrl(url?: string | null) {
  if (!url) return url === null ? null : undefined;

  const response = await fetch(url);
  const name = url.split("/").pop() || "";
  const data = await response.blob();

  const metadata = {
    type: data.type,
  };

  return new File([data], name, metadata);
}
