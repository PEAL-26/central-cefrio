import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { createFormData } from '@/helpers/form-data';
import { toastResponseError, toastResponseRegisterSuccess } from '@/helpers/response/response';
import { useMultipleFileUploads } from '@/hooks/use-multiple-file-uploads';
import { useVercelBlobUpload } from '@/hooks/use-vercel-blob-upload';
import { companyService, getCompanyFirst } from '@/services/companies';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { CompanySchemaType, companySchema } from './schema';

export function useSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const { uploads, progress: uploadProgress } = useMultipleFileUploads();
  const vercel = useVercelBlobUpload();

  const form = useForm<CompanySchemaType>({
    resolver: zodResolver(companySchema),
    mode: 'onChange',
  });

  const {
    data: company,
    isLoading: isLoadingQuery,
    isFetching,
  } = useQuery({
    queryFn: getCompanyFirst,
    queryKey: ['company'],
  });

  const isLoadingData = isLoadingQuery || isFetching;
  const queryClient = useQueryClient();

  const handleSubmit = async (data: CompanySchemaType) => {
    if (isLoading) return;

    const isUploadLocal = process.env.NEXT_PUBLIC_UPLOAD_LOCAL === 'true';

    try {
      setIsLoading(true);

      let logo: string | null | undefined = data.logo?.url ? undefined : null;
      if (data.logo?.file) {
        if (isUploadLocal) {
          const imageFormData = createFormData(data.logo?.file);
          const [logoName] = await uploads([imageFormData]);
          logo = logoName || null;
        } else {
          const blob = await vercel.upload(data.logo.file);
          logo = blob.url.split('/').slice(-1)[0] ?? '';
        }
      }

      await companyService.create({
        ...data,
        logo,
      });

      toastResponseRegisterSuccess(data?.id);
      queryClient.invalidateQueries({ queryKey: ['company'] });
    } catch (error) {
      toastResponseError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (company) {
      form.setValue('id', company.id);
      form.setValue('name', company.name);
      form.setValue('slogan', company?.slogan || undefined);
      form.setValue('telephone', company?.telephone || undefined);
      form.setValue('address', company?.address || undefined);
      form.setValue('email', company?.email || undefined);
      form.setValue('site', company?.site || undefined);
      form.setValue('taxpayer', company?.taxpayer || undefined);
      form.setValue('location', company?.location || undefined);
      form.setValue('logo.url', company?.logo || undefined);
    }
  }, [company, form]);

  return {
    form,
    onSubmit: form.handleSubmit(handleSubmit),
    isLoading,
    uploadProgress,
    isLoadingData,
  };
}
