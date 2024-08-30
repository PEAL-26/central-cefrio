import { uploads } from "@/services/uploads";
import { useEffect, useState } from "react";

type FormDataCustom = FormData | null;

export function useMultipleFileUploads(props?: { path?: string }) {
  const [progress, setProgress] = useState<{ progress: number }[]>([]);
  const [progressTotal, setProgressTotal] = useState(0);
  const [formDataLength, setFormDataLength] = useState(0);

  const handleUploads = async (formData: FormDataCustom[]) => {
    const newFormData = formData.filter((data) => !!data);
    setFormDataLength(newFormData.length);
    setProgress([]);

    let result = [];
    for (const data of formData) {
      if (!data) {
        result.push(data);
        continue;
      }

      const response = await uploads(
        data,
        (progress) =>
          setProgress((prevProgress) => {
            return [...prevProgress, { progress }];
          }),
        { path: props?.path }
      );

      result.push(response);
    }

    return result;
  };

  useEffect(() => {
    const total = progress.reduce((sum, item) => sum + item.progress, 0);
    const progressTotal = formDataLength === 0 ? total : total / formDataLength;
    setProgressTotal(() => +progressTotal.toFixed(2));
  }, [progress, formDataLength]);

  return {
    uploads: handleUploads,
    progress: progressTotal,
    length: formDataLength,
  };
}
