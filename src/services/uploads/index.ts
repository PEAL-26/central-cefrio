import { api, AxiosRequestConfig } from '@/libs/axios';

type OnUploadProgress = (progress: number) => void;
type Configs = {
  path?: string;
};

export async function uploads(
  formData: FormData,
  onUploadProgress?: OnUploadProgress,
  configs?: Configs,
) {
  const options: AxiosRequestConfig = {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent: any) => {
      const percentage = (progressEvent.loaded * 100) / progressEvent.total;
      onUploadProgress?.(+percentage.toFixed(2));
    },
  };

  const path = configs?.path ? `path=${configs.path}` : '';

  return api.post<string[]>(`/uploads?${path}`, formData, options).then((response) => response);
}
