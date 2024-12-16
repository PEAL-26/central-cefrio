import { type PutBlobResult } from '@vercel/blob';
import { upload as vercelUploadClient, type UploadOptions } from '@vercel/blob/client';
import { useState } from 'react';

export function useVercelBlobUpload() {
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  const upload = async (file: File, name?: string, configs?: UploadOptions) => {
    const { access = 'public', handleUploadUrl = 'api/uploads/vercel', ...config } = configs || {};

    if (!file) {
      throw new Error('No file selected');
    }

    const newBlob = await vercelUploadClient(name || file.name, file, {
      access,
      handleUploadUrl,
      ...config,
    });

    setBlob(newBlob);

    return newBlob;
  };

  return { url: blob?.url, upload };
}
